(function () {
    'use strict';

    angular
        .module('app')
        .controller('VerifyEmailController', VerifyEmailController);

    VerifyEmailController.$inject = ['$rootScope', '$http', '$scope', 'API', 'toaster', 'close'];
    function VerifyEmailController($rootScope, $http, $scope, API, toaster, close) {

        $scope.submitForm = function () {
            let url = API.BaseUrl + 'user/verify/email';

            $http.post(url, $scope.email)
                .then(function (res) {
                    close({ type: 'success', message: res.data.msg })
                }).catch(function (res) {
                    toaster.pop('error', res.data.msg)
                });
        }
    }

})();

