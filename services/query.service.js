(function(){
    'use strict';

    angular
        .module('app')
        .factory('QueryService', QueryService);

    QueryService.$inject = ['$http', '$rootScope', '$localStorage'];
	function QueryService($http, $rootScope, $localStorage){

        var service = {};

        service.Get = Get;
        // service.Post = Post;
        // service.Put = Put;
        service.Post = JsonPost;
        service.Put = JsonPut;
        service.PostArray = PostArray;
        service.PutArray = PutArray;
        service.Login = Login;

    	return service;

        function Login(url, data){
            console.log(url, data);
            // return $http.post(url, data,
            // {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //         'Authorization': 'Basic VFY6TFVJU1RWQDEyMw=='
            //     },
            //     transformRequest: angular.identity,
            // });
        }

        function Get(url){
    		return $http.get(url, {
    			headers:{
    				// 'Authorization':$localStorage.user.token
    			}
    		}).then(handleSuccess); 
    	}


        // addCustomData is a function that returns formdata for complex data processed outside this service
        //      - must return the same formdata passed
        function Post(url, data, addCustomData) {
            var formdata = new FormData();

            angular.forEach(data, function (value, key) {
                formdata.append(key, value);
            });

            if (typeof addCustomData != 'undefined') {
                formdata = addCustomData(formdata)
            }

            return $http.post(
                url, formdata, {
                // processData: false,
                headers: {
                    'Content-Type': undefined,
                    'Authorization':$localStorage.user.token
                },
                transformRequest: angular.identity,
            })
            .then(handleSuccess)
        }

        function PostArray(url, data){
            return $http.post(
                url, data, {
                // processData: false,
                headers: {
                    'Content-Type': undefined,
                    'Authorization':$localStorage.user.token
                },
                transformRequest: angular.identity,
            })
        }

        function JsonPost(url, data){
            return $http.post(
                url, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization':$localStorage.user.token
                }
            })
            .then(handleSuccess)
        }

        function Put(url, data, addCustomData){
            var formdata = new FormData();
            
            angular.forEach(data, function(value, key) {
                formdata.append(key, value)
            }); 

            if (typeof addCustomData != 'undefined') {
                formdata = addCustomData(formdata)
            }
            
            return $http.put(
                url, formdata, {
                headers: {
                    'Content-Type': undefined,
                    'Authorization':$localStorage.user.token
                },
                transformRequest: angular.identity,
            })
            .then(handleSuccess)
        }

        function JsonPut(url, data){
            return $http.put(
                url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':$localStorage.user.token
                }
            })
            .then(handleSuccess)
        }

        function PutArray(url, data){
            return $http.put(
                url, data, {
                // processData: false,
                headers: {
                    'Content-Type': undefined,
                    'Authorization':$localStorage.user.token
                },
                transformRequest: angular.identity,
            })
        }


      function GetTransaction(){
         return $http.get('http://52.77.228.111/api/v1/users/total_users',
                {
				headers: {
					'X-Access-Token': $rootScope.globals.currentUser.token,
					'X-Access-Type':
					'Merchant',
					Accept : "application/json"
				}
		}).then(handleSuccess, function(error){
									// ToastService.Show("An unexpected error occured", error);
               });
      }

		// private functions
      function handleSuccess(response) {
         return response.data;
      }

	}

})();
