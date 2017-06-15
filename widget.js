$(document).ready(function() {
	console.log('Onward!');
	var url = 'locations.json';
	$.getJSON(url, function(response) {
  		console.log(response);
		}
	.error(function(textStatus, error){
		console.log(error);
		console.log(textStatus);
		})
	);
});