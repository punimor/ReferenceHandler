$(document).on("keypress", function (e) {
    console.log(e.which);
        switch(e.which){
            case 116: // t pressed
                $("#wrapper").toggleClass("toggled");
            break;

            case 105: // i pressed
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-success btn-block include decisionbutt");
                $("tbody").children().removeClass('selected');
                $("tbody").find(".collapse").collapse('hide');
                
                $("tbody .selected").attr("data-target")
                // $("tbody .selected").find("decisionbutt").parent().next('tr').addClass('selected');
            break;

            case 109: // m pressed
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-info btn-block maybe decisionbutt");
            break;

            case 101: // e pressed
                $("tbody .selected").find(".decisionbutt").removeClass().addClass("btn btn-danger btn-block exclude decisionbutt");
            break;

            case 106: // j pressed
                if ($(".selected").prev().length != 0){
                    accordian($(".selected").prev())
                }                    
            break;

            case 107: // j pressed
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
});

