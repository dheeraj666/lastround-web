(function () {
    'use strict';

    angular
        .module('app')
        .controller('LiveController', LiveController);

    LiveController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window', '$http', 'ModalService', '$location'];
    function LiveController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, $http, ModalService, $location) {

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

        $scope.playVideo = function (videoObject) {
            if ($rootScope.isLoggedIn && $rootScope.isSubscribed) {
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
                            id: videoObject._id
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

