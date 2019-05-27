(function(){
    'use strict';

    angular
        .module('app')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window'];
    function AboutController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window) {

    	console.log('about');

    }
})();

