(function () {
    'use strict';

    angular
        .module('app')
        .controller('MakePaymentController', MakePaymentController);

    MakePaymentController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'toaster', 'close', 'countryList', 'package', '$http'];
    function MakePaymentController($rootScope, QueryService, $scope, API, ngTableParams, toaster, close, countryList, $package, $http) {
        $scope.close = close;
        $scope.loading = false;
        var year = new Date().getFullYear();
        $scope.years = [year];
        for (let index = 0; index < 10; index++) {
            year++;
            $scope.years.push(year);
        }

        var stripeResponseHandler = function (status, response) {
            if (response.error) {
                $scope.loading = false;
                toaster.pop('error', response.error.message)
                $scope.$apply()
                // Show appropriate error to user
            } else {
                if (!$package && !$package.plan_id) {
                    $scope.loading = false;
                    toaster.pop('error', 'Cannot get plan info.')
                    $scope.$apply()
                    return;
                }
                // Get the token ID:
                var token = response.id;
                let client_data = {
                    "plan_id": $package.plan_id,
                    "stripeToken": token
                }
                let tokenAu = 'Bearer ' + window.localStorage.getItem('accessToken')
                $http.post(API.BaseUrl + 'user/subscrption/purchase', client_data, {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': tokenAu
                    }
                }).then(function (res) {
                    $scope.loading = false;
                    toaster.pop('success', 'Thank you! Your payment has been successfully processed.')
                    close()
                    $scope.$apply()
                }).catch(function (res) {
                    $scope.loading = false;
                    toaster.pop('error', res.data.msg)
                    $scope.$apply()
                });
                // Save token mapping it to customer for all future payment activities
            }
        }

        $scope.submitForm = function () {
            $scope.loading = true;
            Stripe.card.createToken({
                number: $scope.card.number,
                cvc: $scope.card.cvv,
                exp_month: parseInt($scope.card.month),
                exp_year: parseInt($scope.card.year)
            }, stripeResponseHandler);
        }
    }

})();