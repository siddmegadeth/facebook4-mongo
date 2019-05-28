// Authenticate For Cordov ased FB Login Only.
//There is a Web Based Login Also For Other Device
app.provider('facebookAuth', [function() {

    var uri;
    return {

        config: function(options) {
            uri = options;
            log(uri);
        },
        $get: ['$http', function($http) {

            return {
                login: function(accessToken, cb) {

                    warn("Access Token :");
                    log(accessToken);
                    $http({
                        method: 'POST',
                        url: '/facebook/auth',
                        params: { accessToken: accessToken }
                    }).then(function(resp) {
                        cb(resp);
                    });
                }
            }
        }]



    }
}])