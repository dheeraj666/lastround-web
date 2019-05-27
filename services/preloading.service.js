(function () {
    'use strict';

    angular
        .module('app')
        .factory('PreloadingService', PreloadingService);

    PreloadingService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
    function PreloadingService($http, $cookieStore, $rootScope, $timeout) {

        let service = {};

        service.loadStart = LoadStart;
        service.loadEnd = LoadEnd;

        return service;

        function LoadStart(){
        	var body = angular.element(document).find('body');
        	body.addClass('waiting');
        }

        function LoadEnd(){
        	var body = angular.element(document).find('body');
        	body.removeClass('waiting');
        }
    }

})();
