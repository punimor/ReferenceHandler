function accordian(thisObj){
    $("tbody").children().removeClass('selected');
    $("tbody").children().addClass('unselected');
    $("tbody").find(".collapse").collapse('hide');
    thisObj.removeClass('unselected');
    thisObj.addClass('selected');
    thisObj.find(".collapse").collapse('show');
}

function change_decision(e, new_class){
    CLASSES_COMMON = "btn btn-block decisionbutt"
    CLASSES_FOR_INCLUDE = "btn-success include"
    CLASSES_FOR_EXCLUDE = "btn-danger exclude"
    CLASSES_FOR_MAYBE = "btn btn-info maybe"
    // switch($(this).class()){
    //         case "include": // t pressed
    //           $(this).parent().parent().find(".decisionbutt").removeClass().addClass(CLASSES_COMMON + " " + CLASSES_FOR_MAYBE);
}

// Add a upload file button
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

      // I think this is for collapsing the side menu
      $("#wrapper").toggleClass("toggled");
      $("table").removeClass('d-none');
      $("#hometitle").removeClass('d-none');
      $(".jumbotron").addClass('d-none');
      $(".togglemenu1").removeClass('d-none');
    });
}


// Uncomment to use dummy data instead of hitting the backend for files
/*
paper = {"rating": 3.0, 
     "title" : "Cardiovascular safety of new drugs for diabetes: Getting the balance right?", 
     "abstract" : "BACKGROUND:Autofluorescence is a non-invasive measurement of advanced glycation end products (AGE), which are suggested to be one of the major agents in the pathogenesis and progression of diabetes related cardiovascular complications. Recently, low vitamin D status has been linked to the progression of type 2 diabetes mellitus (T2DM) and cardiovascular disease. The aim of this study is to investigate the association between vitamin D status and skin autofluorescence in patients with T2DM. METHODS: In this preliminary report skin autofluorescence was measured non-invasively with an AGE-reader in 245 patients with T2DM treated with lifestyle advice, metformin and/or sulphonylurea-derivatives. All patients were randomly assigned to receive either vitamin D 50,000 IU/month or placebo for 6 months. RESULTS: Skin autofluorescence was significantly higher in patients with a serum 25(OH)D < 50 nmol/l compared to patients with a serum 25(OH)D > 75 nmol/l (2.81 versus 2.41; p < 0.001). Mean serum 25(OH)D was 60.3 +/- 23.4 nmol/l and was independently associated with skin autofluorescence (beta -0.006; p < 0.001). Mean vitamin D increased from 60.8 to 103.6 nmol/l in the intervention group, however no effect was seen on accumulation of skin AGEs after 6 months compared to placebo. CONCLUSIONS: Vitamin D status is independently associated with skin auto fluorescence in patients with well-controlled T2DM. No effect was seen on the amount of skin AGEs after a short period of 6 months vitamin D supplementation. Further research with longer follow-up and measurement of circulating advanced glycation end products is needed to elucidate the causality of the association.",
                "decision" : "Include"}

allpapers = [paper,paper,paper,paper]
*/

function sendToServer(data){
    var server_endpoint = "http://localhost:5000/upload"
    var allpapers;
    $.post(server_endpoint, 
            input = JSON.stringify(data), 
            success=function( response ) {
              parsed_document = JSON.parse(response)
              display_papers(parsed_document)
            }); 
}

/*
DESCRIPTION
  - build a column of 4 buttons, the one on top (non-operational) displays the current decision. The 3 buttons below it give the options for a new decision. 
PARAMETERS
RETURNS
  - (jquery object) a column populated with the four buttons
TODO
  - the current decision button should be taken from a property of the paper object (ie allpapers[i]['decision'])
  - the 
*/
function get_decision_buttons_column(){
    // create a new column for the buttons 
    var $td_buttons = $("<td>", {class: "td_buttons"})

    // create a decision button that will be non-operational (no action on click), just shows the current decision
    var $decisionbutton = $("<button>", {id: "decisionbutton", type:"button", class:"btn btn-outline-secondary btn-block undecide decisionbutt"})

    // create 3 operational buttons for choosing a new decision
    var $optionbuttonsdiv = $("<div>", {id:"buttons", class:"collapse collapsingItem"})
    var $include_button = $("<button>", {type: "button", class:"btn btn-outline-success btn-block button-adjust include"})
    var $maybe_button = $("<button>", {type: "button", class:"btn btn-outline-info btn-block button-adjust maybe"})
    var $exclude_button = $("<button>", {type: "button", class:"btn btn-outline-danger btn-block button-adjust exclude"})
    $optionbuttonsdiv.append($include_button, $maybe_button, $exclude_button)
    $td_buttons.append($decisionbutton, $optionbuttonsdiv)

    return $td_buttons
}


/*
DESCRIPTION
  - build a new table row containing the title, abstract and buttons for a paper in allpapers indexed by i
PARAMETERS
  - allpapers (list of paper objects): a list of papers for screening
  - i (int): the index of the paper (in allpapers) to build a new table row for
RETURNS
  - (jquery object) the table row representing allpapers[i]
TODO
  - figure out why "data-target": ".collapsingItem" + i is neccessary
*/
function get_new_tr(allpapers, i){
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
    var $td_buttons = get_decision_buttons_column()

    // add all columns to the row
    $tr.append($td_rating, $td_title_abstract, $td_buttons) 

    // return the row
    return $tr
}


function display_papers(allpapers) {

    for (var i=0; i<Math.min(5, allpapers.length); i++) {
        $("table tbody").append(get_new_tr(allpapers, i));
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
    });

    $(".maybe").click(function(e){
        $(this).parent().parent().find(".decisionbutt").removeClass().addClass("btn btn-info btn-block maybe decisionbutt");
    });

    $(".exclude").click(function(e){
        $(this).parent().parent().find(".decisionbutt").removeClass().addClass("btn btn-danger btn-block exclude decisionbutt");
    }); 
};