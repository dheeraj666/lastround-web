(function(){
    'use strict';

    angular
        .module('app')
        .controller('PlayerController', PlayerController);

    PlayerController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList', 'videoLink'];
    function PlayerController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList, videoLink) {

        console.log(videoLink);
        $scope.dataIsLoaded = false;
        $scope.close = close;

        initializePlayer();

        function initializePlayer(){
            setTimeout(function(){
                WowzaPlayer.create('playerElement',
                    {
                    "license":"PLAY2-3tXAt-fjG4n-BE7pu-jpB3E-pvamT",
                    "title":"",
                    "description":"",
                    "sourceURL":videoLink,
                    "autoPlay":false,
                    "volume":"75",
                    "mute":false,
                    "loop":false,
                    "audioOnly":false,
                    "uiShowQuickRewind":true,
                    "uiQuickRewindSeconds":"30"
                    }
                );
            }, 500);
        }

    }

})();

