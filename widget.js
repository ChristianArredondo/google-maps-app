$(document).ready(function() {
	console.log('Never give up!');
	var url = 'locations.json';
	$.getJSON(url, function(response) {
  	console.log(response);
	});
});