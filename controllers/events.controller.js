(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window', '$http', 'ModalService', '$location'];
    function EventsController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, $http, ModalService, $location) {

        $scope.upcomingEventArray = []


        $http.defaults.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem('accessToken');
        $scope.onLoadUpcomingEvt = function () {
            $http.get(API.BaseUrl + 'get/events/home', {
            }).then(function (resp) {
                let respData = resp.data;
                if (respData != undefined) {
                    $scope.upcomingEventArray = respData.data.upcomingArray;
                    console.log($scope.upcomingEventArray)
                }
            });
            // if($rootScope.isLoggedIn){
            //    $http.get(API.BaseUrl+'get/events/home', {
            //     }).then(function(resp){
            //         let respData = resp.data;
            //         if(respData != undefined) {
            //             $scope.upcomingEventArray = respData.data.upcomingArray;
            //             console.log($scope.upcomingEventArray)
            //         }
            //     });
            // } else {
            //     ModalService.showModal({
            //         templateUrl: "views/modal/login.modal.html",
            //         controller: "LoginController"
            //     }).then(function(modal){
            //         modal.close.then(function(res){
            //             if(res != undefined) {
            //                 if(res.type == "resetPass"){
            //                     resetPassword();
            //                 }
            //             }

            //         });
            //     });
            // }

        }
        $scope.playVideo = function (videoObject) {
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
        // carousel();

        // function carousel(){
        //     setTimeout(function(){
        //         var owl = $(".ums-carousel");
        //         owl.owlCarousel({
        //             loop: true,
        //             margin: 20,
        //             responsiveClass: true,
        //             navigation: true,
        //             navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
        //             nav: true,
        //             items: 1,
        //             smartSpeed: 1000,
        //             dots: false,
        //             autoplay: false,
        //             autoplayTimeout: 4000,
        //             center: false,
        //             responsive: {
        //                 0: {
        //                     items: 1
        //                 },
        //                 480: {
        //                     items: 1
        //                 },
        //                 760: {
        //                     items: 3
        //                 },
        //                 992: {
        //                     items: 1
        //                 },
        //             }
        //         });
        //     }, 0);
        // }

    }
})();

