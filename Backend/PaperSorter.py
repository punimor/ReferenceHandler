import sys
import re
import os

# def wordExists(w):
#     return re.compile(r'\b({0})\b'.format(w), flags=re.IGNORECASE).search is not None

# findWholeWord('seek')('those who seek shall find')    # -> <match object>
# findWholeWord('word')('swordsmith') 


class DesiredPhrase:
    # words which should be contribute their corresponding weight to the sum score if found
    # Note: does not make a difference if one or all of the words in the list were found.
    #       Weight will only be counted once if at least one of them were found at least once.
    def __init__(self, weight, words):
        self.weight = weight
        self.words = words

class PaperSorter:
    PAPER_BEGIN_DELIMITER = "%0 "
    PAPER_END_DELIMITER = "%G "

    """
    Summary: Read in the content from the relevant files
    Params:
        filename_document: the publications to sort in (has to meet a certain schema)
        filename_required: the required words in the document. comma seperated indicated OR and newline denotes AND
        filename_desired: words that would be prefered to be in the document, with an associated weight of importance
              positive weights indicate a preference for the word to be in the paper 
              and negative weights indicate a preference for the word to not be in the paper
              each line starts with a float [-1,1] followed (comma deliminated) by words that the weight should apply to (with OR logic)
              new lines dictate a new preference
    """
    def __init__(self, filename_document, filename_required, filename_desired):
        with open(filename_document, "r", encoding='utf-8') as f:
            self.papers = self.seperate_papers(f.read())
        
        # word1 OR word2 OR ....
        # AND word3 OR word4 OR ....
        # AND ....
        with open(filename_required, "r", encoding='utf-8') as f:
            self.required_phrases = [[word.strip() for word in line.split(",")] for line in f.readlines()]

        # weight1, word1 OR word2 OR ....
        # weight2, word3 OR word4 OR ....
        # ....
        with open(filename_desired, "r", encoding='utf-8') as f:
            self.desired_phrases = [DesiredPhrase(float(line.split(",")[0]), [word.strip() for word in line.split(",")[1:]]) for line in f.readlines()]

    def seperate_papers(self, document):
        all_papers = []
        paper = ""
        for line in document.splitlines():
            if line.startswith(self.PAPER_BEGIN_DELIMITER):
                paper = ""
            paper += line + os.linesep
            if line.startswith(self.PAPER_END_DELIMITER):
                all_papers.append(Paper(paper))
        return all_papers
        
    def get_ratings(self):
        for paper in self.papers:
            paper.calculate_score(self.required_phrases, self.desired_phrases)
        return [paper for paper in sorted(self.papers, key=lambda p: p.score, reverse=True) if paper.score != -sys.maxsize]


class Paper:
    SECTION_DELIMITERS = {
        "title" : "%T",
        "abstract" : "%X",
        "link" : "%R"
    }

    def __init__(self, paper_text):
        self.paper_text = paper_text
        self.sections = {delimiter : self.get_section(self.SECTION_DELIMITERS[delimiter])
                            for delimiter in self.SECTION_DELIMITERS}
        self.score = -sys.maxsize
        self.score_matches = []

    def get_section(self, delimiter):
        # check that the delimiter exists
        # check that ONLY ONE delimiter exists
        # else raise error and return the paper that caused problem
        # NOTE: this method causes a problem if there is a line break inside one of the sections
        matching_lines = [section for section in self.paper_text.splitlines() if section.startswith(delimiter)]
        if len(matching_lines) > 1:
            raise Exception("Multiple sections starting with '{}' found in paper.{}".format(delimiter, os.linesep + self.paper_text))
        if not matching_lines:
            matching_lines = [delimiter]
        # return the matching section, without its delimiter and stripped of any whitespace on either end.
        return matching_lines[0].split(delimiter)[1].strip()

    def calculate_score(self, required, desired):
        # for each phrase list, if one of the phrases in that list is not in abstract, return neg inf score
        for required_phrase_list in required:
            contains_phrase = False
            for required_phrase in required_phrase_list:
                if required_phrase in self.sections["abstract"] or required_phrase in self.sections["title"]:
                    contains_phrase = True
            if contains_phrase == False:
                self.score = -sys.maxsize
                break

        # Now score the document based on the desired words
        score_sum = 0
        for desired_phrase_obj in desired:
            for desired_phrase in desired_phrase_obj.words:
                if desired_phrase in self.sections["abstract"] or desired_phrase in self.sections["title"]:
                    score_sum += desired_phrase_obj.weight
                    self.score_matches.append((desired_phrase, desired_phrase_obj.weight))
                break
        self.score = score_sum