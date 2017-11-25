
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