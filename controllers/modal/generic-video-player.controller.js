(function () {
    'use strict';

    angular
        .module('app')
        .controller('GenericVideoPlayer', GenericVideoPlayer)
        .directive("generic", function () {
            return {
                restrict: 'EA',
                scope: {
                    callApi: '&'
                },
                link: function (scope, element, attrs) {
                    scope.callMade = false;
                    element.bind("timeupdate", function () {
                        scope.timeElapsed = element[0].currentTime;
                        if (scope.timeElapsed > 15) {
                            if (!scope.callMade) {
                                scope.callApi();
                                scope.callMade = true;
                            }
                        }
                        scope.$apply();
                    });


                }
            }
        })
        .directive("disableSeeking", function () {
            return {
                restrict: 'EA',
                scope: {
                    seeking: '&'
                },
                link: function (scope, element, attrs) {
                    var video = element ? element[0] : null;
                    var supposedCurrentTime = 0;
                    if (!video)
                        return;
                    video.addEventListener('timeupdate', function () {
                        if (!video.seeking) {
                            supposedCurrentTime = video.currentTime;
                        }
                    });
                    // prevent user from seeking
                    video.addEventListener('seeking', function () {
                        // guard agains infinite recursion:
                        // user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
                        var delta = video.currentTime - supposedCurrentTime;
                        if (Math.abs(delta) > 0.01) {
                            console.log("Seeking is disabled");
                            video.currentTime = supposedCurrentTime;
                        }
                    });
                    // delete the following event handler if rewind is not required
                    video.addEventListener('ended', function () {
                        // reset state in order to allow for rewind
                        supposedCurrentTime = 0;
                    });
                }
            }
        })

    GenericVideoPlayer.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList', 'videoObject', '$http', '$location'];
    function GenericVideoPlayer($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList, videoObject, $http, $location) {
        $scope.dataIsLoaded = false;
        $scope.close = close;
        $scope.videoObject = videoObject;
        $scope.videoElement = null;

        $scope.absUrl = $location.$$protocol + '://' + $location.$$host + '/#!' + $location.$$path;
        $scope.callApi = function () {
            $http.put(API.BaseUrl + 'user/event/shown/fifteen', null, {
                headers: {
                    "Authorization": "Bearer 916f880e07d774f8736a4bc2362496c494b84746" //token to be used from session
                }
            })
                .then(function (res) {
                    console.log('then', res);
                }).catch(function (res) {
                    console.log('catch', res);
                });
        }

        angular.element(".generic-vid-player").click(function (e) {
            if (e.offsetY < ($(this).height() - 36)) // Check to see if controls where clicked
            {
                if (this.paused)
                    this.play();
                else
                    this.pause();
            }
        });

        $scope.shareLink = function (linkType) {
            var link = $scope.absUrl + '?event_id=' + $scope.videoObject.id
            if (linkType == 'facebook') {
                window.open("https://www.facebook.com/sharer/sharer.php?u=" + link)
            } else if (linkType == 'whatsapp') {
                window.open("whatsapp://send?text=" + link)
            } else if (linkType == 'twitter') {
                window.open("https://twitter.com/share?url=" + encodeURIComponent(link))
            }
        }

        $scope.adsUrl = '';
        $scope.showSkip = false;
        $scope.skipAd = skipAd;


        function getListTimePlayAds() {
            var adLength = $scope.videoObject.ads ? $scope.videoObject.ads.length : 0;
            if (!adLength || !$scope.duration)
                return [];
            if (adLength == 1) {
                let t = Math.round($scope.duration / 2)
                $scope.videoObject.ads[0].time = t;
                return [t];
            }
            var breaktime = Math.round(($scope.duration - 30) / (adLength));
            var item = breaktime;
            var list = [];
            for (let index = 0; index < adLength; index++) {
                list.push(item)
                $scope.videoObject.ads[index].time = item;
                item += breaktime;
            }
            return list;
        }
        function skipAd() {
            $scope.adsUrl = '';
            $scope.showSkip = false;
            $scope.mainPlayer.play();
            // $scope.$apply();
        }
        function handleEndAd() {
            setTimeout(function () {
                var adPlayer = angular.element(".ads-vid-player")[0];
                if (adPlayer) {
                    setTimeout(function () {
                        if (adPlayer.paused) {
                            $scope.$apply(function () {
                                skipAd()
                            });
                        }
                    }, 4000)
                    adPlayer.addEventListener('ended', function () {
                        $scope.$apply(function () {
                            skipAd()
                        });
                    });
                }
            }, 2000)
        }
        angular.element(document).ready(function () {
            $scope.mainPlayer = angular.element(".generic-vid-player")[0];
            $scope.mainPlayer.addEventListener("canplay", function () {
                $scope.duration = Math.round(this.duration)
                $scope.listBreakAds = getListTimePlayAds()
            });
            $scope.mainPlayer.addEventListener('timeupdate', function () {
                if (!$scope.listBreakAds || $scope.listBreakAds.length == 0)
                    return;
                let current = Math.round($scope.mainPlayer.currentTime);
                var check = $scope.listBreakAds.includes(current)
                if (check) {
                    $scope.listBreakAds.shift();
                    let ad = $scope.videoObject.ads.find(function (f) {
                        return f.time == current
                    })
                    if (!ad)
                        return
                    $scope.adsUrl = ad.media_url;// '//content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4'
                    $scope.$apply();
                    //Random s to show skip
                    let rad = Math.floor(Math.random() * (11 - 5 + 1) + 5)
                    $scope.mainPlayer.pause();
                    setTimeout(function () {
                        $scope.showSkip = true;
                        $scope.$apply();
                    }, rad * 1000)
                    handleEndAd()
                }
            });
        })










    }
})();

