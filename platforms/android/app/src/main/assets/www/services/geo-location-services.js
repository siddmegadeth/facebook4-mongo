app.service('geoLocationServices', [function() {

    var watchId;
    return {


        getCurrentPosition: function(options, onSuccess, onError) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        },
        getUpdatedPosition: function(success, error) {

            log("Position Changed");
            watchId = navigator.geolocation.watchPosition(success, error);

        },
        stopGeoWatch: function() {
            navigator.geolocation.clearWatch(watchId);
        }
    }
}])