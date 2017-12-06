$(document).on("keypress", function (e) {
    console.log(e.which);
        switch(e.which){
            case 116: // t pressed
                $("#wrapper").toggleClass("toggled");
            break;

            case 105: // i pressed
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-success btn-block include decisionbutt");
                
                if ($(".selected").next().length != 0){
                    accordian($(".selected").next())
                }
            break;

            case 109: // m pressed
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-info btn-block maybe decisionbutt");
                
                if ($(".selected").next().length != 0){
                    accordian($(".selected").next())
                }
            break;

            case 101: // e pressed
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-danger btn-block exclude decisionbutt");

                if ($(".selected").next().length != 0){
                    accordian($(".selected").next())
                }
            break;

            case 106: // j pressed
                if ($(".selected").prev().length != 0){
                    accordian($(".selected").prev())
                }                    
            break;

            case 107: // k pressed
                if ($(".selected").next().length != 0){
                    accordian($(".selected").next())
                }
            break;

            case 32: // j pressed
                // $(".selected").collapse('show');
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
        
    if ($(".selected").index() > 2) { 
        current_last = parseInt($("#global").attr("data-cur_i"));
        $("table tbody").append(get_new_tr(allpapers, current_last + 1));
        $("#global").attr("data-cur_i", current_last + 1);
    }
});