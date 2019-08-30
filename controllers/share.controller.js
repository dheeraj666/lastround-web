(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShareController', ShareController);

    ShareController.$inject = ['$rootScope', '$scope', 'API', '$http', '$location', 'ngMeta', 'toaster'];
    function ShareController($rootScope, $scope, API, $http, $location, ngMeta, toaster) {
        // $scope.event_id = $location.search.id;
        var url = $location.path().split('/');
        $scope.event_id = url[2];
        // fetch data on load

        function init() {
            if (!$scope.event_id) {
                return
            }
            $http({
                url: API.BaseUrl + 'events/share/detail/' + $scope.event_id,
                method: 'GET',
            }).then(function (res) {
                ngMeta.resetMeta();
                ngMeta.setTitle(res.data.data.event_name);
                ngMeta.setTag('description', res.data.data.description);
                if (res.data.data.event_thumbnail) {
                    var f = res.data.data.event_thumbnail.substring(res.data.data.event_thumbnail.indexOf('event_thumbnail/'), res.data.data.event_thumbnail.length)
                    var img = API.s3_resize_url + f + '?width=476&height=249';
                    ngMeta.setTag('og:image', img);
                }
                ngMeta.setTag('og:url', 'https://lastroundtv.com/#!/share/' + $scope.event_id);
                $scope.event = res.data.data;
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
                setTimeout(function () {
                    location.href = '/'
                }, 1500)
            });
        }

        $scope.playVideo = function (video) {
            if (!video) {
                toaster.pop('error', 'This content not found on system.')
                setTimeout(function () {
                    location.href = '/';
                }, 1500)
                return
            }
            if (!$rootScope.isLoggedIn) {
                toaster.pop('error', 'You need to login to view this content.')
                setTimeout(function () {
                    location.href = '/';
                }, 1500)
                return
            }
            switch (video.section) {
                case 'live':
                    if (!$rootScope.isSubscribed) {
                        toaster.pop('error', 'You need to Subscribed to view this content.')
                        setTimeout(function () {
                            location.href = '/#!/subscription';
                        }, 1500)
                        return
                    }
                    $location.href = "/#!/live?event_id=" + video._id;
                    break;
                case 'upcoming':
                    $location.href = "/#!/events?event_id=" + video._id;
                    break;
                case 'catchup':
                    if (!$rootScope.isLoggedIn) {
                        toaster.pop('error', 'You need to login to view this content.')
                        setTimeout(function () {
                            location.href = '/#!/subscription';
                        }, 1500)
                        return
                    }
                    $location.href = "/#!/catchup?event_id=" + video._id;
                    break;
                default:
                    break;
            }
        }
        init()
    }
})();

