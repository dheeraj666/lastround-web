(function () {
    'use strict';

    angular
        .module('app')
        .controller('TermController', TermController);

    TermController.$inject = ['$rootScope'];
    function TermController($rootScope) {
        if ($rootScope.changeLang) {
            
        }
    }
})();

