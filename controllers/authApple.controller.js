(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuthAppleController', AuthAppleController);

    AuthAppleController.$inject = ['$rootScope', '$scope', 'API', 'ModalService', '$http', '$location', 'AuthenService', 'PreloadingService', 'toaster'];
    function AuthAppleController($rootScope, $scope, API, ModalService, $http, $location, AuthenService, PreloadingService, toaster) {
        function init() {
            PreloadingService.loadStart()
            if ($location.$$search.code) {
                $http({
                    method: 'POST',
                    url: API.BaseUrl + 'auth-apple',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: 'code=' + $location.$$search.code
                }).then(function (res) {
                    if (res.data.status == 1) {
                        AuthenService.setAuthen(res.data.data);
                        toaster.pop('success', 'Wellcome back! ' + res.data.data.username);
                    }
                    location.href = '/#!/'
                    PreloadingService.loadEnd()
                }).catch(function (res) {
                    if (res.data && res.data.msg)
                        toaster.pop('error', res.data.msg)
                    PreloadingService.loadEnd()
                });
            }
        }
        init()
    }
})();

