'use strict';

/* Routes */

angular.module('SpendingApp.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
	.state('init', {
		url: '/',
		controller: 'SpendingAppCtrl'
	})
	.state('walkthrough', {
		url: '/walkthrough',
		templateUrl: 'views/walkthrough.html',
		controller: 'SpendingAppWalkthroughCtrl'
	})
	.state('app', {
		abstract: true,
		templateUrl: 'views/app-layout.html',
		controller: 'SpendingAppCtrl'
	})
	.state('app.home', {
		url: '/home',
		views: {
			'menuContent' :{
				templateUrl: 'views/main.html',
				controller: 'SpendingAppMainCtrl'
			}
		}
	})
	.state('app.new', {
		url: '/new',
		views: {
			'menuContent' :{
				templateUrl: 'views/new.html',
				controller: 'SpendingAppAddNewCtrl'
			}
		}
	})
	.state('app.editdate', {
		url: '/editdate',
		views: {
			'menuContent' :{
				templateUrl: 'views/edit-date.html',
				controller: 'SpendingAppEditDateCtrl'
			}
		}
	})
	.state('app.editcategory', {
		url: '/editcategory',
		views: {
			'menuContent' :{
				templateUrl: 'views/edit-category.html',
				controller: 'SpendingAppEditCategoryCtrl'
			}
		}
	})
	.state('app.settings', {
		url: '/settings',
		views: {
			'menuContent' :{
				templateUrl: 'views/settings.html',
				controller: 'SpendingAppSettingsCtrl'
			}
		}
	})
	.state('app.transactions', {
		url: '/transactions',
		views: {
			'menuContent' :{
				templateUrl: 'views/transactions.html',
				controller: 'SpendingAppTransactionsCtrl'
			}
		}
	})
	.state('app.transaction', {
		url: '/transactions/:id',
		views: {
			'menuContent' :{
				templateUrl: 'views/transaction.html',
				controller: 'SpendingAppTransactionCtrl'
			}
		}
	})
	.state('app.reports', {
		url: '/reports',
		views: {
			'menuContent' :{
				templateUrl: 'views/reports.html',
				controller: 'SpendingAppReportsCtrl'
			}
		}
	})
	.state('app.error', {
		url: '/error',
		views: {
			'menuContent' :{
				templateUrl: 'views/error.html',
				controller: 'SpendingAppErrorCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/');
});