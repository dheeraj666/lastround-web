(function () {
    'use strict';

    angular
        .module('app')
        .controller('LiveController', LiveController);

    LiveController.$inject = ['$rootScope', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window', '$http', 'ModalService', '$location', 'ngMeta'];
    function LiveController($rootScope, $scope, API, ngTableParams, Upload, $localStorage, $window, $http, ModalService, $location, ngMeta) {
        $scope.event_id = $location.$$search.event_id;
        // fetch data on load
        $scope.liveEventArray = []

        function onLoadLiveEvt() {
            $http.get(API.BaseUrl + 'get/events/home', {
                // params: {
                //     page: 1, limit: 5
                // },
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.userAccessToken,
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                let respData = resp.data;
                if (respData != undefined) {
                    $scope.events = respData.data.liveArray;
                }
                $scope.$apply();
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }

        $scope.playVideo = playVideo;
        function playVideo(videoObject) {
            if ($rootScope.isLoggedIn) { //&& $rootScope.isSubscribed
                ModalService.showModal({
                    templateUrl: "views/modal/player.modal.html",
                    controller: "PlayerController",
                    inputs: {
                        videoObject: {
                            videoLink: videoObject.live_catchup_url,
                            description: videoObject.description,
                            title: videoObject.event_name,
                            channelName: videoObject.channel_category.name,
                            channelAdmin: videoObject.channel_admin,
                            startTime: videoObject.start_time,
                            ads: videoObject.advertisements,
                            id: videoObject._id,
                            application_name: videoObject.application_name,
                            live_ip: videoObject.live_ip,
                            stream_key: videoObject.stream_key,
                            port_no: videoObject.port_no,
                            image: videoObject.event_thumbnail
                        }
                    }
                }).then(function (modal) {
                    modal.close.then(function (res) {
                        console.log(res);
                    });
                });
            } else {
                if (!$scope.event_id) {
                    location.href = '/';
                }
                // location.href = '#!/subscription';
            }
        }

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
                ngMeta.resetMeta();
                ngMeta.setTitle(res.data.data.event_name);
                ngMeta.setTag('description', res.data.data.description);
                if (res.data.data.event_thumbnail) {
                    var f = res.data.data.event_thumbnail.substring(res.data.data.event_thumbnail.indexOf('event_thumbnail/'), res.data.data.event_thumbnail.length)
                    var img = API.s3_resize_url + f + '?width=476&height=249';
                    ngMeta.setTag('og:image', img);
                }
                ngMeta.setTag('og:url', 'https://lastroundtv.com/#!/live?event_id=' + $scope.event_id);
                playVideo(res.data.data)
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });


        }

        init()
        onLoadLiveEvt()

    }
})();

