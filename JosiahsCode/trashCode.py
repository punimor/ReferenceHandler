    def seperate_sections(self):
        all_sections = []
        section = ""
        for delimiter in self.SECTION_DELIMITERS:
            read = False
            for line in self.paper_text.splitlines():
                if read and line.startswith("%"):
                    break
                if line.startswith(delimiter):
                    read = True
                if read:
                    section += line + os.linesep
                all_sections.append(section)


        if not matching_lines:
            matching_lines = [delimiter]
            # print("No lines starting with '{}' found in paper.{}".format(delimiter, os.linesep + self.paper_text))
