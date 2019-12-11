(function () {
    'use strict';

    angular
        .module('app')
        .controller('FeedbackController', FeedbackController);

    FeedbackController.$inject = ['$scope', '$rootScope', 'toaster', 'API', '$http'];
    function FeedbackController($scope, $rootScope, toaster, API, $http) {
        $scope.data = {
            description: ''
        }
        $scope.mediaName = ''
        $scope.requestForm = function () {
            if (!$rootScope.userAccessToken) {
                return toaster.pop('error', 'You need loin to send your feedback.')
            }
            if (!$scope.data.description) {
                return toaster.pop('error', 'Please, enter your feedback.')
            }
            if ($scope.isInValidMedia) {
                return toaster.pop('error', 'Media attach too large sie. Please upload less than 10Mb')
            }
            uploadMedia(function (rs) {
                let url = API.BaseUrl + 'feedback';
                $http.post(url, $scope.data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + $rootScope.userAccessToken
                    }
                }).then(function (res) {
                    toaster.pop('success', 'Thank you for your feedback, we will respond as soon as possible!');
                    $scope.data.description = ''
                }).catch(function (res) {
                    if (res.data && res.data.msg)
                        toaster.pop('error', res.data.msg)
                });
            })
        }


        $scope.onAttach = function () {
            $('#feedbackMedia').trigger('click')
        }
        document.getElementById('feedbackMedia').addEventListener('change', function () {
            //validate
            var files = document.getElementById('feedbackMedia').files;
            if (!files || files.length == 0)
                return
            $scope.mediaName = files[0].name;
            if (files[0].size > 10000) {
                $scope.isInValidMedia = true
            }
            $scope.isInValidMedia = false
        });
        function uploadMedia(callback) {
            var files = document.getElementById('feedbackMedia').files;
            if (!files || !files.length) {
                callback(false)
            }
            var file = files[0];
            var fileName = 'feedback/' + file.name;
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
                    toaster.pop('error', 'There was an error uploading your media: ', err.message)
                    callback(false)
                    return
                }
                $scope.data.media = photoKey;
                $scope.loading = false;
                callback(true)
            });
        }
    }
})();

