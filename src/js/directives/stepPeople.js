/*
 *   @name Директива шага 3, добавление людей.
 *   Отошел от описания, при добавлении 2х людей и более
 *   Клонируется не форма на нового человека, а данные добавляются в таблицу,
 *   сокращая контент. Все нюансы соблюдены (1 чел - 1ком, 2 - 2ком).
 *   Данные пишутся в сервис прайс, сервис параметры
 */
hotelApp
	.directive('stepPeople', [
		'$paramsSetter',
		'$timeout',
		'$stepError',
		'$rootScope',
		'$price',
		function($paramsSetter, $timeout, $stepError, $rootScope, $price) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {
				scope.people = [];
				scope.addCounter = 0;
				scope.validateError = 0;

				scope.addPeople = function(data) {
					var maxPeople = $paramsSetter.getParams().rooms;

					if (scope.people.length == maxPeople) return;

					validate();
					if (scope.validateError > 0) return;
					updatePlaceholders();

					data.id = scope.addCounter++;
					scope.people.push(data);

					clearFields();
					$paramsSetter.setParam('people', scope.getAndSetPeopleParams());

					$price.setPrice('people', scope.people);
					$price.setPrice('peopleCount', scope.people.length);
					$stepError.setErrorValue(false);
					//scope.$emit('stepChanged', parseInt(scope.blockStep) + 1);
				};

				scope.removePeople = function(id) {
					var people = [],
						ndx = 0;

					scope.people.length > 0 ? $stepError.setErrorValue(false) : $stepError.setErrorValue(true);
					scope.people.forEach(function(data) {
						if (data.id != id) {
							data.id = ndx++;
							people.push(data);
						}
					});

					scope.people = people;

					$price.setPrice('people', scope.people);
					$price.setPrice('peopleCount', scope.people.length);

					return scope.people;
				};

				scope.getAndSetPeopleParams = function() {
					var dataStr = '';

					scope.people.forEach(function(people) {
						dataStr += 'persons[] = "["' + people.fam + '", "' + people.first + '", "' + people.second + '", "' + people.age + '"]" ';
					});

					return dataStr;
				};

				$rootScope.$on('cleanedPeople', function(e, data) {
					scope.people = [];
				});

				function clearFields() {
					['family', 'first', 'second', 'age'].forEach(function(field) {
						scope[field] = '';
					});
				}

				function updatePlaceholders() {
					var conf = {
						family: 'Фамилия',
						first: 'Имя',
						second: 'Отчетство',
						age: 'Возраст'
					};

					for (var key in conf) {
						$('input[data-ng-model^="' + key + '"]').attr('placeholder', conf[key]);
					}
				}

				function validate() {
					var conf = [
						{
							model: scope.family,
							name: 'family',
							applyCls: 'people__area_error',
							title: 'Пустое значение',
							checker: function(val) {
								return !!val;
							}
						},
						{
							model: scope.first,
							name: 'first',
							applyCls: 'people__area_error',
							title: 'Пустое значение',
							checker: function(val) {
								return !!val;
							}
						},
						{
							model: scope.second,
							name: 'second',
							applyCls: 'people__area_error',
							title: 'Пустое значение',
							checker: function(val) {
								return !!val;
							}
						},
						{
							model: scope.age,
							name: 'age',
							applyCls: 'people__area_error',
							title: 'Формат поля (тольцо цифры)',
							checker: function(val) {
								return (val/val) ? true : false;
							}
						}
					];

					conf.forEach(function(conf) {
						var query = 'input[data-ng-model^="' + conf.name + '"]';

						scope.validateError = 0;

						if (!conf.checker(conf.model)) {
							scope.validateError++;
							$(query).attr('placeholder', conf.title).addClass(conf.applyCls);
						} else {
							$(query).removeClass(conf.applyCls);
						}
					});
				}
			},
			templateUrl: '../stepPeople.html',
			replace: true
		}
	}]);
