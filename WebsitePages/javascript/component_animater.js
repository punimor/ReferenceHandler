/**
    * @file Adds onclick functionality to DOM elements (i.e. toggle side-menu).
    * @author Josiah Coad/Filip Gnesin
*/

function toggleSideMenu() {
  $("#wrapper").toggleClass("toggled");
}

// add an onclick to the #menu-toggle button
$("#menu-toggle").click(function(e) {
  toggleSideMenu();
});

// add an onclick to the #fileLoad button
var fileInput = document.getElementById('file-load');
fileInput.addEventListener('change', function(e) {
    FileImporter.importFile(fileInput);
});