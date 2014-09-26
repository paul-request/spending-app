'use strict';

/* Controllers */

angular.module('SpendingApp.controllers', [])

.controller('SpendingAppCtrl', function($rootScope, $scope, $state, SpendingUserService, SpendingDataService, SpendingMetaService) {
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
	$scope.current = {
		transaction: angular.copy(SpendingMetaService.getTemplate('transaction'))
	};
})

.controller('SpendingHeaderCtrl', function($scope, $state) {
	$scope.addNew = function() {
		$state.go('app.new');
	}
})

.controller('SpendingAppMainCtrl', function($rootScope, $scope, $state, $filter, SpendingDataService) {
	$rootScope.isSubnavHidden = true;
	$scope.groups = SpendingDataService.getGroupedTransactions();
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

	$scope.editDate = function() {
		$state.transitionTo('app.editdate');
	}

	$scope.editCategory = function() {
		$state.transitionTo('app.editcategory');
	}
	
	$scope.addTransaction = function() {
		var transactionCount = $scope.master.transactions.length;
		$scope.current.transaction.id = transactionCount+1;
		$scope.master.transactions.push($scope.current.transaction);
		SpendingDataService.putTransaction($scope.current.transaction);
		$scope.current.transaction = angular.copy(SpendingMetaService.getTemplate('transaction'));
		$state.go('app.transactions');
	}
})

.controller('SpendingAppEditDateCtrl', function($scope, $state) {
	$scope.editComplete = function() {
		$state.transitionTo('app.new');
	}
})

.controller('SpendingAppEditCategoryCtrl', function($scope, $state) {
	$scope.editComplete = function() {
		$state.transitionTo('app.new');
	}
	$scope.toggleCategory = function(category) {
		if ($scope.isSelectedCategory(category)) {
			$scope.selectedCategory = null;
		} else {
			$scope.selectedCategory = category;
		}
	};
	$scope.isSelectedCategory = function(category) {
		return $scope.selectedCategory === category;
	};
})

.controller('SpendingAppTransactionsCtrl', function($rootScope, $scope, SpendingDataService) {
	$rootScope.isSubnavHidden = false;
	$scope.groups = SpendingDataService.getGroupedTransactions();
})

.controller('SpendingAppTransactionCtrl', function($rootScope, $scope, $stateParams, SpendingDataService, SpendingMetaService) {
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