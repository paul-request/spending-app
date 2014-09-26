'use strict';

/* Directives */

angular.module('SpendingApp.directives', [])

.directive('inlineFocus', function($timeout) {
	return function (scope, elem, attrs) {
		scope.$watch(attrs.inlineFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
})

.directive('validateFieldsOnBlur', function () {
    var 
    errorClass = 'form-control-error',
    errorTemplate = '<p class="'+ errorClass + '"></p>',
    validateField = function(field, ctrl) {
    	var 
		inputName = field.attr('name'),
		errorMsg = field.next('.' + errorClass);

		field.toggleClass('has-visited', ctrl[inputName].$invalid);

		if (ctrl[inputName].$invalid) {
			if (errorMsg.length === 0) {
				field.after($(errorTemplate).hide().text(field.data('error')).fadeIn(300));
			} else {
				errorMsg.text(field.data('error'));
			}
		} else {
			if (errorMsg) {
				errorMsg.fadeOut(200).remove();
			}
		}
    }



    return {
        restrict: 'A',
        require:  '^form',
        link: function (scope, element, attrs, ctrl) {
            element.find('input, select, textarea').on('blur', function (evt) {
				validateField($(this), ctrl);
            });
            element.find('select').on('change', function (evt) {
				validateField($(this), ctrl);
            });
        }
    };
})

.directive('amountTransform', function() {
	var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ngModel) {
			if (!ngModel) return; // do nothing if no ng-model

			// Specify how UI should be updated
			ngModel.$render = function() {
				element.val(parseFloat(ngModel.$viewValue/100).toFixed(2));
			};

			// Listen for change events to enable binding
			element.on('keyup change', function() {
				scope.$apply(read);
			});

			element.on('blur', function() {
				scope.$apply(read);
				ngModel.$render();
			});

			// Write data to the model
			function read(value) {
				ngModel.$setViewValue(parseFloat(element.val()*100));
			}
		}
	};
})

.directive('pricePlaceholder', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ngModel) {
			var placeholder = attrs.placeholder;
			element.on('focus', function() {
				if (element.val() === placeholder) {
					element.val('');
				}
			});

		}
	};
});