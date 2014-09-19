'use strict';

/* Filters */

angular.module('SpendingApp.filters', [])

.filter('timeSince', function() {
	return function(date) {
		var time_formats = [
	        [60, 'seconds', 1], // 60
	        [120, '1 minute ago'], // 60*2
	        [3600, 'minutes', 60], // 60*60, 60
	        [7200, '1 hour ago'], // 60*60*2
	        [86400, 'hours', 3600], // 60*60*24, 60*60
	        [172800, 'Yesterday'], // 60*60*24*2
	        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
	        [1209600, 'Last week'], // 60*60*24*7*4*2
	        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
	        [4838400, 'Last month'], // 60*60*24*7*4*2
	        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
	        [58060800, 'Last year'], // 60*60*24*7*4*12*2
	        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
	    ];
	    var 
	    seconds = Math.round((+new Date() - new Date(date)) / 1000),
	    list_choice = 1;

	    if (seconds == 0) {
	        return 'Just now'
	    }
	    
	    var i = 0, format;
	    while (format = time_formats[i++]) {
	        if (seconds < format[0]) {
	            if (typeof format[2] !== 'undefined') {
	                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ago';
	            } else {
	                return format[list_choice];
	            }
	        return time;
	        }
	    }
	}
})

.filter('dateString', function($filter) {
	return function(date) {
		var 
		date = $filter('date')(date, 'd MMM yy'),
		seconds = Math.round((+new Date() - new Date(date)) / 1000);

		if (seconds < 86400) {
			return 'Today';
		}

		if (seconds < 172800) {
			return 'Yesterday';
		}

		return date;
	}
})