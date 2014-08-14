require.config({
	baseUrl: '/assets/js',
	paths: {
		'angular':							'../../../bower_components/angular/angular',
		'angular-route':				'../../../bower_components/angular-route/angular-route',
		'requirejs':						'../../../bower_components/requirejs/require',
		'almondjs':							'../../../bower_components/almond/almond',
		'libs':									'components/libs'
	},

	shim: {
		'angular-route':				['angular'],
	}

});

define([
	'libs',
	'components/general/config.js',
	'components/list/factory.js',
	'components/list/controller.js',
	'components/single/controller.js',
],
function(
	libs,
	config,
	factory,
	listController,
	singleController
){
	angular.module('myApp', ['ngRoute'])
		.config(config)
		.factory('factory', factory)
		.controller('listController', listController)
		.controller('singleController', singleController);

	angular.bootstrap(document, ['myApp']);
});