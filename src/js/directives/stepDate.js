hotelApp
	.directive('stepDate', ['$stepError', function($stepError) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {
			//	setTimeout(function() {
			//		$stepError.setErrorValue(false);
			//	}, 5000);
			},
			templateUrl: '../stepDate.html',
			replace: true
		}
	}]);
