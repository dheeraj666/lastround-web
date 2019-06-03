(function(){
    'use strict';

    angular
        .module('app')
        .controller('GenericVideoPlayer', GenericVideoPlayer)
        .directive("generic", function(){
            return {
                restrict: 'EA',
                scope: {
                    callApi: '&'
                },
            link: function(scope, element, attrs){
                scope.callMade = false;
                element.bind("timeupdate", function(){
                    scope.timeElapsed = element[0].currentTime;
                    if(scope.timeElapsed > 15) {
                        if(!scope.callMade) {
                            scope.callApi();
                            scope.callMade = true;
                        }
                    }
                    scope.$apply();
                });


            }
         }
        });

    GenericVideoPlayer.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList', 'videoLink', '$http'];
    function GenericVideoPlayer($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList, videoLink, $http) {
        console.log(videoLink);
        $scope.dataIsLoaded = false;
        $scope.close = close;
        $scope.link = videoLink;
        $scope.videoElement = null;

        $scope.pauseOrPlay = function(ele){
            $scope.videoElement = angular.element(ele.currentTarget)[0];
            if (!$scope.videoElement.paused) {
                $scope.videoElement.pause();
            } else {
                $scope.videoElement.play();
            }
        }

        $scope.callApi = function () {
            $http.put(API.BaseUrl+'user/event/shown/fifteen', null, {headers:  {
                "Authorization": "Bearer 916f880e07d774f8736a4bc2362496c494b84746" //token to be used from session
                }})
            .then(function(res){
                console.log('then', res);
            }).catch(function(res){
                console.log('catch', res);
            });
        }        
    }

})();

