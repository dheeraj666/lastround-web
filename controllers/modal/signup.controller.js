(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList', '$http'];
    function SignupController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList, $http) {

        $scope.signup_view = true;
        $scope.close = function (rs) {
            close({ type: rs })
        };
        $scope.signup = {};
        $scope.member = {};
        $scope.gmail = {
            username: "",
            email: ""
        }

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

        function onloadFunction() {
            gapi.client.setApiKey('AIzaSyDcm5I4fTkD9eSqc-kyZkkF1Ka74IcSksE');
            gapi.client.load('plus', 'v1', function () { });
        }

        $scope.googleLogin = function () {
            let params = {
                "clientid": '602509218867-0h5dplbcuoc4vea48o1l8v0qvqnj3v0k.apps.googleusercontent.com',
                "cookiepolicy": 'single_host_origin',
                "callback": function (result) {
                    if (result['status']['signed_in']) {
                        var request = gapi.client.plus.people.get(
                            {
                                'userId': 'me'
                            }
                        );
                        request.execute(function (resp) {
                            console.log(resp)
                            // let tk = resp.access_token || resp.accessToken
                            // socialLogin(tk)
                            $scope.$apply(function () {
                                $scope.signup.fullName = resp.displayName;
                                $scope.signup.email = resp.emails[0].value;
                                $scope.signup.country = resp.country;
                            });
                        })
                    }
                },
                "approvalprompt": 'force',
                "scope": 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
            };

            gapi.auth.signIn(params);
        }

        $scope.fbLogin = function () {
            FB.login(function (res) {
                if (res.authResponse) {
                    FB.api('/me', 'GET', { fields: 'email, first_name, name, id' }, function (response) {
                        console.log(response);
                        // if (response && response.authResponse)
                        //     socialLogin(response.authResponse.accessToken)
                        $scope.$apply(function () {
                            $scope.signup.fullName = response.name;
                            $scope.signup.email = response.email;
                        });
                    });
                } else {
                    console.log('not authorized');
                }
            }, {
                    scope: 'email',
                    return_scopes: true
                });
        }
        function socialLogin(token) {
            let login_details = {
                deviceType: '',
                deviceToken: '',
                socialIdToken: token,
                userType: '2'
            }

            $http({
                url: API.BaseUrl + 'login',
                method: 'POST',
                data: $httpParamSerializer(login_details), // Make sure to inject the service you choose to the controller
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Note the appropriate header
                    'Authorization': 'Basic VFY6TFVJU1RWQDEyMw=='
                }
            }).then(function (res) {
                if (res.data.status == 1) {
                    $rootScope.isSubscribed = res.data.data.isSubscribed
                    window.localStorage.setItem('isSubscribed', $rootScope.isSubscribed);
                    window.localStorage.setItem('accessToken', res.data.data.accessToken);
                    $rootScope.isLoggedIn = true;
                    toaster.pop('success', 'Wellcome back! ' + res.data.data.username)
                    close()
                }
            }).catch(function (res) {
                toaster.pop('error', res.data.msg)
            });
        }
        $scope.memberView = function () {
            $scope.signup_view = false;
            $scope.member_view = true;
            getCategory();
        }

        function getCategory() {
            QueryService.Get(API.BaseUrl + 'channel-category')
                .then(function (res) {
                    $scope.categories = res.data;
                });
        }

        $scope.back = function () {
            $scope.member_view = false;
            $scope.signup_view = true;
        }

        $scope.submitForm = function () {
            // close({type: 'success', message: 'success message'});
            // let url = API.BaseUrl+'users';
            // QueryService.Post(url, $scope.signup)
            // .then(function(res){
            // 	sendEmail($scope.signup.email)
            //        close({type: 'success', message: res.msg})
            // })
            // .catch(function(res){
            // 	toaster.pop('error', res.data.msg);
            // });
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
                    close({ type: 'success', message: 'success message' });
                }).catch(function (res) {
                    $scope.signupError = res.data.msg;
                });
        }

        function sendEmail(email) {
            let url = API.BaseUrl + 'user/verify/email';
            QueryService.Post(url, email)
                .then(function (res) {
                    console.log('then', res);
                }).catch(function (res) {
                    console.log('catch', res)
                });
        }

        $scope.requestForm = function () {
            console.log($scope.member);
            let url = API.BaseUrl + 'users';
            QueryService.Post(url, $scope.member)
                .then(function (res) {
                    console.log(res);
                    toaster.pop('success', res.msg);
                })
                .catch(function (res) {
                    toaster.pop('error', res.msg);
                });
        }

    }

})();

