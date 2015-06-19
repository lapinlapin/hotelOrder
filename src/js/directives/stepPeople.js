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
					return scope.people;
				};

				scope.getAndSetPeopleParams = function() {
					var dataStr = '';

					scope.people.forEach(function(people) {
						dataStr += 'persons[] = "["' + people.fam + '", "' + people.first + '", "' + people.second + '", "' + people.age + '"]" ';
					});
					console.log(dataStr);
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

				function validate() {
					var conf = [
						{
							model: scope.family,
							name: 'family',
							applyCls: 'people__area_error',
							title: 'Введите фамилию',
							checker: function(val) {
								return !!val;
							}
						},
						{
							model: scope.first,
							name: 'first',
							applyCls: 'people__area_error',
							title: 'Введите имя',
							checker: function(val) {
								return !!val;
							}
						},
						{
							model: scope.second,
							name: 'second',
							applyCls: 'people__area_error',
							title: 'Введите отчество',
							checker: function(val) {
								return !!val;
							}
						},
						{
							model: scope.age,
							name: 'age',
							applyCls: 'people__area_error',
							title: 'Введите цифры',
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
							$(query).attr('value', conf.title).addClass(conf.applyCls);
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
