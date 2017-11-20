# Reference Handler

## 3 Pillars
- **UX for reviewing**
  -[x]  UI for labeling preference and required words
      -  setting in the side menu where you can set with sliders
      -  make regex logic intuitive (for starters: and/or/not)
      -  in another tab, show the reason for a given paper rating that is being shown
  -[ ]  Solve problem of no abstract
      -  option to filter articles that don't have an abstract
      -  show embedded page given link
      -  if parsable website (ie. clinicaltrials.gov, parse and show the API payload)
  -  Decision UI
    -  ? add a background to the current paragraph ?
    -  bold titles
    -  red/green highlight words
    -  ? spectrum colored words ?
    -  ? include/exclude/undecided/unseen UI (red/green background/icon) ?
  -  Cursorless functionality
    -  up/down, 'e', 'i', 'u', 'm', 'l', 'c', 'o'
    -  automatically go to the next entry
    -  centers your current review
- **Rating System**
  -  ? Graphical metric for displaying rating ?
  -  later: clustering algorithm, highlight reasons and machine learn from your decisions
- **Import/Export**
  - import typical file formats
  - later: add custom format
  - being able to export with same format
  - export by fitler: (ie included, rating threshold, ...) ("pick a part of pie chart")
Storage Backend
  - Maybe the webpage works off a path to the folder with your papers
  - The python for the rating system would run in the browser
  - The metadata (comments, labels, rating criteria, etc) would be have to be saved in an individual file on the computer and a path be given to it as well

Account Backend
  - User accounts (login)
