(function(){
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window'];
    function ProfileController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window) {

    	console.log('profile');

    }
})();

