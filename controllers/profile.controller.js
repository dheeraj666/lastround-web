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
            console.log($rootScope.s3.config.credentials)

    		// add image directly to s3 bucket
            var files = document.getElementById('profileImageUpload').files;
              if (!files.length) {
                return alert('Please choose a file to upload first.');
              }
              var file = files[0];
              var fileName = file.name;
              var albumPhotosKey = encodeURIComponent(API.s3_url) + '//';

              var photoKey = albumPhotosKey + fileName;
              $rootScope.s3.upload({
                Key: photoKey,
                Body: file,
                ACL: 'private'
              }, function(err, data) {
                if (err) {
                  return console.log(data, 'There was an error uploading your photo: ', err.message);
                }
                alert('Successfully uploaded photo.');
              });
            // ends here ~ add image directly to s3 bucket

    	}


        // add photo to s3 bucket directly
        // function addPhoto(albumName) {
        //   var files = document.getElementById('photoupload').files;
        //   if (!files.length) {
        //     return alert('Please choose a file to upload first.');
        //   }
        //   var file = files[0];
        //   var fileName = file.name;
        //   var albumPhotosKey = encodeURIComponent(albumName) + '//';

        //   var photoKey = albumPhotosKey + fileName;
        //   s3.upload({
        //     Key: photoKey,
        //     Body: file,
        //     ACL: 'public-read'
        //   }, function(err, data) {
        //     if (err) {
        //       return alert('There was an error uploading your photo: ', err.message);
        //     }
        //     alert('Successfully uploaded photo.');
        //   });
        // }
        // ends here ~ add photo to s3 bucket directly

    }
})();

