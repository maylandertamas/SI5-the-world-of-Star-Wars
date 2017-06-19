
function printToModals(planetResidents) {
  
}

function main() {

  $("#exampleModal").on("hidden.bs.modal", function(){
      $(".modal-body tbody").empty("");
  });

  $('.residents-button').click(function() {
    var planetResidents = [];
    var buttonId = $(this).id;
    var planetResidents = $(this).data('value');
    $('#exampleModal').on('show.bs.modal', function (event) {
    for (let i = 0; i < planetResidents.length; i++) {
      console.log(planetResidents[i]);
      var jsonFile = planetResidents[i];
      $.ajax({
          async: true,
          dataType: "json",
          url: jsonFile,
          cache: false,
          success: function(response) {
              response['name']
              response['height']
              response['mass'] 
              response['skin_color]
              response['hair_col
              response['eye_colo
              response['birth_ye
              response['gender']
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
          localStorage.setItem('shit', jsonFile);
          localStorage.getItem('shit');
        }
      });
    
    }
  });
  });


}


$(document).ready(main);