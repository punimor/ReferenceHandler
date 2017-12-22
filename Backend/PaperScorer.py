class DesiredPhrase:
    # words which should be contribute their corresponding weight to the sum score if found
    # Note: does not make a difference if one or all of the words in the list were found.
    #       Weight will only be counted once if at least one of them were found at least once.
    def __init__(self, weight, words):
        self.weight = weight
        self.words = words


class PaperScorer:
    def __init__(self, papers, filename="", prefered=""):        
        self.papers = papers
        if filename != "":
            with open(filename, "r") as f: #encoding='utf-8'
                self.desired_phrase_pairs = [DesiredPhrase(float(line.split(",")[0]), [word.strip() for word in line.split(",")[1:]]) for line in f.readlines()]
        else:
            self.desired_phrase_pairs = [DesiredPhrase(float(line.split(",")[0]), [word.strip() for word in line.split(",")[1:]]) for line in prefered.split("\n")]

    def get_scored_papers(self):
        augmented_papers = []
        for paper in self.papers:
            augmented_papers.append(self.calculate_score(paper))
        return [paper.sections for paper in sorted(augmented_papers, key=lambda p: p.sections["rating"], reverse=True)]

    def calculate_score(self, paper):
        # Score the document based on the desired words
        score_sum = 0
        paper.sections["score_matches"] = []
        for desired_phrase_obj in self.desired_phrase_pairs:
            for desired_phrase in desired_phrase_obj.words:
                if desired_phrase in paper.sections["abstract"] or desired_phrase in paper.sections["title"]:
                    score_sum += desired_phrase_obj.weight
                    paper.sections["score_matches"].append((desired_phrase, desired_phrase_obj.weight))
                    divclass = "bad_word" if desired_phrase_obj.weight <= 0 else "good_word"
                    paper.sections["abstract"] = paper.sections["abstract"].replace(desired_phrase, "<span class="+divclass+">"+desired_phrase+"</span>")
                    paper.sections["title"] = paper.sections["title"].replace(desired_phrase, "<span class="+divclass+">"+desired_phrase+"</span>")
                break
        if score_sum < 0:
            score_sum = 0
        if score_sum > 5:
            score_sum = 5
        paper.sections["rating"] = round(score_sum, 2)
        return paper
