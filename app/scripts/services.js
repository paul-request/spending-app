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

.factory('SpendingDataService', function($http, SpendingMetaService) {

	var storageId = 'spending-app-data',
		dataTemplate = {
			"id": storageId,
            "created": new Date(),
            "modified": new Date(),
			"transactions": [],
			"meta": SpendingMetaService.get()
		};

	/**
	 * Create an empty data object, save it in local storage
	 * @returns {object} - the blank data object
	 */ 
    var 
    _create = function() {
		var defaultObject = angular.extend({}, dataTemplate, {id: storageId});
		put(defaultObject);
		return defaultObject;
	},
	/**
     * Retrieve the quote with the key passed in from local storage
     * @param {string} key - the unique key of the quote stored
     * @returns {object} - the JSON object representation of the quote
     */ 
	get = function() {
		return JSON.parse(localStorage.getItem(storageId)) || _create();
	},
	/**
     * Save a quote to local storage
     * @param {string} key - the unique key of the quote to be saved
     * @param {object} quote - the quote to be saved
     */ 
	put = function(data) {
        data.modified = new Date();
		localStorage.setItem(storageId, JSON.stringify(data));
	},
    
    /**
     * Remove a quote from local storage
     * @param {string} key - the unique key of the quote to be removed
     */ 
	destroy = function(key) {
		localStorage.removeItem(key);
	},

    getTransaction = function(id) {
        var transactions = get().transactions;
        return transactions.filter(function(obj) {
            return obj.id == id;
        });
    }

	return {
        get: get,
		put: put,
        destroy: destroy,
        getTransaction: getTransaction
	}
})

.factory('SpendingMetaService', function() {
	var meta = {
    		categories: [
    			{
    				name: 'Food & Drink',
    				children: [
    					{name: 'Lunch'},
    					{name: 'Pub'}
    				]
    			},
    			{name: 'Bills'}
    		],
            currency: '£'
    	},
        templates = {
            transaction: {
                type: '-',
                description: '',
                amount: 0,
                date: {
                    value: new Date()
                }
            }
        }

    return {
        /**
         * Retrieve meta data from the service
         * @param {string} key - the key of the meta data to retrieve
         * @returns the meta data if the key is valid || all meta data
         */ 
    	get: function(key) {
            if (key && meta.hasOwnProperty(key)) {
                return meta[key];
            } else {
                return meta;
            }     
        },

        getTemplate: function(key) {
            return templates[key] || {};
        }
    }
})

.factory('MessageBusService', function($rootScope) {
    return {
        /**
         * Publish a message on the rootscope
         * @param {string} msg - the message to publish
         */ 
        publish: function(msg) {
            $rootScope.$emit(msg);
        },
        /**
         * Subscribe to a message
         * @param {string} msg - the message to subscribe to
         * @param {object} scope - the scope to bind to
         * @param {function} func - the to call when msg is published
         */ 
        subscribe: function(msg, scope, func) {
            var unbind = $rootScope.$on(msg, func);
            scope.$on('$destroy', unbind);
        }
    }
});