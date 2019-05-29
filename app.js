(function () {
    'use strict';

    var app = angular
        .module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngTable', 'ngFileUpload', 'ui.bootstrap', 'toaster', 'angularModalService'])
        .config(config)
        .constant('API', { BaseUrl: 'http://18.224.19.144:5000/' })
        .service('countryList',['$http', function($http){
            return $http.get('assets/json/countries.json');
        }]);

        config.$inject = ['$routeProvider', '$httpProvider'];
        function config($routeProvider, $httpProvider) {

            $routeProvider

            .when('/',{
                cache: false,
                controller: 'HomeController',
                templateUrl: 'views/home.view.html'
            })
            .when('/events',{
                cache: false,
                controller: 'EventsController',
                templateUrl: 'views/events.view.html'
            })
            .when('/catchup',{
                cache: false,
                controller: 'CatchupController',
                templateUrl: 'views/catchup.view.html'
            })
            .when('/live',{
                cache: false,
                controller: 'LiveController',
                templateUrl: 'views/live.view.html'
            })
            .when('/subscription',{
                cache: false,
                controller: 'SubscriptionController',
                templateUrl: 'views/subscription.view.html'
            })
            .when('/about',{
                cache: false,
                controller: 'AboutController',
                templateUrl: 'views/about.view.html'
            })
            .when('/contact',{
                cache: false,
                controller: 'ContactController',
                templateUrl: 'views/contact.view.html'
            })


            .otherwise({ redirectTo: '/' });

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }

        app.controller('MainController', [ '$rootScope', '$scope', '$location', '$cookieStore', '$http', '$route', '$localStorage', '$window', '$uibModal', 'ModalService',
        function MainController( $rootScope, $scope, $location, $cookieStore, $http, $route, $localStorage, $window, $uibModal, ModalService ) {

            $scope.menuList = false;

            $('#preloader').fadeOut('slow', function () {
                $(this).remove();
            });

            $scope.showMenu = function(){
                if($scope.menuList){
                    $scope.menuList = false;    
                }else{
                    $scope.menuList = true;
                }
                
            }

            $scope.login = function(){
                ModalService.showModal({
                    templateUrl: "views/modal/login.modal.html",
                    controller: "LoginController"
                }).then(function(modal){
                    modal.close.then(function(res){
                        console.log(res);
                        if(res.type == "resetPass"){
                            resetPassword();
                        }
                    });
                });
            }

            function resetPassword(){
                ModalService.showModal({
                    templateUrl: "views/modal/resetpass.modal.html",
                    controller: "ResetpassController"
                }).then(function(modal){
                    modal.close.then(function(res){
                        console.log(res);
                    });
                });
            }


            $scope.signup = function(){
                ModalService.showModal({
                    templateUrl: "views/modal/signup.modal.html",
                    controller: "SignupController"
                }).then(function(modal) {
                    modal.close.then(function(result){
                        if(result.type == 'success'){
                            verifyEmail();
                            // toaster.pop('success', result.message)
                        }
                    });
                });
            }

            function verifyEmail(){
                ModalService.showModal({
                    templateUrl: "views/modal/verify.modal.html",
                    controller: "VerifyEmailController"
                }).then(function(modal) {
                    modal.close.then(function(result){
                        if(result.type == 'success'){
                            // toaster.pop('success', result.message)
                        }
                    });
                });
            }

        }]);

})();
