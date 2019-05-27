(function(){
    'use strict';

    angular
        .module('app')
        .controller('ResetpassController', ResetpassController);

    ResetpassController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'AuthenticationService'];
    function ResetpassController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, AuthenticationService) {

        $scope.email_view = true;

        $scope.submitEmail = function(){
            console.log('submit reset');
            let url = API.BaseUrl+'forget-password';
            QueryService.Post(url, $scope.reset)
            .then(function(res){
                if(res.hasOwnProperty('error')){
                    toaster.pop('error', res.msg)
                }
                console.log(res);
            });
        }

    }

})();

