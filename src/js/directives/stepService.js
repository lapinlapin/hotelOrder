hotelApp
	.directive('stepService', [
		'$paramsSetter',
		'$timeout',
		'$stepError',
		'$price',
		'$rootScope',
		function($paramsSetter, $timeout, $stepError, $price, $rootScope) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {
				scope.modelsServices = {
					eat: 'eat',
					tv: 'tv',
					dvd: 'dvd',
					play: 'play',
					phone: 'phone',
					wifi: 'wifi',
					lock: 'lock'
				};

				scope.services = [
					{
						title: 'Питание',
						model: 'eat',
						cost: 500,
						people: true
					},
					{
						title: 'TV',
						model: 'tv',
						cost: 300,
						people: false
					},
					{
						title: 'DVD-проигрыватель',
						model: 'dvd',
						cost: 300,
						people: false
					},
					{
						title: 'Игровая приставка',
						model: 'play',
						cost: 300,
						people: false
					},
					{
						title: 'Телефон',
						model: 'phone',
						cost: 300,
						people: false
					},
					{
						title: 'Wi-Fi',
						model: 'wifi',
						cost: 300,
						people: false
					},
					{
						title: 'Пользование сейфом',
						model: 'lock',
						cost: 200,
						people: false
					}
				];

				function clearServiceModels() {
					Object.keys(scope.modelsServices).forEach(function(model) {
						scope.modelsServices[model] = false;
					});
				}

				$rootScope.$on('cleanedServices', function(e, data) {
					clearServiceModels();
				});

				scope.$watch('modelsServices.play', function(newV) {
					newV  == true ? scope.modelsServices.tv = true : scope.modelsServices.tv = false;
				});

				scope.$watch('modelsServices.dvd', function(newV) {
					newV == true ? scope.modelsServices.tv = true : scope.modelsServices.tv = false;
				});

				scope.getAndSetServicesParams = function() {
					var data = [],
						strParam;

					scope.applyServices = [];

					for (var key in scope.modelsServices) {
						if (scope.modelsServices[key] == true) {
							data.push('1');

							scope.services.forEach(function(serv) {
								if (serv.model == key) {
									scope.applyServices.push(serv);
								}
							});
						} else {
							data.push('0');
						}
					};

					strParam = '"[' + data.join(',') + ']"';
					console.log(strParam);
					return strParam;
				};

				$timeout(function() {
					$('.stepService__item').on('click', function(e) {
						scope.serviceCost = $(this).attr('data-cost');
						scope.servicePeople = $(this).attr('data-people');
						$paramsSetter.setParam('options[]', scope.getAndSetServicesParams());

						$price.setPrice('services', scope.applyServices);
						$price.calculate();
						$rootScope.$apply();
					});
				}, 1500);
			},
			templateUrl: '../stepService.html',
			replace: true
		}
	}]);
