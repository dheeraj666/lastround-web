(function(){
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', 'countryList', 'QueryService', 'API', 'ModalService'];
    function HomeController($rootScope, $scope, countryList, QueryService, API, ModalService ) {

        slider();

        function slider(){
            $('#preloader').fadeOut('slow', function () {
                $(this).remove();
            });

            setTimeout(function(){
                var owl = $(".slider-carousel");
                owl.owlCarousel({
                    loop: true,
                    margin: 0,
                    responsiveClass: true,
                    navigation: true,
                    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                    nav: false,
                    items: 1,
                    smartSpeed: 500,
                    dots: true,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    center: false,
                    animateIn: 'fadeIn',
                    animateOut: 'fadeOut',
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        760: {
                            items: 1
                        }
                    }
                });
                topMovieCarousel();
                umsCarousel();
                tabCarousel();
            }, 0);
        }

        function topMovieCarousel(){
            var owl = $(".top-movie-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
                nav: false,
                items: 4,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    760: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                }
            });
        }

        function umsCarousel(){
            var owl = $(".ums-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
                nav: true,
                items: 1,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    760: {
                        items: 3
                    },
                    992: {
                        items: 1
                    },
                }
            });
        }

        function tabCarousel(){
            var owl = $(".tab-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 20,
                responsiveClass: true,
                navigation: true,
                navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
                nav: true,
                items: 4,
                smartSpeed: 1000,
                dots: false,
                autoplay: false,
                autoplayTimeout: 4000,
                center: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    760: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                }
            });
        }

        $scope.playVideo = function(link){
            ModalService.showModal({
                templateUrl: "views/modal/player.modal.html",
                controller: "PlayerController",
                inputs: {
                    videoLink: link
                }
            }).then(function(modal){
                modal.close.then(function(res){
                    console.log(res);
                });
            });
        }

    }
})();

