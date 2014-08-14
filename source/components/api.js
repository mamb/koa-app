var request = require('request');
var thunkify = require('thunkify');
var get = thunkify(request.get);

function *doHttpRequest(url) {
	var resultParams = yield get(url);
	return resultParams[1];
}

var api = {
	data: 'http://127.0.0.1:30002/mocks/data.json',
};

module.exports = function(app, route){
	app.use(route.get('/data/data', function *() {
		this.body = yield doHttpRequest(api.data);
	}));
}
