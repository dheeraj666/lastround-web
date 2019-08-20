(function () {
    'use strict';

    angular
        .module('app')
        .controller('CatchupController', CatchupController);


    CatchupController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window', 'ModalService', '$http', '$location'];
    function CatchupController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, ModalService, $http, $location) {

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
                        id: videoObject._id,
                        ads: videoObject.advertisements
                    }
                }
            }).then(function (modal) {
                modal.close.then(function (res) {
                    console.log(res);
                });
            });
        }


        // fetch data on load
        $http.defaults.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem('accessToken');
        $scope.completeFeaturedArray = []
        $scope.onLoadFeaturedEvt = function () {
            if ($rootScope.isLoggedIn) {// && $rootScope.isSubscribe
                $http.get(API.BaseUrl + 'get/events/home', {
                }).then(function (resp) {
                    let respData = resp.data;
                    if (respData != undefined) {
                        $scope.completeFeaturedArray = respData.data.featuredArray;
                    }
                });
            } else {
                location.href = '#!/subscription';
                // $scope.$emit("login_required", '');
            }
        }
        // ends here ~ fetch data on load
    }
})();

