(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$rootScope', '$scope', 'API', 'toaster', 'close', 'countryList', '$http'];
    function SignupController($rootScope, $scope, API, toaster, close, countryList, $http) {
        $scope.check = {
            agree: false
        }
        $scope.signup_view = true;
        $scope.close = function (rs) {
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
            twitter: {}
        }
        $scope.socialImages = []
        $scope.cities = [];

        getCountryList();

        function getCountryList() {
            countryList.then(function (res) {
                $scope.countries = res.data;
            })
        }

        $scope.getState = function (value) {
            countryList.then(function (res) {
                angular.forEach(res.data, function (x, y) {
                    if (value == x.name) {
                        $scope.states = Object.keys(x.states);
                    }
                })
            })
        }

        $scope.getCity = function (value) {
            countryList.then(function (res) {
                angular.forEach(res.data, function (x, y) {
                    angular.forEach(x.states[value], function (x, y) {
                        $scope.cities.push(x)
                    })
                })
            })
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
            let signupData = {
                "fullName": $scope.signup.fullName,
                "email": $scope.signup.email,
                "password": $scope.signup.password,
                "country": $scope.signup.country,
                "state": $scope.signup.state,
                "city": $scope.signup.city,
                "promocode": $scope.signup.promocode
            };
            $http.post(API.BaseUrl + 'users', signupData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                    close({
                        type: 'success',
                        email: $scope.signup.email,
                        message: 'success message'
                    });
                }).catch(function (res) {
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
            $http.post(url, $scope.member, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                toaster.pop('success', 'Thank you for your request, we will respond as soon as possible!');
                close()
            }).catch(function (res) {
                if (res.data && res.data.msg)
                    toaster.pop('error', res.data.msg)
            });
        }


        $scope.requestInfluencerForm = async function () {
            if (!$scope.check.agree) {
                toaster.pop('error', 'Please read and agree to our Terms Of Use!');
                return
            }
            // if (!$scope.influencer.video)
            //     return toaster.pop('You need upload short video. Less than 1 minute video only')
            if (!$scope.isValidVideo)
                return toaster.pop('error', 'Video not vail, less than 1 minute video only')
            if (!$scope.influencer.facebook.link &&
                !$scope.influencer.youtube.link &&
                !$scope.influencer.instagram.link &&
                !$scope.influencer.twitter.link) {
                return toaster.pop('error', 'At least one social profile link and image!')
            }
            if (!$scope.uploadProfileStatus)
                await Promise.all($scope.socialImages.map(function (m) {
                    return uploadImageItem(m.image, m.name)
                }))
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
        $scope.onUploadImage = function (socialName) {
            $scope.currentSocialImageUpload = socialName;
            const classN = '.social_image_upload.' + socialName;
            $(classN).trigger('click')
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
        function uploadImageItem(file, social) {
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
                    $scope.influencer[social].image = photoKey;
                    $scope.uploadProfileStatus = true;
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
                    return
                }
                $scope.influencer.video = photoKey;
                $scope.uploadVideoStatus = true;
                $scope.loading = false;
                callback(true)
            });
        }
        angular.element(document).ready(function () {
            $('.social_image_upload').change(function () {
                $scope.uploadProfileStatus = false;
                if (!this.files || this.files.length == 0)
                    return
                var reader = new FileReader();
                reader.onload = function (e) {
                    setTimeout(function () {
                        $('.' + $scope.currentSocialImageUpload + "-image")[0].src = e.target.result;
                        $scope.$apply()
                    }, 500)
                };
                reader.readAsDataURL(this.files[0]);
                $scope.socialImages.push({
                    name: $scope.currentSocialImageUpload,
                    image: this.files[0]
                })
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

