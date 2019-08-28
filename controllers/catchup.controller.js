(function () {
    'use strict';

    angular
        .module('app')
        .controller('CatchupController', CatchupController);


    CatchupController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window', 'ModalService', '$http', '$location', 'ngMeta'];
    function CatchupController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, ModalService, $http, $location, ngMeta) {

        $scope.event_id = $location.$$search.event_id;
        init()
        function init() {
            if (!$scope.event_id) {
                return
            }
            $http({
                url: API.BaseUrl + 'channel-events/detail/' + $scope.event_id,
                method: 'GET'
            }).then(function (res) {
                ngMeta.setTitle(res.data.data.event_name);
                ngMeta.setTag('description', res.data.data.description);
                ngMeta.setTag('og:image', res.data.data.event_thumbnail);
                ngMeta.setTag('og:url', 'https://lastroundtv.com/#!/catchup?event_id=' + $scope.event_id);
                playVideo(res.data.data)
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
                location.href = '/'
            });
        }
        $scope.playVideo = playVideo;
        function playVideo(videoObject) {
            // if (!$rootScope.isSubscribed) {
            //     return
            // }
            ModalService.showModal({
                templateUrl: "views/modal/generic-player.modal.html",
                controller: "GenericVideoPlayer",
                inputs: {
                    videoObject: {
                        videoLink: videoObject.link_catchup_url,
                        description: videoObject.description,
                        title: videoObject.event_name,
                        channelName: videoObject.channel_admin.name,
                        channelAdmin: videoObject.channel_admin,
                        startTime: videoObject.start_time,
                        id: videoObject._id,
                        ads: videoObject.advertisements,
                        section: videoObject.section || 'catchup'
                    }
                }
            }).then(function (modal) {
                modal.close.then(function (res) {
                    console.log(res);
                });
            });
        }
        // fetch data on load
        function getAll() {
            $http.get(API.BaseUrl + 'events/catchup/ads/list', {
                // params: {
                //     page: 1, limit: 15
                // },
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.userAccessToken,
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                $scope.events = res.data.data;
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }
        getAll()
    }
})();

