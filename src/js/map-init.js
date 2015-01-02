(function () {
    var //$locationInfo = $('.location-info'),
    $map_canvas = $('#map_canvas'),
    map,
    locationsArr = [
      {
        name: 'Фонтан з Нептуном',
        coords: '49.841401,24.031141',
        place: 'Площа Ринок',
        isMarked: true
      },
      {
        name: 'Фонтан з Діаною',
        coords: '49.841667,24.032437',
        place: 'Площа Ринок',
        isMarked: false
      },
      {
        name: 'Фонтан з Адонісом',
        coords: '49.842331,24.032093',
        place: 'Площа Ринок',
        isMarked: false
      },
      {
        name: 'Фонтан з Амфітридою',
        coords: '49.842068,24.030803',
        place: 'Площа Ринок',
        isMarked: false
      }

    ];
    //winLoad = false,
   

  // Init map then dom is loaded and map canvas is visible (it is hidden on mobile devices)
  google.maps.event.addDomListener(window, 'load', function(){
   // winLoad = true;
    //if (mapIsVisible()) {
      Map.setArrLocations(locationsArr);
      map = Map.initialize();
      registerMapEventHandlers();
    //}
  });

  // Add some delay to window resize handler
  // var resizeTimer;
  // $(window).resize(function() {
  //   clearTimeout(resizeTimer);
  //   resizeTimer = setTimeout(resizeHandler, 100);
  // });

  // On window resize if map canvas is visible and window is loaded but map is still not initialized, then init it
  // function resizeHandler(){
  //   if (mapIsVisible() && winLoad && !map) {
  //     initMap();
  //   }
  // }

  // Then triggered click event on map marker, then update DOM elements
  function registerMapEventHandlers() {
    google.maps.event.addListener(map, "markerActivated", function(locationObj) {
      console.log('Event comes from from map: ', locationObj);
    });
  }
}());
