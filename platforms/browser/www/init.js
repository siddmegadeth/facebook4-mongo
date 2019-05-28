    "use strict";
    var DI = [
        "cordova.background",
        "cordova.notification",
        "cordova.localstorage",
        "cordova.diagnostics",
        "cordova.backgroundGeolocation",
        "onsen",
        "satellizer"
    ];


    // mapboxgl.accessToken = 'pk.eyJ1Ijoic2lkZG1lZ2FkZXRoIiwiYSI6ImNqaHZsZWQ5NjB4Z3ozdXQ2eHo3dXdjcDkifQ.eQi2MM-DO4eSdiyu4bu_2Q';
    var win = new winDevice("myApp", DI); //Bootstrap Cordova Or Browser Based App .no ng-app Required
    var app = win.device(); // init App
    win.enable(true);
    win.info();

    ons.platform.select('android');
    ons.ready(function() {
        log("Ready");
        document.addEventListener("backbutton", function(e) {
            e.preventDefault();
        }, false);

    });

    app.config([ '$httpProvider',  '$authProvider', function( $httpProvider, $authProvider) {

      
        $httpProvider.interceptors.push('httpInterceptors');
    }]);


    app.run(['$rootScope', '$location', function($rootScope, $location) {

        // L.mapbox.accessToken = 'pk.eyJ1Ijoic2lkZG1lZ2FkZXRoIiwiYSI6ImNqaHZsZWQ5NjB4Z3ozdXQ2eHo3dXdjcDkifQ.eQi2MM-DO4eSdiyu4bu_2Q';
        //mapboxgl.accessToken = "pk.eyJ1Ijoic2lkZG1lZ2FkZWF0aCIsImEiOiJjanU4YnczdWQyM2F3NDNzYXltbDY4ODl6In0.GS5KZFt3SeXSBb_CnBBOSg";;
        // log(mapboxgl.accessToken);
    }]);

    // $ cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="283734742253744" --variable APP_NAME="facebook.com.app"


    // FB
    // 313314972731334
    // 58aa27529273e13aa525cf68a0cd9b4d

    //    $ cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="313314972731334" --variable APP_NAME="irover"
