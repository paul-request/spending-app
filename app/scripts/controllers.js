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

.controller('SpendingAppAddNewCtrl', function($rootScope, $scope, $state, SpendingDataService, SpendingMetaService) {
	$rootScope.isSubnavHidden = false;
	$scope.transaction = SpendingMetaService.getTemplate('transaction');

	$scope.editDate = function() {
		$state.go('app.editdate');
	}
	$scope.editComplete = function() {
		$state.go('app.new');
	}
	$scope.addTransaction = function() {
		var transactionCount = $scope.master.transactions.length;
		$scope.transaction.id = transactionCount+1;
		$scope.master.transactions.push($scope.transaction);
		SpendingDataService.put($scope.master);
		$scope.transaction = SpendingMetaService.getTemplate('transaction');
		$state.go('app.transactions');
	}
})

.controller('SpendingAppTransactionsCtrl', function($rootScope, $scope) {
	$rootScope.isSubnavHidden = false;
})

.controller('SpendingAppTransactionCtrl', function($rootScope, $scope, $stateParams, SpendingDataService) {
	$rootScope.isSubnavHidden = false;
	$scope.transaction = SpendingDataService.getTransaction($stateParams.id)[0]; 
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