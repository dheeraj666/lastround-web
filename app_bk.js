(function () {
    'use strict';

    var app = angular
        .module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngTable', 'ngFileUpload', 'ui.bootstrap', 'toaster', 'angularModalService','pascalprecht.translate'])
        .config(config)
        .run(run)
        .constant('API', { 
            BaseUrl: 'http://13.59.58.222:5000/',
            MEDIA: 'http://13.59.58.222:5000/',

            s3_region: 'us-east-2',
            s3_IdentityPoolId: 'us-east-2:40c362c3-1750-4243-9f69-77a373c025fb',
            s3_bucketName: 'wowza-live-stream',
            s3_url: 'https://wowza-live-stream.s3.us-east-2.amazonaws.com'
        })
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

        config.$inject = ['$routeProvider', '$httpProvider','$translateProvider','$compileProvider'];
        function config($routeProvider, $httpProvider, $translateProvider, $compileProvider) {

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
            // for language
            angular.lowercase = angular.$$lowercase; 
            var en_translations = {
                "home":"Home",
                "upcoming_events":"Upcoming Events",
                "catchup":"Catchup",
                "live":"Live",
                "subscription":"Subscription",
                "about":"About",
                "contact_us":"Contact us",
                "events":"Events",
                "sign_up":"Sign up",
                "live_tv":"Live TV",
                "views":"Views",
                "live_events":"Live Events"
            }
              
            var sp_translations = {
                "home":"casa",
                "upcoming_events":"Próximos Eventos",
                "catchup":"Alcanzar",
                "live":"Vivir",
                "subscription":"Suscripción",
                "about":"Acerca de",
                "contact_us":"Contáctenos",
                "events":"Eventos",
                "sign_up":"Regístrate",
                "live_tv":"TV en vivo",
                "views":"Ver",
                "live_events":"Eventos en vivo"
            }
              
            $translateProvider.translations('en',en_translations);
             
            $translateProvider.translations('sp',sp_translations);
              
            $translateProvider.preferredLanguage('en');
            // ends here ~ for language


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

        app.controller('MainController', [ '$rootScope', '$scope', '$location', '$cookieStore', '$http', '$route', '$localStorage', '$window', '$uibModal', 'ModalService','$translate', 'API', 
        function MainController( $rootScope, $scope, $location, $cookieStore, $http, $route, $localStorage, $window, $uibModal, ModalService, $translate, API) {


            /* aws configuration */

//             AWS.config.update({
//               region: API.s3_region,
//               credentials: new AWS.CognitoIdentityCredentials({
//                 IdentityPoolId: 'us-east-2:40c362c3-1750-4243-9f69-77a373c025fb'
//               })
//             });

//             console.log(API.s3_region, ' < > ', API.s3_IdentityPoolId, ' > < ', API.s3_bucketName)



//             $rootScope.s3 = new AWS.S3({
//               apiVersion: '2006-03-01',
//               params: {Bucket: API.s3_bucketName, IdentityPoolId:API.s3_IdentityPoolId}
//             });
//             var cognitoidentity = new AWS.CognitoIdentity();
//             cognitoidentity.getId({IdentityPoolId:API.s3_IdentityPoolId,AccountId: '12'
// }, function(err, data) {
//               if (err) console.log(err, err.stack); // an error occurred
//               else     console.log(data);           // successful response
//             });










            // test

            //Initialize

  let cognitoIdentity = new AWS.CognitoIdentity({apiVersion: 'latest', region: API.s3_region});

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-2:40c362c3-1750-4243-9f69-77a373c025fb'});
  AWS.config.update({region: API.s3_region, accessKeyId: 'AKIAIKT6KGXSQX2A572Q', secretAccessKey: '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'})


   // AWS.config.update({
   //            region: API.s3_region,
   //            credentials: new AWS.CognitoIdentityCredentials({
   //              IdentityPoolId: 'us-east-2:40c362c3-1750-4243-9f69-77a373c025fb'
   //            })
   //          });

      $rootScope.s3 = new AWS.S3({
              apiVersion: 'latest',
              params: {Bucket: API.s3_bucketName}
            });


//Setup params for authentication

  var params = {
        IdentityId: 'us-east-2:40c362c3-1750-4243-9f69-77a373c025fc'
        
    }
//Get credentials for user

  cognitoIdentity.getCredentialsForIdentity(params, function(err, data) {
        //log error or sucessful response
        if (err){
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
        }
    });

            // ends here ~ test












            // console.log(AWS.config.credentials.IdentityPoolId = 'sad')

            // AWS.config.credentials.get(function(err) {
            //   if (err) console.log('err>> ',err);
            //   else console.log('success > >', AWS.config.credentials);
            // });


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

            // $rootScope.isLoggedIn = true;
            $rootScope.userAccessToken = window.localStorage.getItem('accessToken')
            if($rootScope.userAccessToken == undefined || $rootScope.userAccessToken == '' || $rootScope.userAccessToken == null) {
                $rootScope.isLoggedIn = false;
                $rootScope.isSubscribe = false;
            } else {
                $rootScope.isSubscribed = window.localStorage.getItem('isSubscribed', $rootScope.isSubscribed);
                 $rootScope.isLoggedIn = true;
            }

            console.log($rootScope.userAccessToken)

            $rootScope.$watch('isLoggedIn',function(old, newval){
                console.log(old, ' >< ',newval)
            })



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
                if($rootScope.isLoggedIn){
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

          
            $scope.changeSiteLang = function(){
                if($scope.changeLang == true) {
                    $translate.use('sp'); 
                } else {
                    $translate.use('en');
                }
            }
            $rootScope.stripe = Stripe('pk_test_kf5zrUhdgxmHarP0fvs9IdVJ00RXOpmrnn');
           


        }]);

})();
