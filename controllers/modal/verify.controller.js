(function () {
    'use strict';

    angular
        .module('app')
        .controller('VerifyEmailController', VerifyEmailController);

    VerifyEmailController.$inject = ['$rootScope', '$http', '$scope', 'API', 'toaster', 'close', 'email'];
    function VerifyEmailController($rootScope, $http, $scope, API, toaster, close, email) {
        $scope.email = email;
        $scope.submitForm = submitForm;
        $scope.close = function(){
            close()
        }
        function submitForm() {
            let url = API.BaseUrl + 'user/verify/email';
            $http.post(url, { email: $scope.email })
                .then(function (res) {
                    close({ type: 'success', message: res.data.msg })
                }).catch(function (res) {
                    toaster.pop('error', res.data.msg)
                });
        }
    }
})();

