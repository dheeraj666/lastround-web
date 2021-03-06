(function () {
    'use strict';
    var globalConstant = {
        BaseUrl: '/api/',
        MEDIA: '/api/',
        // rootUrl: 'http://localhost:3003/',
        rootUrl: 'https://lastroundtv.com/',
        // BaseUrl: 'http://13.59.58.222:5000/',
        // MEDIA: 'http://13.59.58.222:5000/',
        media_url: '5d5dda60b332f.streamlock.net/',
        s3_region: 'ap-south-1',
        s3_IdentityPoolId: 'ap-south-1:c6a6208e-70ac-45a8-aaa1-807c7d9a7b3d',
        s3_bucketName: 'lrtv-new-media-bucket',
        s3_url: 'https://lrtv-new-media-bucket.s3.ap-south-1.amazonaws.com/',
        s3_resize_url: 'https://jw1w8011oi.execute-api.ap-south-1.amazonaws.com/production/',
        clientId: "369266544331-rc14qermj0ks75cfr5icv2f75fh0cbi1.apps.googleusercontent.com"

        // s3_region: 'us-east-2',
        // s3_IdentityPoolId: 'us-east-2:40c362c3-1750-4243-9f69-77a373c025fb',
        // s3_bucketName: 'wowza-live-stream',
        // s3_url: 'https://wowza-live-stream.s3.us-east-2.amazonaws.com/'
    };
    var app = angular
        .module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngStorage', 'ui.bootstrap', 'toaster', 'angularModalService', 'pascalprecht.translate', 'ngMeta'])
        .config(config)
        .run(['ngMeta', function (ngMeta) {
            ngMeta.init();
        }])
        // .run(run)
        .constant('API', globalConstant)
        // http interceptor to handle redirection to login on 401 response from API
        .factory('httpResponseInterceptor', ['$q', '$cookies', '$rootScope', '$location', function ($q, $cookies, $rootScope, $location) {
            return {
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        // Something like below:
                        // AuthenService.clearAuthen();
                        $cookies.remove('_lrtk');
                        $cookies.remove('isSubscribed');
                        $rootScope.isSubscribed = false;
                        $rootScope.isLoggedIn = false;
                        $rootScope.userAccessToken = '';
                        $location.url('/');
                    }
                    return $q.reject(rejection);
                }
            };
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
        }])
    // .directive('googleSignInButton', function () {
    //     return {
    //         scope: {
    //             check: '=',
    //             gClientId: '@',
    //             callback: '&onSignIn'
    //         },
    //         template: '<li ng-click="onSignInButtonClick()"><img src="assets/img/icons/google.png"></li>',
    //         controller: ['$scope', '$attrs', function ($scope, $attrs) {
    //             gapi.load('auth2', function () {//load in the auth2 api's, without it gapi.auth2 will be undefined
    //                 gapi.auth2.init(
    //                     {
    //                         client_id: '369266544331-rc14qermj0ks75cfr5icv2f75fh0cbi1.apps.googleusercontent.com'
    //                         //'947153249370-6aug1einbj3u3n452beaff3o4h621adb.apps.googleusercontent.com'// $attrs.gClientId
    //                     }
    //                 );
    //                 var GoogleAuth = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
    //                 $scope.onSignInButtonClick = function () {//add a function to the controller so ng-click can bind to it
    //                     GoogleAuth.signIn().then(function (response) {//request to sign in
    //                         $scope.callback({ response: response });
    //                     });
    //                 };
    //             });
    //         }]
    //     };
    // });

    config.$inject = ['$routeProvider', '$httpProvider', '$translateProvider', '$compileProvider', '$locationProvider', 'ngMetaProvider'];
    function config($routeProvider, $httpProvider, $translateProvider, $compileProvider, $locationProvider, ngMetaProvider) {
        $httpProvider.interceptors.push('httpResponseInterceptor');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
        // for language
        angular.lowercase = angular.$$lowercase;
        var en_translations = {
            "home": "Home",
            "upcoming_events": "Upcoming Events",
            "catchup": "Recent fights",
            "live": "Live",
            "featured": 'Featured',
            "subscription": "Subscription",
            "about": "About",
            "contact_us": "Contact us",
            "events": "Events",
            "sign_up": "Sign up",
            "live_tv": "Live TV",
            "views": "Views",
            "live_events": "Live Events",
            "about_us_content": "Welcome to Last Round TV. We are a subscription service that provides subscribers with access to Boxing and MMA events from around the world streamed to a range of devices including internet-connected TVs, computers and other platforms(Last Round TV Service). To enhance your enjoyment of the Last Round TV Service.",
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
            "become_influencer_text": "Become a influencer",
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
            "termofuse": "Terms Of Use",
            "price_month": "All for $1.99/month",
            "price_year": "$21.95/year, exclusively on Last RoundTV",
            "feedback": "Feedback",
            "send_feedback": "Give us feedback!",
            "cover_letter": "Cover Letter",
            "facebook_url": "Facebook Url",
            "instagram_url": "Instagram Url",
            "twitter_url": "Twitter Url",
            "youtube_url": "Youtube Url",
            "short_video": "Short Video",
            "verify_success_head": 'Verify Email Address',
            "location": "Location",
            "subscription_required": "Subscription Required!",
            "subscription_required_desc": "In order to watch recent fights and live video you need to subscribed",
            "verify_success": 'You have successfully verified your email address! Thank you for your request, we will respond as soon as possible!',
            'help_contact': `Last Round TV welcomes your questions or comments regarding the Terms.
                            Email address: LastRoundTV2@gmail.com.
                            Effective as of April 11, 2019`
        }

        var sp_translations = {
            "home": "Casa",
            "upcoming_events": "Próximos Eventos",
            "catchup": "Peleas recientes",
            "live": "En Vivo",
            "featured": 'Destacado',
            "subscription": "Suscripción",
            "about": "Acerca de",
            "contact_us": "Contáctenos",
            "events": "Eventos",
            "sign_up": "Regístrate",
            "live_tv": "TV en vivo",
            "views": "Ver",
            "live_events": "Eventos en vivo",
            "about_us_content": "Bienvenido a Last Round TV. Somos un servicio de suscripción que brinda a los suscriptores acceso a eventos de boxeo y MMA de todo el mundo transmitidos a una amplia gama de dispositivos, incluidos televisores, computadoras y otras plataformas conectadas a Internet (servicio Last Round TV). Para mejorar su disfrute del servicio Last Round TV.",
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
            "become_influencer_text": "Conviértete en un influencer",
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
            "termofuse": "Términos de Uso",
            "price_month": "Todo por $1.99/mes",
            "price_year": "$21.95/año, exclusivamente en Last RoundTV",
            "feedback": "Realimentación",
            "send_feedback": "Danos su opinión!",
            "cover_letter": "Cover Letter",
            "facebook_url": "Facebook Url",
            "instagram_url": "Instagram Url",
            "twitter_url": "Twitter Url",
            "youtube_url": "Youtube Url",
            "short_video": "Video corto",
            "location": "Ubicación",
            "subscription_required": "Se requiere suscripción!",
            "subscription_required_desc": "Para ver peleas recientes y videos en vivo necesitas suscribirte",
            "verify_success_head": 'Confirme su dirección de correo electrónico',
            "verify_success": '¡Has verificado con éxito tu dirección de correo electrónico! ¡Gracias por su solicitud, le responderemos lo antes posible!',
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
                requireLogin: true,
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
                requireLogin: true,
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
                requireLogin: true,
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
                requireLogin: true,
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
                requireLogin: true,
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
                requireLogin: true,
                cache: false,
                controller: 'SearchController',
                templateUrl: 'views/search.view.html'
            })
            .when('/share/:id', {
                cache: false,
                controller: 'ShareController',
                templateUrl: 'views/share.view.html',
                meta: {
                    'title': 'Share Event ',
                    'description': 'Share Event Last Round TV.',
                    'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                    'og:url': 'https://lastroundtv.com/'
                }
            })
            .when('/terms-of-use', {
                cache: false,
                controller: 'TermController',
                templateUrl: 'views/term.view.html',
                meta: {
                    'title': 'Terms of Use',
                    'description': 'Terms of Use | Last Round TV.',
                    'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                    'og:url': 'https://lastroundtv.com/#!/terms-of-use'
                }
            })
            .when('/feedback', {
                cache: false,
                controller: 'FeedbackController',
                templateUrl: 'views/feedback.view.html',
                meta: {
                    'title': 'Feedback',
                    'description': 'Feedback',
                    'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                    'og:url': 'https://lastroundtv.com/#!/feedback'
                }
            })
            .when('/verify/influencer/:id', {
                cache: false,
                controller: '_VerifyInfluencerEmailController',
                templateUrl: 'views/verifysuccess.view.html',
                meta: {
                    'title': 'Verify Email Address',
                    'description': 'Verify Email Address',
                    'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                    'og:url': 'https://lastroundtv.com/#!/verify/influencer/:id'
                }
            })
            .when('/auth-apple', {
                cache: false,
                controller: 'AuthAppleController',
                templateUrl: 'views/authApple.view.html',
                meta: {
                    'title': 'Apple Sign In',
                    'description': 'Apple Sign In',
                    'og:image': 'https://lastroundtv.com/assets/img/logo.jpeg',
                    'og:url': 'https://lastroundtv.com/#!/auth-apple'
                }
            })



            .otherwise({ redirectTo: '/' });
        ngMetaProvider.useTitleSuffix(true);
        ngMetaProvider.setDefaultTag('og:type', 'object')
        ngMetaProvider.setDefaultTag('og:site_name', 'LastRoundTV')
        ngMetaProvider.setDefaultTitleSuffix(' | LastRoundTV.com');
        // $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix("!");
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    app.controller('MainController', ['$rootScope', '$scope', '$location', '$cookieStore', '$http', '$route', '$localStorage', '$window', '$uibModal', 'ModalService', '$translate', 'API', 'toaster', '$httpParamSerializer', 'ngMeta', 'AuthenService', 'PreloadingService',
        function MainController($rootScope, $scope, $location, $cookieStore, $http, $route, $localStorage, $window, $uibModal, ModalService, $translate, API, toaster, $httpParamSerializer, ngMeta, AuthenService, PreloadingService) {
            $scope.check = {
                agree: false
            }
            $scope.$on("forgot_passs", function () {
                resetPassword()
            });
            $rootScope.$on("signup_required", function () {
                signup()
            });
            $rootScope.$on("submit_login", function (event, login_details) {
                submitLoginForm(login_details)
            });
            $rootScope.$on("$routeChangeStart", function (event, currentRoute, previousRoute, c, d, e, f) {
                let isAuthen = AuthenService.isAuthen();
                if (currentRoute.$$route.requireLogin) {
                    if (!isAuthen) {
                        location.href = '/#!'
                    }
                }
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

            $scope.changeSiteLang = function () {
                if ($scope.changeLang == true) {
                    $rootScope.changedLang = true;
                    $translate.use('sp');
                } else {
                    $rootScope.changedLang = false;
                    $translate.use('en');
                }
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
                    AuthenService.clearAuthen();
                    location.reload()
                }).catch(function (res) {
                    if (res.data && res.data.message)
                        toaster.pop('error', res.data.message)
                    AuthenService.clearAuthen();
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
                            toaster.pop('success', 'Please check your email inbox after a few minutes and click the verification link to finish setting up your account.')
                        } else if (result && result.type == 'login') {
                            login()
                        }
                    });
                });
            }

            // function verifyEmail(email) {
            //     let url = API.BaseUrl + 'user/verify/email';
            //     $http.post(url, { email: email })
            //         .then(function (res) {
            //             toaster.pop('success', 'Please check your email inbox after a few minutes and click the verification link to finish setting up your account.')
            //         }).catch(function (res) {
            //             toaster.pop('error', res.data.msg)
            //         });
            // }
            //Handle Global Login
            function onLoginGoogle(response) {
                var id_token = response.getAuthResponse().id_token;
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
                        AuthenService.setAuthen(res.data.data);
                        toaster.pop('success', 'Wellcome back! ' + res.data.data.username);
                    }
                }).catch(function (res) {
                    if (res.data && res.data.msg)
                        toaster.pop('error', res.data.msg)
                });
            }
            function signOutGoogle() {
                var auth2 = gapi.auth2.getAuthInstance();
                if (auth2)
                    auth2.signOut().then(function () {
                        console.log('User signed out.');
                    });
            }
            //LOGIN APPLE
            $scope.loginAppleClick = function () {
                if (!$scope.check.agree) {
                    toaster.pop('error', 'Please read and agree to our Terms Of Use!');
                    return
                }
                // AppleID.auth.signIn();
                location.href = 'https://appleid.apple.com/auth/authorize?client_id=com.lastroundtv.lrtv&redirect_uri=https%3A%2F%2Flastroundtv.com%2F%23!%2Fauth-apple&response_type=code&response_mode=query&v=1.4.1'
                // const buttonElement = document.getElementById('appleid-signin');
                // buttonElement.addEventListener('click', () => {
                // });
            }
            //LOGIN FACEBOOK
            $scope.fbLogin = function () {
                if (!$scope.check.agree) {
                    toaster.pop('error', 'Please read and agree to our Terms Of Use!');
                    return
                }
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
            function initGoogle() {
                gapi.load('auth2', function () {
                    //load in the auth2 api's, without it gapi.auth2 will be undefined
                    gapi.auth2.init(
                        {
                            client_id: globalConstant.clientId
                        }
                    );

                });
            }
            $scope.onSignInButtonClick = function () {
                //add a function to the controller so ng-click can bind to it
                //get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
                if (!$scope.check.agree) {
                    toaster.pop('error', 'Please read and agree to our Terms Of Use!');
                    return
                }
                var GoogleAuth = gapi.auth2.getAuthInstance();
                GoogleAuth.signIn().then(function (response) {//request to sign in
                    onLoginGoogle(response);
                });
            };
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
                            AuthenService.setAuthen(res.data.data);
                            toaster.pop('success', 'Wellcome back! ' + res.data.data.username);
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

                PreloadingService.loadStart()
                $http({
                    url: API.BaseUrl + 'login',
                    method: 'POST',
                    data: $httpParamSerializer(login_details), // Make sure to inject the service you choose to the controller
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Note the appropriate header
                        'Authorization': 'Basic VFY6TFVJU1RWQDEyMw=='
                    }
                }).then(function (res) {
                    PreloadingService.loadEnd()
                    if (res.data.status == 1) {
                        AuthenService.setAuthen(res.data.data);
                        toaster.pop('success', 'Wellcome back! ' + res.data.data.username);
                        $scope.$broadcast('loadHome')
                    }
                }).catch(function (res) {
                    PreloadingService.loadEnd()
                    if (res.data.status == 405) {
                        ModalService.showModal({
                            templateUrl: "views/modal/verify.modal.html",
                            controller: "VerifyEmailController",
                            inputs: {
                                email: login.username
                            }
                        }).then(function (modal) {
                            modal.close.then(function (result) {
                                if (result && result.type == 'success') {
                                    toaster.pop('success', result.message)
                                }
                            });
                        });
                    }
                    else {
                        toaster.pop('error', res.data.msg)
                    }
                });
            }
            angular.element(document).ready(function () {
                setTimeout(function () {
                    initGoogle()
                }, 3000)
            })
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
