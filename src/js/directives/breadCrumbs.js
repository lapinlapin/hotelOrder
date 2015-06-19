hotelApp
	.directive('breadCrumbs', ['$stepError', '$rootScope', '$paramsSetter', function($stepError, $rootScope, $paramsSetter) {
		return {
			restrict: 'A',
			scope: {
				currentPosition: '='
			},
			link: function(scope, elem, attrs) {
				scope.breadCrumbs = [
					{
						title: 'Шаг 1',
						id: 1
					},
					{
						title: 'Шаг 2',
						id: 2
					},
					{
						title: 'Шаг 3',
						id: 3
					},
					{
						title: 'Шаг 4',
						id: 4
					},
					{
						title: 'Шаг 5',
						id: 5
					}
				];

				scope.goPrevFromTabItem = function(id) {
					if (id == 4 && $paramsSetter.getParams().rooms == 1) {
						scope.currentPosition = id - 1;
						return;
					}
					scope.currentPosition = id;
				};

				scope.goPrevStep = function() {
					scope.currentPosition--;

					if (scope.currentPosition == 4 && $paramsSetter.getParams().rooms == 1) {
						scope.currentPosition--;  // если однокомнатный номер, не допускаем отката на шаг услуг
					}

					$stepError.setErrorValue(true);
				};

				scope.goNextPrev = function() {
					console.log($paramsSetter.getParams()); // параметры на текущий момент
					if ($stepError.getErrorValue()) return; // если валидация там где нужно не пройдена, останавливаем

					scope.currentPosition++; // увеличиваем текущий шаг

					if (scope.currentPosition == 4 && $paramsSetter.getParams().rooms == 1) {
						scope.currentPosition++;  // если однокомнатный номер, шаг 4 пропускаем
					}

					$stepError.setErrorValue(true);
					$rootScope.$emit('cleanedPeople', true);
				};
			},
			templateUrl: '../breadCrumbs.html',
			replace: true
		}
	}]);
