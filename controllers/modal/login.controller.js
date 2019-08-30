(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', 'API', 'toaster', 'close'];
    function LoginController($rootScope, $scope, API, toaster, close) {
        $scope.close = function (rs) {
            close({ type: rs })
        };
        $scope.login = {};

        $scope.submitForm = function () {
            let login_details = {
                username: $scope.login.username,
                password: $scope.login.password,
                grant_type: 'password',
                userType: '1'
            }
            $scope.$emit('submit_login', login_details)
        }
    }

})();

