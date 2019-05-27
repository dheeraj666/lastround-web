(function(){
    'use strict';

    angular
        .module('app')
        .controller('CatchupController', CatchupController);

    CatchupController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window'];
    function CatchupController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window) {

    }
})();

