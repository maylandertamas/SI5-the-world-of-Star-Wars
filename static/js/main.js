
function printToModals(planetResidents) {
  $('#exampleModal').on('show.bs.modal', function (event) {
    var newResidentObj = new Object();
    for (let i = 0; i < planetResidents.length; i++) {
      $.getJSON(planetResidents[i], function(response){
        newResidentObj['name'] = response['name'];
        newResidentObj['height'] = response['height'];
        newResidentObj['mass'] = response['mass'];
        newResidentObj['skin_color'] = response['skin_color'];
        newResidentObj['hair_color'] = response['hair_color'];
        newResidentObj['eye_color'] = response['eye_color'];
        newResidentObj['birth_year'] = response['birth_year'];
        newResidentObj['gender'] = response['gender'];
        
      });
    }
    console.log(newResidentObj);
    
    $(this).find('.modal-body tbody')
          .append('<tr>')
          .append('<td>' + newResidentObj[name] + '<td>');
});
}

function main() {
  /*
$("#exampleModal").on("hidden.bs.modal", function(){
    $(".modal-body").html("");
}); */

$('.residents-button').click(function() {
  var planetResidents = $(this).data('value');
  printToModals(planetResidents);
});


}


$(document).ready(main);