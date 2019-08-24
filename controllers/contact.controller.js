(function () {
    'use strict';

    angular
        .module('app')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage', 'UpdateMetaService'];
    function ContactController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, UpdateMetaService) {
        // window.document.querySelector('meta[name="description"]').setAttribute("content", 'Contact US');
        // document.title = 'Contact';
        console.log('about');
        UpdateMetaService.setTitle('Contact US');


        UpdateMetaService.setMetaName({
            description: 'Contact US Description',
            keyword: 'Contact US Keyword'
        });
        UpdateMetaService.setMetaProperty({
            ['og:title']: 'Contact US title property',
            ['og:description']: 'Contact US description property',
        });

    }
})();

