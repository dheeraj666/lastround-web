(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', 'countryList', 'QueryService', 'API', 'ModalService', '$http', '$timeout'];
    function HomeController($rootScope, $scope, countryList, QueryService, API, ModalService, $http, $timeout) {

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
            return
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

                    // if ($scope.videoList.featuredArray.length == 3) {
                    //     $scope.videoList.featuredArray.push($scope.videoList.featuredArray[0])
                    // }
                    // if ($scope.videoList.upcomingArray.length == 3) {
                    //     $scope.videoList.upcomingArray.push($scope.videoList.upcomingArray[0])
                    // }
                    // if ($scope.videoList.liveArray.length == 3) {
                    //     $scope.videoList.liveArray.push($scope.videoList.liveArray[0])
                    // }
                    // $scope.videoList.upcomingArray = $scope.videoList.liveArray;
                    // var a = {
                    //     "live_catchup_url": "https://lrtv-data-bucket.s3.eu-west-2.amazonaws.com/dheerajLive1.mp4",
                    //     "isSAdminApproved": true,
                    //     "isSAdminDisApproved": false,
                    //     "event_location": "india",
                    //     "section": "upcoming",
                    //     "is_featured": false,
                    //     "advertisements": [{
                    //         "_id": "5cf7bc42697ee776df855935",
                    //         "name": "New ad",
                    //         "media_url": "https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/165979174_1559739373.mp4"
                    //     }, { "_id": "5cf7bf7b697ee776df85593d", "name": "New ad 3", "media_url": "https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/139754109_1559740242.mp4" },
                    //     { "_id": "5cf7be2c697dee776df855939", "name": "New Ad 2", "media_url": "https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/782521913_1559739842.mp4" }], "_id": "5d6383d5b053a6408578aea1", "event_thumbnail": "https://lrtv-new-media-bucket.s3.ap-south-1.amazonaws.com/event_thumbnail/117397545_1566802864.jpg", "event_name": "Event 1", "description": "description", "start_time": "2019-08-26 12:35:06", "end_time": "2019-08-27 12:05:44", "event_trailer": "https://lrtv-new-media-bucket.s3.ap-south-1.amazonaws.com/event_trailer/230182040_1566802837.mp4", "live_ip": "3.15.208.194", "port_no": "1935", "application_name": "LRTV", "stream_key": "dheerajLive1", "user_name": "DheerajTestUser2", "password": "Qwertyuiop1", "channel_category": { "_id": "5cf3cc0f6046337561832fd5", "name": "mma" }, "channel_admin": {
                    //         "profileImage": "https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg",
                    //         "_id": "5cc1ed40adc56e04e82e96a2", "fullName": "test admin"
                    //     }, "updatedAt": "2019-08-26T12:29:50.197Z", "createdAt": "2019-08-26T07:01:41.401Z", "__v": 0, "group_description": "d", "group_name": "a"
                    // }
                    // $scope.videoList.upcomingArray.push(a)

                    slider();
                    $('#preloader').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }).catch(function (res) {
                    if (res.data.status == 401 && res.data.name == "invalid_token" && $rootScope.isLoggedIn) {
                        $scope.$emit("login_required", '');
                    }
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



        $scope.fetchVideoData();
    }
})();

