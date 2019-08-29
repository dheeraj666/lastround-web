(function () {
    'use strict';

    angular
        .module('app')
        .controller('TermController', TermController);

    TermController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', '$window'];
    function TermController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window) {
        if ($rootScope.changeLang) {
            
        }
    }
})();

