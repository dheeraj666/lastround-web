(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', '$http', '$httpParamSerializer'];
    function LoginController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, $http, $httpParamSerializer) {
        $scope.close = function (rs) {
            close({ type: rs })
        };
        $scope.login = {};





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

        $scope.submitForm = function () {
            let login_details = {
                username: $scope.login.username,
                password: $scope.login.password,
                grant_type: 'password',
                userType: '1'
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

    }

})();

