/*
 *   @name Конфигурация приложения.
 *   Настройка роутинга.
 */
'use strict';
var hotelApp = angular.module('hotel', ['ui.router']);

	hotelApp.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}])
	.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
		function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
			$urlRouterProvider
				.when('', '/order')
				.when('/', '/order')
				.otherwise('/order');

			$stateProvider
				.state('order', {
					url: '/order',
					views: {
						'order': {
							template: '<div data-order=""></div>'
						}
					}
				})
				.state('main', {
					url: '/main'
				});

		}]);
