(function () {
    'use strict';

    angular
        .module('app')
        .controller('VerifyEmailController', VerifyEmailController);

    VerifyEmailController.$inject = ['$rootScope', '$scope','$location','$http','API'];
    function VerifyEmailController($rootScope, $scope,$location,$http,API) {
        var url = $location.path().split('/');
        $scope._id = url[3];
        $scope.verified = false
        $http.get(API.BaseUrl + 'verify-influencer/' + $scope._id, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            $scope.verified = true
        }).catch(function (res) {
            $scope.verified = false
        });
    }
})();

