define([],function(){
	return ['$scope', '$http', 'factory', function($scope, $http, factory) {
		$scope.data = factory.data;

		if(!factory.data){
			factory.fetchData()
				.success(function(){
					$scope.data = factory.data;
				});
		}
	}];
});