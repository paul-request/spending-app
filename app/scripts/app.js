'use strict';

/**
 * @ngdoc overview
 * @name SpendingApp
 * @description
 * # SpendingApp
 *
 * Main module of the application.
 */
angular.module('SpendingApp', [
	'ionic',
	'SpendingApp.services',
	'SpendingApp.filters',
	'SpendingApp.routes',
	'SpendingApp.directives',
	'SpendingApp.services',
	'SpendingApp.controllers'
])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})