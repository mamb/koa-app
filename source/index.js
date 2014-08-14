var koa = require('koa');

var serve = require('koa-static');
var route = require('koa-route');
var hbs = require('koa-hbs');

var api = require('./components/api.js');

var app = koa();

//static files
app.use(serve('./build/'));

//initiate handlebars
app.use(hbs.middleware({
	partialsPath: __dirname + '/views/partials',
	viewPath: __dirname + '/views',
}));

//send all 'api' reqs to API function
app.use(route.get('/data/*', api(app, route)));

//send rest to SPA index
app.use(function *() {
	yield this.render('main', {title: 'Koa testing'});
});

app.listen(30002);