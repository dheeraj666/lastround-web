(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', 'countryList', 'QueryService', 'API', 'ModalService', '$http', '$timeout'];
    function HomeController($rootScope, $scope, countryList, QueryService, API, ModalService, $http, $timeout) {

        $scope.$on('loadHome', function () {
            fetchVideoData()
        })
        $scope.resetPassClick = function () {
            $scope.$emit("forgot_passs", '');
        }
        $scope.signUpClick = function () {
            $scope.$emit("signup_required", '');
        }
        $scope.submitLogin = function () {
            let login_details = {
                username: $scope.login.username,
                password: $scope.login.password,
                grant_type: 'password',
                userType: '1'
            }
            $scope.$emit('submit_login', login_details)
        }
        function slider() {
            setTimeout(function () {
                var owl = $(".slider-carousel");
                owl.owlCarousel({
                    loop: true,
                    margin: 0,
                    responsiveClass: true,
                    navigation: true,
                    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                    nav: false,
                    items: 1,
                    smartSpeed: 500,
                    dots: true,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    center: false,
                    animateIn: 'fadeIn',
                    animateOut: 'fadeOut',
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        760: {
                            items: 1
                        }
                    }
                });
                topMovieCarousel();
                umsCarousel();
                tabCarousel();
            }, 0);
        }

        function topMovieCarousel() {
            var owl = $(".top-movie-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
                nav: false,
                items: 2,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 2
                    },
                    480: {
                        items: 2
                    },
                    760: {
                        items: 2
                    },
                    992: {
                        items: 2
                    },
                }
            });
        }

        function umsCarousel() {
            var owl = $(".ums-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
                nav: true,
                items: 2,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 2
                    },
                    480: {
                        items: 2
                    },
                    760: {
                        items: 2
                    },
                    992: {
                        items: 2
                    },
                }
            });
        }

        function tabCarousel() {
            var owl = $(".tab-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
                nav: true,
                items: 2,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 2
                    },
                    480: {
                        items: 2
                    },
                    760: {
                        items: 2
                    },
                    992: {
                        items: 2
                    },
                }
            });
        }

        function fetchVideoData() {
            var authentk = $rootScope.userAccessToken;
            if (!authentk)
                return
            $http.get(API.BaseUrl + 'get/events/home', {
                params: {
                    page: 1, limit: 5
                },
                headers: {
                    'Authorization': 'Bearer ' + authentk,
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                    $scope.videoList = res.data.data;
                    slider();
                    $('#preloader').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }).catch(function (res) {
                    if (res.data.status == 401 && res.data.name == "invalid_token" && $rootScope.isLoggedIn) {
                        $scope.$emit("login_required", '');
                    }
                });
        }


        $scope.playVideo = function (videoObject, ignordAd) {
            ModalService.showModal({
                templateUrl: "views/modal/generic-player.modal.html",
                controller: "GenericVideoPlayer",
                inputs: {
                    videoObject: {
                        videoLink: videoObject.event_trailer,
                        description: videoObject.description,
                        title: videoObject.event_name,
                        channelName: videoObject.channel_category.name,
                        channelAdmin: videoObject.channel_admin,
                        startTime: videoObject.start_time,
                        ads: ignordAd ? null : videoObject.advertisements,
                        id: videoObject._id,
                        isHome: true
                    }
                }
            }).then(function (modal) {
                modal.close.then(function (res) {
                });
            });
        }

        $scope.playLiveVideo = function (videoObject) {
            ModalService.showModal({
                templateUrl: "views/modal/player.modal.html",
                controller: "PlayerController",
                inputs: {
                    videoLink: videoObject.live_web_url,
                    videoObject: {
                        videoLink: videoObject.live_catchup_url,
                        description: videoObject.description,
                        title: videoObject.event_name,
                        channelName: videoObject.channel_category.name,
                        channelAdmin: videoObject.channel_admin,
                        startTime: videoObject.start_time,
                        ads: videoObject.advertisements,
                        id: videoObject._id
                    }
                }
            }).then(function (modal) {
                modal.close.then(function (res) {
                    console.log(res);
                });
            });
        }

        fetchVideoData()
    }
})();

