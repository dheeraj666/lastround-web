(function () {
    'use strict';

    angular
        .module('app')
        .directive('list', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (s, e, attr, ctrl) {
                    if (ctrl && e[0].nodeName === 'INPUT') {
                        console.log('do');
                        e.data('ngModelName', attr.ngModel);
                    }
                }
            }
        }).directive('datalist', function ($compile) {
            var supportsDatalist = !!('list' in document.createElement('input')) &&
                !!(document.createElement('datalist') && window.HTMLDataListElement);

            return {
                restrict: 'E',
                transclude: true,
                link: function (s, e, a, c, t) {
                    if (!supportsDatalist) {
                        var listId = a.id;
                        //Assumes inputs that use datalist are unique. A better directive would probably include the input itself
                        var input = document.querySelectorAll("input[list=" + listId + "]")
                        input = input[0];

                        var ngModelName = angular.element(input).data('ngModelName');

                        var select = $compile('<select ng-model="' + ngModelName + '"></select>')(s);

                        e.append(select);

                        e = select;
                    }

                    t(function (te) {
                        e.append(te);
                    })
                }
            }
        })
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$rootScope', '$scope', 'API', 'toaster', 'close', '$http', 'PreloadingService'];
    function SignupController($rootScope, $scope, API, toaster, close, $http, PreloadingService) {
        $scope.check = {
            agree: false
        }
        $scope.socialPreviewImages = []
        $scope.signup_view = true;
        $scope.close = function (rs) {
            if (rs == 'login') {
                location.href = '/#!/'
                return
            }
            close({ type: rs })
        };
        $scope.uploadVideoStatus = false;
        $scope.signup = {};
        $scope.member = {
            role: 2
        };
        $scope.influencer = {
            facebook: {},
            youtube: {},
            instagram: {},
            twitter: {},
            pictures: []
        }
        $scope.socialImages = []
        $scope.cities = [];

        getCountryList();
        function getCountryList() {
            PreloadingService.loadStart()
            $http.get(API.BaseUrl + 'country').then(function (res) {
                $scope.countries = res.data ? res.data.data : [];
                PreloadingService.loadEnd()
            }).catch(function (res) {
                PreloadingService.loadEnd()
            });
        }

        $scope.getState = function (obj) {
            $scope.signup.state = null
            $scope.signup.city = null
            if (!obj)
                return
            let country = $scope.countries.find(function (f) {
                return f.name == obj
            })
            if (!country)
                return
            $http.get(API.BaseUrl + 'state?country_id=' + country._id).then(function (res) {
                $scope.states = res.data ? res.data.data : [];
            }).catch(function (res) { });
        }

        $scope.getCity = function (obj) {
            if (!obj)
                return
            let state = $scope.states.find(function (f) {
                return f.name == obj
            })
            if (!state)
                return
            $http.get(API.BaseUrl + 'city?state_id=' + state._id).then(function (res) {
                $scope.cities = res.data ? res.data.data : [];
            }).catch(function (res) { });
        }
        $scope.memberView = function () {
            $scope.signup_view = false;
            $scope.influencer_view = false;
            $scope.member_view = true;
            $scope.check.agree = false;
            getCategory();
        }
        $scope.influencerView = function () {
            $scope.signup_view = false;
            $scope.member_view = false;
            $scope.influencer_view = true;
            $scope.check.agree = false;
            getCategory();
        }
        function getCategory() {
            $http.get(API.BaseUrl + 'channel-category')
                .then(function (res) {
                    $scope.categories = res.data.data;
                });
        }

        $scope.back = function () {
            $scope.member_view = false;
            $scope.influencer_view = false;
            $scope.signup_view = true;
            $scope.check.agree = false;
        }

        $scope.submitForm = function () {
            if (!$scope.check.agree) {
                toaster.pop('error', 'Please read and agree to our Terms Of Use!');
                return
            }
            let country = null
            // let state = null
            // let city = null
            country = $scope.countries.find(function (c) {
                return c.name == $scope.signup.country
            })
            if (!country) {
                return toaster.pop('error', 'Please select country!');
            }
            // state = $scope.states.find(function (c) {
            //     return c.name == $scope.signup.state
            // })
            // if (!state) {
            //     return toaster.pop('error', 'Please select state!');
            // }
            // if ($scope.cities && $scope.cities.length > 0) {
            //     city = $scope.cities.find(function (c) {
            //         return c.name == $scope.signup.city
            //     })
            //     if (!city) {
            //         return toaster.pop('error', 'Please select city!');
            //     }
            // }
            let signupData = {
                "fullName": $scope.signup.fullName,
                "email": $scope.signup.email,
                "password": $scope.signup.password,
                "country": country.name,
                // "state": state,
                // "city": city,
                "promocode": $scope.signup.promocode
            };
            PreloadingService.loadStart()
            $http.post(API.BaseUrl + 'users', signupData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                    PreloadingService.loadEnd()
                    close({
                        type: 'success',
                        email: $scope.signup.email,
                        message: 'success message'
                    });
                }).catch(function (res) {
                    PreloadingService.loadEnd()
                    if (res.data && res.data.msg)
                        toaster.pop('error', res.data.msg)
                });
        }

        $scope.requestForm = function () {
            if (!$scope.check.agree) {
                toaster.pop('error', 'Please read and agree to our Terms Of Use!');
                return
            }
            let url = API.BaseUrl + 'users';
            PreloadingService.loadStart()
            $http.post(url, $scope.member, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                PreloadingService.loadEnd()
                toaster.pop('success', 'Thank you for your request, we will respond as soon as possible!');
                close()
            }).catch(function (res) {
                PreloadingService.loadEnd()
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }


        $scope.requestInfluencerForm = async function () {
            if (!$scope.check.agree) {
                toaster.pop('error', 'Please read and agree to our Terms Of Use!');
                return
            }
            if (!$scope.isValidVideo)
                return toaster.pop('error', 'Video not vail, less than 1 minute video only')
            // if (!$scope.influencer.facebook.link &&
            //     !$scope.influencer.youtube.link &&
            //     !$scope.influencer.instagram.link &&
            //     !$scope.influencer.twitter.link) {
            //     return toaster.pop('error', 'At least one social profile link!')
            // }
            if (!$scope.uploadProfileStatus) {
                PreloadingService.loadStart()
                await Promise.all($scope.socialImages.map(function (m) {
                    return uploadImageItem(m)
                }))
                $scope.uploadProfileStatus = true;
                PreloadingService.loadEnd()
            }
            if (!$scope.influencer.pictures || $scope.influencer.pictures.length == 0) {
                return toaster.pop('error', 'At least one picture about your profile!')
            }
            if (!$scope.uploadVideoStatus) {
                uploadVideo(function (rs) {
                    handle_post_influencer()
                })
            }
            else {
                if (!$scope.influencer.video) {
                    return toaster.pop('error', 'You need upload short video. Less than 1 minute video only')
                }
                handle_post_influencer()
            }
        }
        function handle_post_influencer() {
            let url = API.BaseUrl + 'influencer';
            $http.post(url, $scope.influencer, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                toaster.pop('success', 'Thank you for your request, Please check your inbox and verify your email address, we will respond as soon as possible!');
                close()
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }
        //Handle Image Social
        $scope.onUploadImage = function () {
            $("#social_image_upload").trigger('click')
        }
        //Handle Short Video Influencer
        $scope.onAttach = function () {
            $('#shortVideo').trigger('click')
        }

        $scope.viewUrl = function (image) {
            if (!image)
                return ''
            if (image.includes('https') || image.includes('amazonaws.com'))
                return image
            else
                return API.s3_url + image
        }
        function uploadImageItem(file) {
            return new Promise(function (resolve, reject) {
                if (!file) {
                    resolve()
                    return
                }
                var fileName = 'influencer/' + file.name;

                var photoKey = fileName;
                $scope.loading = true;
                $rootScope.s3.upload({
                    ContentType: file.type,
                    Key: photoKey,
                    Body: file,
                    ACL: 'public-read'//'private'
                }, function (err, data) {
                    if (err) {
                        $scope.loading = false;
                        $scope.uploadProfileStatus = true;
                        resolve()
                        return
                    }
                    $scope.influencer.pictures.push(photoKey);
                    $scope.loading = false;
                    resolve(true)
                });
            })
        }
        function uploadVideo(callback) {
            var files = document.getElementById('shortVideo').files;
            if (!files.length) {
                callback(false)
                return;
            }

            PreloadingService.loadStart()
            var file = files[0];
            var fileName = 'influencer/' + file.name;
            var photoKey = fileName;
            $scope.loading = true;
            $rootScope.s3.upload({
                ContentType: file.type,
                Key: photoKey,
                Body: file,
                conditions: ["content-length-range", 0, 30000],
                ACL: 'public-read'//'private'
            }, function (err, data) {
                if (err) {
                    $scope.loading = false;
                    $scope.uploadVideoStatus = true;
                    toaster.pop('error', 'There was an error uploading your video: ', err.message)
                    callback(false)
                    PreloadingService.loadEnd()
                    return
                }
                $scope.influencer.video = photoKey;
                $scope.uploadVideoStatus = true;
                $scope.loading = false;
                PreloadingService.loadEnd()
                callback(true)
            });
        }



        function initAutocomplete() {
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();
                if (places.length == 0) {
                    return;
                }
                const place = places[0];
                $scope.member.location = place.formatted_address
                // const geo = {
                //     latitude: places[0].geometry.location.lat(),
                //     longitude: places[0].geometry.location.lng()
                // }
                // if (geo.latitude) {
                //     getTimeZone(geo)
                // } else {
                //     $scope.disableTimezone = false
                // }
            });
        }
        angular.element(document).ready(function () {
            setTimeout(function () {
                initAutocomplete()
            }, 3000)
            $('#social_image_upload').change(function () {
                $scope.uploadProfileStatus = false;
                if (!this.files || this.files.length == 0)
                    return

                for (let index = 0; index < this.files.length; index++) {
                    const file = this.files[index];
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        setTimeout(function () {
                            $scope.socialPreviewImages.push(e.target.result);
                            $scope.$apply()
                        }, 500)
                    };
                    reader.readAsDataURL(file);
                    $scope.socialImages.push(file)
                }
                $scope.$apply()
            })

            if (document.getElementById('shortVideo')) {
                document.getElementById('shortVideo').addEventListener('change', function () {
                    var $source = $('#myVideo');
                    $scope.uploadVideoStatus = false;
                    $source[0].src = URL.createObjectURL(this.files[0]);
                    $source[0].load();
                    setTimeout(() => {
                        $scope.previewVideo = true;
                        if ($source[0].duration > 60) {
                            $scope.error = '1 minutes video only'
                            $scope.isValidVideo = false
                            $scope.loading = true
                            $scope.$apply()
                            return
                        }
                        $scope.isValidVideo = true
                        $scope.loading = false
                        $scope.$apply()
                    }, 700)
                })
            }
        })
    }
})();

