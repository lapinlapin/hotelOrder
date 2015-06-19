hotelApp
	.directive('stepPreview', ['$price', function($price) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {
				setInterval(function() {
					scope.preview = $price.getPrice();
					$price.calculate();
				}, 10000);
			},
			templateUrl: '../stepPreview.html',
			replace: true
		}
	}]);
