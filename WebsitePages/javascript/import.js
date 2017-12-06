function accordian(thisObj){
    $("tbody").children().removeClass('selected');
    $("tbody").children().addClass('unselected');
    $("tbody").find(".collapse").collapse('hide');
    thisObj.removeClass('unselected');
    thisObj.addClass('selected');
    // thisObj.find(".collapse").collapse('show');
    console.log("acc ran");
}

window.onload = function() {
  var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
      var textType = /text.*/;

      if (file.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
          documentFile = reader.result;
          sendToServer(documentFile);
        }

        reader.readAsText(file);  
      } else {
        alert("File not supported!")
      }

      $("#wrapper").toggleClass("toggled");
      $("table").removeClass('d-none');
      $("#hometitle").removeClass('d-none');
      $(".jumbotron").addClass('d-none');
      $(".togglemenu1").removeClass('d-none');
    });
}


function sendToServer(data){
    var allpapers;
    $.post( "http://localhost:5000/upload", 
            input = JSON.stringify(data), 
            success=function( response ) {
              parsed_document = JSON.parse(response)
              console.log(parsed_document)
              display_papers(parsed_document)
            }); 
      // display_papers(dummypapers);
}

function get_new_tr(allpapers, i){
      var rounded_rating = Math.round(parseFloat(allpapers[i]['rating']) * 10) / 10;

      var $tr = $("<tr>", {id: "foo", "class": "unselected", "data-toggle": 'collapse', "data-index": i, "data-target": ".collapsingItem" + i});
      // var $td_rating = $("<td>", {id: "table-rating"}).text(rounded_rating); //<td><div class="rateYo"></div></td>
      var $stars = $("<div>", {id: "rateYo" + i}).rateYo({ rating: rounded_rating }).rateYo("option", "starWidth", "20px");
      var $td_rating = $("<td>").append($stars);

      var $td_title_abstract = $("<td>", {id: "table-heading-abstract"})
      var td_title = "<h5>"+allpapers[i]['title'] + "</h5>";
      var div_abstract = "<div id='abstract" + i + "' class='collapse collapsingItem" + i + "'>" + allpapers[i]['abstract'] + "</div>"
      $td_title_abstract.append(td_title, div_abstract)

      var $td_buttons = $("<td>", {class: "td_buttons"})
      var $decisionbutton = $("<button>", {id: "decisionbutton" + i, type:"button", class:"btn btn-outline-secondary btn-block undecide decisionbutt"})

      var $optionbuttonsdiv = $("<div>", {id:"buttons" + i, class:"collapse collapsingItem"+i})
      var $button1 = $("<button>", {type: "button", class:"btn btn-outline-success btn-block button-adjust include"})
      var $button2 = $("<button>", {type: "button", class:"btn btn-outline-info btn-block button-adjust maybe"})
      var $button3 = $("<button>", {type: "button", class:"btn btn-outline-danger btn-block button-adjust exclude"})
      $optionbuttonsdiv.append($button1, $button2, $button3)
      $td_buttons.append($decisionbutton, $optionbuttonsdiv)

      $tr.append($td_rating, $td_title_abstract, $td_buttons) 

      return $tr
}


function display_papers(allpapers){
    var cur_i;
    for (cur_i=0; cur_i<Math.min(5, allpapers.length); cur_i++) {
      $("table tbody").append(get_new_tr(allpapers, cur_i));
    }
    $("#global").attr("data-cur_i", cur_i)
    } 

    /*----------------------------------
        Accordion Effect
    ----------------------------------*/    

    $("tr").click( function() { accordian($(this)) });

   
    /*----------------------------------
        Button Functionality
    ----------------------------------*/

    $(".include").click(function(e){
        $(this).parent().parent().find(".decisionbutt").removeClass().addClass("btn btn-success btn-block include decisionbutt");
        // $("#decisionbutton1").removeClass().addClass("btn btn-success include");
    });

    $(".maybe").click(function(e){
        $(this).parent().parent().find(".decisionbutt").removeClass().addClass("btn btn-info btn-block maybe decisionbutt");
        // $("#decisionbutton1").removeClass().addClass("btn btn-info maybe");
    });

    $(".exclude").click(function(e){
        $(this).parent().parent().find(".decisionbutt").removeClass().addClass("btn btn-danger btn-block exclude decisionbutt");
        // $("#decisionbutton1").removeClass().addClass("btn btn-danger exclude");
    }); 