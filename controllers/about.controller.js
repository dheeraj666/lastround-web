(function () {
    'use strict';

    angular
        .module('app')
        .controller('AboutController', AboutController);

    AboutController.$inject = [];
    function AboutController() {

        console.log('about');

    }
})();

