(function(){
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window', 'countryList'];
    function ProfileController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window, countryList) {

    	$scope.profile = {};
    	$scope.cities = [];

    	getCountryList();

    	function getCountryList(){
            countryList.then(function(res){
                $scope.countries = res.data;
            })
        }

        $scope.getState = function(value){
            countryList.then(function(res){
                angular.forEach(res.data, function(x,y){
                    if(value == x.name){
                        $scope.states = Object.keys(x.states);
                    }
                })
            })
        }

        $scope.getCity = function(value){
            countryList.then(function(res){
                angular.forEach(res.data, function(x,y){
                    angular.forEach(x.states[value], function(x,y){
                        $scope.cities.push(x)
                    })
                })
            })
        }

    	$scope.submitProfile = function(){
    		console.log($scope.profile);
    	}

    }
})();

