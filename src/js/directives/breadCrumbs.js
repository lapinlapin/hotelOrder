/*
 *   @name Директива табов и навигации
 *   Разворачивается из массива. Обрабатывает навигацию по табам, кнопки.
 *   В целом работает со всеми сервисами, чистит данные тех или иных шагов
 */
hotelApp
	.directive('breadCrumbs', [
		'$stepError',
		'$rootScope',
		'$paramsSetter',
		'$price',
		'$timeout',
		function($stepError, $rootScope, $paramsSetter, $price, $timeout) {
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

				scope.$watch(
					function() {
						return $price.getPrice();
				},
					function(newV) {
						$price.calculate();
						scope.totalSum = $price.getPrice().totalSum;
				}, true);

				function clearPriceAfterBack(stepId) {
					var conf = {
						'1': function() {
							$price.setPrice('room', {
								cost: 0,
								image: ''
							});
							$price.setPrice('services', []);
							$rootScope.$emit('cleanedDates', true);
						},
						'2': function() {
							$price.setPrice('days', 1);
							$rootScope.$emit('cleanedDates', true);
							$price.setPrice('people', []);
							$price.setPrice('peopleCount', 0);
							$price.setPrice('services', []);
						},
						'3': function() {
							$price.setPrice('people', []);
							$price.setPrice('peopleCount', 0);
							$price.setPrice('services', []);
							$stepError.setErrorValue(true);
						},
						'4': function() {
							$price.setPrice('services', []);
						}
					};
					conf[stepId]();
				}

				scope.goPrevFromTabItem = function(id) {
					if (id == 4 && $paramsSetter.getParams().rooms == 1) {
						scope.currentPosition = id - 1;
						return;
					}
					scope.currentPosition = id;
					clearPriceAfterBack(scope.currentPosition);

					scope.currentPosition == 4 ? $stepError.setErrorValue(false) : $stepError.setErrorValue(true);
				};

				scope.goPrevStep = function() {
					scope.currentPosition--;

					if (scope.currentPosition == 4 && $paramsSetter.getParams().rooms == 1) {
						scope.currentPosition--;  // если однокомнатный номер, не допускаем отката на шаг услуг
					}

					clearPriceAfterBack(scope.currentPosition);
					//$stepError.setErrorValue(true);
					scope.currentPosition == 4 ? $stepError.setErrorValue(false) : $stepError.setErrorValue(true);
				};

				scope.goNextPrev = function() {

					if (scope.currentPosition == 4) { //если на текущий момент, перед счетчиком мы в услугах, разрешаем не выбирать
						$stepError.setErrorValue(false);
					}

					if ($stepError.getErrorValue()) return; // если валидация там где нужно не пройдена, останавливаем

					scope.currentPosition++; // увеличиваем текущий шаг

					if (scope.currentPosition == 4 && $paramsSetter.getParams().rooms == 1) {
						scope.currentPosition++;  // если однокомнатный номер, шаг 4 пропускаем
					}

					$stepError.setErrorValue(true);

					$rootScope.$emit('cleanedPeople', true);
					$rootScope.$emit('cleanedServices', true);
				};
			},
			templateUrl: '../breadCrumbs.html',
			replace: true
		}
	}]);
