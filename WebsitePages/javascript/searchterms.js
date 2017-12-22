// Add Search Term
$("#add-search-term").click(function(e){
    var markup = "<tr class='item' id='new-term-template'><td><div class='form-group'><input type='text' class='form-control' id='formGroupSearchTerm1' placeholder='Add search term'></div></td><!-- rating1 --><td><div id='slidecontainer'><input type='range' min='-5' max='5' value='0' class='slider' id='myRange'></div></td></tr>"
    $("table tbody").append(markup);
});

$("#delete-search-term").click(function(e){
    $("table tbody tr:last-child").fadeOut(function(){
        $("table tbody tr:last-child").remove();
    });

});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// preferredWords
$("#submit-search").click(function(e) {
    var preferredWords = []
    $("#SearchTermTable tr.item").each(function() {
          keywords = $(this).find(".form-control").val()
          rating = $(this).find(".slider").val()
          /// ...
          console.log(keywords);
          console.log(rating);
          preferredWords.push([rating+","+keywords])
    });
    // submitWordsToServer(preferredWords.join("\n"))
});

// collapse abstracts
$('.collapse').on('show.bs.collapse', function () {
$('.collapse.in').collapse('hide');
});

// Slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}