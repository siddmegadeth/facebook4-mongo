app.service('mapBoxServices', ['$timeout', function($timeout) {

    var map;
    return {

        init: function(options) {
            map = new mapboxgl.Map(options);
            log(map);
            map.then(function() {
                alert("Map Ready");
            })
        }, // Function Ends
        addControls: function(options) {

                $timeout(function() {

                    if (map) {
                        if (options.directions.enable) {
                            warn("Enabling Directions in Mapbox");
                            var pos = options.pos;
                            map.addControl(mapboxgl.accessToken, pos);
                            log("Added Directions");
                        }
                    } else {
                        warn(" MapBox Not Initialized Or MapBox AccessToken Not Found");
                    }
                }, 1);


            } // Function Ends

    }


}])