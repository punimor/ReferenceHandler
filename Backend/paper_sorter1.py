from PaperSorter import *

filename_document = "filip_research.txt"
filename_required = "minimum_requirements.txt"
filename_desired  = "desired_scores.txt"

paperSorter = PaperSorter(filename_document, filename_required, filename_desired)

print(len(paperSorter.get_ratings()))
print(*["Score:   {}\nTitle:   {}\nLink:    {}\nReasons: {}".format(paper.sections["title"], paper.score, paper.sections["link"], paper.score_matches) for paper in paperSorter.get_ratings()], sep="\n\n")