(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', 'countryList', 'QueryService', 'API', 'ModalService', '$http', '$timeout'];
    function HomeController($rootScope, $scope, countryList, QueryService, API, ModalService, $http, $timeout) {


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

        $scope.fetchVideoData = function () {
            var authentk = window.localStorage.getItem('accessToken')
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

                    if ($scope.videoList.featuredArray.length == 3) {
                        $scope.videoList.featuredArray.push($scope.videoList.featuredArray[0])
                    }
                    if ($scope.videoList.upcomingArray.length == 3) {
                        $scope.videoList.upcomingArray.push($scope.videoList.upcomingArray[0])
                    }
                    if ($scope.videoList.liveArray.length == 3) {
                        $scope.videoList.liveArray.push($scope.videoList.liveArray[0])
                    }
                    slider();
                    $('#preloader').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }).catch(function (res) {
                    console.log('catch', res);
                });
            // $rootScope.getToken()
            //     .then(function (res) {
            //         console.log('then', res);
            //         // window.localStorage.setItem('accessToken', res.data.data.accessToken);
            //         $http.get(API.BaseUrl + 'get/events/home', {
            //             params: {
            //                 page: 1, limit: 5
            //             },
            //             headers: {
            //                 'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
            //                 'Content-Type': 'application/json'
            //             }
            //         })
            //             .then(function (res) {
            //                 $scope.videoList = res.data.data;

            //                 if ($scope.videoList.featuredArray.length == 3) {
            //                     $scope.videoList.featuredArray.push($scope.videoList.featuredArray[0])
            //                 }
            //                 if ($scope.videoList.upcomingArray.length == 3) {
            //                     $scope.videoList.upcomingArray.push($scope.videoList.upcomingArray[0])
            //                 }
            //                 if ($scope.videoList.liveArray.length == 3) {
            //                     $scope.videoList.liveArray.push($scope.videoList.liveArray[0])
            //                 }
            //                 slider();
            //                 $('#preloader').fadeOut('slow', function () {
            //                     $(this).remove();
            //                 });
            //             }).catch(function (res) {
            //                 console.log('catch', res);
            //             });
            //     }).catch(function (res) {
            //         console.log('catch', res)
            //     });


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
                        id: videoObject._id
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



        $scope.fetchVideoData();
    }
})();

