(function(){
    'use strict';

    angular
        .module('app')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList'];
    function SignupController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList) {

        $scope.signup_view = true;
        $scope.close = close;
        $scope.signup = {};
        $scope.member = {};
        $scope.gmail = {
            username: "",
            email: ""
        }

        getCountryList();

        function getCountryList(){
            countryList.then(function(res){
                $scope.countries = res.data.countries;
            })
        }

        function onloadFunction(){
            gapi.client.setApiKey('AIzaSyDcm5I4fTkD9eSqc-kyZkkF1Ka74IcSksE');
            gapi.client.load('plus', 'v1', function(){});
        }

        $scope.googleLogin = function(){
            console.log('123');
            let params = {
                "clientid": '602509218867-0h5dplbcuoc4vea48o1l8v0qvqnj3v0k.apps.googleusercontent.com',
                "cookiepolicy": 'single_host_origin',
                "callback": function(result){
                    if(result['status']['signed_in']){
                        console.log(gapi.client.plus.people);
                        var request = gapi.client.plus.people.get(
                            {
                                'userId': 'me'
                            }
                        );
                        request.execute(function(resp){
                            $scope.$apply(function(){
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

        $scope.fbLogin = function(){
            console.log('fb login');
            FB.login(function(res){
                if(res.authResponse){
                    FB.api('/me', 'GET', {fields: 'email, first_name, name, id'}, function(response){
                        console.log(response);
                        $scope.$apply(function(){
                            $scope.signup.fullName = response.name;
                            $scope.signup.email = response.email;
                        });
                    });
                }else{
                    console.log('not authorized');
                }
            },{
                scope: 'email',
                return_scopes: true
            });
        }

        $scope.memberView = function(){
            $scope.signup_view = false;
            $scope.member_view = true;
            getCategory();
        }

        function getCategory(){
            QueryService.Get(API.BaseUrl+'channel-category')
            .then(function(res){
                $scope.categories = res.data;
            });
        }

        $scope.back = function(){
            $scope.member_view = false;
            $scope.signup_view = true;
        }

        $scope.submitForm = function(){
            console.log('signup');
            close({type: 'success', message: 'success message'});
        	// let url = API.BaseUrl+'users';
        	// QueryService.Post(url, $scope.signup)
        	// .then(function(res){
        	// 	sendEmail($scope.signup.email)
         //        close({type: 'success', message: res.msg})
        	// })
        	// .catch(function(res){
        	// 	toaster.pop('error', res.data.msg);
        	// });
        }

        function sendEmail(email){
            let url = API.BaseUrl+'user/verify/email';
            QueryService.Post(url, email)
            .then(function(res){
                console.log('then', res);
            }).catch(function(res){
                console.log('catch', res)
            });
        }

        $scope.requestForm = function(){
            console.log($scope.member);
            let url = API.BaseUrl+'users';
            QueryService.Post(url, $scope.member)
            .then(function(res){
                console.log(res);
                toaster.pop('success',res.msg);
            })
            .catch(function(res){
                toaster.pop('error',res.msg);
            });
        }

    }

})();

