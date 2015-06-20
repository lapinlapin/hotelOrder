hotelApp
	.directive('stepDate', ['$stepError', '$timeout', function($stepError, $timeout) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {

				setInterval(function() {
					scope.from = ($('.stepDate__date').eq(0).attr('value'));
					scope.to = ($('.stepDate__date').eq(1).attr('value'));
				}, 3000);

				setTimeout(function() {
					$('#datepickerFrom').datepicker();
					$('#datepickerTo').datepicker();
				}, 1500);

			},
			templateUrl: '../stepDate.html',
			replace: true
		}
	}]);
