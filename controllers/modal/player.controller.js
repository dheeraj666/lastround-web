(function () {
    'use strict';

    angular
        .module('app')
        .controller('PlayerController', PlayerController);

    PlayerController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList', 'videoObject', '$location'];
    function PlayerController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList, videoObject, $location) {
        $scope.dataIsLoaded = false;
        var wowPlayer = null;
        $scope.close = function () {
            var wowPlayer = WowzaPlayer.get('playerElement');
            if (wowPlayer != null) {
                wowPlayer.destroy();
            }
            close();
        };
        $scope.videoObject = videoObject;
        $scope.absUrl = $location.$$protocol + '://' + $location.$$host + '/#!' + $location.$$path;

        function initializePlayer() {
            var link = `${videoObject.live_ip}:${videoObject.port_no}/${videoObject.application_name}/${videoObject.stream_key}/playlist.m3u8`

            console.log(link)
            setTimeout(function () {
                WowzaPlayer.create('playerElement',
                    {
                        "license": "PLAY2-3tXAt-fjG4n-BE7pu-jpB3E-pvamT",
                        "title": "",
                        "description": "",
                        // "sourceURL": 'http://' + link,//'https://3.15.208.194:1935/LRTV/dheerajLive11/playlist.m3u8',
                        "sources": [
                            { "sourceURL": "https://" + link },
                            { "sourceURL": "rtsp://" + link },
                            { "sourceURL": "http://" + link },
                        ],
                        "autoPlay": true,
                        "volume": "75",
                        "mute": false,
                        "loop": false,
                        "audioOnly": false,
                        "uiShowQuickRewind": true,
                        "uiQuickRewindSeconds": "30"
                    }
                );
            }, 1000);
        }
        $scope.shareLink = function (linkType) {
            var link = $scope.absUrl + '?event_id=' + $scope.videoObject.id
            if (linkType == 'facebook') {
                window.open("https://www.facebook.com/sharer/sharer.php?u=" + link)
            } else if (linkType == 'whatsapp') {
                window.open("whatsapp://send?text=" + link)
            } else if (linkType == 'twitter') {
                window.open("https://twitter.com/share?url=" + link)
            }
        }
        //Handle Ad
        $scope.adsUrl = ''; //content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4'
        var onStopRq = function (data) {
            if (data && data.data) {
                if (data.data.event_id != $scope.videoObject.id)
                    return
                location.href = '/'
            }
        }
        var onAdRq = function (data) {
            if (data && data.data) {
                if (data.data.event_id != $scope.videoObject.id)
                    return
                if (data.data.action == 'stop') {
                    $scope.adsUrl = '';
                } else if (data.data.action == 'start') {
                    $scope.adsUrl = data.data.advertisement_url;// '//content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4';
                    let rad = Math.floor(Math.random() * (30 - 25 + 1) + 25)
                    setTimeout(function () {
                        $scope.showSkip = true;
                        $scope.$apply();
                    }, rad * 1000)
                }
                $scope.$apply();
            }

        }
        $scope.skipAd = skipAd;
        function skipAd() {
            $scope.adsUrl = '';
            $scope.showSkip = false;
            $scope.$apply();
        }
        angular.element(document).ready(function () {
            initializePlayer();
            //handle play/stop ad
            if (!window.playAdListener) {
                window.playAdListener = {};
            }
            if (window.playAdListener.hasOwnProperty('play-advertisement')) {
                window.playAdListener['play-advertisement'] = null;
                delete window.playAdListener['play-advertisement'];
            }
            window.playAdListener['play-advertisement'] = onAdRq;
            //handle stop live
            if (!window.stopListener) {
                window.stopListener = {};
            }
            if (window.stopListener.hasOwnProperty('stop-event')) {
                window.stopListener['stop-event'] = null;
                delete window.stopListener['stop-event'];
            }
            window.stopListener['stop-event'] = onStopRq;

        })
    }

})();

