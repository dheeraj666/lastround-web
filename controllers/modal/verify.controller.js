(function(){
    'use strict';

    angular
        .module('app')
        .controller('VerifyEmailController', VerifyEmailController);

    VerifyEmailController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList'];
    function VerifyEmailController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList) {

        $scope.submitForm = function(){
            let url = API.BaseUrl+'user/verify/email';
            QueryService.Post(url, $scope.email)
            .then(function(res){
                close({type: 'success', message: res.msg})
            }).catch(function(res){
                toaster.pop('error', res.data.msg)
            });
        }

    }

})();

