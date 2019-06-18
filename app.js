(function () {
    'use strict';

    var app = angular
        .module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngTable', 'ngFileUpload', 'ui.bootstrap', 'toaster', 'angularModalService'])
        .config(config)
        .run(run)
        .constant('API', { BaseUrl: 'http://18.224.19.144:5000/' })
        .service('countryList',['$http', function($http){
            return $http.get('assets/json/countries.json');
        }])
        .directive('fileInput', ['$parse', function($parse){
            return {
                $scope:{
                    fileinput: '=',
                    filepreview: '='
                },
                link: function($scope, element, attribute){
                    element.bind('change', function(changeEvent){
                        $scope.fileinput = changeEvent.target.files[0];
                        var reader = new FileReader();
                        reader.onload = function(loadEvent){
                            $scope.$apply(function(){
                                $scope.filepreview = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL($scope.fileinput);
                        $scope.name = $scope.fileinput.name;
                        $scope.size = $scope.fileinput.size;
                    })
                }
            }
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
            .when('/profile',{
                cache: false,
                controller: 'ProfileController',
                templateUrl: 'views/profile.view.html'
            })
            .when('/search/:searchTerm',{
                cache: false,
                controller: 'SearchController',
                templateUrl: 'views/search.view.html'
            })            


            .otherwise({ redirectTo: '/' });

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }

        run.$inject = ['$http', '$rootScope', 'API', '$httpParamSerializer'];
        function run($http, $rootScope, API, $httpParamSerializer) {
            $rootScope.getToken = function() {
                let login_details = {
                    username: 'superadmin@gmail.com',
                    password: '123',
                    grant_type: 'password',
                    userType: '1'
                }
    
                return $http({
                    url: API.BaseUrl+'login',
                    method: 'POST',
                    data: $httpParamSerializer(login_details), // Make sure to inject the service you choose to the controller
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded', // Note the appropriate header
                      'Authorization': 'Basic VFY6TFVJU1RWQDEyMw==' 
                    }
                  });
            }
        }

        app.controller('MainController', [ '$rootScope', '$scope', '$location', '$cookieStore', '$http', '$route', '$localStorage', '$window', '$uibModal', 'ModalService',
        function MainController( $rootScope, $scope, $location, $cookieStore, $http, $route, $localStorage, $window, $uibModal, ModalService) {

            $scope.searchTerm = undefined;
            $scope.searchVideos = function(event) {
                if ($scope.searchTerm) {
                    if (event) {
                        if (event.keyCode == 13) {
                            $location.path( "/search/"+$scope.searchTerm);
                        }
                    } else {
                            $location.path( "/search/"+$scope.searchTerm);
                    }
                }
            }
            $scope.menuList = false;

            $scope.isLoggedIn = true;

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
                if($scope.isLoggedIn){
                    $location.path('/profile');
                }else{
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
                console.log('signup');
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
