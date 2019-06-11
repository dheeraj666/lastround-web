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

    GenericVideoPlayer.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList', 'videoObject', '$http'];
    function GenericVideoPlayer($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList, videoObject, $http) {
        $scope.dataIsLoaded = false;
        $scope.close = close;
        $scope.videoObject = videoObject;
        $scope.videoElement = null;

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
        
        angular.element(".generic-vid-player").click(function (e) {
            if(e.offsetY < ($(this).height() - 36)) // Check to see if controls where clicked
            {
                if(this.paused)
                    this.play();
                else
                    this.pause();
            }
        });
    }

})();

