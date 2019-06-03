(function(){
    'use strict';

    angular
        .module('app')
        .controller('CatchupController', CatchupController);

    CatchupController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window', 'ModalService'];
    function CatchupController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, ModalService) {

        $scope.playVideo = function(link){

            ModalService.showModal({
                templateUrl: "views/modal/generic-player.modal.html",
                controller: "GenericVideoPlayer",
                inputs: {
                    videoLink: link
                }
            }).then(function(modal){
                modal.close.then(function(res){
                    console.log(res);
                });
            });
            
        }
    }
})();

