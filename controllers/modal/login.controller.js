(function(){
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', '$http', '$httpParamSerializer'];
    function LoginController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, $http, $httpParamSerializer) {

        console.log('login');
        $scope.close = close;
        $scope.login = {};

        $scope.forgotPass = function(){
        	close({type: 'resetPass'})
        }

        $scope.submitForm = function(){
            console.log('submit');

            let login_details = {
                username: $scope.login.username,
                password: $scope.login.password,
                grant_type: 'password',
                userType: '1'
            }

            $http({
                url: API.BaseUrl+'login',
                method: 'POST',
                data: $httpParamSerializer(login_details), // Make sure to inject the service you choose to the controller
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded', // Note the appropriate header
                  'Authorization': 'Basic VFY6TFVJU1RWQDEyMw==' 
                }
              })

            .then(function(res){
                console.log('then', res);
                window.localStorage.setItem('accessToken', res.data.data.accessToken);
            }).catch(function(res){
                console.log('catch', res)
            });
        }

    }

})();

