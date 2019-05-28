app.service('nexmoError', ['nexmo', '$rootScope', function(nexmo, $rootScope) {

    return {

        validateErrorMessage: function(errorMessage) {

            switch (errorMessage.status) {

                case 1:
                    {
                        log("Called From Case 1");
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 2:
                    {
                        log("Called From Case 2");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 3:
                    {
                        log("Called From Case 3");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 4:
                    {
                        log("Called From Case 4");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 5:
                    {
                        log("Called From Case 5");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 6:
                    {
                        log("Called From Case 7");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }

                case 7:
                    {
                        log("Called From Case 7");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 8:
                    {
                        log("Called From Case 8");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 9:
                    {
                        log("Called From Case 9");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 10:
                    {
                        log("Called From Case 10");

                        myToast.show();
                        warn("Calling Cancel : ");
                        nexmo.cancel(function() {
                            $rootScope.toastMessage = errorMessage.message;
                            // ons.myNavigator.pushPage('otp-receiver.html', {
                            //     animation: 'push'
                            // }).then(function(err) {

                            //     warn("Error Occured While Routing");
                            //     log(err);
                            //     // $scope.map = new mapboxgl.Map();
                            // })
                        }, function(err) {
                            $rootScope.toastMessage = err.message;

                        });



                        break;

                    }
                    // statements_1
                default:
                    {
                        log("Called From Case Deafult");

                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;
                        // statements_def
                        break;
                    }
            }
        },
        validateOTPErrorMessage: function(errorMessage) {

            log(errorMessage);
            switch (errorMessage.status) {

                case 1:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 2:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 3:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 4:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 5:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 6:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }

                case 7:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 8:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 9:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.message;

                        }, 1);
                        break;

                    }
                case 10:
                    {
                        myToast.show();

                        nexmo.cancel(function() {
                            $rootScope.toastMessage = errorMessage.message;
                            // $scope.myNavigator.pushPage('otp-receiver.html', {
                            //     animation: 'push'
                            // }).then(function(err) {

                            //     warn("Error Occured While Routing");
                            //     log(err);
                            //     // $scope.map = new mapboxgl.Map();
                            // })
                        }, function(err) {
                            $rootScope.toastMessage = err.message;

                        });



                        break;

                    }
                    // statements_1
                default:
                    {
                        myToast.show();
                        $timeout(function() {
                            $rootScope.toastMessage = errorMessage.result;

                        }, 1);
                        break;
                        // statements_def
                        break;
                    }
            }
        }

    }
}])