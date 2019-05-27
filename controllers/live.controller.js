(function(){
    'use strict';

    angular
        .module('app')
        .controller('LiveController', LiveController);

    LiveController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window'];
    function LiveController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window) {

    }
})();

