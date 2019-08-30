(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResetpassController', ResetpassController);

    ResetpassController.$inject = ['$rootScope', '$scope', 'API', 'toaster', 'close', '$http'];
    function ResetpassController($rootScope, $scope, API, toaster, close, $http) {
        $scope.close = close;
        $scope.email_view = true;
        $scope.otp_view = false;
        $scope.change_pass = false;
        $scope.reset = {};
        $scope.sendAgain = function () {
            $scope.reset = {};
            $scope.email_view = true;
            $scope.otp_view = false;
            $scope.change_pass = false
        }
        $scope.submitEmail = function () {
            let url = API.BaseUrl + 'forget-password';
            $http.post(url, $scope.reset, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                    $scope.email_view = false;
                    $scope.otp_view = true;
                }).catch(function (error) {
                    if (error.data && error.data.msg)
                        toaster.pop('error', error.data.msg);
                    $scope.$apply();
                });
        }
        $scope.submitOTPForm = function () {
            let url = API.BaseUrl + 'verify/password/otp';
            $http.post(url, $scope.reset).then(function (res) {
                $scope.otp_view = false;
                $scope.change_pass = true;
            }).catch(function (error) {
                if (error.data && error.data.msg)
                    toaster.pop('error', error.data.msg);
                $scope.$apply();
            });
        }
        $scope.submitChangeForm = function () {
            if ($scope.pass != $scope.cfpass) {
                $scope.error = 'Password dont match'
                return;
            }
            let url = API.BaseUrl + 'reset/password';
            $http.post(url, $scope.reset).then(function (res) {
                toaster.pop('success', 'Your password has been changed successfully!');
                $scope.$apply();
                close()
            }).catch(function (error) {
                if (error.data && error.data.msg)
                    toaster.pop('error', error.data.msg);
                $scope.$apply();
            });
        }
    }

})();

