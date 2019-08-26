(function () {
    'use strict';
    var globalConstant = {
        BaseUrl: '/api/',
        MEDIA: '/api/',
        // BaseUrl: 'http://13.59.58.222:5000/',
        // MEDIA: 'http://13.59.58.222:5000/',

        s3_region: 'ap-south-1',
        s3_IdentityPoolId: 'ap-south-1:c6a6208e-70ac-45a8-aaa1-807c7d9a7b3d',
        s3_bucketName: 'lrtv-new-media-bucket',
        s3_url: 'https://lrtv-new-media-bucket.s3.ap-south-1.amazonaws.com/',

        // s3_region: 'us-east-2',
        // s3_IdentityPoolId: 'us-east-2:40c362c3-1750-4243-9f69-77a373c025fb',
        // s3_bucketName: 'wowza-live-stream',
        // s3_url: 'https://wowza-live-stream.s3.us-east-2.amazonaws.com/'
    };
    var app = angular
        .module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngTable', 'ngFileUpload', 'ui.bootstrap', 'toaster', 'angularModalService', 'pascalprecht.translate', 'ngMeta'])
        .config(config)
        .run(['ngMeta', function (ngMeta) {
            ngMeta.init();
        }])
        // .run(run)
        .constant('API', globalConstant)
        .service('countryList', ['$http', function ($http) {
            return $http.get('assets/json/countries.json');
        }])
        .directive('fileInput', ['$parse', function ($parse) {
            return {
                $scope: {
                    fileinput: '=',
                    filepreview: '='
                },
                link: function ($scope, element, attribute) {
                    element.bind('change', function (changeEvent) {
                        $scope.fileinput = changeEvent.target.files[0];
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            $scope.$apply(function () {
                                $scope.filepreview = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL($scope.fileinput);
                        $scope.name = $scope.fileinput.name;
                        $scope.size = $scope.fileinput.size;
                    })
                }
            }
        }]).directive('googleSignInButton', function () {
            return {
                scope: {
                    gClientId: '@',
                    callback: '&onSignIn'
                },
                template: '<li ng-click="onSignInButtonClick()"><img src="assets/img/icons/google.png"></li>',
                controller: ['$scope', '$attrs', function ($scope, $attrs) {
                    gapi.load('auth2', function () {//load in the auth2 api's, without it gapi.auth2 will be undefined
                        gapi.auth2.init(
                            {
                                client_id: '947153249370-6aug1einbj3u3n452beaff3o4h621adb.apps.googleusercontent.com'// $attrs.gClientId
                            }
                        );
                        var GoogleAuth = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
                        $scope.onSignInButtonClick = function () {//add a function to the controller so ng-click can bind to it
                            GoogleAuth.signIn().then(function (response) {//request to sign in
                                console.log('response')
                                $scope.callback({ response: response });
                            });
                        };
                    });
                }]
            };
        });;

    config.$inject = ['$routeProvider', '$httpProvider', '$translateProvider', '$compileProvider', '$locationProvider', 'ngMetaProvider'];
    function config($routeProvider, $httpProvider, $translateProvider, $compileProvider, $locationProvider, ngMetaProvider) {

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
        // for language
        angular.lowercase = angular.$$lowercase;
        var en_translations = {
            "home": "Home",
            "upcoming_events": "Upcoming Events",
            "catchup": "Catchup",
            "live": "Live",
            "subscription": "Subscription",
            "about": "About",
            "contact_us": "Contact us",
            "events": "Events",
            "sign_up": "Sign up",
            "live_tv": "Live TV",
            "views": "Views",
            "live_events": "Live Events",
            "about_us_content": "Welcome to Last Round TV. We are a subscription service that provides subscribers with access to a wide range of sporting events from around the world streamed to a range of devices including internet-connected TVs, computers and other platforms(Last Round TV Service). To enhance your enjoyment of the Last Round TV Service, we will also provide recommendations of broadcasts you might be interested in and other interesting sports information.",
            "name": "Name",
            "country": "Country",
            "email": "Email",
            "state": "State",
            "password": "Password",
            "current_password": "Current Password",
            "new_password": "New Password",
            "city": "City",
            "referral_code": "Referral Code",
            "select_country": "Select Country",
            "select_state": "Select State",
            "select_city": "Select City",
            "sign_in": "Sign In",
            "already_have_account_text": "Already have an account",
            "become_member_text": "Become a member",
            "category": "Category",
            "select_category": "Select Category",
            "channel_name": "Channel Name",
            "contact_number": "Contact Number",
            "request": "Request",
            "login": "Login",
            "forgot_password": "Forgot Password",
            "dont_have_acc_text": "Don't have an account",
            "create_new_one": "Create one now",
            "office_address": "Office Address",
            "mobile": "Mobile",
            "fax": "Fax",
            "email_address": "Email Address",
            "subject": "Subject",
            "message": "Message",
            "submit": "Submit",
            "profile": "Profile",
            "save_profile": "Save Profile",
            "logout": "Logout",
            "return": "Return",
            'help_contact': `Last Round TV welcomes your questions or comments regarding the Terms.
                            Email address: LastRoundTV2@gmail.com.
                            Effective as of April 11, 2019`
        }

        var sp_translations = {
            "home": "Casa",
            "upcoming_events": "Próximos Eventos",
            "catchup": "Alcanzar",
            "live": "Vivir",
            "subscription": "Suscripción",
            "about": "Acerca de",
            "contact_us": "Contáctenos",
            "events": "Eventos",
            "sign_up": "Regístrate",
            "live_tv": "TV en vivo",
            "views": "Ver",
            "live_events": "Eventos en vivo",
            "about_us_content": "Bienvenido a Last Round TV. Somos un servicio de suscripción que brinda a los suscriptores acceso a una amplia gama de eventos deportivos de todo el mundo transmitidos a una amplia gama de dispositivos, incluidos televisores, computadoras y otras plataformas conectadas a Internet (servicio Last Round TV). Para mejorar su disfrute del servicio Last Round TV, también le proporcionaremos recomendaciones de transmisiones que podrían interesarle y otra información deportiva interesante.",
            "name": "Nombre",
            "country": "País",
            "email": "Email",
            "state": "Estado",
            "password": "Contraseña",
            "current_password": "contraseña actual",
            "new_password": "nueva contraseña",
            "city": "Ciudad",
            "referral_code": "código de referencia",
            "select_country": "Seleccionar país",
            "select_state": "Seleccione estado",
            "select_city": "Ciudad selecta",
            "sign_in": "Registrarse",
            "already_have_account_text": "Ya tienes una cuenta",
            "become_member_text": "Hazte miembro",
            "category": "Categoría",
            "select_category": "selecciona una categoría",
            "channel_name": "Nombre del Canal",
            "contact_number": "Número de contacto",
            "request": "Solicitud",
            "login": "Iniciar sesión",
            "forgot_password": "Se te olvidó tu contraseña",
            "dont_have_acc_text": "No tengo una cuenta",
            "create_new_one": "Crear una ahora",
            "office_address": "Dirección de la oficina",
            "mobile": "Móvil",
            "fax": "Fax",
            "email_address": "Dirección de correo electrónico",
            "subject": "Tema",
            "message": "Mensaje",
            "submit": "Enviar",
            "profile": "Perfil",
            "save_profile": "Guardar perfil",
            "logout": "Logout",
            "return": "Regreso",
            'help_contact': 'Last Round TV agradece sus preguntas o comentarios sobre los Términos. Dirección de correo electrónico: LastRoundTV2@gmail.com. En vigencia a partir del 11 de abril de 2019'
        }

        $translateProvider.translations('en', en_translations);

        $translateProvider.translations('sp', sp_translations);

        $translateProvider.preferredLanguage('en');
        // ends here ~ for language


        $routeProvider

            .when('/', {
                cache: false,
                controller: 'HomeController',
                templateUrl: 'views/home.view.html',
                data: {
                    meta: {
                        'title': 'Last Round TV',
                        'description': 'Welcome to Last Round TV',
                        'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                        'og:url': 'https://lastroundtv.com/'
                    }
                }
            })
            .when('/events', {
                cache: false,
                controller: 'EventsController',
                templateUrl: 'views/events.view.html',
                data: {
                    meta: {
                        'title': 'Upcoming Events',
                        'description': 'List Upcoming Events ',
                        'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                        'og:url': 'https://lastroundtv.com/#!/events'
                    }
                }
            })
            .when('/catchup', {
                cache: false,
                controller: 'CatchupController',
                templateUrl: 'views/catchup.view.html',
                data: {
                    meta: {
                        'title': 'Catch Up',
                        'description': 'List Catch Up',
                        'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                        'og:url': 'https://lastroundtv.com/#!/catchup'
                    }
                }
            })
            .when('/live', {
                cache: false,
                controller: 'LiveController',
                templateUrl: 'views/live.view.html',
                data: {
                    meta: {
                        'title': 'Live Events',
                        'description': 'List Live Events',
                        'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                        'og:url': 'https://lastroundtv.com/#!/live'
                    }
                }
            })
            .when('/subscription', {
                cache: false,
                controller: 'SubscriptionController',
                templateUrl: 'views/subscription.view.html',
                data: {
                    meta: {
                        'title': 'Subscription Last Round TV',
                        'description': 'Make Subscription Last Round TV.',
                        'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                        'og:url': 'https://lastroundtv.com/#!/subscription'
                    }
                }
            })
            .when('/about', {
                cache: false,
                controller: 'AboutController',
                templateUrl: 'views/about.view.html',
                data: {
                    meta: {
                        'title': 'About US',
                        'description': 'About Last Round TV.',
                        'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                        'og:url': 'https://lastroundtv.com/#!/about'
                    }
                }
            })
            .when('/contact', {
                cache: false,
                controller: 'ContactController',
                templateUrl: 'views/contact.view.html',
                data: {
                    meta: {
                        'title': 'Contact US',
                        'description': 'Contact Last Round TV.',
                        'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                        'og:url': 'https://lastroundtv.com/#!/contact'
                    }
                }
            })
            .when('/profile', {
                cache: false,
                controller: 'ProfileController',
                templateUrl: 'views/profile.view.html',
                data: {
                    meta: {
                        'title': 'Profile',
                        'description': 'Profile Last Round TV.',
                        'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                        'og:url': 'https://lastroundtv.com/#!/contact'
                    }
                }
            })
            .when('/search/:searchTerm', {
                cache: false,
                controller: 'SearchController',
                templateUrl: 'views/search.view.html'
            })


            .otherwise({ redirectTo: '/' });
        ngMetaProvider.useTitleSuffix(true);
        ngMetaProvider.setDefaultTag('og:type', 'object')
        ngMetaProvider.setDefaultTag('og:site_name', 'LastRoundTV')
        ngMetaProvider.setDefaultTitleSuffix(' | LastRoundTV.com');

        // $locationProvider.html5Mode({
        //     enable: true,
        //     requireBase: false
        // });
        // $locationProvider.hashPrefix('');
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    app.controller('MainController', ['$rootScope', '$scope', '$location', '$cookieStore', '$http', '$route', '$localStorage', '$window', '$uibModal', 'ModalService', '$translate', 'API', 'toaster', '$httpParamSerializer', 'ngMeta',
        function MainController($rootScope, $scope, $location, $cookieStore, $http, $route, $localStorage, $window, $uibModal, ModalService, $translate, API, toaster, $httpParamSerializer, ngMeta) {

            $scope.$on("login_required", function () {
                $rootScope.isSubscribed = false;
                window.localStorage.removeItem('isSubscribed');
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('refreshToken');
                $rootScope.isLoggedIn = false;
                location.href = '/'
                // login()
            });
            $scope.$on("forgot_passs", function () {
                resetPassword()
            });
            $rootScope.$on("signup_required", function () {
                signup()
            });
            $rootScope.$on("submit_login", function (event, login_details) {
                submitLoginForm(login_details)
            });
            $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
                $("html,body").animate({ scrollTop: $("body").offset().top }, "1000");

            });
            $scope.showProfile = function () {
                if (!$scope.showprof)
                    $scope.showprof = true;
                else
                    $scope.showprof = false;
            }


            /* aws configuration */

            AWS.config.update({
                region: API.s3_region,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: API.s3_IdentityPoolId
                })
            });
            // console.log(API.s3_region, ' < > ', API.s3_IdentityPoolId, ' > < ', API.s3_bucketName)
            $rootScope.s3 = new AWS.S3({
                apiVersion: '2019-08-22',
                params: { Bucket: API.s3_bucketName, IdentityPoolId: API.s3_IdentityPoolId }
            });
            var cognitoidentity = new AWS.CognitoIdentity({ apiVersion: '2019-08-22', });
            cognitoidentity.getId({
                IdentityPoolId: API.s3_IdentityPoolId, AccountId: '12'
            }, function (err, data) {
                // if (err) console.log(err, err.stack); // an error occurred
                // else console.log(data);           // successful response
            });

            $scope.searchTerm = undefined;
            $scope.searchVideos = function (event) {
                if ($scope.searchTerm) {
                    if (event) {
                        if (event.keyCode == 13) {
                            $location.path("/search/" + $scope.searchTerm);
                        }
                    } else {
                        $location.path("/search/" + $scope.searchTerm);
                    }
                }
            }
            $scope.menuList = false;

            // $rootScope.isLoggedIn = true;
            $rootScope.userAccessToken = window.localStorage.getItem('accessToken')
            if ($rootScope.userAccessToken == undefined || $rootScope.userAccessToken == '' || $rootScope.userAccessToken == null) {
                $rootScope.isLoggedIn = false;
                $rootScope.isSubscribe = false;
            } else {
                let sub = window.localStorage.getItem('isSubscribed', $rootScope.isSubscribed);
                if (sub == 'true')
                    $rootScope.isSubscribed = true;
                else
                    $rootScope.isSubscribed = false;
                $rootScope.isLoggedIn = true;
            }

            $rootScope.$watch('isLoggedIn', function (old, newval) {
                console.log(old, ' >< ', newval)
            })



            $('#preloader').fadeOut('slow', function () {
                $(this).remove();
            });

            $scope.showMenu = function () {
                if ($scope.menuList) {
                    $scope.menuList = false;
                } else {
                    $scope.menuList = true;
                }

            }
            $scope.logout = function () {
                $http({
                    url: API.BaseUrl + 'user/logout',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', // Note the appropriate header
                        'Authorization': 'Bearer ' + $rootScope.userAccessToken
                    }
                }).then(function (res) {
                    window.localStorage.removeItem('isSubscribed');
                    window.localStorage.removeItem('accessToken');
                    window.localStorage.removeItem('refreshToken');
                    location.reload()
                }).catch(function (res) {
                    if (res.data && res.data.message)
                        toaster.pop('error', res.data.message)
                    location.reload()
                });
                logOutFBUser();
                signOutGoogle();
            }
            $scope.login = login;
            function login() {
                ModalService.showModal({
                    templateUrl: "views/modal/login.modal.html",
                    controller: "LoginController"
                }).then(function (modal) {
                    modal.close.then(function (res) {
                        if (res && res.type == "resetPass") {
                            resetPassword();
                        }
                        if (res && res.type == "signup") {
                            signup();
                        }
                    });
                });
            }

            function resetPassword() {
                ModalService.showModal({
                    templateUrl: "views/modal/resetpass.modal.html",
                    controller: "ResetpassController"
                }).then(function (modal) {
                    modal.close.then(function (res) {
                        console.log(res);
                    });
                });
            }


            $scope.signup = signup;
            function signup() {
                ModalService.showModal({
                    templateUrl: "views/modal/signup.modal.html",
                    controller: "SignupController"
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result && result.type == 'success') {
                            verifyEmail();
                        } else if (result && result.type == 'login') {
                            login()
                        }
                    });
                });
            }

            function verifyEmail() {
                ModalService.showModal({
                    templateUrl: "views/modal/verify.modal.html",
                    controller: "VerifyEmailController"
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result.type == 'success') {
                            toaster.pop('success', result.message)
                        }
                    });
                });
            }

            $scope.changeSiteLang = function () {
                if ($scope.changeLang == true) {
                    $translate.use('sp');
                } else {
                    $translate.use('en');
                }
            }
            // $rootScope.stripe = Stripe('pk_test_RgTbwK3dhNPFTVSoZw5dlM8S00PhjPvBkZ');

            //Handle Global Login
            $scope.onLoginGoogle = function (response) {
                console.log(response)
                var id_token = response.getAuthResponse().id_token;
                console.log(id_token)
                // Do whatever you need to do to authenticate on your site.
                let data = {
                    userType: 3,
                    socialIdToken: id_token
                }
                $http({
                    url: API.BaseUrl + 'login',
                    method: 'POST',
                    data: $httpParamSerializer(data), // Make sure to inject the service you choose to the controller
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Note the appropriate header
                        'Authorization': 'Basic VFY6TFVJU1RWQDEyMw=='
                    }
                }).then(function (res) {
                    if (res.data.status == 1) {
                        $rootScope.isSubscribed = res.data.data.isSubscribed;
                        window.localStorage.setItem('isSubscribed', $rootScope.isSubscribed);
                        window.localStorage.setItem('accessToken', res.data.data.accessToken);
                        window.localStorage.setItem('refreshToken', res.data.data.refreshToken);
                        $rootScope.isLoggedIn = true;
                        $rootScope.userInfo = res.data.data;
                        toaster.pop('success', 'Wellcome back! ' + res.data.data.username);
                        setTimeout(function () {
                            location.reload();
                        }, 1500)
                        $ccope.$apply();
                    }
                }).catch(function (res) {
                    if (res.data && res.data.msg)
                        toaster.pop('error', res.data.msg)
                });
            }
            function signOutGoogle() {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            }
            //LOGIN FACEBOOK
            $scope.fbLogin = function () {
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        loadFBInfoForRegister(response);
                    } else {
                        FB.login(function (response) {
                            if (response.status === 'connected') {
                                loadFBInfoForRegister(response);
                            } else {
                                console.log('not loged in');
                                console.log(response);
                            }
                        }, {
                                scope: 'public_profile,email'
                            });
                    }
                }, {
                        scope: 'email',
                        return_scopes: true
                    });

            }


            function loadFBInfoForRegister(res) {
                FB.api('/me', 'GET', {
                    fields: 'email, first_name, name, id'
                }, function (response) {
                    let data = {
                        userType: 2,
                        socialIdToken: res.authResponse.accessToken
                    }
                    $http({
                        url: API.BaseUrl + 'login',
                        method: 'POST',
                        data: $httpParamSerializer(data), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded', // Note the appropriate header
                            'Authorization': 'Basic VFY6TFVJU1RWQDEyMw=='
                        }
                    }).then(function (res) {
                        if (res.data.status == 1) {
                            $rootScope.isSubscribed = res.data.data.isSubscribed;
                            window.localStorage.setItem('isSubscribed', $rootScope.isSubscribed);
                            window.localStorage.setItem('accessToken', res.data.data.accessToken);
                            window.localStorage.setItem('refreshToken', res.data.data.refreshToken);
                            $rootScope.isLoggedIn = true;
                            $rootScope.userInfo = res.data.data;
                            toaster.pop('success', 'Wellcome back! ' + res.data.data.username);
                            setTimeout(function () {
                                location.reload();
                            }, 1500)
                            $ccope.$apply();
                        }
                    }).catch(function (res) {
                        if (res.data && res.data.msg)
                            toaster.pop('error', res.data.msg)
                    });
                });
            }

            function logOutFBUser() {
                FB.getLoginStatus(function (response) {
                    if (response && response.status === 'connected') {
                        FB.logout(function (response) {
                            console.log(response)
                        });
                    }
                });
            }

            // $scope.submitLoginForm = submitLoginForm;
            function submitLoginForm(login) {
                let login_details = {
                    username: login.username,
                    password: login.password,
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
                        $rootScope.isSubscribed = res.data.data.isSubscribed;
                        window.localStorage.setItem('isSubscribed', $rootScope.isSubscribed);
                        window.localStorage.setItem('accessToken', res.data.data.accessToken);
                        window.localStorage.setItem('refreshToken', res.data.data.refreshToken);
                        $rootScope.isLoggedIn = true;
                        $rootScope.userInfo = res.data.data;
                        toaster.pop('success', 'Wellcome back! ' + res.data.data.username);
                        setTimeout(function () {
                            location.reload();
                        }, 1500)
                        $ccope.$apply();
                    }
                }).catch(function (res) {
                    if (res.data && res.data.msg)
                        toaster.pop('error', res.data.msg)
                });
            }
        }]);

    //#region  Handle Socket
    var socket = io.connect('/', {
        path: '/api/socket.io'
    });
    socket.on('connect', function (data) {
        console.log('socket connected')
        // window.socketId = socket.id;
    });
    socket.on('play-advertisement', function (data) {
        if (window.playAdListener) {
            for (var key in window.playAdListener) {
                if (!window.playAdListener.hasOwnProperty(key)) continue;
                var obj = window.playAdListener[key];
                if (obj) {
                    obj(data)
                }
            }
        }
    })
    socket.on('stop-event', function (data) {
        if (window.stopListener) {
            for (var key in window.stopListener) {
                if (!window.stopListener.hasOwnProperty(key)) continue;
                var obj = window.stopListener[key];
                if (obj) {
                    obj(data)
                }
            }
        }
    });
    socket.on('disconnect', function () {
        console.log("client disconnected")
    })
    //#endregion End Handle Socket

})();
