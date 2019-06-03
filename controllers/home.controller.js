(function(){
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', 'countryList', 'QueryService', 'API', 'ModalService'];
    function HomeController($rootScope, $scope, countryList, QueryService, API, ModalService ) {

        slider();

        function slider(){
            $('#preloader').fadeOut('slow', function () {
                $(this).remove();
            });

            setTimeout(function(){
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

        function topMovieCarousel(){
            var owl = $(".top-movie-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
                nav: false,
                items: 4,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    760: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                }
            });
        }

        function umsCarousel(){
            var owl = $(".ums-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
                nav: true,
                items: 1,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    760: {
                        items: 3
                    },
                    992: {
                        items: 1
                    },
                }
            });
        }

        function tabCarousel(){
            var owl = $(".tab-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
                nav: true,
                items: 4,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    760: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                }
            });
        }

        $scope.playVideo = function(link){
            ModalService.showModal({
                templateUrl: "views/modal/player.modal.html",
                controller: "PlayerController",
                inputs: {
                    videoLink: link
                }
            }).then(function(modal){
                modal.close.then(function(res){
                    console.log(res);
                });
            });
        }

        $scope.playVideo = function(link){
            ModalService.showModal({
                templateUrl: "views/modal/player.modal.html",
                controller: "PlayerController",
                inputs: {
                    videoLink: link
                }
            }).then(function(modal){
                modal.close.then(function(res){
                    console.log(res);
                });
            });
        }

        $scope.fetchVideoData = function(){
            $http.get(API.BaseUrl+'get/events/home', {
                params: {
                    page: 1, limit: 5
                },
                headers: {
                    'Authorization': 'Bearer 08a3335b09f867335218bcceb8f8b462fa0ba807', 
                    'Content-Type': 'application/json'
                }
            })
            .then(function(res){
                console.log('then', res);
                $scope.videoList = res.data.data.liveArray;
            }).catch(function(res){
                console.log('catch', res);
            });
        }


        $scope.playVideo = function(link){
            ModalService.showModal({
                templateUrl: "views/modal/generic-player.modal.html",
                controller: "GenericVideoPlayer",
                inputs: {
                    videoLink: link
                }
            }).then(function(modal){
                modal.close.then(function(res){
                    console.log(res);
                });
            });
        }
        // $scope.fetchVideoData();

        $scope.videoList = [
            {
                "isSAdminApproved": true,
                "event_location": "USA",
                "comments_count": 0,
                "views": 0,
                "is_featured": false,
                "_id": "5cf542e1697ee776df8558ca",
                "event_thumbnail": "https://wowza-live-stream.s3.us-east-2.amazonaws.com/event_thumbnail/575963992_1559577297.png",
                "section": "live",
                "event_name": "DheerajMMA",
                "description": "Description of event",
                "start_time": "2019-06-02T18:30:00.000Z",
                "end_time": "2019-06-03T18:30:00.000Z",
                "live_android_url": "rtsp://18.217.208.116:1935/DheerajTestApplication/myStream",
                "live_web_url": "http://18.217.208.116:1935/DheerajTestApplication/dheerajLive/playlist.m3u8",
                "live_ios_url": "http://18.217.208.116:1935/DheerajTestApplication/myStream/playlist.m3u8",
                "channel_category": {
                    "_id": "5cf3cc0f6046337561832fd5",
                    "name": "mma"
                },
                "channel_admin": {
                    "_id": "5cc1ed40adc56e04e82e96a2",
                    "fullName": "admin"
                },
                "updatedAt": "2019-06-03T15:55:13.753Z",
                "createdAt": "2019-06-03T15:55:13.753Z",
                "__v": 0
            },
            {
                "isSAdminApproved": true,
                "event_location": "USA",
                "comments_count": 0,
                "views": 0,
                "is_featured": false,
                "_id": "5cf3d0c46046337561832fdb",
                "event_thumbnail": "https://wowza-live-stream.s3.us-east-2.amazonaws.com/event_thumbnail/154447959_1559482533.jpg",
                "section": "live",
                "event_name": "my 3rd event",
                "description": "test test description",
                "end_time": "2019-06-03T18:30:00.000Z",
                "start_time": "2019-06-02T18:30:00.000Z",
                "live_android_url": "rtsp://18.217.208.116:1935/DheerajTestApplication/myStream",
                "live_web_url": "http://18.217.208.116:1935/DheerajTestApplication/dheerajLive/playlist.m3u8",
                "live_ios_url": "http://18.217.208.116:1935/DheerajTestApplication/myStream/playlist.m3u8",
                "channel_category": {
                    "_id": "5cf3cc0f6046337561832fd5",
                    "name": "mma"
                },
                "channel_admin": {
                    "_id": "5cc1ed40adc56e04e82e96a2",
                    "fullName": "admin"
                },
                "updatedAt": "2019-06-02T13:36:04.317Z",
                "createdAt": "2019-06-02T13:36:04.317Z",
                "__v": 0
            },
            {
                "isSAdminApproved": true,
                "event_location": "USA",
                "comments_count": 0,
                "views": 0,
                "is_featured": false,
                "_id": "5cf3cddd6046337561832fd7",
                "event_thumbnail": "https://wowza-live-stream.s3.us-east-2.amazonaws.com/event_thumbnail/629187695_1559481818.jpg",
                "section": "live",
                "event_name": "test 2nd event",
                "description": "test description",
                "start_time": "2019-06-02T18:30:00.000Z",
                "end_time": "2019-06-03T18:30:00.000Z",
                "live_ios_url": "http://18.217.208.116:1935/DheerajTestApplication/myStream/playlist.m3u8",
                "live_web_url": "http://18.217.208.116:1935/DheerajTestApplication/dheerajLive/playlist.m3u8",
                "live_android_url": "rtsp://18.217.208.116:1935/DheerajTestApplication/myStream",
                "channel_category": {
                    "_id": "5cf3cc0f6046337561832fd5",
                    "name": "mma"
                },
                "channel_admin": {
                    "_id": "5cc1ed40adc56e04e82e96a2",
                    "fullName": "admin"
                },
                "updatedAt": "2019-06-02T13:23:41.824Z",
                "createdAt": "2019-06-02T13:23:41.824Z",
                "__v": 0
            },
            {
                "isSAdminApproved": true,
                "event_location": "USA",
                "comments_count": 0,
                "views": 0,
                "is_featured": false,
                "_id": "5cf3ccab6046337561832fd6",
                "event_thumbnail": "https://wowza-live-stream.s3.us-east-2.amazonaws.com/event_thumbnail/124052923_1559481499.jpg",
                "section": "live",
                "event_name": "test event",
                "description": "test description",
                "start_time": "2019-06-02T18:30:00.000Z",
                "end_time": "2019-06-02T18:30:00.000Z",
                "live_web_url": "http://18.217.208.116:1935/DheerajTestApplication/dheerajLive/playlist.m3u8",
                "live_android_url": "rtsp://18.217.208.116:1935/DheerajTestApplication/myStream",
                "live_ios_url": "http://18.217.208.116:1935/DheerajTestApplication/myStream/playlist.m3u8",
                "channel_category": {
                    "_id": "5cf3cc0f6046337561832fd5",
                    "name": "mma"
                },
                "channel_admin": {
                    "_id": "5cc1ed40adc56e04e82e96a2",
                    "fullName": "admin"
                },
                "updatedAt": "2019-06-02T13:18:35.149Z",
                "createdAt": "2019-06-02T13:18:35.149Z",
                "__v": 0
            }
        ]

    }
})();

