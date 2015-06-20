/*
 *   @name Директива для превью.
 *   Забирает набор сформированных данных, на фоне данных разворачивается в шаблоне
 *   Вместо post, создал Json, отправил Get, чтобы корректно завершить заказ
 */
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

				scope.$watch('message', function(newV) {
					$paramsSetter.setParam('comment', newV);
				});

				scope.$watch(
					function() {
						return $price.getPrice();
					},
					function(newV) {
						$price.calculate();
						scope.preview = $price.getPrice();
					}, true);

				scope.sendClientData = function() {
					$http.get('../server.json', $paramsSetter.getParams()).success(function(data) {
						$price.setPrice('room', {
							cost: 0,
							image: ''
						});
						$price.setPrice('days', 1);
						$rootScope.$emit('cleanedDates', true);
						$price.setPrice('people', []);
						$price.setPrice('peopleCount', 0);
						$price.setPrice('services', []);
						scope.currentPosition = 1;

						alert('Server responce: ' + data.success);
					});
				}

			},
			templateUrl: '../stepPreview.html',
			replace: true
		}
	}]);
