app.provider('restServices', [function() {

    var restConfig;
    return {

        config: function(config) {
            restConfig = config;
            log(restConfig);

        },
        $get: ['$http', function($http) {

            return {

                saveProfile: function(profile, cb) {
                    $http({
                        method: 'POST',
                        url: restConfig.saveProfile,
                        params: { profile: profile }
                    }).then(function(resp) {
                        cb(resp);
                    });
                },
                getUpdatedProfile: function(cb) {
                    log(restConfig.getProfile);
                    var mobile = localStorage.mobile;
                    log(localStorage.mobile);
                    $http({
                        method: 'GET',
                        url: restConfig.getProfile,
                        params: { mobile: mobile }
                    }).then(function(resp) {
                        cb(resp);
                    });

                },
                updateUserPosition: function(profile, position, cb) {
                    log(restConfig.updateLocation);

                    $http({
                        method: 'GET',
                        url: restConfig.updateLocation,
                        params: { position: position, profile: profile }
                    }).then(function(resp) {
                        cb(resp);
                    });
                },
                saveUserLocation: function(userLocation, userPreference, cb) {
                    $http({
                        method: 'GET',
                        url: restConfig.saveLocation,
                        params: { userLocation: userLocation, userPreference: userPreference }
                    }).then(function(resp) {
                        cb(resp);
                    });
                }


            }
        }]

    }
}])