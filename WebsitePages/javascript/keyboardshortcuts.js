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
                importFile();
            break;

    }
});

