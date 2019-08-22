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
        .module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngTable', 'ngFileUpload', 'ui.bootstrap', 'toaster', 'angularModalService', 'pascalprecht.translate'])
        .config(config)
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
        }]);

    config.$inject = ['$routeProvider', '$httpProvider', '$translateProvider', '$compileProvider'];
    function config($routeProvider, $httpProvider, $translateProvider, $compileProvider) {

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
            "save_profile": "Save Profile",
            "logout": "Logout",
            "return": "Return",
            'help_contact':`Last Round TV welcomes your questions or comments regarding the Terms.
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
            "save_profile": "Guardar perfil",
            "logout": "Logout",
            "return": "Regreso",
            'help_contact':'Last Round TV agradece sus preguntas o comentarios sobre los Términos. Dirección de correo electrónico: LastRoundTV2@gmail.com. En vigencia a partir del 11 de abril de 2019'
        }

        $translateProvider.translations('en', en_translations);

        $translateProvider.translations('sp', sp_translations);

        $translateProvider.preferredLanguage('en');
        // ends here ~ for language


        $routeProvider

            .when('/', {
                cache: false,
                controller: 'HomeController',
                templateUrl: 'views/home.view.html'
            })
            .when('/events', {
                cache: false,
                controller: 'EventsController',
                templateUrl: 'views/events.view.html'
            })
            .when('/catchup', {
                cache: false,
                controller: 'CatchupController',
                templateUrl: 'views/catchup.view.html'
            })
            .when('/live', {
                cache: false,
                controller: 'LiveController',
                templateUrl: 'views/live.view.html'
            })
            .when('/subscription', {
                cache: false,
                controller: 'SubscriptionController',
                templateUrl: 'views/subscription.view.html'
            })
            .when('/about', {
                cache: false,
                controller: 'AboutController',
                templateUrl: 'views/about.view.html'
            })
            .when('/contact', {
                cache: false,
                controller: 'ContactController',
                templateUrl: 'views/contact.view.html'
            })
            .when('/profile', {
                cache: false,
                controller: 'ProfileController',
                templateUrl: 'views/profile.view.html'
            })
            .when('/search/:searchTerm', {
                cache: false,
                controller: 'SearchController',
                templateUrl: 'views/search.view.html'
            })


            .otherwise({ redirectTo: '/' });

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

    // run.$inject = ['$http', '$rootScope', 'API', '$httpParamSerializer'];
    // function run($http, $rootScope, API, $httpParamSerializer) {
    //     $rootScope.getToken = function () {
    //         let login_details = {
    //             username: 'superadmin@gmail.com',
    //             password: '123',
    //             grant_type: 'password',
    //             userType: '1'
    //         }

    //         return $http({
    //             url: API.BaseUrl + 'login',
    //             method: 'POST',
    //             data: $httpParamSerializer(login_details), // Make sure to inject the service you choose to the controller
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded', // Note the appropriate header
    //                 'Authorization': 'Basic VFY6TFVJU1RWQDEyMw=='
    //             }
    //         });
    //         return Promise.resolve()
    //     }
    // }

    app.controller('MainController', ['$rootScope', '$scope', '$location', '$cookieStore', '$http', '$route', '$localStorage', '$window', '$uibModal', 'ModalService', '$translate', 'API', 'toaster', '$httpParamSerializer',
        function MainController($rootScope, $scope, $location, $cookieStore, $http, $route, $localStorage, $window, $uibModal, ModalService, $translate, API, toaster, $httpParamSerializer) {
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
            $scope.$on("signup_required", function () {
                signup()
            });
            $scope.$on("submit_login", function (event, login_details) {
                submitLoginForm(login_details)
            });




            /* aws configuration */

            AWS.config.update({
                region: API.s3_region,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: API.s3_IdentityPoolId
                })
            });
            console.log(API.s3_region, ' < > ', API.s3_IdentityPoolId, ' > < ', API.s3_bucketName)
            $rootScope.s3 = new AWS.S3({
                apiVersion: '2019-08-22',
                params: { Bucket: API.s3_bucketName, IdentityPoolId: API.s3_IdentityPoolId }
            });
            var cognitoidentity = new AWS.CognitoIdentity({ apiVersion: '2019-08-22', });
            cognitoidentity.getId({
                IdentityPoolId: API.s3_IdentityPoolId, AccountId: '12'
            }, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log(data);           // successful response
            });










            // test

            //Initialize

            // let cognitoIdentity = new AWS.CognitoIdentity({ apiVersion: 'latest', region: API.s3_region });

            // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            //     IdentityPoolId: API.s3_IdentityPoolId
            // });
            // AWS.config.update({
            //     region: API.s3_region,
            //     accessKeyId: 'AKIAIKT6KGXSQX2A572Q',
            //     secretAccessKey: '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'
            // })
            // // AWS.config.update({
            // //            region: API.s3_region,
            // //            credentials: new AWS.CognitoIdentityCredentials({
            // //              IdentityPoolId:  API.s3_IdentityPoolId
            // //            })
            // //          });

            // $rootScope.s3 = new AWS.S3({
            //     apiVersion: 'latest',
            //     params: { Bucket: API.s3_bucketName }
            // });

            // //Setup params for authentication

            // let params = {
            //     IdentityId: 'us-east-2:40c362c3-1750-4243-9f69-77a373c025fb'// API.s3_IdentityPoolId,
            // }
            // // Get credentials for user

            // cognitoIdentity.getCredentialsForIdentity(params, function (err, data) {
            //     //log error or sucessful response
            //     if (err) {
            //         console.log(err, err.stack); // an error occurred
            //     }
            //     else {
            //         console.log(data);           // successful response
            //     }
            // });
            // ends here ~ test












            // console.log(AWS.config.credentials.IdentityPoolId = 'sad')

            // AWS.config.credentials.get(function(err) {
            //   if (err) console.log('err>> ',err);
            //   else console.log('success > >', AWS.config.credentials);
            // });


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
                        $rootScope.isLoggedIn = true;
                        toaster.pop('success', 'Wellcome back! ' + res.data.data.username);
                        setTimeout(function () {
                            location.reload();
                        }, 1000)
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
