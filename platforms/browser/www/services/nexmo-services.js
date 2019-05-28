app.provider('nexmo', [function() {

    var nexmoConfig;
    var nexmoState;
    return {

        config: function(config) {
            nexmoConfig = config;
        },
        $get: ['$http', '$rootScope', function($http, $rootScope) {
            return {
                register: function(mobile, cb, err) {
           
                    $http({
                            method: 'POST',
                            url: nexmoConfig.register,
                            params: { number: mobile }
                        })
                        .then(function(resp) {

                            log(resp.data);
                            if (resp == undefined || resp.data.result == 'Your pre-pay account does not have sufficient credit to process this message') {
                                warn("Nexmo Account balance has no credit left");
                                err(resp);

                            } else if (resp.data.status == 10 || resp.data.status == 0) {
                                var tuple = {};
                                tuple.requestId = resp.data.request_id;
                                tuple.message = resp.data.error_text;
                                tuple.status = parseInt(resp.data.status);
                                cb(tuple);
                            }
                        })
                },
                validate: function(pin, mobile, cb, err) {
                    var requestId = this.getRequestID();
            
                    if (requestId) {
                        $http({
                                method: 'POST',
                                url: nexmoConfig.validate,
                                params: { requestId: requestId, pin: pin, mobile: mobile }
                            })
                            .then(function(resp) {
                                log(resp);
                                cb(resp);
                            })
                    } else {
                        err({ message: "Request ID Is Empty.Cannot Validate OTP" });
                    }


                },
                cancel: function(cb, err) {
                    warn("Cancelling Previous Request");
                    var requestId = this.getRequestID();
                    log("RequestID :" + requestId);
                    if (requestId) {
                        $http({
                                method: 'POST',
                                url: nexmoConfig.cancel,
                                params: { requestId: requestId }
                            })
                            .then(function(resp) {
                                warn("Response From Cancel From Nexmo :");
                                log(resp);
                                myToast.show();
                                $rootScope.toastMessage = resp.message;
                                cb(resp);
                            })
                    } else {
                        err({ message: "Request ID Is Empty.Cannot Validate OTP" });
                    }
                },
                getRequestID: function() {
                    return window.localStorage.requestId;
                },
                setRequestID: function(id) {
                    requestId = id;
                    window.localStorage.setItem("requestId", requestId);

                },
                saveNexmoState: function(state) {
                    localStorage.setItem("nexmoState", JSON.stringify(state));
                },
                getNexmoState: function() {
                    return JSON.parse(localStorage.getItem("nexmoState"));
                }
            }
        }]

    }

}]);