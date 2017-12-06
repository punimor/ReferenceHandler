$(document).on("keypress", function (e) {
        switch(e.which){
            case 116: // t pressed - open side menu
                $("#wrapper").toggleClass("toggled");
            break;

            case 105: // i pressed - choose include for currently selected aritcle
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-success btn-block include decisionbutt");
                
                if ($(".selected").next().length != 0){
                    accordian($(".selected").next())
                }
            break;

            case 109: // m pressed - choose maybe for currently selected aritcle
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-info btn-block maybe decisionbutt");
                
                if ($(".selected").next().length != 0){
                    accordian($(".selected").next())
                }
            break;

            case 101: // e pressed - choose exclude for currently selected aritcle
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-danger btn-block exclude decisionbutt");

                if ($(".selected").next().length != 0){
                    accordian($(".selected").next())
                }
            break;

            case 106: // j pressed - select previous article
                if ($(".selected").prev().length != 0){
                    accordian($(".selected").prev())
                }                    
            break;

            case 107: // k pressed - select next article
                if ($(".selected").next().length != 0){
                    accordian($(".selected").next())
                }
            break;

            // exit this handler for other keys
            default: return; 
        }
        // prevent the default action (scroll / move caret)
        e.preventDefault(); 
});