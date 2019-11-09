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
            var html = '<div class="waiting"><i class="fas fa-spinner fa-spin fa-3x"></i></div>'
        	body.append(html);
        }

        function LoadEnd(){
            document.querySelector('body .waiting').remove()
        }
    }

})();
