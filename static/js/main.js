function writeToModal(name, height, mass, skinColor, hairColor, eyeColor, birthYear, gender) {
  $('#exampleModal').find('.modal-body tbody')
    .append('<tr>')
    .append('<td>' + name + '</td>')
    .append('<td>' + height + '</td>')
    .append('<td>' + mass + '</td>')
    .append('<td>' + skinColor + '</td>')
    .append('<td>' + hairColor + '</td>')
    .append('<td>' + eyeColor + '</td>')
    .append('<td>' + birthYear + '</td>')
    .append('<td>' + gender + '</td>')
    .append('</tr>');
}

function printToModals() {
  var savedApiData = []
  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var planetResidents = button.data('value');
    var buttonId = button.data('buttonid');
    var name;
    var height;
    var mass;
    var skinColor;
    var hairColor;
    var eyeColor;
    var birthYear;
    var gender;
   
    if($(button).data('clicked')) {
      savedApiData.forEach(function(arrayItem) {
        var objButtonId = arrayItem.buttonId;
        if (objButtonId === buttonId) {
          name = arrayItem.name;
          height = arrayItem.height;
          mass = arrayItem.mass;
          skinColor = arrayItem.skinColor;
          hairColor = arrayItem.hairColor;
          eyeColor = arrayItem.eyeColor;
          birthYear = arrayItem.birthYear;
          gender = arrayItem.gender;
          writeToModal(name, height, mass, skinColor, hairColor, eyeColor, birthYear, gender);
        }
        });
        
    } else {
      $(button).click(function() {
        $(button).data('clicked', true);
      });
      for (let i = 0; i < planetResidents.length; i++) {
        var jsonFile = planetResidents[i];
        $.getJSON(jsonFile, function(response){
          name = response['name'];
          height = response['height'];
          mass = response['mass'];
          skinColor = response['skin_color'];
          hairColor = response['hair_color'];
          eyeColor = response['eye_color'];
          birthYear = response['birth_year'];
          gender = response['gender'];
          planetResidents.splice (jsonFile, 1);
          writeToModal(name, height, mass, skinColor, hairColor, eyeColor, birthYear, gender)
          var resDataObj = {
            'buttonId': buttonId,
            'name': name,
            'height': height,
            'mass': mass,
            'skinColor': skinColor,
            'hairColor': hairColor,
            'eyeColor': eyeColor,
            'birthYear': birthYear,
            'gender': gender
          }
          savedApiData.push(resDataObj);
        });
      }
    }
  });
}


/*
function loginModal() {
   $('#loginModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    });
} */
/*
function regModal() {
   $('#loginModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    });
} */

function main() {

  $("#exampleModal").on("hidden.bs.modal", function(){
      $(".modal-body tbody").empty("");
  });

  printToModals();



}


$(document).ready(main);