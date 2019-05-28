(function() {

    var bg = angular.module("cordova.backgroundGeolocation", []);
    var options = {
        maximumAge: 30000,
        enableHighAccuracy: true
    };



    bg.service('geoPosition', [function() {

        return {
            getCurrentPosition: function(options, cb, onError) {

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(resp) {
                        warn("GeoLocation Run Once")
                    }, function(error) {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = "PERMISSION_DENIED";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = "POSITION_UNAVAILABLE";
                                break;
                            case error.TIMEOUT:
                                errorMessage = "TIMEOUT";
                                break;
                            case error.UNKNOWN_ERROR:
                                errorMessage = "UNKNOWN_ERROR";
                                break;
                        }
                        geolocationStatus.type = errorMessage;
                        geolocationStatus.status = false;
                        onError(errorMessage);
                    }, options);
                } else
                    warn("No Gelocation Detected");
            }
        }

    }])

})()