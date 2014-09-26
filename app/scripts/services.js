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
			id: storageId,
            created: new Date(),
            modified: new Date(),
            currentTransaction: {},
			transactions: [],
			meta: SpendingMetaService.get()
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

    putTransaction = function(transaction) {
        var data = get();
        data.modified = new Date();
        data.transactions.push(transaction);
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
    },

    getGroupedTransactions = function() {
        var transactions = get().transactions,
            sortedGroups = _.sortBy(_.groupBy(transactions, function(t) {
            return new Date(t.date.value).getTime();
        }), function(o, key) {
            return -key;
        });

        return sortedGroups;
    }

	return {
        get: get,
		put: put,
        destroy: destroy,
        getTransaction: getTransaction,
        putTransaction: putTransaction,
        getGroupedTransactions: getGroupedTransactions
	}
})

.factory('SpendingMetaService', function() {
	var meta = {
    		categories: [{
    				name: 'Food & Drink',
                    classicon: 'ion-beer',
    				children: [
    					{name: 'Lunch'},
    					{name: 'Pub'},
                        {name: 'Dinner'}
    				]
    			}, {
                    name: 'Utilities',
                    classicon: 'ion-flame',
                    children: [
                        {name: 'Gas'},
                        {name: 'Electricity'},
                        {name: 'Dual Fuel'},
                        {name: 'Telephone'},
                        {name: 'Broadband'}
                    ]
                }, {
                    name: 'Shopping',
                    classicon: 'ion-bag',
                    children: [
                        {name: 'Clothes'},
                        {name: 'Shoes'},
                        {name: 'Gadgets'}
                    ]
                }, {
                    name: 'Vacations',
                    classicon: 'ion-plane',
                    children: [
                        {name: 'Flights'},
                        {name: 'Hotel'},
                        {name: 'Package'},
                        {name: 'Foreign currency'}
                    ]
                }, {
                    name: 'Transport',
                    classicon: 'ion-map',
                    children: [
                        {name: 'Train'},
                        {name: 'Bus'},
                        {name: 'Tube'},
                        {name: 'Tram'},
                        {name: 'Flight'},
                        {name: 'Taxi'}
                    ]
                }, {
                    name: 'Hobbies',
                    classicon: 'ion-ios7-tennisball',
                    children: [
                        {name: 'Sports club'},
                        {name: 'Gym membership'},
                        {name: 'Insurance'},
                        {name: 'Service'},
                        {name: 'Repairs'},
                        {name: 'New vehicle'}
                    ]
                }, {
                    name: 'Car',
                    classicon: 'ion-model-s',
                    children: [
                        {name: 'MOT'},
                        {name: 'Tax'},
                        {name: 'Insurance'},
                        {name: 'Service'},
                        {name: 'Repairs'},
                        {name: 'New vehicle'}
                    ]
                }, {
                    name: 'Entertainment',
                    classicon: 'ion-film-marker',
                    children: [
                        {name: 'Cinema'},
                        {name: 'Show'},
                        {name: 'Musical'},
                        {name: 'Opera'},
                        {name: 'Sport'},
                        {name: 'Comedy'}
                    ]
                }
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