(function () {
    var module = angular.module('dee.rest', ['ngResource']);

    module.provider('Resource', function () {
        var provider = this;

        this.defaults = {
            // Default actions configuration
            baseUrl: undefined,
            actions: {
                update: {method: 'PUT'},
                patch: {method: 'PATCH'},
            },
            paramDefaults: {}
        };

        function isAbsolute(path) {
            var RE = new RegExp('^(?:[a-z]+:/)?/', 'i');
            return RE.test(path);
        }

        function applyPath(path, baseUrl) {
            if (baseUrl != undefined && !isAbsolute(path)) {
                return baseUrl + path;
            } else {
                return path;
            }
        }

        this.$get = ['$resource', function ($resource) {

                function rest(path, paramDefaults, actions, options) {
                    var opt = angular.extend({}, provider.defaults, options || {});

                    path = applyPath(path, opt.baseUrl);

                    actions = angular.extend({}, provider.defaults.actions, actions);
                    for (var i in actions) {
                        if (actions[i].url) {
                            actions[i].url = applyPath(actions[i].url, opt.baseUrl);
                        }
                    }
                    return $resource(path, paramDefaults, actions, options);
                }

                return rest;
            }];
    });
})();