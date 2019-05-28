var notification = angular.module("cordova.notification", []);
notification.provider('notification', [function() {

    return {
        init: function() {
            warn("Background Initialized");
        },
        $get: [function() {
            return {


            };
        }]
    }
}]);