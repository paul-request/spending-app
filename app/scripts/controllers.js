'use strict';

/* Controllers */

angular.module('SpendingApp.controllers', [])

.controller('SpendingAppCtrl', function($scope, $state, SpendingUserService) {
	$scope.isExistingUser = SpendingUserService.isReturningUser();

	if ($scope.isExistingUser) {
		$state.transitionTo('app.home');
	} else {
		$scope.isExistingUser = true;
		SpendingUserService.setReturningUser();
		$state.transitionTo('walkthrough');
	}
})

.controller('SpendingAppMainCtrl', function($scope, $state) {
	$scope.addNew = function() {
		$state.go('app.new');
	}

	
})

.controller('SpendingAppWalkthroughCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
	// Called to navigate to the main app
	$scope.startApp = function() {
		$state.go('app.home');
	};
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
	};

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
})

.controller('SpendingMenuCtrl', function($scope, $state) {
	$scope.navigate = function($event) {
		$event.preventDefault();
		$state.go($event.currentTarget.getAttribute('data-state'));
	}
})

.controller('SpendingAppAddNewCtrl', function($scope) {

})

.controller('SpendingAppTransactionsCtrl', function($scope) {
	$scope.items = [
	    { id: 0 },
	    { id: 1 },
	    { id: 2 },
	    { id: 3 },
	    { id: 4 },
	    { id: 5 },
	    { id: 6 },
	    { id: 7 },
	    { id: 8 },
	    { id: 9 },
	    { id: 10 }
	];
  
})

.controller('SpendingAppTransactionCtrl', function($scope, $stateParams) {
	$scope.id = $stateParams.id;
  
})

.controller('SpendingAppReportsCtrl', function($scope) {

})

.controller('SpendingAppSettingsCtrl', function($scope) {

})

.controller('SpendingAppErrorCtrl', function($scope) {

});