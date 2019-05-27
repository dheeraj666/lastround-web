(function(){
    'use strict';

    angular
        .module('app')
        .controller('SubscriptionController', SubscriptionController);

    SubscriptionController.$inject = ['$rootScope', 'QueryService', '$scope', 'API', 'ngTableParams', 'Upload', '$localStorage','$window'];
    function SubscriptionController($rootScope, QueryService, $scope, API, ngTableParams, Upload, $localStorage, $window) {

    	getPlanList();

    	function getPlanList(){
    		QueryService.Get(API.BaseUrl+'subscrption-plans')
    		.then(function(res){
    			console.log(res);
    			$scope.plan = res.data;
    		});
    	}

    	$scope.subscribe = function(data){
    		$scope.selectedplan = {
    			plan_id: data.plan_id
    		}
    		let url = API.BaseUrl+'user/subscrption/purchase';
    		QueryService.Post(url, $scope.selectedplan)
    		.then(function(res){
    			console.log(res);
    		});
    	}

    }
})();

