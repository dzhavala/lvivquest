var Map = function(){
	var map,
		arrLocations,
		infobox;
		
	function setArrLocations (array) {
		arrLocations = array;
		convertLocationsToDecimals(arrLocations);
	}

	/* Convert location to decimal format */
	function convertLocationsToDecimals (arrLocations) {
		for (var i = 0; i < arrLocations.length; i++) {
			var locationObj = arrLocations[i];
			var parts = locationObj.coords.split(',');
			locationObj.latLng = new google.maps.LatLng(parts[0], parts[1]);
		}
	}


	function placeMarkers () {
		/* Marker icon */
		var image = new google.maps.MarkerImage(
			'img/icon-light.png',
			new google.maps.Size(24, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(12, 34)
		);
      
        var hQimage = new google.maps.MarkerImage(
			'img/icon-dark.png',
			new google.maps.Size(24, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(12, 34)
		);

		/* Generate markers for each location */
		var locationObj;
		for (var i = 0; i < arrLocations.length; i++) {
			locationObj = arrLocations[i];
			locationObj.marker = new google.maps.Marker({
				position: locationObj.latLng,
				map: map,
				icon: locationObj.isMarked ? hQimage : image,
				title: locationObj.name,
				zIndex: 2
			});

			// Regenerate infobox popup then each marker is clicked
			google.maps.event.addListener(locationObj.marker, 'click', (function(locationObj) {
				return function() {
					activateMarker(locationObj);
				}
			})(locationObj));
		}
	}

	// Update infobox content, open it and center map on proper location
	function activateMarker(locationObj) {
		// var content = "<h3>"+locationObj.name+"</h3>" 
		// 			  +"<div class='place'>" + locationObj.place + "</div>"
		// 			  +"<div class='contacts'>" + locationObj.contacts + "</div>"
		// infobox.setContent(content);
		// infobox.open(map, locationObj.marker);
		map.panTo(locationObj.latLng);
		google.maps.event.trigger(map,"markerActivated", locationObj);
	}


	function initialize () {
		// Set map options
		var mapOptions = {
			zoom:19,
			center: new google.maps.LatLng(49.841954,24.031592), // Ратуша
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			panControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			zoomControl: true,
			scrollwheel: false,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE
			}
		};

		// Set infoBox options
		// infobox = new InfoBox({
		// 	pixelOffset: new google.maps.Size(-65, -10),
		// 	boxStyle: { width: "360px"},
		// 	closeBoxMargin: "0",
		// 	closeBoxURL: "/img/map-close-button.png",
		// 	alignBottom:true
		// });

		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		placeMarkers();

		return map;
	}

	return {
		initialize:initialize,
		setArrLocations:setArrLocations,
		activateMarker:activateMarker
	};
}();