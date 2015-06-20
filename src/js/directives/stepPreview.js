hotelApp
	.directive('stepPreview', ['$price', '$timeout', '$rootScope', function($price, $timeout, $rootScope) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {
				/*setInterval(function() {
					$timeout(function() {
						scope.preview = $price.getPrice();
						$price.calculate();
					}, 0);
				}, 10000);*/

				scope.$watch(
					function() {
						return $price.getPrice();
					},
					function(newV) {
						$price.calculate();
						scope.preview = $price.getPrice();
					}, true);
			},
			templateUrl: '../stepPreview.html',
			replace: true
		}
	}]);
