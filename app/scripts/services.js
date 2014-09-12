'use strict';

/* Services */

angular.module('SpendingApp.services', [])

.factory('SpendingUserService', function($http) {
	var EXISTING_USER_KEY = 'spend-user-exists';

	return {
		isReturningUser: function() {
			return (localStorage.getItem(EXISTING_USER_KEY) === 'true');
		},
		setReturningUser: function() {
			localStorage.setItem(EXISTING_USER_KEY, true);
		}
	}
})