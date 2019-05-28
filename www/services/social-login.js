(function() {

    app.provider('socialLogin', [ function() {

        var options;
        return {
            config: function(options) {
                options = options;
            },
            $get: ['$http', function($http) {
                return {
                    login: function() {


                    }
                }
            }]

        }
    }])

})();