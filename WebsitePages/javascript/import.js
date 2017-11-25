paper = {"rating": 3.0, 
         "title" : "Cardiovascular safety of new drugs for diabetes: Getting the balance right?", 
         "abstract" : "BACKGROUND: ", 
         "decision" : "Include"}

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

function sendToServer(data){
    $.post( "http://localhost:5000/upload", 
            input = JSON.stringify(data), 
            success=function( response ) {
              // console.log(typeof(response));
              parsed_document = JSON.parse(response)
              // console.log(parsed_document.length + " papers parsed.")
              console.log(window.glob)
            });
}

