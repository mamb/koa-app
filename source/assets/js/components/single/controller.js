define([],function(){
	return ['$scope', '$routeParams', 'factory', function($scope, $routeParams, factory) {
		$scope.data = factory.data;

		if(!factory.data){
			factory.fetchData()
				.success(function(){
					$scope.data = factory.data;
				});
		}

		$scope.filterFunction = function(item){
			return (Number(item.data) === Number($routeParams.singleId));
		};
	}];
});