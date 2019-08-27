(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$scope', 'API', '$location', '$http', 'ModalService', '$window'];
    function SearchController($rootScope, $scope, API, $location, $http, ModalService, $window) {

        $scope.searchTerm = $location.search().searchTerm;
        var url = $location.path().split('/');
        $scope.searchTerm = url[2];
        $scope.videoList = [];

        function slider() {
            setTimeout(function () {
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

        function topMovieCarousel() {
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

        function umsCarousel() {
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

        function tabCarousel() {
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

        $scope.searchVideos = function () {
            var authentk = window.localStorage.getItem('accessToken')
            if (!authentk)
                return
            $http.get(API.BaseUrl + 'get/events/search', {
                params: {
                    search_field: $scope.searchTerm
                },
                headers: {
                    'Authorization': 'Bearer ' + authentk,
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                    $scope.videoList = res.data.data;
                    slider();
                    $('#preloader').fadeOut('slow', function () {
                        $(this).remove();
                    });
                }).catch(function (res) {
                });
        }
        $scope.handleClickItem = function (video) {
            switch (video.section) {
                case 'live':
                    location.href = "#!/live?event_id=" + video._id;
                    break;
                case 'upcoming':
                    location.href = "#!/events?event_id=" + video._id;
                    break;
                case 'catchup':
                    location.href = "#!/catchup?event_id=" + video._id;
                    break;
                default:
                    break;
            }
        }
        $scope.playVideo = function (videoObject, ignordAd) {
            ModalService.showModal({
                templateUrl: "views/modal/generic-player.modal.html",
                controller: "GenericVideoPlayer",
                inputs: {
                    videoObject: {
                        videoLink: videoObject.event_trailer,
                        description: videoObject.description,
                        title: videoObject.event_name,
                        channelName: videoObject.channel_category.name,
                        channelAdmin: videoObject.channel_admin,
                        startTime: videoObject.start_time,
                        ads: ignordAd ? null : videoObject.advertisements,
                        id: videoObject._id,
                        isHome: true
                    }
                }
            }).then(function (modal) {
                modal.close.then(function (res) {
                });
            });
        }

        $scope.playLiveVideo = function (videoObject) {
            ModalService.showModal({
                templateUrl: "views/modal/player.modal.html",
                controller: "PlayerController",
                inputs: {
                    videoLink: videoObject.live_web_url,
                    videoObject: {
                        videoLink: videoObject.live_catchup_url,
                        description: videoObject.description,
                        title: videoObject.event_name,
                        channelName: videoObject.channel_category.name,
                        channelAdmin: videoObject.channel_admin,
                        startTime: videoObject.start_time,
                        ads: videoObject.advertisements,
                        id: videoObject._id
                    }
                }
            }).then(function (modal) {
                modal.close.then(function (res) {
                    console.log(res);
                });
            });
        }


        $scope.back = function () {
            $window.history.back();
        }


        $scope.searchVideos();
    }
})();

