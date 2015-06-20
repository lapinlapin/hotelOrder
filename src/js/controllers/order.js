/*
 *   @name Основная директива родитель страницы, разворачивается из Стейта app.js
 *   В шаблоне сложены прочие директивы для каждого шага, для хлебных крошек.
 *   Директива передает дочерним текущий шаг
 *   зы. здесь был сначала конроллер :)
 */
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
