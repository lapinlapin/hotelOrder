hotelApp
	.directive('stepService', ['$paramsSetter', '$timeout', function($paramsSetter, $timeout) {
		return {
			restrict: 'A',
			scope: {},
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

				scope.$watch('modelsServices.play', function(newV) {
					newV  == true ? scope.modelsServices.tv = true : scope.modelsServices.tv = false;
				});

				scope.$watch('modelsServices.dvd', function(newV) {
					newV == true ? scope.modelsServices.tv = true : scope.modelsServices.tv = false;
				});

				scope.getAndSetServicesParams = function() {
					var data = [],
						strParam;

					for (var key in scope.modelsServices) {
						scope.modelsServices[key] == true ? data.push('1') : data.push('0');
					};

					strParam = 'options[] = "[' + data.join(',') + ']"';
					console.log(strParam);
					return strParam;
				};

				$timeout(function() {
					$('.stepService__item').on('click', function(e) {
						scope.serviceCost = $(this).attr('data-cost');
						scope.servicePeople = $(this).attr('data-people');
						console.log(scope.serviceCost, 'people: '+scope.servicePeople);
						scope.getAndSetServicesParams();
					});
				}, 1500);
			},
			templateUrl: '../stepService.html',
			replace: true
		}
	}]);
