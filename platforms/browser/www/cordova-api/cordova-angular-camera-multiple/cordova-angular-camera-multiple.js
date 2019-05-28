(function() {

    var file = angular.module("cordova.camera.multiple", []);



    file.service('cameraMultiple', [function() {

        if (window.cordova) {
            var camera = {
                maximumImagesCount: 4,
                width: 800,
                quality: 100
            }

        } else {
            warn("Running In A Browser. Cordova Camera Cannot Run");
        }

        return {
            config: function(options) {

            },

            getPicture: function(success, fail) {

                //get From Camera
                if (window.cordova)
                    window.imagePicker.getPictures(success, fail);

            },
            selectFromGallery: function(success, fail) {

                //Get From Album
                if (window.cordova) {

                    //get From Camera
                    if (window.cordova)
                        window.imagePicker.getPictures(success, fail, camera);

                }
            }


        }
    }])



})()