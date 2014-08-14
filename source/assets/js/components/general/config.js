define([],function(){
	return ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider.when('/', {
			templateUrl : '/assets/tmpl/list.html',
			controller  : 'listController'
		});

		$routeProvider.when('/single/:singleId/', {
			templateUrl: '/assets/tmpl/single.html',
			controller: 'singleController'
		});

		// $routeProvider.otherwise({
		// 	redirectTo: '/'
		// });
	}];
});