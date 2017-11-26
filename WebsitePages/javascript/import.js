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
    });
}

paper = {"rating": 3.0, 
     "title" : "Cardiovascular safety of new drugs for diabetes: Getting the balance right?", 
     "abstract" : "BACKGROUND: Skin autofluorescence is a non-invasive measurement of advanced glycation end products (AGE), which are suggested to be one of the major agents in the pathogenesis and progression of diabetes related cardiovascular complications. Recently, low vitamin D status has been linked to the progression of type 2 diabetes mellitus (T2DM) and cardiovascular disease. The aim of this study is to investigate the association between vitamin D status and skin autofluorescence in patients with T2DM. METHODS: In this preliminary report skin autofluorescence was measured non-invasively with an AGE-reader in 245 patients with T2DM treated with lifestyle advice, metformin and/or sulphonylurea-derivatives. All patients were randomly assigned to receive either vitamin D 50,000 IU/month or placebo for 6 months. RESULTS: Skin autofluorescence was significantly higher in patients with a serum 25(OH)D < 50 nmol/l compared to patients with a serum 25(OH)D > 75 nmol/l (2.81 versus 2.41; p < 0.001). Mean serum 25(OH)D was 60.3 +/- 23.4 nmol/l and was independently associated with skin autofluorescence (beta -0.006; p < 0.001). Mean vitamin D increased from 60.8 to 103.6 nmol/l in the intervention group, however no effect was seen on accumulation of skin AGEs after 6 months compared to placebo. CONCLUSIONS: Vitamin D status is independently associated with skin auto fluorescence in patients with well-controlled T2DM. No effect was seen on the amount of skin AGEs after a short period of 6 months vitamin D supplementation. Further research with longer follow-up and measurement of circulating advanced glycation end products is needed to elucidate the causality of the association.",
                "decision" : "Include"}

allpapers = [paper,paper,paper,paper]


function sendToServer(data){
    // $.post( "http://localhost:5000/upload", 
    //         input = JSON.stringify(data), 
    //         success=function( response ) {
    //           parsed_document = JSON.parse(response)
    //           // console.log(parsed_document.length + " papers parsed.")
    //           $("#global").text(response)
    //           var allpapers = display_papers(parsed_document)
    //         }); 
    display_papers(allpapers);
}


function display_papers(allpapers){
    var i;
    for (var i=0; i<Math.min(5, allpapers.length); i++) {
      var rounded_rating = Math.round(parseFloat(allpapers[i]['rating']) * 10) / 10;
      var $tr = $("<tr>", {id: "foo", "class": "unselected", "data-toggle": 'collapse', "data-target": ".collapsingItem" + i});
      // var $td_rating = $("<td>", {id: "table-rating"}).text(rounded_rating); //<td><div class="rateYo"></div></td>
      var $td_rating = $("<td>").append($("<div>", {class: "rateYo" + i}))
        $(function() {
          $(".rateYo" + i).rateYo({
          rating: rounded_rating
          });

          console.log(rating)
        });
      var $td_title_abstract = $("<td>", {id: "table-heading-abstract"})
      var $td_title = $("<h5>").text(allpapers[i]['title']);
      var $div_abstract = $("<div>", {id: "abstract" + i, "class": "collapse collapsingItem" + i}).text(allpapers[i]['abstract']);
      $td_title_abstract.append($td_title, $div_abstract)

      var $td_buttons = $("<td>", {class: "td_buttons"})
      var $decisionbutton = $("<button>", {id: "decisionbutton" + i, type:"button", class:"btn btn-outline-secondary btn-block undecide decisionbutt"})

      var $optionbuttonsdiv = $("<div>", {id:"buttons" + i, class:"collapse collapsingItem"+i})
      var $button1 = $("<button>", {type: "button", class:"btn btn-outline-success btn-block button-adjust include"})
      var $button2 = $("<button>", {type: "button", class:"btn btn-outline-info btn-block button-adjust maybe"})
      var $button3 = $("<button>", {type: "button", class:"btn btn-outline-danger btn-block button-adjust exclude"})
      $optionbuttonsdiv.append($button1, $button2, $button3)
      $td_buttons.append($decisionbutton, $optionbuttonsdiv)

      $tr.append($td_rating, $td_title_abstract, $td_buttons)
      $("table tbody").append($tr);
    }



    $(function () { 
      // Setter
      $(".rateYo").rateYo("option", "starWidth", "20px"); //returns a jQuery Element
    });



    /*----------------------------------
        Accordion Effect
    ----------------------------------*/

    $("tr").click(function(e){
        $("tbody").children().removeClass('selected');
        $(this).addClass('selected');
    });
   
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
}