(function () {
    'use strict';

    angular
        .module('app')
        .controller('CatchupController', CatchupController);


    CatchupController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window', 'ModalService', '$http', '$location'];
    function CatchupController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, ModalService, $http, $location) {

        $scope.playVideo = function (videoObject) {
            if ($rootScope.isLoggedIn && $rootScope.isSubscribed) {
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
                location.href = '#!/subscription';
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

