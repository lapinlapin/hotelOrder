hotelApp
	.directive('stepService', ['$paramsSetter', '$timeout', function($paramsSetter, $timeout) {
		return {
			restrict: 'A',
			scope: {},
			link: function(scope, elem, attrs) {
				scope.services = [
					{
						title: 'Питание',
						model: 'eat'
					},
					{
						title: 'TV',
						model: 'tv'
					},
					{
						title: 'DVD-проигрыватель',
						model: 'dvd'
					},
					{
						title: 'Игровая приставка',
						model: 'play'
					},
					{
						title: 'Телефон',
						model: 'phone'
					},
					{
						title: 'Wi-Fi',
						model: 'wifi'
					},
					{
						title: 'Пользование сейфом',
						model: 'lock'
					}
				];

			},
			templateUrl: '../stepService.html',
			replace: true
		}
	}]);
