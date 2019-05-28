(function() {
    "use strict";
    var local = angular.module("cordova.localstorage", []);
    local.provider('storage', [function() {

        return {
            init: function() {

            },
            clean: function() {

            },
            $get: [function() {
                return {
                    save: function() {

                    },
                    delete: function() {

                    },
                    saveJSON: function() {

                    },
                    deleteFromJSON: function() {

                    },
                    saveToJSON: function() {

                    }
                }
            }]
        }
    }]);



})();