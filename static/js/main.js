
function printToModals() {
    $('.residents-button').click(function() {
    var planetResidents = [];
    var planetResidents = $(this).data('value');
    $('#exampleModal').on('show.bs.modal', function (event) {
    for (let i = 0; i < planetResidents.length; i++) {
      var jsonFile = planetResidents[i];
      $.ajax({
          async: true,
          dataType: "json",
          url: jsonFile,
          cache: false,
          success: function(response) {
          $('#exampleModal').find('.modal-body tbody')
          .append('<tr>')
          .append('<td>' + response['name'] + '</td>')
          .append('<td>' + response['height'] + '</td>')
          .append('<td>' + response['mass']+ '</td>')
          .append('<td>' + response['skin_color'] + '</td>')
          .append('<td>' + response['hair_color'] + '</td>')
          .append('<td>' + response['eye_color'] + '</td>')
          .append('<td>' + response['birth_year'] + '</td>')
          .append('<td>' + response['gender'] + '</td>')
          .append('</tr>');
          planetResidents.splice (jsonFile, 1);
        }
      });
    
    }
  });
  });
}

function loginModal() {
   $('#login').click(function() {
    $('#loginModal').on('show.bs.modal', function (event) {
       // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)
    });
  });
}

function main() {

  $("#exampleModal").on("hidden.bs.modal", function(){
      $(".modal-body tbody").empty("");
  });

  printToModals();



}


$(document).ready(main);