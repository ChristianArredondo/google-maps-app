$(document).ready(function() {
	console.log('Challenge Me!');
	var url = 'locations.json';
	$.getJSON(url, function(response) {
  	console.log(response);
	});
});