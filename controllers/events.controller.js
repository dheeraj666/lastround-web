(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window', '$http', 'ModalService', '$location', 'ngMeta'];
    function EventsController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, $http, ModalService, $location, ngMeta) {

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
            }).catch(function (res) {
                if (res.data.status == 401 && res.data.name == "invalid_token" && $rootScope.isLoggedIn) {
                    $scope.$emit("login_required", '');
                }
            });
        }

        $scope.playVideo = playVideo;
        function playVideo(videoObject) {
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


        $scope.event_id = $location.$$search.event_id;
        function init() {
            if (!$scope.event_id) {
                return
            }
            $http({
                url: API.BaseUrl + 'channel-events/detail/' + $scope.event_id,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.userAccessToken
                }
            }).then(function (res) {
                ngMeta.setTitle(res.data.data.event_name);
                ngMeta.setTag('description', res.data.data.description);
                ngMeta.setTag('og:image', res.data.data.event_thumbnail);
                ngMeta.setTag('og:url', 'https://lastroundtv.com/#!/events?event_id=' + $scope.event_id);
                playVideo(res.data.data)
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }

        init()
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

