$(document).ready(function() {
	console.log('Ready!');
	var url = 'locations.json';
	$.getJSON(url, function(response) {
  		console.log(response);
	});
});