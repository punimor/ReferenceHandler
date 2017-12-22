/**
    * @file Builds a new table row containing the title, abstract and buttons for a paper.
    * @author Josiah Coad/Filip Gnesin
*/

'use strict';

/** 
    * Builds a new table row containing the title, abstract and buttons for a paper.
    * @namespace 
*/
var PaperTableBuilder = (function() {
    /**
        * Expand a table row and apply the selection classes. Collapse and deselect all other rows.
        * @memberof! PaperTableBuilder
        * @public
        * @param {jQuery} this_obj - A jQuery object for the row to be expanded.
    */
    var expandAccordian = function(this_obj) {
        $("tbody").children().removeClass('selected');
        $("tbody").children().addClass('unselected');
        $("tbody").find(".collapse").collapse('hide');
        this_obj.removeClass('unselected');
        this_obj.addClass('selected');
        this_obj.find(".collapse").collapse('show');
    }

    /**
        * Change the decision button for the '.selected' row/paper to the new_decision.
        * @memberof! PaperTableBuilder
        * @public
        * @param {Decision} new_decision - One of the decision enum values to set the decision button to.
    */
    var changeDecisionButton = function(new_decision) {
        const CLASSES_COMMON = "btn btn-block decisionbutt"
        const CLASSES_FOR_INCLUDE = "btn-success include"
        const CLASSES_FOR_MAYBE = "btn btn-info maybe"
        const CLASSES_FOR_EXCLUDE = "btn-danger exclude"
        
        switch(new_decision){
            case Decision.INCLUDE:
                $("tbody .selected").find(".decisionbutt").removeClass().addClass(CLASSES_COMMON + " " + CLASSES_FOR_INCLUDE);
                break;
            case Decision.MAYBE:
                $("tbody .selected").find(".decisionbutt").removeClass().addClass(CLASSES_COMMON + " " + CLASSES_FOR_MAYBE);
                break;
            case Decision.EXCLUDE:
                $("tbody .selected").find(".decisionbutt").removeClass().addClass(CLASSES_COMMON + " " + CLASSES_FOR_EXCLUDE);
                break;
        }
    }

    /**
        * Render up to 'max_pages_on_screen' number of papers in a table to the screen.
        * @memberof! PaperTableBuilder
        * @public
        * @param {PlainObject[]} all_papers - A list of Json objects, each representing papers for screening.
    */
    var displayPapers = function(all_papers) {
        var max_pages_on_screen = 10;
        var num_display_papers = Math.min(max_pages_on_screen, all_papers.length)

        for (var i=0; i<num_display_papers; i++) {
            $("table tbody").append(_getNewTableRow(all_papers, i));
        }

        expandAccordian($("table tbody").children()[0])
    }

    /**
      * Builds a column of 4 buttons, the one on top (non-operational) displays the current decision. The 3 buttons below it give the options for a new decision. 
      * @memberof! PaperTableBuilder
      * @private
      * @returns {jQuery} A jQuery column element populated with the four buttons.
    */
    var _getDecisionButtonsColumn = function() {
        // create a new column for the buttons 
        var $td_buttons = $("<td>", {class: "td_buttons"})

        // create a decision button that will be non-operational (no action on click), just shows the current decision
        var $decisionbutton = $("<button>", {id: "decisionbutton", type:"button", class:"btn btn-outline-secondary btn-block undecide decisionbutt"})

        // create 3 operational buttons for choosing a new decision
        var $include_button = $("<button>", {type: "button", class:"btn btn-outline-success btn-block button-adjust include"}).click(function() {changeDecisionButton(Decision.INCLUDE)})
        var $maybe_button = $("<button>", {type: "button", class:"btn btn-outline-info btn-block button-adjust maybe"}).click(function() {changeDecisionButton(Decision.MAYBE)})
        var $exclude_button = $("<button>", {type: "button", class:"btn btn-outline-danger btn-block button-adjust exclude"}).click( function() {changeDecisionButton(Decision.EXCLUDE)})
        
        // create a new div and add the buttons to the div
        var $optionbuttonsdiv = $("<div>", {id:"buttons", class:"collapse collapsingItem"}).append($include_button, $maybe_button, $exclude_button)

        // add the div to the column
        $td_buttons.append($decisionbutton, $optionbuttonsdiv)

        return $td_buttons
    }


    /**
      * Builds a new table row containing the title, abstract and buttons for a paper.
      * @memberof! PaperTableBuilder
      * @private
      * @param {PlainObject[]} all_papers - A list of Json objects, each representing papers for screening.
      * @param {int} i - The index of the paper (in allpapers) to build a new table row for.
      * @returns {jQuery} The jQuery table row representing the paper in allpapers at index i.
    */
    var _getNewTableRow = function(allpapers, i) {
        // build the table row and add the stars to the first column in the row
        var $tr = $("<tr>", {id: "foo", "class": "unselected", "data-toggle": 'collapse', "data-index": i, "data-target": ".collapsingItem" + i});
        var $stars = $("<div>", {class: "rateYo"}).rateYo({ rating: allpapers[i]["rating"] }).rateYo("option", "starWidth", "20px");
        var $td_rating = $("<td>").append($stars);

        // build the title and abstract and add them to the second column in the row
        var $td_title_abstract = $("<td>", {id: "table-heading-abstract"})

        // title and abstract have to be built by string concatenation because the text color highlighting will not be tampered with this way 
        // (as opposed to trying to build the title and abstract using jquery functions)
        var td_title = "<h5>" + allpapers[i]['title'] + "</h5>";
        var div_abstract = "<div class='collapse collapsingItem'>" + allpapers[i]['abstract'] + "</div>"
        $td_title_abstract.append(td_title, div_abstract)

        // build the buttons for the decision in the third column in the row
        var $td_buttons = _getDecisionButtonsColumn()

        // add all columns to the row
        $tr.append($td_rating, $td_title_abstract, $td_buttons) 

        // add a click function to the table row so that it will expand (and the others collapse) when clicked
        $tr.click( function() { expandAccordian($(this)) });

        // return the row
        return $tr
    }


    return {
        expandAccordian : expandAccordian,
        changeDecisionButton : changeDecisionButton,
        displayPapers : displayPapers
    }
})();