var map;
var markers = [];
var cPicks;
var length;

function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.759248, lng: -95.454905},
    zoom: 12
  });

  // Use AJAX to pull location JSON
  $.getJSON('locations.json', function(response) {
      cPicks=response;
      console.log(cPicks);
      length = Object.keys(cPicks).length;
      console.log('length = ' + length);
      
      // Create info window and bounds
      var largeInfoWindow = new google.maps.InfoWindow();
      var bounds = new google.maps.LatLngBounds();

      // Use location array to create markers and popular sidebar
      for (var i =0; i < length; i++) {
        var position = cPicks[i].location;
        var title = cPicks[i].name;
        // Create a marker for each location
        var marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
        });
        var newSize = $('.filter').height();
        var mapHeight =  $('#sidebar').height() - 3*newSize;
        $('#map').height(mapHeight);
        // Push each marker to arroy of markers
        markers.push(marker);
        // Create onClick event to open infowindow at each marker
        marker.addListener('click', function() {
          // Push location data to sidebar
          for (var i in cPicks) {
            if (this.title === cPicks[i].name) {
              titleHTML = '<h2>' + cPicks[i].name + '</h2>';
              addressHTML = '<p><strong>Address: </strong>' + cPicks[i].address.street + ' ' + cPicks[i].address.city + ', ' + cPicks[i].address.state + ' ' + cPicks[i].address.zipcode + '</p>';
              phoneHTML = '<p><strong>Phone: </strong>' + cPicks[i].phone + '</p>';
              foodScoreHTML = '<p><strong>Food Score: </strong>' + ' ' + cPicks[i].score.foodScore + '</p>';
              drinkScoreHTML = '<p><strong>Drink Score: </strong>' + ' ' + cPicks[i].score.drinkScore + '</p>';
              ambienceScoreHTML = '<p><strong>Ambience Score: </strong>' + ' ' + cPicks[i].score.ambienceScore + '</p>';
              thoughtHTML = '<p><strong>My thoughts: </strong>' + ' ' + cPicks[i].comment + '</p>';
              historyHTML = '<p><strong>History: </strong>' + ' ' + cPicks[i].history + '</p>';
              if (titleHTML === '') {
                // Fade in if first-time click
                $('#title').html(titleHTML).fadeIn(100);
                $('#address').html(addressHTML).fadeIn(100);
                $('#phone').html(phoneHTML).fadeIn(100);
                $('#food-score').html(foodScoreHTML).fadeIn(100);
                $('#thought').html(drinkScoreHTML).fadeIn(100);
                $('#ambience-score').html(ambienceScoreHTML).fadeIn(100);
                $('#thought').html(thoughtHTML).fadeIn(100);
                $('#history').html(historyHTML).fadeIn(100);
              }
              // Otherwise fade out AND THEN fade in
              else {
                $('#title').fadeOut("fast", function() {
                  $('#title').html(titleHTML).fadeIn(500);
                });
                $('#address').fadeOut("fast", function() {
                  $('#address').html(addressHTML).fadeIn(500);
                });
                $('#phone').fadeOut("fast", function() {
                  $('#phone').html(phoneHTML).fadeIn(500);
                });
                $('#food-score').fadeOut("fast", function() {
                  $('#food-score').html(foodScoreHTML).fadeIn(500);
                });
                $('#drink-score').fadeOut("fast", function() {
                  $('#drink-score').html(drinkScoreHTML).fadeIn(500);
                });
                $('#ambience-score').fadeOut("fast", function() {
                  $('#ambience-score').html(ambienceScoreHTML).fadeIn(500);
                });
                $('#thought').fadeOut("fast", function() {
                  $('#thought').html(thoughtHTML).fadeIn(500);
                });
                $('#history').fadeOut("fast", function() {
                  $('#history').html(historyHTML).fadeIn(500);
                });
              }
            };
          }
        });
        bounds.extend(markers[i].position);
      };
    }); // End getJson
    
    // Function to reset markers for use on click
    function resetMarkers(markers) {
      for (var i in markers) {
        markers[i].setMap(map);
        // markers[i].setAnimation(google.maps.Animation.DROP);
      };
    };

    // Filter by Food
    $('#food').click(function() {
      console.log('Clicked food filter!');
      resetMarkers(markers);
      for (var i = 0; i < length; i++) {
        if (cPicks[i].type !== "food" && cPicks[i].type !== "food-bar") {
          markers[i].setMap(null);
        }
      }
    });
    // Filter by Drinks
    $('#drinks').click(function() {
      console.log('Clicked drinks filter!');
      resetMarkers(markers);
      for (var i = 0; i < length; i++) {
        if (cPicks[i].type !== "bar" && cPicks[i].type !== "food-bar") {
          markers[i].setMap(null);
        }
      }
    });
    // Filter by Coffee
    $('#coffee').click(function() {
      console.log('Clicked coffee filter!');
      resetMarkers(markers);
      for (var i = 0; i < length; i++) {
        if (cPicks[i].type !== "coffee") {
          markers[i].setMap(null);
        }
      }
    });
    // Show All
    $('#all').click(function() {
      console.log('Show all!');
      resetMarkers(markers);
    });

    // Center map on resize
    google.maps.event.addDomListener(window, "resize", function() {
      // Ghetto map fitter (need to find a more proper way to achieve this)
      var newSize = $('.filter').height();
      var mapHeight =  $('#sidebar').height() - 3*newSize;
      $('#map').height(mapHeight);
      // Responsive map center
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
      });
    // google.maps.event.addListener(map, 'bounds_changed', function() {
    //   var bounds = map.getBounds();
    // });
}; // End initMap
    