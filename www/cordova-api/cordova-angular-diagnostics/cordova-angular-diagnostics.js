"use strict";
(function() {


    var diag = angular.module("cordova.diagnostics", []);
    diag.provider('diagnostics', [function() {

        return {
            init: function() {

            },
            $get: [function() {
                return {

                    isLocationAuthorized: function(successCallback, errorCallback) {
                        if (window.cordova) {
                            cordova.plugins.diagnostic.isLocationAuthorized(function(resp) {
                                successCallback(resp);
                            }, function(err) {
                                errorCallback(err);
                            });
                        } else {
                            warn("Diagnostics Cannot Run In Simulated Browser");
                            successCallback(false);
                        }
                    },
                    requestLocationAuthorization: function(successCallback, errorCallback) {
                        cordova.plugins.diagnostic.requestLocationAuthorization(successCallback, errorCallback);

                    },
                    isNetworkLocationEnabled: function(successCallback, errorCallback) {

                        cordova.plugins.diagnostic.isNetworkLocationEnabled(successCallback, errorCallback);


                    },
                    locationAccuracy: function(successCallback, errorCallback) {

                        cordova.plugins.locationAccuracy.request(successCallback, errorCallback, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)

                    },
                    isLocationEnabled: function(successCallback, errorCallback) {
                        if (window.cordova)
                            cordova.plugins.diagnostic.isLocationEnabled(function(resp) {
                                successCallback(resp);
                            }, function(err) {
                                errorCallback(err);
                            });
                        else {

                            warn("Diagnostics Cannot Run In Simulated Browser");
                            successCallback(false);
                        }
                    },
                    isLocationAvailable: function(successCallback, errorCallback) {
                        if (window.cordova) {
                            log("Codova Defined");
                            cordova.plugins.diagnostic.isLocationAvailable(successCallback, errorCallback)
                        } else {
                            warn("Diagnostics Cannot Run In Simulated Browser");
                            successCallback(false);
                        }
                    },
                    isGpsLocationEnabled: function(successCallback, errorCallback) {

                        cordova.plugins.diagnostic.isGpsLocationEnabled(successCallback, errorCallback);

                    },
                    isLocationAuthorized: function(successCallback, errorCallback) {
                        if (window.cordova) {
                            cordova.plugins.diagnostic.isLocationAuthorized(function(resp) {
                                successCallback(resp);
                            }, function(err) {
                                errorCallback(err);
                            });
                        } else {
                            warn("Diagnostics Cannot Run In Simulated Browser");
                            successCallback(false);
                        }

                    }
                }
            }] //GET ENDS
        }

    }]);


})()