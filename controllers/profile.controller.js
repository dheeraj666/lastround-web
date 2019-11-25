
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$rootScope', '$scope', 'API', '$http', 'toaster','PreloadingService'];
    function ProfileController($rootScope, $scope, API, $http, toaster,PreloadingService) {
        $scope.profile = {};
        $scope.cities = [];
        $scope.isChangingPass = false;
        $scope.loading = false;

        getCountryList();
        function getCountryList() {
            PreloadingService.loadStart()
            $http.get(API.BaseUrl + 'country').then(function (res) {
                $scope.countries = res.data ? res.data.data : [];
                PreloadingService.loadEnd()
            }).catch(function (res) {
                PreloadingService.loadEnd()
            });
        }
        $scope.getState = function (obj) {
            if (!obj)
                return
            $http.get(API.BaseUrl + 'state?country_id=' + obj._id).then(function (res) {
                $scope.states = res.data ? res.data.data : [];
            }).catch(function (res) { });
        }

        $scope.getCity = function (obj) {
            if (!obj)
                return
            $http.get(API.BaseUrl + 'city?state_id=' + obj._id).then(function (res) {
                $scope.cities = res.data ? res.data.data : [];
            }).catch(function (res) { });
        }

        $scope.viewImage = function (image) {
            if (!image)
                return ''
            if (image.includes('https') || image.includes('amazonaws.com'))
                return image
            else
                return API.s3_url + image
        }
        function detail() {
            $scope.loading = true;
            $http({
                url: API.BaseUrl + 'user/profile/details',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Note the appropriate header
                    'Authorization': 'Bearer ' + $rootScope.userAccessToken
                }
            }).then(function (res) {
                $scope.loading = false;
                if (res.data.status == 1) {
                    $scope.profile = res.data.data;
                    $ccope.$apply();
                }
            }).catch(function (res) {
                $scope.loading = false;
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }

        $scope.changePass = function () {
            if (!$scope.password) {
                toaster.pop('error', 'Enter Current Password')
                return
            }
            if (!$scope.newpassword) {
                toaster.pop('error', 'Enter New Password')
                return
            }
            if (!$scope.cfnewpassword) {
                toaster.pop('error', 'Enter Confirm Password')
                return
            }
            if ($scope.newpassword != $scope.cfnewpassword) {
                toaster.pop('error', 'Password dont match!')
                return
            }
            PreloadingService.loadStart()
            $scope.loading = true;
            $http({
                url: API.BaseUrl + 'user/change/password',
                method: 'PUT',
                data: {
                    "current_password": $scope.password,
                    "new_password": $scope.newpassword
                },
                headers: {
                    'Content-Type': 'application/json', // Note the appropriate header
                    'Authorization': 'Bearer ' + $rootScope.userAccessToken
                }
            }).then(function (res) {
                PreloadingService.loadEnd()
                $scope.loading = false;
                toaster.pop('success', 'Your password has been changed successfully');
                $ccope.$apply();
            }).catch(function (res) {
                PreloadingService.loadEnd()
                $scope.loading = false;
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }











        $scope.submitProfile = function () {
            if (!$scope.profile.fullName) {
                toaster.pop('error', 'Please enter fullname infomation!')
                return
            }
            $scope.loading = true;
            PreloadingService.loadStart()
            $http({
                url: API.BaseUrl + 'user/profile/details',
                method: 'PUT',
                data: $scope.profile, // Make sure to inject the service you choose to the controller
                headers: {
                    'Content-Type': 'application/json', // Note the appropriate header
                    'Authorization': 'Bearer ' + $rootScope.userAccessToken
                }
            }).then(function (res) {
                $scope.loading = false;
                PreloadingService.loadEnd()
                toaster.pop('success', 'Your profile has been changed successfully');
                $ccope.$apply();
            }).catch(function (res) {
                PreloadingService.loadEnd()
                $scope.loading = false;
                if (res.data && res.data.message)
                    toaster.pop('error', res.data.message)
            });

        }

        document.getElementById('profileImageUpload').addEventListener('change', function () {
            onChangePhoto(function (rs) { })
        });
        function onChangePhoto(callback) {
            var files = document.getElementById('profileImageUpload').files;
            if (!files.length) {
                callback(false)
                return alert('Please choose a file to upload first.');
            }
            var file = files[0];
            var fileName = file.name;
            var albumPhotosKey = 'user-profile/';//encodeURIComponent(API.s3_url) + '//';

            var photoKey = fileName;
            $scope.loading = true;
            $rootScope.s3.upload({
                ContentType: file.type,
                Key: photoKey,
                Body: file,
                ACL: 'public-read'//'private'
            }, function (err, data) {
                if (err) {
                    $scope.loading = false;
                    toaster.pop('error', 'There was an error uploading your photo: ', err.message)
                    callback(false)
                    return
                }
                $scope.profile.profileImage = photoKey;
                $scope.loading = false;
                callback(true)
            });
        }
        detail()
    }
})();

