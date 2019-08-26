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
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.userAccessToken
                }
            }).then(function (res) {
                ngMeta.setTitle(res.data.data.event_name);
                ngMeta.setTag('description', res.data.data.description);
                ngMeta.setTag('og:image', res.data.data.event_thumbnail);
                ngMeta.setTag('og:url', 'https://lastroundtv.com/#!/catchup?event_id=' + $scope.event_id);
                playVideo(res.data.data)
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }
        $scope.playVideo = playVideo;
        function playVideo(videoObject) {
            if ($rootScope.isLoggedIn) {
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
                            id: videoObject._id,
                            ads: videoObject.advertisements
                        }
                    }
                }).then(function (modal) {
                    modal.close.then(function (res) {
                        console.log(res);
                    });
                });
            } else {
                if (!$scope.event_id) {
                    location.href = '#!/subscription';
                }
            }
        }


        // fetch data on load
        $http.defaults.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem('accessToken');
        $scope.completeFeaturedArray = []
        $scope.onLoadFeaturedEvt = function () {
            $http.get(API.BaseUrl + 'get/events/home', {
            }).then(function (resp) {
                let respData = resp.data;
                if (respData != undefined) {
                    $scope.completeFeaturedArray = respData.data.featuredArray;
                }
            }).catch(function (res) {
                if (res.data.status == 401 && res.data.name == "invalid_token" && $rootScope.isLoggedIn) {
                    $scope.$emit("login_required", '');
                }
            });
        }
        // ends here ~ fetch data on load
    }
})();

