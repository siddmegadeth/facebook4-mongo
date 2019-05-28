app.service('httpInterceptors', ['$timeout', '$rootScope', function($timeout, $rootScope) {

    return {


        request: function(config) {
            log(config);

            warn("Request Received : " + Date());
            return config;

        },
        response: function(config) {

            log(config);
            warn("Response Received : " + Date());
            if (config.status == 200) {
                myToast.show();
                $timeout(function() {
                    $rootScope.toastMessage = config.data.result || config.data.message;

                }, 1);

            }
            return config;

        },
        requestError: function(config) {

            log(config);
            warn("Request Error : " + Date());
            return config;

        },
        responseError: function(config) {

            log(config);
            warn("Response Error : " + Date());
            // if (config.status == 404) {

            //     myToast.show();
            //     $timeout(function() {
            //         $rootScope.toastMessage = config.data.result || config.data.message;

            //     }, 1);
            // } else if (config.status == 401) {

            //     myToast.show();
            //     $timeout(function() {
            //         $rootScope.toastMessage = config.data.result || config.data.message;

            //     }, 1);
            // } else if (config.status == 501) {

            //     myToast.show();
            //     $timeout(function() {
            //         $rootScope.toastMessage = "Servers Not Available";

            //     }, 1);
            // } else if (config.status == 500) {

            //     myToast.show();
            //     $timeout(function() {
            //         $rootScope.toastMessage = "Servers Not Available.Internal Error";

            //     }, 1);
            // }

            if (config.status == 500) {

                myToast.show();
                $timeout(function() {
                    $rootScope.toastMessage = "Servers Not Available.Internal Error";

                }, 1);
            }


            return config;

        }


    }

}]);