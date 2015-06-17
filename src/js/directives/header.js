hotelApp
	.directive('header', ['$timeout', function($timeout) {
		return {
			restrict: 'A',
			scope: {
			},
			link: function(scope, elem, attrs) {
				scope.menu = {
					logo: '../img/menu-logo.png',
					title: 'Уютный отель',
					items: [
						{
							title: 'Номера',
							stateName: 'order',
							labelSrc: 'img/label-menu.png',
							active: false
						},
						{
							title: 'Заказ',
							state: 'order',
							labelSrc: 'img/label-menu.png',
							active: true
						},
						{
							title: 'Об отеле',
							state: 'order',
							labelSrc: 'img/label-menu.png',
							active: false
						}
					]
				};

				function clearSelected() {
					$('.header__menu-item').each(function() {
						$(this).removeClass('header__menu-item_pressed');
					});
				}

				$timeout(function() {
					$('.header__menu-item').on('click', function(e) {
						clearSelected();

						$(this).addClass('header__menu-item_pressed');
					});
				}, 1500);
			},
			templateUrl: '../header.html',
			replace: true
		}
	}]);
