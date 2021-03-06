app.directive("routeLoader", ['$rootScope', function($rootScope) {
    return {
        restrict: 'AE',
        scope: {
            value: '='
        },
        transclude: true,
        template: " <div class='route-loader' ng-if='value' ><i class='fa fa-circle-o-notch fa-spin fa-5x fa-fw spinner-rotate'></i><span class='sr-only'>Loading...</span> </div>",
        link: function(elem, scope, attr) {
            log("Executed Route Loader");
        }

    };
}]);


app.directive("screenLoader", ['$rootScope', function($rootScope) {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            value: '='
        },
        template: " <div class='route-loader pulse infinite' ng-if='value' ><i class='fa fa-circle-o-notch fa-spin fa-5x fa-fw spinner-rotate'></i><span class='sr-only'>Loading...</span> </div>",
        link: function(elem, scope, attr) {
            log("Executed Screen Loader");
        }

    };
}]);

app.directive("smsLoader", ['$rootScope', function($rootScope) {
    return {
        restrict: 'AE',
        scope: {
            value: '='
        },
        template: " <div class='smsLoader' ng-if='value' ><i class='fa fa-circle-o-notch fa-spin fa-5x fa-fw spinner-rotate'></i><span class='sr-only'>Loading...</span> </div>",
        link: function(elem, scope, attr) {
            log("Executing SMS Load");
        }

    };
}]);

app.directive("ajaxLoader", ['$rootScope', function($rootScope) {
    return {
        restrict: 'AE',
        scope: {
            value: '='
        },
        template: " <div class='animated-container' ng-if='value' ><div class='messaging'><h1 class='text-center'><i class='fa fa-cog fa-spin fa-3x fa-fw'></i><span class='sr-only'>Loading...</span></h1></div></div>",
    };
}]);



app.directive("backButton", ['$window', function($window) {
    return {
        scope: {
            display: '='
        },
        restrict: "A",
        link: function(scope, elem, attrs) {
            elem.bind("click", function() {
                $window.history.back();
            });
        }
    };
}]);


// OTP Diective
app.directive("otpInputDirective", ["$timeout", function(o) {
    return {
        restrict: "A",
        scope: { options: "=" },
        template: "<div><input type='{{type}}' ng-repeat=\"c in characters\" autocomplete='off' ng-keyup='onKeyUp($index,$event)' ng-keydown='onKeyDown($index,$event)' ng-model='c.value' id='otpInput{{c.index}}' name='otpInput{{c.index}}' ng-style=\"style\" placeholder=\"{{placeholder}}\" maxlength=\"1\"  />\n</div>",
        link: function(e, n) {
            var t = parseInt(e.options.size) || 6,
                i = 100 / (t + 1),
                p = i / t,
                l = [],
                a = [],
                r = "#6f6d6d",
                s = Math.floor(1e4 * Math.random()) + 100;
            e.style = {
                    "margin-right": p + "%",
                    "border": "none",
                    "border-bottom": "2px solid",
                    "border-radius": "0",
                    "display": "inline-block",
                    "width": i + "%",
                    "text-align": "center",
                    "padding": "5px 0px",
                    "outline": "none",
                    "box-shadow": "none",
                    "background": "transparent",
                    "color": e.options.style && e.options.style.color ? e.options.style.color : r,
                    "font-size": e.options.style && e.options.style.fontSize ? scope.options.style.fontSize : "20px"
                },
                e.type = e.options.type ? e.options.type : "text", e.placeholder = e.options.placeholder && 1 === e.options.placeholder.length ? e.options.placeholder : "",
                e.setOtpValue = function() {
                    e.options.value = "";
                    var o = !0;
                    angular.forEach(e.characters, function(n, t) {
                        if (1 !== n.value.length) return o = !1, !1;
                        e.options.value = e.options.value + n.value
                    }), o && "function" == typeof e.options.onDone && e.options.onDone(e.options.value)
                }, e.onKeyUp = function(n, i) {
                    var p = i.keyCode || i.which,
                        l = e.options.value;
                    e.setOtpValue(), e.characters[n].value.length > 0 && 8 !== p && n != t - 1 && o(function() { a[n + 1][0].focus() }), "function" == typeof e.options.onChange && l !== e.options.value && e.options.onChange(e.options.value)
                }, e.onKeyDown = function(n, t) { 8 === (t.keyCode || t.which) && "" === e.characters[n].value && 0 !== n && o(function() { a[n - 1][0].focus() }) };
            for (var c = 0; c < t; c++) l.push({ index: s + "-" + c, value: "" });
            e.characters = l, o(function() { for (var o = 0; o < t; o++) a.push(angular.element(document.querySelector("#otpInput" + s + "-" + o))) })
        }
    }
}]);