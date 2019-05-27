(function(){
    'use strict';

    angular
        .module('app')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window'];
    function ContactController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window) {

    	console.log('about');

    }
})();

