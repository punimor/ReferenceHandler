import os

class DocumentParser:
    PAPER_BEGIN_DELIMITER = "%0 "
    PAPER_END_DELIMITER = "%G "

    def __init__(self, raw_text = "", filename = ""):
        if filename != "":
            with open(filename, "r", encoding='utf-8') as f:
                raw_text = self.f.read()
        self.papers = self.seperate_papers(raw_text)
        
    def seperate_papers(self, document):
        all_papers = []
        paper = ""
        for line in document.splitlines():
            if line.startswith(self.PAPER_BEGIN_DELIMITER):
                paper = ""
            paper += line + os.linesep
            if line.startswith(self.PAPER_END_DELIMITER):
                all_papers.append(PaperParser(paper))
        return all_papers

    def get_papers(self):
        return [paper.sections for paper in self.papers]


class PaperParser:
    SECTION_DELIMITERS = {
        "title" : "%T",
        "abstract" : "%X",
        "link" : "%R"
    }

    def __init__(self, paper_text):
        self.paper_text = paper_text
        self.sections = {delimiter : self.get_section(self.SECTION_DELIMITERS[delimiter])
                            for delimiter in self.SECTION_DELIMITERS}

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

    def __str__(self):
        return self.sections