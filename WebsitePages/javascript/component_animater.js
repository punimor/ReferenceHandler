function toggleSideMenu() {
  $("#wrapper").toggleClass("toggled");
}

// 'window.onload' will only run this code once the entire page is loaded
window.onload = function() {
    // add an onclick to the #menu-toggle button
    $("#menu-toggle").click(function(e) {
      toggleSideMenu();
    });

    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) { 
        var allpapers = importFile(fileInput);
        displayPapers(allpapers);
    });
}