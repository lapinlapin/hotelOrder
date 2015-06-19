hotelApp
	.directive('order', ['$paramsSetter', '$timeout', function($paramsSetter, $timeout) {
		return {
			restrict: 'A',
			scope: {},
			link: function(scope, elem, attr) {
				scope.currentStep = 1;

				scope.$on('stepChanged', function(e, data) {
					$timeout(function() {
						scope.currentStep = data;
					}, 0);
				});
			},
			templateUrl: '../../order.html'
		}
	}]);
