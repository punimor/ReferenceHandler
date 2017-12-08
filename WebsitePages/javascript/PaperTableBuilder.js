/**
    * @file Builds the table for displaying the current 
    * @author Josiah Coad and Filip Gnesin
*/

'use strict';

/**
    * Enum for Button Decision values.
    * @readonly
    * @enum {string}
*/
const Decision = {
    INCLUDE: "include",
    MAYBE: "maybe",
    EXCLUDE: "exclude"
};

/** 
    * Builds the table for displaying the current 
    * @namespace 
*/

var PaperTableBuilder = (function() {
    /**
        * Expand a table row and apply the selection classes. Collapse and deselect all other rows.
        * @param {Object} thisObj - a Jquery object for the row to be expanded
    */
    var expandAccordian = function(thisObj) {
        $("tbody").children().removeClass('selected');
        $("tbody").children().addClass('unselected');
        $("tbody").find(".collapse").collapse('hide');
        thisObj.removeClass('unselected');
        thisObj.addClass('selected');
        thisObj.find(".collapse").collapse('show');
    }

    /**
        * Change the decision button for the '.selected' row/paper to the new_decision.
        * @param {string} new_decision - One of the following ["include", "exclude", "maybe"]
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
      * Builds a column of 4 buttons, the one on top (non-operational) displays the current decision. The 3 buttons below it give the options for a new decision. 
      * @returns {Object} A column element populated with the four buttons.
    */
    var getDecisionButtonsColumn = function() {
        // create a new column for the buttons 
        var $td_buttons = $("<td>", {class: "td_buttons"})

        // create a decision button that will be non-operational (no action on click), just shows the current decision
        var $decisionbutton = $("<button>", {id: "decisionbutton", type:"button", class:"btn btn-outline-secondary btn-block undecide decisionbutt"})

        // create 3 operational buttons for choosing a new decision
        var $include_button = $("<button>", {type: "button", class:"btn btn-outline-success btn-block button-adjust include"}).click(function() {changeDecisionButton("include")})
        var $maybe_button = $("<button>", {type: "button", class:"btn btn-outline-info btn-block button-adjust maybe"}).click(function() {changeDecisionButton("maybe")})
        var $exclude_button = $("<button>", {type: "button", class:"btn btn-outline-danger btn-block button-adjust exclude"}).click( function() {changeDecisionButton("exclude")})
        
        // create a new div and add the buttons to the div
        var $optionbuttonsdiv = $("<div>", {id:"buttons", class:"collapse collapsingItem"}).append($include_button, $maybe_button, $exclude_button)

        // add the div to the column
        $td_buttons.append($decisionbutton, $optionbuttonsdiv)

        return $td_buttons
    }


    /**
      * Builds a new table row containing the title, abstract and buttons for a paper.
      * @param {Object[]} allpapers - A list of papers for screening.
      * @param {int} i - The index of the paper (in allpapers) to build a new table row for.
      * @returns {Object} The table row representing the paper in allpapers at index i.
    */
    var getNewTableRow = function(allpapers, i) {
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
        var $td_buttons = getDecisionButtonsColumn()

        // add all columns to the row
        $tr.append($td_rating, $td_title_abstract, $td_buttons) 

        // add a click function to the table row so that it will expand (and the others collapse) when clicked
        $tr.click( function() { expandAccordian($(this)) });

        // return the row
        return $tr
    }

    /**

    */
    var displayPapers = function(allpapers) {
        var max_pages_on_screen = 5;
        var num_display_papers = Math.min(max_pages_on_screen, allpapers.length)

        for (let i=0; i<num_display_papers; i++) {
            $("table tbody").append(getNewTableRow(allpapers, i));
        }
    }

    return {
        expandAccordian : expandAccordian,
        changeDecisionButton : changeDecisionButton,
        displayPapers : displayPapers
    }
})();