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

        $scope.sampleVideoObject = {
            videoLink: 'https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4',
            title: 'Nature at its best',
            description: "Lorem Ipsum Dolor"
        }

        $scope.playVideo = function(link){
            ModalService.showModal({
                templateUrl: "views/modal/generic-player.modal.html",
                controller: "GenericVideoPlayer",
                inputs: {
                    videoObject: $scope.sampleVideoObject
                }
            }).then(function(modal){
                modal.close.then(function(res){
                    console.log(res);
                });
            });
        }

        $scope.playLiveVideo = function(link){
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
        // $scope.fetchVideoData();

        $scope.videoList= 
        {
            "msg": "events for home screen",
            "status": 1,
            "data": {
                "featuredArray": [
                    {
                        "isSAdminApproved": true,
                        "event_location": "france",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": true,
                        "_id": "5cf7606a697ee776df855927",
                        "event_name": "mma fight club",
                        "description": " dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                        "event_thumbnail": "assets/img/home/top-movie-1.jpeg",
                        "start_time": "2019-06-07T07:30:00.000Z",
                        "end_time": "2019-06-07T09:30:00.000Z",
                        "event_trailer": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_web_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_android_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_ios_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "channel_category": null,
                        "channel_category_name": "MMA",
                        "section": "upcoming",
                        "updatedAt": "2019-06-05T06:25:46.786Z",
                        "createdAt": "2019-06-05T06:25:46.786Z",
                        "__v": 0
                    },
                    {
                        "isSAdminApproved": true,
                        "event_location": "france",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": true,
                        "_id": "5cf76068697ee776df855926",
                        "event_name": "mma fight club",
                        "description": " dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                        "event_thumbnail": "assets/img/home/top-movie-2.jpeg",
                        "start_time": "2019-06-07T07:30:00.000Z",
                        "end_time": "2019-06-07T09:30:00.000Z",
                        "event_trailer": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_web_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_android_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_ios_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "channel_category": null,
                        "channel_category_name": "MMA",
                        "section": "upcoming",
                        "updatedAt": "2019-06-05T06:25:44.183Z",
                        "createdAt": "2019-06-05T06:25:44.183Z",
                        "__v": 0
                    },
                    {
                        "isSAdminApproved": true,
                        "event_location": "france",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": true,
                        "_id": "5cf7604d697ee776df855925",
                        "event_name": "mma fight club",
                        "description": " dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                        "event_thumbnail": "assets/img/home/top-movie-3.jpeg",
                        "start_time": "2019-04-07T07:30:00.000Z",
                        "end_time": "2019-04-07T09:30:00.000Z",
                        "event_trailer": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_web_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_android_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_ios_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "channel_category": null,
                        "channel_category_name": "MMA",
                        "section": "upcoming",
                        "updatedAt": "2019-06-05T06:25:17.784Z",
                        "createdAt": "2019-06-05T06:25:17.784Z",
                        "__v": 0
                    },
                    {
                        "isSAdminApproved": true,
                        "event_location": "france",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": true,
                        "_id": "5cf7604a697ee776df855924",
                        "event_name": "mma fight club",
                        "description": " dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                        "event_thumbnail": "assets/img/home/top-movie-4.jpeg",
                        "start_time": "2019-04-07T07:30:00.000Z",
                        "end_time": "2019-04-07T09:30:00.000Z",
                        "event_trailer": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_web_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_android_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_ios_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "channel_category": null,
                        "channel_category_name": "MMA",
                        "section": "upcoming",
                        "updatedAt": "2019-06-05T06:25:14.385Z",
                        "createdAt": "2019-06-05T06:25:14.385Z",
                        "__v": 0
                    }
                ],
                "liveArray": [
                    {
                        "isSAdminApproved": true,
                        "event_location": "USA",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": false,
                        "_id": "5cf75b3e697ee776df85590b",
                        "event_thumbnail": "assets/img/home/top-movie-1.jpeg",
                        "section": "live",
                        "event_name": "HermeTestApp",
                        "description": "Test description",
                        "start_time": "2019-06-03T18:30:00.000Z",
                        "end_time": "2019-06-05T18:30:00.000Z",
                        "live_android_url": "http://18.217.208.116:1935/DheerajTestApplication/dheerajLive/playlist.m3u8",
                        "live_web_url": "http://18.217.208.116:1935/DheerajTestApplication/dheerajLive/playlist.m3u8",
                        "live_ios_url": "http://18.217.208.116:1935/DheerajTestApplication/dheerajLive/playlist.m3u8",
                        "channel_category": {
                            "_id": "5cf3cc0f6046337561832fd5",
                            "name": "mma"
                        },
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "updatedAt": "2019-06-05T06:03:42.170Z",
                        "createdAt": "2019-06-05T06:03:42.170Z",
                        "__v": 0
                    },
                    {
                        "isSAdminApproved": true,
                        "event_location": "USA",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": false,
                        "_id": "5cf563aa697ee776df8558dc",
                        "event_thumbnail": "assets/img/home/top-movie-2.jpeg",
                        "section": "live",
                        "event_name": "test event2",
                        "description": "trailer",
                        "start_time": "2019-06-11T18:30:00.000Z",
                        "end_time": "2019-06-19T18:30:00.000Z",
                        "live_web_url": "sdsd",
                        "live_android_url": "sdsd",
                        "live_ios_url": "sdsd",
                        "event_trailer": "https://wowza-live-stream.s3.us-east-2.amazonaws.com/event_trailer/54177251_1559585664.mp4",
                        "channel_category": {
                            "_id": "5cf403c2697ee776df8558b4",
                            "name": "Boxing"
                        },
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "updatedAt": "2019-06-03T18:15:06.559Z",
                        "createdAt": "2019-06-03T18:15:06.559Z",
                        "__v": 0
                    },
                    {
                        "isSAdminApproved": true,
                        "event_location": "USA",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": false,
                        "_id": "5cf542e1697ee776df8558ca",
                        "event_thumbnail": "assets/img/home/top-movie-3.jpeg",
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
                        "event_thumbnail": "assets/img/home/top-movie-4.jpeg",
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
                        "event_thumbnail": "assets/img/home/top-movie-5.jpeg",
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
                    }
                ],
                "upcomingArray": [
                    {
                        "isSAdminApproved": true,
                        "event_location": "france",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": true,
                        "_id": "5cf7606a697ee776df855927",
                        "event_name": "mma fight club",
                        "description": " dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                        "event_thumbnail": "assets/img/home/top-movie-1.jpeg",
                        "start_time": "2019-06-07T07:30:00.000Z",
                        "end_time": "2019-06-07T09:30:00.000Z",
                        "event_trailer": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_web_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_android_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_ios_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "channel_category": null,
                        "channel_category_name": "MMA",
                        "section": "upcoming",
                        "updatedAt": "2019-06-05T06:25:46.786Z",
                        "createdAt": "2019-06-05T06:25:46.786Z",
                        "__v": 0
                    },
                    {
                        "isSAdminApproved": true,
                        "event_location": "france",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": true,
                        "_id": "5cf76068697ee776df855926",
                        "event_name": "mma fight club",
                        "description": " dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                        "event_thumbnail": "assets/img/home/top-movie-2.jpeg",
                        "start_time": "2019-06-07T07:30:00.000Z",
                        "end_time": "2019-06-07T09:30:00.000Z",
                        "event_trailer": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_web_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_android_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_ios_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "channel_category": null,
                        "channel_category_name": "MMA",
                        "section": "upcoming",
                        "updatedAt": "2019-06-05T06:25:44.183Z",
                        "createdAt": "2019-06-05T06:25:44.183Z",
                        "__v": 0
                    },
                    {
                        "isSAdminApproved": true,
                        "event_location": "france",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": true,
                        "_id": "5cf7604d697ee776df855925",
                        "event_name": "mma fight club",
                        "description": " dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                        "event_thumbnail": "assets/img/home/top-movie-3.jpeg",
                        "start_time": "2019-04-07T07:30:00.000Z",
                        "end_time": "2019-04-07T09:30:00.000Z",
                        "event_trailer": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_web_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_android_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_ios_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "channel_category": null,
                        "channel_category_name": "MMA",
                        "section": "upcoming",
                        "updatedAt": "2019-06-05T06:25:17.784Z",
                        "createdAt": "2019-06-05T06:25:17.784Z",
                        "__v": 0
                    },
                    {
                        "isSAdminApproved": true,
                        "event_location": "france",
                        "comments_count": 0,
                        "views": 0,
                        "is_featured": true,
                        "_id": "5cf7604a697ee776df855924",
                        "event_name": "mma fight club",
                        "description": " dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                        "event_thumbnail": "assets/img/home/top-movie-3.jpeg",
                        "start_time": "2019-04-07T07:30:00.000Z",
                        "end_time": "2019-04-07T09:30:00.000Z",
                        "event_trailer": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_web_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_android_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "live_ios_url": "https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                        "channel_admin": {
                            "_id": "5cc1ed40adc56e04e82e96a2",
                            "fullName": "admin"
                        },
                        "channel_category": null,
                        "channel_category_name": "MMA",
                        "section": "upcoming",
                        "updatedAt": "2019-06-05T06:25:14.385Z",
                        "createdAt": "2019-06-05T06:25:14.385Z",
                        "__v": 0
                    }
                ]
            }
        }
        

    }
})();

