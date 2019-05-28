app.controller('landingCtrl', ['$scope', '$rootScope', '$timeout', 'restServices', 'geoLocationServices', 'socket', '$http', 'userStateManager',
    function($scope, $rootScope, $timeout, restServices, geoLocationServices, socket, $http, userStateManager) {

        $scope.screenLoader = true;

        $scope.initiateSocketConnection = function() {

            $timeout(function() {
                var tempState = $scope.userProfileState();
                log(tempState);
                var state = { mobile: tempState.mobile, fullName: tempState.fullName };
                socket.emit("user:initialize", state);
            }, 1);


        };


        $scope.calculateDistance = function(lat1, lon1, lat2, lon2, unit) {
            var radlat1 = Math.PI * lat1 / 180
            var radlat2 = Math.PI * lat2 / 180
            var radlon1 = Math.PI * lon1 / 180
            var radlon2 = Math.PI * lon2 / 180
            var theta = lon1 - lon2
            var radtheta = Math.PI * theta / 180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180 / Math.PI
            dist = dist * 60 * 1.1515
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            return dist
        }

        $scope.pageRefresh = function($done) {
            $scope.screenLoader = false;
            $scope.showIfUserFound = false;

            $timeout(function() {
                $scope.initializeGeoLocation();
                $timeout(function() {
                    $scope.screenLoader = true;

                    $scope.showIfUserFound = true;
                    $scope.showIfUserFoundMessage = "Refreshing.Trying Your Luck Again";
                })

                $done();
            }.bind(this), 1000);
        }.bind(this);




        $scope.openChatWindow = function(userCurrentChat) {

            log(userCurrentChat);
            $scope.myNavigator.pushPage('chat-window.html', {
                animation: 'push'
            }).then(function(err) {

                localStorage.setItem("currentChat", JSON.stringify(userCurrentChat));
                // $scope.map = new mapboxgl.Map();
            });

        }




        var geoSuccess = function(position) {
            warn("Geo Watch Position :");
            log(position);
            //Initialize And Save User Lat/Lng
            var tempUser = userStateManager.getProfileState();
            log(tempUser);
            var userLocation = {};
            userLocation.latitude = position.coords.latitude;
            userLocation.longitude = position.coords.longitude;
            userLocation.profile = tempUser.profile;

            warn("Saving User Location :");
            log(userLocation);


            //Get User Preference For Search Criteria
            var userPreference = {};
            userPreference.preferAge = tempUser.preferAge;
            userPreference.preferDistance = tempUser.preferDistance;
            userPreference.preferGender = tempUser.preferGender;
            userPreference.gender = tempUser.gender;


            //intiate geoWatch
            // initMap(position);
            //  geoLocationServices.getUpdatedPosition(geoWatch, geoError);
            $timeout(function() {
                restServices.saveUserLocation(userLocation, userPreference, function(resp) {

                    $timeout(function() {
                        warn("Retrievd Preferred Users NearBy Position And Updating Current Location :");
                        log(resp);
                        if (resp.data.data) {
                            $scope.screenLoader = false;
                            $scope.preferredUser = resp.data.data;
                            $scope.showIfUserFound = false;

                        } else {

                            myToast.show();
                            $timeout(function() {
                                $scope.screenLoader = true;
                                $scope.showIfUserFound = true;
                                $scope.showIfUserFoundMessage = "There Are No People Around. Hard Luck. Try Again Later.";
                                $rootScope.toastMessage = resp.data.message;

                            });
                        }
                    });

                });
            });
        };

        $scope.userProfileState = function() {
            //get ProfileState
            var profileState = JSON.parse(localStorage.profileState);
            return profileState;

        }


        var getPermission = function(type) {

            myToast.show();
            $timeout(function() {
                $rootScope.toastMessage = type;
            });

            $scope.ons.notification.confirm({ message: 'Enable GeoLocation Services' })
                .then(function(resolve) {

                    log("Running GeoLocation Services :");
                    log(resolve);
                    if (resolve == 1)
                        $scope.initializeGeoLocation();
                    else {
                        $timeout(function() {
                            $scope.showIfUserFound = true;
                            $scope.showIfUserFoundMessage = "Geo Services Offline.Enable Geo Services To Continue";
                        })
                    }
                });
        }


        var geoError = function(error) {

            // Call Cordova Based Servicies Here Incase Failure Happens
            //and then save lat/lng data
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    {
                        errorMessage = "PERMISSION_DENIED"
                        getPermission(errorMessage);
                        break;
                    }
                case error.POSITION_UNAVAILABLE:
                    {
                        errorMessage = "POSITION_UNAVAILABLE"
                        getPermission(errorMessage);
                        break;
                    }
                case error.TIMEOUT:
                    {
                        errorMessage = "TIMEOUT"
                        getPermission(errorMessage);
                        break;
                    }
                case error.UNKNOWN_ERROR:
                    {
                        errorMessage = "UNKNOWN_ERROR"
                        getPermission(errorMessage);
                        break;
                    }
                default:
                    {

                        log(error);

                    }
            }

        };


        $scope.initializeGeoLocation = function() {
            warn("initializeGeoLocation Running");
            geoLocationServices.getCurrentPosition({ highAccuracy: true, timeout: 15000 }, geoSuccess, geoError)

        }

        $timeout(function() {

            $scope.initiateSocketConnection();
            $scope.initializeGeoLocation();
            //Check if GeoLocation Is Enabled Or Not
        });





        // mapBoxServices.addControls($scope.glControls);

    }
]);