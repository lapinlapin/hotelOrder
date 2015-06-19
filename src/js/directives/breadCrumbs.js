hotelApp
	.directive('breadCrumbs', ['$stepError', function($stepError) {
		return {
			restrict: 'A',
			scope: {
				currentPosition: '='
			},
			link: function(scope, elem, attrs) {
				scope.breadCrumbs = [
					{
						title: 'Шаг 1'
					},
					{
						title: 'Шаг 2'
					},
					{
						title: 'Шаг 3'
					},
					{
						title: 'Шаг 4'
					},
					{
						title: 'Шаг 5'
					}
				];

				scope.goPrevStep = function() {
					scope.currentPosition--;
					//после возврата на шаг назад, ставим флаг о том, что ошибка (данные еще не заполены)
					$stepError.setErrorValue(true);
				};

				scope.goNextPrev = function() {
					if ($stepError.getErrorValue()) return;
					scope.currentPosition++;
					$stepError.setErrorValue(true);
				};
			},
			templateUrl: '../breadCrumbs.html',
			replace: true
		}
	}]);
