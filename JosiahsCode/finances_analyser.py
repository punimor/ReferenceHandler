import sys

class DesiredPhrase:
    def __init__(self, score, words):
        self.score = score
        self.words = words

class PaperSorter:
    def __init__(self, filename_document, filename_required, filename_desired):
        filename = "filip_research.txt"
        with open(filename_document, "r", encoding='utf-8') as f:
            self.papers = self.seperate_papers(f.read())
        
        with open(filename_required, "r", encoding='utf-8') as f:
            self.required_phrases = [line.split(",") for line in f.readlines()]

        with open(filename_desired, "r", encoding='utf-8') as f:
            self.desired_phrases = [DesiredPhrase(float(line.split(",")[0]), line.split(",")[1:]) for line in f.readlines()]

    def seperate_papers(self, document):
        paper_begin_delimiter = "%0"
        paper_end_delimiter = "%G"
        papers = [paper.split(paper_end_delimiter)[0] for paper in document.split(paper_begin_delimiter)]
        return [Paper(p) for p in papers]

    def get_sorted_titles(self):
        for paper in self.papers:
            paper.calculate_score(self.required_phrases, self.desired_phrases)
        return [(paper.title, paper.score) for paper in sorted(papers, key=paper.score)]


class Paper:
    TITLE_DELIMITER = "%T"
    ABSTRACT_DELIMITER = "%X"

    def __init__(self, paper_text):
        self.paper_text = paper_text
        self.title = get_section(TITLE_DELIMITER)
        self.abstract = get_section(ABSTRACT_DELIMITER)
        self.score = -sys.maxsize
        
    def get_section(self, delimiter):
        # check that the delimiter exists
        # check that ONLY ONE delimiter exists
        # else raise error and return the paper that caused problem
        if self.paper_text.count(delimiter) != 1:
            raise Exception("section delimiter was invalid")
        # return the section from that delimiter
        return paper.split(delimiter)[1].split("\n")[0]

    def calculate_score(self, required, desired):
        # for each phrase list, if one of the phrases in that list is not in abstract, return neg inf score
        for required_phrase_list in required.required:
            contains_phrase = False
            for required_phrase in required_phrase_list:
                if required_phrase in self.abstract:
                    contains_phrase = True
            if contains_phrase = False:
                self.score = -sys.maxsize

        score_sum = 0
        for desired_phrase_obj in desired.desired:
            for desired_phrase in desired_phrase_obj.words:
                if desired_phrase in self.abstract:
                    score_sum += desired_phrase_obj.score
                break
        self.score = score_sum