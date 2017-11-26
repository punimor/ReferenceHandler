// $(document).ready(function() {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    var allpapers = JSON.parse($("#global").text())

    var i;
    for (i in allpapers) {
        var markup = "<tr class='unselected' data-toggle='collapse' data-target='#abstract" + String(i) + "'><td id ='table-rating'>" + allpapers[i]['rating'] + "</td><td><h5>" + allpapers[i]['title'] + "</h5><div id='abstract" + String(i) + "' class='collapse'>" + allpapers[i]['abstract'] + "</div></td><td>" + allpapers[i]['decision'] + "</td></tr>"
        $("table tbody").append(markup);
    }
    $("tr").click(function(e){
        $("tbody").children().removeClass('selected');
        $(this).addClass('selected');
    });
// });

