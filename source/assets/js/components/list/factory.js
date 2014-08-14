define([],function(){
	return ['$http', function($http){
		return {
			data: null,
			url: '/data/data',
			fetchData: function() {
				return $http.get(this.url).success(function(data){
					this.data = data;
				}.bind(this));
			}
		};
	}];
});