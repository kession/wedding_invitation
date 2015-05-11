 var app = angular.module('inviteApp', ['ngRoute']);

app.factory('inviteService', ['$http', function ($http) {
    var inviteAPI = {};

    inviteAPI.join = function (type, uid) {
        var url = '/join/' + uid;
        var data = {
            t : type
        };
        return $http({
            method: 'post',
            data : data,
            url: url
        });
    };

    inviteAPI.getUsername = function (uid) {
    var url = '/u/' + uid;
    return $http({
        method: 'get',
        url: url
    });
};

    return inviteAPI;

}]);

 app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/i/:uid', {
            controller: 'homeController',
            templateUrl: 'home.html'
        }).when('/detail', {
        	controller: 'detailController',
            templateUrl: 'detail.html'
        }).otherwise({
            templateUrl: '404.html'
        });
    }]);

app.controller('rootController', ['$scope', '$routeParams','inviteService', function ($scope, $routeParams, inviteService) {
 	$scope.global = {
 		username : null,
 		uid : null
 	};
 	
}]);

app.controller('detailController', ['$scope', '$routeParams','inviteService', function ($scope, $routeParams, inviteService) {


}]);

app.controller('homeController', ['$scope', '$routeParams','inviteService', function ($scope, $routeParams, inviteService) {
 	$scope.global.uid = $routeParams.uid;

 	$scope.getUser = function(uid) {
 		if(uid) {
 			inviteService.getUsername(uid)
       		.success(function (data, status, headers) {
                if(data.c == 1) {
                    $scope.global.username = data.d;

                } else {
                	$scope.global.username = null;
                	$scope.global.uid = null;
                    alert(data.d);                    
                }
            });
 		}
 		 
 	};

 	$scope.$watch('global.uid', function (uid) {
      $scope.getUser(uid);

    });

    $scope.join = function(type) {
    	

    	if(type != 1 && type != 0) {
    		Alert('你想怎样..');
    		return;
    	}

    	if( type == 0) {
    		if(!confirm("真的不来参加了吗T.T ?") ) {
			   return;
			}

			if(!confirm("真的真的不来参加了吗?")) {
			  return;
			}
    	}

    	
    	


    	var successMsg = type == 1 ? '谢谢！参加成功，到时候见!' : 'ohoooo.已确认不参加!';
    	inviteService.join(type, $scope.global.uid)
    		.success(function (data, status, headers) {
                if(data.c == 1) {
                    alert(successMsg);
                } else {
                    alert(data.d);                    
                }
            });
    };

    // if($scope.uid) {
    // 	$scope.getUser($scope.uid);
    // }
}]);