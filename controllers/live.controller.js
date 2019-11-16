(function () {
    'use strict';

    angular
        .module('app')
        .controller('LiveController', LiveController);

    LiveController.$inject = ['$rootScope', '$scope', 'API', '$http', 'ModalService', '$location'];
    function LiveController($rootScope, $scope, API, $http, ModalService, $location) {
        $scope.event_id = $location.$$search.event_id;
        $scope.playVideo = playVideo;
        $scope.redirect = function () {
            $('#jump').modal('hide')
            location.href = '/#!/subscription'
        }
        // fetch data on load
        function onLoadLiveEvt() {
            if (!$rootScope.isSubscribed) {
                $('#jump').modal('show')
            } else {
                $http.get(API.BaseUrl + 'get/events/home', {
                    // params: {
                    //     page: 1, limit: 5
                    // },
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.userAccessToken,
                        'Content-Type': 'application/json'
                    }
                }).then(function (res) {
                    $scope.events = res.data.data.liveArray;
                    if ($scope.event_id) {
                        $scope.event = $scope.events.find(function (f) {
                            return f._id == $scope.event_id
                        })
                        if ($scope.event) {
                            playVideo($scope.event)
                        }
                    }
                }).catch(function (res) {
                    if (res.data && res.data.msg)
                        toaster.pop('error', res.data.msg)
                });
            }
        }

        function playVideo(videoObject) {
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
                        image: videoObject.event_thumbnail,
                        location: videoObject.event_location
                    }
                }
            }).then(function (modal) {
                modal.close.then(function (res) {
                    console.log(res);
                });
            });
        }
        onLoadLiveEvt()
    }
})();

