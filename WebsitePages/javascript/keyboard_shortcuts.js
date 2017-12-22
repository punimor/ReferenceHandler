/**
    * @file Adds keyboard shortcuts to common operations.
    * @author Josiah Coad/Filip Gnesin
*/

'use strict';

$(document).on("keypress", function (e) {
        switch(e.which){
            case 116: // t pressed - open side menu
                toggleSideMenu()
            break;

            case 105: // i pressed - choose include for currently selected aritcle
                PaperTableBuilder.changeDecisionButton(Decision.INCLUDE)
                
                if ($(".selected").next().length != 0){
                    PaperTableBuilder.expandAccordian($(".selected").next())
                }
            break;

            case 109: // m pressed - choose maybe for currently selected aritcle
                PaperTableBuilder.changeDecisionButton(Decision.MAYBE)
                
                if ($(".selected").next().length != 0){
                    PaperTableBuilder.expandAccordian($(".selected").next())
                }
            break;

            case 101: // e pressed - choose exclude for currently selected aritcle
                PaperTableBuilder.changeDecisionButton(Decision.EXCLUDE)

                if ($(".selected").next().length != 0){
                    PaperTableBuilder.expandAccordian($(".selected").next())
                }
            break;

            case 106: // j pressed - select previous article
                if ($(".selected").prev().length != 0){
                    PaperTableBuilder.expandAccordian($(".selected").prev())
                }                    
            break;

            case 107: // k pressed - select next article
                if ($(".selected").next().length != 0){
                    PaperTableBuilder.expandAccordian($(".selected").next())
                }
            break;

            // exit this handler for other keys
            default: return; 
        }
        // prevent the default action (scroll / move caret)
        e.preventDefault(); 
});