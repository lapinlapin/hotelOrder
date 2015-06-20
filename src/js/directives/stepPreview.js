hotelApp
	.directive('stepPreview', [
		'$paramsSetter',
		'$price',
		'$timeout',
		'$rootScope',
		'$http',
		function($paramsSetter, $price, $timeout, $rootScope, $http) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@',
				currentPosition: '='
			},
			link: function(scope, elem, attrs) {
				scope.$watch(
					function() {
						return $price.getPrice();
					},
					function(newV) {
						$price.calculate();
						scope.preview = $price.getPrice();
					}, true);

				scope.sendClientData = function() {
					console.log($paramsSetter.getParams());
					$http.get('../server.json', $paramsSetter.getParams()).success(function(data) {
						console.log(data);
						scope.currentPosition = 1;
					});
				}

			},
			templateUrl: '../stepPreview.html',
			replace: true
		}
	}]);
