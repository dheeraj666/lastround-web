(function () {
    'use strict';

    angular
        .module('app')
        .controller('SubscriptionController', SubscriptionController);

    SubscriptionController.$inject = ['$rootScope', '$http', '$scope', 'API', 'ModalService'];
    function SubscriptionController($rootScope, $http, $scope, API, ModalService) {

        getPlanList();

        function getPlanList() {
            $http.get(API.BaseUrl + 'subscrption-plans')
                .then(function (res) {
                    if (res.data && res.data.data)
                        $scope.plan = res.data.data;
                });
        }


        // $scope.subscribe = function (data) {


        //     var elements = $rootScope.stripe.elements();

        //     // var card = elements.create('card');

        //     var promise = $rootScope.stripe.createToken('bank_account', {
        //         country: 'US',
        //         currency: 'usd',
        //         routing_number: '110000000',
        //         account_number: '000123456789',
        //         account_holder_name: 'Jenny Rosen',
        //         account_holder_type: 'individual',
        //     });
        //     promise.then(function (result) {
        //         // result.token is the card token.
        //         console.log(result)
        //     });


        // }


        // $scope.subscribe1 = function (data) {

        //     $http.defaults.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem('accessToken');

        //     $rootScope.stripe.createToken('bank_account', {
        //         country: 'US',
        //         currency: 'usd',
        //         routing_number: '110000000',
        //         account_number: '000123456789',
        //         account_holder_name: 'Jenny Rosen',
        //         account_holder_type: 'individual',
        //     }).then(function (result) {
        //         console.log('strip token', result)
        //         window.localStorage.setItem('stripeToken', result.token.id)
        //     });

        //     // let charge = $rootScope.stripe.Charge.create({
        //     //     amount: 199,
        //     //     currency:'INR',
        //     //     description:'Example charge',
        //     //     source:window.localStorage.getItem('stripeToken'),
        //     // })


        //     let Data = { 'plan_id': data.plan_id, 'stripeToken': window.localStorage.getItem('stripeToken') }



        //     // console.log(charge)

        //     $http({
        //         url: API.BaseUrl + 'user/subscrption/purchase',
        //         method: 'POST',
        //         data: Data,
        //         headers: {
        //             "Content-Type": "application/json"
        //         }

        //     }).then(function (response) {
        //         console.log(response)
        //     })

        //     $scope.selectedplan = {
        //         plan_id: data.plan_id
        //     }
        //     // let url = API.BaseUrl + 'user/subscrption/purchase';
        //     // QueryService.Post(url, $scope.selectedplan)
        //     // .then(function(res){
        //     // 	console.log(res);
        //     // });
        // }
        $scope.openModal = function (pack) {
            ModalService.showModal({
                templateUrl: "views/modal/payment.modal.html",
                controller: "MakePaymentController",
                inputs: {
                    package: pack
                }
            }).then(function (modal) {
                modal.close.then(function (result) {

                });
            });
        }
    }
})();

