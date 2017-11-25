
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

    $("#display-form").click(function(e) {
    input = $("#formGroupSearchTerm1").val() 
    console.log(input)
});

// collapse abstracts
$('.collapse').on('show.bs.collapse', function () {
$('.collapse.in').collapse('hide');
});

// Slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}