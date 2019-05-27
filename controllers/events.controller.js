(function(){
    'use strict';

    angular
        .module('app')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window'];
    function EventsController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window) {

        // carousel();

        // function carousel(){
        //     setTimeout(function(){
        //         var owl = $(".ums-carousel");
        //         owl.owlCarousel({
        //             loop: true,
        //             margin: 20,
        //             responsiveClass: true,
        //             navigation: true,
        //             navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
        //             nav: true,
        //             items: 1,
        //             smartSpeed: 1000,
        //             dots: false,
        //             autoplay: false,
        //             autoplayTimeout: 4000,
        //             center: false,
        //             responsive: {
        //                 0: {
        //                     items: 1
        //                 },
        //                 480: {
        //                     items: 1
        //                 },
        //                 760: {
        //                     items: 3
        //                 },
        //                 992: {
        //                     items: 1
        //                 },
        //             }
        //         });
        //     }, 0);
        // }

    }
})();

