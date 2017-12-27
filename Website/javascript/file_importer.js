/**
    * @file Handles all functionality to do with uploading the file, sending it to the server and sending the server results to get rendered.
    * @author Josiah Coad/Filip Gnesin
*/

'use strict';

/** 
    * Handles all functionality to do with uploading the file, sending it to the server and sending the server results to get rendered.
    * @namespace 
*/
var FileImporter = (function() {
    var importFile = function (fileInput) {
        const ALLOWED_FILETYPE = /text.*/;
        var file = fileInput.files[0];
        if (file.type.match(ALLOWED_FILETYPE)) {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(e) {
                var document_text = reader.result;
                // Comment this line and uncomment the next to use dummy data (no interaction with server)
                // _analyzePaperOnServer(document_text);
                _createDummyPapers();
            }
        } else {
          alert("File not supported!");
        }
    }

    var _createDummyPapers = function () {
        const paper = {"rating": 3.0, 
             "title" : "Cardiovascular safety of new drugs for diabetes: Getting the balance right?", 
             "abstract" : "BACKGROUND:Autofluorescence is a non-invasive measurement of advanced glycation end products (AGE), which are suggested to be one of the major agents in the pathogenesis and progression of diabetes related cardiovascular complications. Recently, low vitamin D status has been linked to the progression of type 2 diabetes mellitus (T2DM) and cardiovascular disease. The aim of this study is to investigate the association between vitamin D status and skin autofluorescence in patients with T2DM. METHODS: In this preliminary report skin autofluorescence was measured non-invasively with an AGE-reader in 245 patients with T2DM treated with lifestyle advice, metformin and/or sulphonylurea-derivatives. All patients were randomly assigned to receive either vitamin D 50,000 IU/month or placebo for 6 months. RESULTS: Skin autofluorescence was significantly higher in patients with a serum 25(OH)D < 50 nmol/l compared to patients with a serum 25(OH)D > 75 nmol/l (2.81 versus 2.41; p < 0.001). Mean serum 25(OH)D was 60.3 +/- 23.4 nmol/l and was independently associated with skin autofluorescence (beta -0.006; p < 0.001). Mean vitamin D increased from 60.8 to 103.6 nmol/l in the intervention group, however no effect was seen on accumulation of skin AGEs after 6 months compared to placebo. CONCLUSIONS: Vitamin D status is independently associated with skin auto fluorescence in patients with well-controlled T2DM. No effect was seen on the amount of skin AGEs after a short period of 6 months vitamin D supplementation. Further research with longer follow-up and measurement of circulating advanced glycation end products is needed to elucidate the causality of the association.",
                        "decision" : "Include"}

        const all_papers = [paper,paper,paper,paper];
        PaperTableBuilder.displayPapers(all_papers);    
    }

    var _analyzePaperOnServer = function (document_text) {
        const SERVER_ENDPOINT = "http://localhost:5000/upload";
        $.post( SERVER_ENDPOINT, 
                JSON.stringify(document_text), 
                function( response ) {
                    var all_papers = JSON.parse(response);
                    PaperTableBuilder.displayPapers(all_papers);
                }); 
    }

    return {
      importFile : importFile 
    }

})();