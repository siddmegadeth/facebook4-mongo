app.controller('loginCtrl', ['$scope', '$rootScope', '$timeout', '$http', 'userStateManager', 'restServices', function($scope, $rootScope, $timeout, $http, userStateManager, restServices) {


    $scope.hideLogin = true;

    ons.ready(function() {


         $scope.fbLoginSuccessCordova = function(respToken) {
        if (window.cordova) {
            warn("Results Using FB Cordova :");
            log("Extracting Access Token For Server Login :");
            log(respToken);
            $scope.accessToken = respToken.authResponse.accessToken;
            log($scope.accessToken);
            facebookAuth.login($scope.accessToken, function(resp) {

                if (resp.data) {
                    log("Respons From Server :");
                    log(resp);
                    userStateManager.saveProfileState(resp.data.profile);
                    if (resp.data.profile.isProfileCompleted) {

                        $scope.myNavigator.pushPage('landing.html', {
                            animation: 'push'
                        }).then(function() {

                            warn("Redirecting To Landing Page :");
                            // $scope.map = new mapboxgl.Map();
                        });
                    } else {
                        $scope.myNavigator.pushPage('user-preference.html', {
                            animation: 'push'
                        }).then(function() {

                            warn("Redirecting To User-Preference Page :");
                            // $scope.map = new mapboxgl.Map();
                        });
                    }
                } else {
                    warn("No Data Found.Null.");
                }
            });

        } else {
            log("Running In A Browser :");
        }


    }

   


    $scope.loginFacebook = function() {
            warn("Cordova Based FB Auth :");
            facebookConnectPlugin.login(["public_profile"], $scope.fbLoginSuccessCordova,
                function loginError(error) {

                    error(error)
                }
            );


      
        }
    });

    


}]);


// / requestId : "f2a56548d1f8486f99d6a578ca65bba7"