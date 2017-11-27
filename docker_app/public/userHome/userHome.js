// Raquib Talukder
// IP Development Project
// userHome.js

'use strict';

angular.module('userHome', ['ngRoute','myAppService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userHome', {
    templateUrl: '../userHome/userHome.html',
    controller: 'UserHomeCtrl'
  });
}])

.controller('UserHomeCtrl',['$scope','CommonProp','$http','$location', function($scope,CommonProp,$http,$location) {
        
	$scope.edit = {};
	$scope.deletion = {};
	var auth = CommonProp.getUserAuth();
	
    var user = CommonProp.getUser();

	var getAllTask = function(){
		$scope.tasks = [];
		$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"};
	   	$http.defaults.headers.common = {"Access-Control-Expose-Headers": "Origin, X-Requested-With, Content-Type, Accept"};
		$http.defaults.headers.common["Cache-Control"] = "no-cache";
	   	$http.defaults.headers.common.Pragma = "no-cache";
	   	$http.defaults.headers.common['Authorization'] = 'Basic '+auth;
	    
		$http({method: 'GET',cache: false, url: 'http://127.0.0.1:5000/item?where={"username":"'+user+'"}'}).
		    success(function(data, status, headers, config) {
			console.log(data);
			console.log(data._items);
			for(var i=0;i<data._items.length;i++){
				console.log(data._items[i].information);
				$scope.tasks.push({'title': data._items[i].information,'id':data._items[i]._id,'tag':data._items[i]._etag});
			}
			console.log($scope.tasks);
			
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data,status);
		    });
	}

	getAllTask();	

	$scope.editTask = function(title,id,tag){
		$scope.edit.task = title;
		$scope.edit.id = id;
		$scope.edit.tag = tag;
		$('#editModal').modal('show');
	}
	$scope.update = function(){
	
		$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"};
	   	$http.defaults.headers.common = {"Access-Control-Expose-Headers": "Origin, X-Requested-With, Content-Type, Accept"};
		$http.defaults.headers.common["Cache-Control"] = "no-cache";
	   	$http.defaults.headers.common.Pragma = "no-cache";
	   	$http.defaults.headers.common['Authorization'] = 'Basic '+auth;
		$http.defaults.headers.common['If-Match'] = $scope.edit.tag;
	    
		$http({method: 'PATCH',cache: false, url: 'http://127.0.0.1:5000/item/'+ $scope.edit.id,data: { information: $scope.edit.task }}).
		    success(function(data, status, headers, config) {
			$('#editModal').modal('hide');
			getAllTask();
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data,status);
		    });	
	
	};

	$scope.confirmDelete = function(id,tag){
		$scope.deletion.id = id;
		$scope.deletion.tag = tag;
		$('#deleteModal').modal('show');
	}

	$scope.deleteTask = function(){
		$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"};
	    $http.defaults.headers.common = {"Access-Control-Expose-Headers": "Origin, X-Requested-With, Content-Type, Accept"};
		$http.defaults.headers.common["Cache-Control"] = "no-cache";
	    $http.defaults.headers.common.Pragma = "no-cache";
	    $http.defaults.headers.common['Authorization'] = 'Basic '+auth;
		$http.defaults.headers.common['If-Match'] = $scope.deletion.tag;

		$http({method: 'DELETE',cache: false, url: 'http://127.0.0.1:5000/item/'+ $scope.deletion.id}).
		    success(function(data, status, headers, config) {
			$('#deleteModal').modal('hide');
			getAllTask();
		    }).
		    error(function(data, status, headers, config) {
		        console.log(data,status);
		    });	
	}

}]);

