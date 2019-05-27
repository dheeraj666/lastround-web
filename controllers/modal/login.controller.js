(function(){
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', '$http'];
    function LoginController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, $http) {

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

            $http.post(API.BaseUrl+'login', login_details,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic VFY6TFVJU1RWQDEyMw=='
                }
            })

            .then(function(res){
                console.log('then', res);
            }).catch(function(res){
                console.log('catch', res)
            });
         //    $scope.login.grant_type = 'password';
         //    $scope.login.userType = 1;

        	// let url = API.BaseUrl+'login';
        	// QueryService.Login(url, $scope.login)
        	// .then(function(res){
        	// 	console.log(res);
        	// }).catch(function(res){
        	// 	console.log(res);
        	// });
        }

    }

})();

