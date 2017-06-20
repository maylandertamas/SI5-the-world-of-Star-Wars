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



function loginModal() {

   $('#loginModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var buttonData = button.attr('id');
    if (buttonData == 'registration') {
      $('#loginModal').find('.modal-body')
        .append('<form action="/registration" method="post">\
                <div class="form-group">\
                    <label for="recipient-name" class="control-label">Username:</label>\
                    <input type="text" class="form-control" id="user-name" name="username" required>\
                </div>\
                <div class="form-group">\
                    <label for="message-text" class="control-label">Password:</label>\
                    <textarea class="form-control" id="password-text" name="password" required></textarea>\
                </div>\
                <div class="modal-footer">\
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                    <button type="submit" class="btn btn-primary">Registration</button>\
                </div>\
                </form>')
      $('#loginModal').find('.modal-header').append("<h2>Registration</h2>")

    } else if (buttonData === 'login') {
      $('#loginModal').find('.modal-body')
    .append('<form action="/login" method="post">\
                <div class="form-group">\
                    <label for="recipient-name" class="control-label" name="">Username:</label>\
                    <input type="text" class="form-control" id="user-name" name="username" required>\
                </div>\
                <div class="form-group">\
                    <label for="message-text" class="control-label">Password:</label>\
                    <textarea class="form-control" id="password-text" name="password"required></textarea>\
                </div>\
                <div class="modal-footer">\
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                    <button type="submit" class="btn btn-primary">Login</button>\
                </div>\
                </form>')
       $('#loginModal').find('.modal-header').append("<h2>Login</h2>")
    }
    
  });
}

function main() {
  $("#loginModal").on("hidden.bs.modal", function(){
    $(".modal-body").empty("");
    $(".modal-header").empty("");
  });


  $("#exampleModal").on("hidden.bs.modal", function(){
      $(".modal-body tbody").empty("");
  });

  printToModals();

  loginModal();


}


$(document).ready(main);