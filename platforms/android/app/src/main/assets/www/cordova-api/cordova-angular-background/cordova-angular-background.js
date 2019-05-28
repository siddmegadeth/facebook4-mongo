var background = angular.module("cordova.background", []);
background.provider('background', [function() {

    return {

        config: function(configData) {
            if (window.cordova) {
                warn("Background Initialized");
                if (configData.enableBackGround) {
                    cordova.plugins.backgroundMode.enable();
                    cordova.plugins.backgroundMode.on('enable', function(resp) {
                        warn("App Enabled");
                        log(resp);
                    });
                }

                if (configData.overrideBackButton)
                    cordova.plugins.backgroundMode.overrideBackButton();


                if (configData.disableWebViewOptimizations) {
                    warn("Ading Event Listener");
                    cordova.plugins.backgroundMode.on('activate', function() {
                        cordova.plugins.backgroundMode.disableWebViewOptimizations();
                    });
                }

                cordova.plugins.backgroundMode.setDefaults(configData);
            } else {
                warn("BackGround Cannot Run In Simulated Browser");
            }
        },
        $get: [function() {
            return {

            };
        }]
    }
}]);