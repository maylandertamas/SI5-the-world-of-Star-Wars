function get_api() {
    var shit = "";
    $.getJSON('http://swapi.co/api/planets/?page=3', function(response){
       console.log(response['results']) });
}


/*
$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": "data/arrays.txt"
    } );
} );
*/


/*
$.getJSON('https://api.github.com/repos/atom/atom', function(response){
    console.log(response['stargazers_count'])
});

$.ajax({
    dataType: "json",
    url: 'https://api.github.com/repos/atom/atom',
    success: function(response) {
        console.log(response['stargazers_count'])
    }
});

var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/atom/atom', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) { // successful response
    var data = JSON.parse(request.responseText);
    console.log(data['stargazers_count'])
  }
};

request.send();
*/