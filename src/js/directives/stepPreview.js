hotelApp
	.directive('stepPreview', [function() {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {

			},
			templateUrl: '../stepPreview.html',
			replace: true
		}
	}]);
