(function () {
    'use strict';

    angular
        .module('app')
        .controller('LiveController', LiveController);

    LiveController.$inject = ['UpdateMetaService', '$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window', '$http', 'ModalService', '$location', 'ngMeta'];
    function LiveController(UpdateMetaService, $rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, $http, ModalService, $location, ngMeta) {

        // ngMeta.setTitle('Live Events');
        // ngMeta.setTag('title', 'Live Events');
        // ngMeta.setTag('og:description','Live Events Description');
        // ngMeta.setTag('image', 'https://lastroundtv.com/assets/img/home/slider-1.jpg');
        // ngMeta.setTag('type', 'object');
        // ngMeta.setTag('url', 'https://lastroundtv.com/#!/live');
        $scope.event_id = $location.$$search.event_id;
        init()
        function init() {
            if ($scope.event_id) {
                ngMeta.setTitle('Live Event Id');
                ngMeta.setTag('description', 'live event description');
                ngMeta.setTag('og:image', 'https://lastroundtv.com/assets/img/home/slider-1.jpg');
                ngMeta.setTag('og:url', 'https://lastroundtv.com/#!/live?event_id=' + $scope.event_id);

            }
            return
            $http({
                url: API.BaseUrl + 'channel-events/detail/' + $scope.event_id,
                method: 'GET', headers: {
                    'Authorization': 'Bearer ' + $rootScope.userAccessToken
                }
            }).then(function (res) {
                $scope.$emit('newPageLoaded',
                    {
                        url: 'https://lastroundtv.com/#!/live?event_id' + $scope.event_id,
                        title: res.data.data.event_name,
                        description: res.data.data.description,
                        image: res.data.data.event_thumbnail,
                        type: 'object'
                    })
                // UpdateMetaService.setTitle('Live Event');
                // UpdateMetaService.setMetaName({
                //     description: res.data.data.description,
                //     keyword: res.data.data.event_name,
                // });
                // UpdateMetaService.setMetaProperty({
                //     'og:type': 'article',
                //     'og:description': res.data.data.description,
                //     'og:image': res.data.data.event_thumbnail,
                //     'og:title': res.data.data.event_name,
                //     'og:url': 'https://lastroundtv.com/#!/live?event_id=' + $scope.event_id
                // });
                playVideo(res.data.data)
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });


        }
        // fetch data on load
        $http.defaults.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem('accessToken');
        $scope.liveEventArray = []



        $scope.onLoadLiveEvt = function () {

            // $http({
            //   method: 'GET',
            //   url: API.BaseUrl+'user/subscrption/plan/details',
            //   headers: {
            //      "Content-Type": "application/json"
            //   }
            // }).then(function(subscriptionResp){
            //     console.log(subscriptionResp)
            // })

            $http.get(API.BaseUrl + 'get/events/home', {
            }).then(function (resp) {
                let respData = resp.data;
                if (respData != undefined) {
                    let respData = resp.data;
                    $scope.liveEventArray = $scope.liveEventArray.concat(respData.data.liveArray);
                    // $scope.liveEventArray = $scope.liveEventArray.concat(respData.data.upcomingArray);
                }
            }).catch(function (res) {
                if (res.data.status == 401 && res.data.name == "invalid_token" && $rootScope.isLoggedIn) {
                    $scope.$emit("login_required", '');
                }
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
                location.href = '#!/subscription';
            }
        }

        // ends here ~ fetch data on load

    }
})();

