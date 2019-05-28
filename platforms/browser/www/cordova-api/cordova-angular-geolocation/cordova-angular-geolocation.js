(function() {
    "use strict";
    var geo = angular.module("cordova.geolocation", []);
    geo.provider('geolocation', [function() {

        var geolocationStatus = {};
        var watchId;
        var errorMessage;
        var hasWatchStarted;
        var updatedPosition;

        return {
            init: function(options, onSuccess, onError) {
                warn("Gelocation Initialized");
                navigator.geolocation.getCurrentPosition(function(resp) {
                    geolocationStatus.type = "GRANTED";
                    geolocationStatus.status = true;
                    onSuccess(resp);

                }, function(error) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "PERMISSION_DENIED"
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "POSITION_UNAVAILABLE"
                            break;
                        case error.TIMEOUT:
                            errorMessage = "TIMEOUT"
                            break;
                        case error.UNKNOWN_ERROR:
                            errorMessage = "UNKNOWN_ERROR"
                            break;
                    }
                    geolocationStatus.type = errorMessage;
                    geolocationStatus.status = false;
                    onError(errorMessage);
                }, options);
            }, //Function Ends
            $get: ['$rootScope', function($rootScope) {
                return {
                    geolocationStatus: function() {
                        return geolocationStatus;
                    },
                    getCurrentPosition: function(options, onSuccess, onError) {
                        navigator.geolocation.getCurrentPosition(function(resp) {
                            geolocationStatus.type = "GRANTED";
                            geolocationStatus.status = true;
                            onSuccess(resp);

                        }, function(error) {
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    errorMessage = "PERMISSION_DENIED"
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    errorMessage = "POSITION_UNAVAILABLE"
                                    break;
                                case error.TIMEOUT:
                                    errorMessage = "TIMEOUT"
                                    break;
                                case error.UNKNOWN_ERROR:
                                    errorMessage = "UNKNOWN_ERROR"
                                    break;
                            }
                            geolocationStatus.type = errorMessage;
                            geolocationStatus.status = false;
                            onError(errorMessage);
                        }, options);
                    },
                    getUpdatedPosition: function(success, error) {
                        warn("Geolocation Status");
                        warn(geolocationStatus);
                        if (geolocationStatus.status) {
                            if (geolocationStatus.status) {
                                watchId = navigator.geolocation.watchPosition(success, error);
                            }
                        } else {
                            warn("Geolocation Not Enabled For Watcher To Work");
                        }
                    },
                    // getUpdatedPosition: function(success) {
                    //     if (geolocationStatus.status) {
                    //         $rootScope.$watch('updatedPosition', function(newValue, oldValue) {
                    //             // angular.copy(watchId, $scope.someVar);
                    //             log(newValue);
                    //             success(newValue);
                    //         });
                    //     } else {
                    //         warn("Watcher Cannot Run Unless Geolocation Is Enabled");
                    //     }
                    // },
                    stopUpdatedPosition: function() {
                        navigator.geolocation.clearWatch(watchId);
                    }
                };
            }]
        }
    }]);

})()