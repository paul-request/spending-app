'use strict';

/* Controllers */

angular.module('SpendingApp.controllers', [])

.controller('SpendingAppCtrl', function($rootScope, $scope, $state, SpendingUserService, SpendingDataService) {
	$scope.isExistingUser = SpendingUserService.isReturningUser();

	if ($scope.isExistingUser) {
		$state.transitionTo('app.home');
	} else {
		$scope.isExistingUser = true;
		SpendingUserService.setReturningUser();
		$state.transitionTo('walkthrough');
	}
	$rootScope.isSubnavHidden = false;
	$scope.master = SpendingDataService.get();
})

.controller('SpendingHeaderCtrl', function($scope, $state) {
	$scope.addNew = function() {
		$state.go('app.new');
	}
})

.controller('SpendingAppMainCtrl', function($rootScope, $scope, $state) {
	$rootScope.isSubnavHidden = true;
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

})

.controller('SpendingAppAddNewCtrl', function($rootScope, $scope) {
	$rootScope.isSubnavHidden = false;
})

.controller('SpendingAppTransactionsCtrl', function($rootScope, $scope) {
	$rootScope.isSubnavHidden = false;
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

.controller('SpendingAppTransactionCtrl', function($rootScope, $scope, $stateParams) {
	$rootScope.isSubnavHidden = false;
	$scope.id = $stateParams.id;
  
})

.controller('SpendingAppReportsCtrl', function($rootScope, $scope) {
	$rootScope.isSubnavHidden = false;
})

.controller('SpendingAppSettingsCtrl', function($rootScope, $scope) {
	$rootScope.isSubnavHidden = false;
})

.controller('SpendingAppErrorCtrl', function($rootScope, $scope) {
	$rootScope.isSubnavHidden = false;
});