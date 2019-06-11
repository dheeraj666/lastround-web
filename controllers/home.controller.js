(function(){
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', 'countryList', 'QueryService', 'API', 'ModalService', '$http', '$timeout'];
    function HomeController($rootScope, $scope, countryList, QueryService, API, ModalService, $http, $timeout ) {


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
                    'Authorization': 'Bearer '+ window.localStorage.getItem('accessToken'), 
                    'Content-Type': 'application/json'
                }
            })
            .then(function(res){
                console.log('then', res);
                $scope.videoList = res.data.data;
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

        $timeout( function() {
            $scope.videoList = {  
                "featuredArray":[  
                   {  
                      "isSAdminApproved":true,
                      "event_location":"france",
                      "section":"upcoming",
                      "is_featured":true,
                      "advertisements":[  
                         {  
                            "_id":"5cf7c292697ee776df855945",
                            "name":"ad 5th",
                            "media_url":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/99646784_1559741042.mp4"
                         },
                         {  
                            "_id":"5cf7c292697ee776df855945",
                            "name":"ad 5th",
                            "media_url":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/99646784_1559741042.mp4"
                         }
                      ],
                      "_id":"5cfc0ae43f1daf002009c732",
                      "event_name":"mma fight club",
                      "description":" dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                      "event_thumbnail":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg",
                      "start_time":"Fri Jun 07 2019 07:30:00 GMT+0000 (Coordinated Universal Time)",
                      "end_time":"Fri Jun 07 2019 09:30:00 GMT+0000 (Coordinated Universal Time)",
                      "event_trailer":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_web_url":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_ip":"testz iip",
                      "port_no":"test port 213356",
                      "application_name":"test name",
                      "stream_key":"stream key test",
                      "user_name":"test usernaem",
                      "password":"test123",
                      "channel_category":null,
                      "channel_category_name":"MMA",
                      "channel_admin":{  
                         "_id":"5cc1ed40adc56e04e82e96a2",
                         "fullName":"admin",
                         "profileImage":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg"
                      },
                      "updatedAt":"2019-06-08T19:22:12.585Z",
                      "createdAt":"2019-06-08T19:22:12.585Z",
                      "__v":0,
                      "group_description":"test 25 description",
                      "group_name":"test group test"
                   },
                   {  
                      "isSAdminApproved":true,
                      "event_location":"france",
                      "section":"upcoming",
                      "is_featured":true,
                      "advertisements":[  
                         {  
                            "_id":"5cf7c292697ee776df855945",
                            "name":"ad 5th",
                            "media_url":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/99646784_1559741042.mp4"
                         },
                         {  
                            "_id":"5cf7c292697ee776df855945",
                            "name":"ad 5th",
                            "media_url":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/99646784_1559741042.mp4"
                         }
                      ],
                      "_id":"5cfc0312cfb96a2bd0054318",
                      "event_name":"mma fight club",
                      "description":" dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                      "event_thumbnail":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg",
                      "start_time":"Fri Jun 07 2019 07:30:00 GMT+0000 (Coordinated Universal Time)",
                      "end_time":"Fri Jun 07 2019 09:30:00 GMT+0000 (Coordinated Universal Time)",
                      "event_trailer":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_web_url":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_ip":"testz iip",
                      "port_no":"test port 213356",
                      "application_name":"test name",
                      "stream_key":"stream key test",
                      "user_name":"test usernaem",
                      "password":"test123",
                      "channel_category":null,
                      "channel_category_name":"MMA",
                      "channel_admin":{  
                         "_id":"5cc1ed40adc56e04e82e96a2",
                         "fullName":"admin",
                         "profileImage":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg"
                      },
                      "updatedAt":"2019-06-08T18:48:50.199Z",
                      "createdAt":"2019-06-08T18:48:50.199Z",
                      "__v":0,
                      "group_description":"test 2356 description",
                      "group_name":"test des2vtest"
                   },
                   {  
                      "isSAdminApproved":true,
                      "event_location":"france",
                      "section":"upcoming",
                      "is_featured":true,
                      "advertisements":[  
          
                      ],
                      "_id":"5cfc030dcfb96a2bd0054317",
                      "event_name":"mma fight club",
                      "description":" dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                      "event_thumbnail":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg",
                      "start_time":"Fri Jun 07 2019 07:30:00 GMT+0000 (Coordinated Universal Time)",
                      "end_time":"Fri Jun 07 2019 09:30:00 GMT+0000 (Coordinated Universal Time)",
                      "event_trailer":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_web_url":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_ip":"testz iip",
                      "port_no":"test port 213356",
                      "application_name":"test name",
                      "stream_key":"stream key test",
                      "user_name":"test usernaem",
                      "password":"test123",
                      "channel_category":null,
                      "channel_category_name":"MMA",
                      "channel_admin":{  
                         "_id":"5cc1ed40adc56e04e82e96a2",
                         "fullName":"admin",
                         "profileImage":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg"
                      },
                      "updatedAt":"2019-06-08T18:48:45.378Z",
                      "createdAt":"2019-06-08T18:48:45.378Z",
                      "__v":0
                   }
                ],
                "liveArray":[  
                   {  
                      "isSAdminApproved":true,
                      "event_location":"wdde",
                      "section":"live",
                      "is_featured":false,
                      "advertisements":[  
          
                      ],
                      "_id":"5cfd2084d6b63a4aa67379ca",
                      "event_thumbnail":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/event_thumbnail/59309418_1560092716.jpg",
                      "event_name":"test event",
                      "description":"desc",
                      "start_time":"07-03-2019 06:42:33",
                      "end_time":"08-03-2019 06:42:33",
                      "live_web_url":"hhjh",
                      "event_trailer":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/event_trailer/201251227_1560092724.mp4",
                      "live_ip":"asas",
                      "port_no":"sdds",
                      "application_name":"sd",
                      "stream_key":"gg",
                      "user_name":"hgg",
                      "password":"kjh",
                      "channel_category":{  
                         "_id":"5cf3cc0f6046337561832fd5",
                         "name":"mma"
                      },
                      "channel_admin":{  
                         "_id":"5cc1ed40adc56e04e82e96a2",
                         "fullName":"admin",
                         "profileImage":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg"
                      },
                      "updatedAt":"2019-06-09T15:06:44.941Z",
                      "createdAt":"2019-06-09T15:06:44.941Z",
                      "__v":0
                   },
                   {  
                      "isSAdminApproved":true,
                      "event_location":"USA",
                      "section":"live",
                      "is_featured":false,
                      "advertisements":[  
          
                      ],
                      "_id":"5cfd15f2d6b63a4aa67379c9",
                      "event_thumbnail":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/",
                      "event_name":"test event",
                      "description":"test",
                      "start_time":"08-03-2019 06:42:33",
                      "end_time":"09-03-2019 06:42:33",
                      "live_web_url":"hgj",
                      "event_trailer":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/event_trailer/195214341_1560090043.mp4",
                      "live_ip":"fdfdffd",
                      "port_no":"fdfd",
                      "application_name":"jhjg",
                      "stream_key":"ghgh",
                      "user_name":"hghg",
                      "password":"ghgh",
                      "channel_category":{  
                         "_id":"5cf3cc0f6046337561832fd5",
                         "name":"mma"
                      },
                      "channel_admin":{  
                         "_id":"5cc1ed40adc56e04e82e96a2",
                         "fullName":"admin",
                         "profileImage":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg"
                      },
                      "updatedAt":"2019-06-09T14:21:38.372Z",
                      "createdAt":"2019-06-09T14:21:38.372Z",
                      "__v":0
                   }
                ],
                "upcomingArray":[  
                   {  
                      "isSAdminApproved":true,
                      "event_location":"france",
                      "section":"upcoming",
                      "is_featured":true,
                      "advertisements":[  
                         {  
                            "_id":"5cf7c292697ee776df855945",
                            "name":"ad 5th",
                            "media_url":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/99646784_1559741042.mp4"
                         },
                         {  
                            "_id":"5cf7c292697ee776df855945",
                            "name":"ad 5th",
                            "media_url":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/99646784_1559741042.mp4"
                         }
                      ],
                      "_id":"5cfc0ae43f1daf002009c732",
                      "event_name":"mma fight club",
                      "description":" dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                      "event_thumbnail":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg",
                      "start_time":"Fri Jun 07 2019 07:30:00 GMT+0000 (Coordinated Universal Time)",
                      "end_time":"Fri Jun 07 2019 09:30:00 GMT+0000 (Coordinated Universal Time)",
                      "event_trailer":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_web_url":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_ip":"testz iip",
                      "port_no":"test port 213356",
                      "application_name":"test name",
                      "stream_key":"stream key test",
                      "user_name":"test usernaem",
                      "password":"test123",
                      "channel_category":null,
                      "channel_category_name":"MMA",
                      "channel_admin":{  
                         "_id":"5cc1ed40adc56e04e82e96a2",
                         "fullName":"admin",
                         "profileImage":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg"
                      },
                      "updatedAt":"2019-06-08T19:22:12.585Z",
                      "createdAt":"2019-06-08T19:22:12.585Z",
                      "__v":0,
                      "group_description":"test 25 description",
                      "group_name":"test group test"
                   },
                   {  
                      "isSAdminApproved":true,
                      "event_location":"france",
                      "section":"upcoming",
                      "is_featured":true,
                      "advertisements":[  
                         {  
                            "_id":"5cf7c292697ee776df855945",
                            "name":"ad 5th",
                            "media_url":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/99646784_1559741042.mp4"
                         },
                         {  
                            "_id":"5cf7c292697ee776df855945",
                            "name":"ad 5th",
                            "media_url":"https://wowza-live-stream.s3.us-east-2.amazonaws.com/addvertisment/99646784_1559741042.mp4"
                         }
                      ],
                      "_id":"5cfc0312cfb96a2bd0054318",
                      "event_name":"mma fight club",
                      "description":" dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                      "event_thumbnail":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg",
                      "start_time":"Fri Jun 07 2019 07:30:00 GMT+0000 (Coordinated Universal Time)",
                      "end_time":"Fri Jun 07 2019 09:30:00 GMT+0000 (Coordinated Universal Time)",
                      "event_trailer":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_web_url":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_ip":"testz iip",
                      "port_no":"test port 213356",
                      "application_name":"test name",
                      "stream_key":"stream key test",
                      "user_name":"test usernaem",
                      "password":"test123",
                      "channel_category":null,
                      "channel_category_name":"MMA",
                      "channel_admin":{  
                         "_id":"5cc1ed40adc56e04e82e96a2",
                         "fullName":"admin",
                         "profileImage":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg"
                      },
                      "updatedAt":"2019-06-08T18:48:50.199Z",
                      "createdAt":"2019-06-08T18:48:50.199Z",
                      "__v":0,
                      "group_description":"test 2356 description",
                      "group_name":"test des2vtest"
                   },
                   {  
                      "isSAdminApproved":true,
                      "event_location":"france",
                      "section":"upcoming",
                      "is_featured":true,
                      "advertisements":[  
          
                      ],
                      "_id":"5cfc030dcfb96a2bd0054317",
                      "event_name":"mma fight club",
                      "description":" dummy text ihifh jfjfjw ijfijfiwhfi hihfiwhf huguwhhfu hu",
                      "event_thumbnail":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg",
                      "start_time":"Fri Jun 07 2019 07:30:00 GMT+0000 (Coordinated Universal Time)",
                      "end_time":"Fri Jun 07 2019 09:30:00 GMT+0000 (Coordinated Universal Time)",
                      "event_trailer":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_web_url":"https://s3.amazonaws.com/lrtv-live-media-bucket/Short+video+clip-nature.mp4-SD.mp4",
                      "live_ip":"testz iip",
                      "port_no":"test port 213356",
                      "application_name":"test name",
                      "stream_key":"stream key test",
                      "user_name":"test usernaem",
                      "password":"test123",
                      "channel_category":null,
                      "channel_category_name":"MMA",
                      "channel_admin":{  
                         "_id":"5cc1ed40adc56e04e82e96a2",
                         "fullName":"admin",
                         "profileImage":"https://s3.amazonaws.com/lrtv-live-media-bucket/Boxing-16-2.jpg"
                      },
                      "updatedAt":"2019-06-08T18:48:45.378Z",
                      "createdAt":"2019-06-08T18:48:45.378Z",
                      "__v":0
                   }
                ]
            };
        }, 5000);

        
    }
})();

