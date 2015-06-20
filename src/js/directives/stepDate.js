hotelApp
	.directive('stepDate', [
		'$stepError',
		'$timeout',
		'$paramsSetter',
		'$price',
		'$rootScope',
		function($stepError, $timeout, $paramsSetter, $price, $rootScope) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {

				function convertDateToUnix(date) {
					var dt = date.split('/'),
						df;

					df = dt[1] + '.' + dt[0] + '.' + dt[2];

					return Date.parse(df.replace(/(\d+)\.(\d+)\./, '$2-$1-'));
				}

				function saveSelectDates() {
					scope.dates = {
						from: convertDateToUnix(scope.from),
						to: convertDateToUnix(scope.to),
						normalFrom: scope.from,
						normalTo: scope.to
					};
					return scope.dates;
				}

				function getDayBetweenDates() {
					return (scope.dates.to - scope.dates.from) / 1000 / 24 / 60 / 60;
				}

				function validate() {
					var conf = [
						{
							model: scope.dates.from,
							name: 'from',
							applyCls: 'people__area_error',
							title: 'Ошибка ввода',
							checker: function(val) {
								var dateNow = +new Date();

								return !!val && parseInt(val) > dateNow;
							}
						},
						{
							model: scope.dates.to,
							name: 'to',
							applyCls: 'people__area_error',
							title: 'Ошибка ввода',
							checker: function(val) {
								return !!val && parseInt(val) > parseInt(scope.dates.from);
							}
						}
					];

					conf.forEach(function(conf) {
						var query = 'input[data-ng-model^="' + conf.name + '"]';

						scope.validateError = 0;

						if (!conf.checker(conf.model)) {
							scope.validateError++;
							$price.setPrice('days', 1);
							$price.calculate();
							$rootScope.$apply();
							$(query).attr('placeholder', conf.title).attr('value','').addClass(conf.applyCls);
						} else {
							$(query).removeClass(conf.applyCls);
						}
					});
				}

				$rootScope.$on('cleanedDates', function(e, data) {
					scope.from = '';
					scope.to = '';
				});

				setInterval(function() {
					scope.from = ($('.stepDate__date').eq(0).attr('value'));
					scope.to = ($('.stepDate__date').eq(1).attr('value'));
					saveSelectDates();
					validate();

					if (scope.validateError > 0) return;

					if (scope.currentStep == 2) $stepError.setErrorValue(false);
					$paramsSetter.setParam('dates', scope.dates.from + '-' + scope.dates.to);
					$price.setPrice('days', getDayBetweenDates());
					$price.setPrice('dates', {
						from: scope.dates.normalFrom,
						to: scope.dates.normalTo
					});
					$price.calculate();
					$rootScope.$apply();

				}, 2000);

				setTimeout(function() {
					$('#datepickerFrom').datepicker();
					$('#datepickerTo').datepicker();

				}, 1500);

			},
			templateUrl: '../stepDate.html',
			replace: true
		}
	}]);
