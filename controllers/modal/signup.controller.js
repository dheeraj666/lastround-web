(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$rootScope', '$scope', 'API', 'toaster', 'close', 'countryList', '$http'];
    function SignupController($rootScope, $scope, API, toaster, close, countryList, $http) {

        $scope.signup_view = true;
        $scope.close = function (rs) {
            close({ type: rs })
        };
        $scope.signup = {};
        $scope.member = {};
        $scope.cities = [];

        getCountryList();

        function getCountryList() {
            countryList.then(function (res) {
                $scope.countries = res.data;
            })
        }

        $scope.getState = function (value) {
            countryList.then(function (res) {
                angular.forEach(res.data, function (x, y) {
                    if (value == x.name) {
                        $scope.states = Object.keys(x.states);
                    }
                })
            })
        }

        $scope.getCity = function (value) {
            countryList.then(function (res) {
                angular.forEach(res.data, function (x, y) {
                    angular.forEach(x.states[value], function (x, y) {
                        $scope.cities.push(x)
                    })
                })
            })
        }
        $scope.memberView = function () {
            $scope.signup_view = false;
            $scope.member_view = true;
            getCategory();
        }

        function getCategory() {
            $http.get(API.BaseUrl + 'channel-category')
                .then(function (res) {
                    $scope.categories = res.data.data;
                });
        }

        $scope.back = function () {
            $scope.member_view = false;
            $scope.signup_view = true;
        }

        $scope.submitForm = function () {
            let signupData = {
                "fullName": $scope.signup.fullName,
                "email": $scope.signup.email,
                "password": $scope.signup.password,
                "country": $scope.signup.country,
                "state": $scope.signup.state,
                "city": $scope.signup.city,
                "promocode": $scope.signup.promocode
            };
            $http.post(API.BaseUrl + 'users', signupData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                    close({
                        type: 'success',
                        email: $scope.signup.email,
                        message: 'success message'
                    });
                }).catch(function (res) {
                    if (res.data && res.data.msg)
                        toaster.pop('error', res.data.msg)
                });
        }

        $scope.requestForm = function () {
            let url = API.BaseUrl + 'users';
            $http.post(url, $scope.member, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                toaster.pop('success', 'Thank you for your request, we will respond as soon as possible!');
                close()
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }

    }

})();

