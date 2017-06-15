var map;
var markers = [];
var cPicks;

function initMap() {
  // Get JSON data
  $.getJSON('locations.json', function(response) {
      console.log(response);
      cPicks=response;
  });
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.751560, lng: -95.363282},
    zoom: 11
  });
  // // Locations, in this case some Houston restaurants
  // var locations = [
  //   {title:'Hugos', location: {lat: 29.743061, lng: -95.399653}},
  //   {title:'Ruggles Green', location: {lat: 29.780465, lng: -95.542325}},
  //   {title:'Pluckers', location: {lat: 29.773843, lng: -95.402731}},
  //   {title:'Hobbit Cafe', location: {lat: 29.733456, lng: -95.413941}}
  // ];

  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // Use location array to create an array of markers
  for (var i =0; i < cPicks.length; i++) {
    // Get position from location array
    var position = cPicks[i].location;
    var title = locations[i].name;
    // Create a marker for each location
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push each marker to arroy of markers
    markers.push(marker);
    // Create onClick event to open infowindow at each marker
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfoWindow);
    });
    bounds.extend(markers[i].position);
  };
  
  function populateInfoWindow(marker, infowindow) {
    // Check to see if window is already open
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map,marker);
      // Clear marker on close
      infowindow.addListener('closeclick', function() {
        infowindow.setMarker = null;
      });
    }
  }
};