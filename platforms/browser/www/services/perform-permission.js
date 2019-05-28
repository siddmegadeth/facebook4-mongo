app.service('permissionGrant', ['$timeout', function($timeout) {

    var error = function(err) {

        $timeout(function() {
            $scope.routeLoader = false;
            $rootScope.toastMessage = "Error Occured retrieving Location. Try Again";
            myToast.toggle();


        }, 1)

        warn("Some Error Occured To Use Permission");
        log(err);
    };
    return {

        grantWhenAuthorized: function(cb,err) {

            cordova.plugins.locationAccuracy.canRequest(function(canRequest) {
                log(canRequest);
                if (canRequest) {


                    cordova.plugins.locationAccuracy.request(function(req) {
                        log(req);
                        log("Successfully made request to invoke native Location Services dialog");
                        navigator.geolocation.getCurrentPosition(function(pos) {


                            warn("Current Position Retrieved :");
                            log(pos);
                            $timeout(function() {

                                $scope.myNavigator.pushPage("landing.html", { animation: 'md-lift' });
                            }, 1);
                            cb({ routeLoader: true });


                        }, error, geoOptions);


                    }, function(error) {

                        log("Failed to invoke native Location Services dialog");
                        $scope.routeLoader = false;
                        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                            if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                                cordova.plugins.diagnostic.switchToLocationSettings();
                                err({ routeLoader: false, message: 'Failed to invoke native Location Services dialog' });

                            }
                        }

                    }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);



                } else {
                    // request location permission and try again
                    log("Request Permission Again And Try");
                    err({ routeLoader: true, message: "Permission Not Provided.Try Again" });



                }
            });
        },
        whenNotAuthorized: function() {
            diagnostics.requestLocationAuthorization(function(isAuth) {
                log(isAuth);
                if (isAuth == "GRANTED") {


                    cordova.plugins.locationAccuracy.canRequest(function(canRequest) {
                        log(canRequest);
                        if (canRequest) {


                            cordova.plugins.locationAccuracy.request(function(req) {
                                log(req);

                                log("Successfully made request to invoke native Location Services dialog");

                                navigator.geolocation.getCurrentPosition(function(pos) {

                                    $scope.routeLoader = false;

                                    warn("Current Position Retrieved :");
                                    log(pos);
                                    $timeout(function() {

                                        $scope.myNavigator.pushPage("landing.html", { animation: 'md-lift' });

                                    }, 1);

                                }, error, geoOptions);

                            }, function(error) {
                                log("Failed to invoke native Location Services dialog");
                                $scope.routeLoader = false;
                                if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                                    if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                                        cordova.plugins.diagnostic.switchToLocationSettings();
                                    }
                                }
                            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);




                        } else {
                            // request location permission and try again
                            log("Request Permission Again And Try");
                            $scope.routeLoader = false;

                            // Add Notification To Tell users

                        }
                    });

                } else {
                    log("No Permission Provided");
                    // Add Notification To Tell users
                    $rootScope.toastMessage = "Permission Not Provided.Try Again";
                    myToast.toggle();

                }

            }, error);
        }

    }

}]);