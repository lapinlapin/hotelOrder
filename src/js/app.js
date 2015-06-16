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
							templateUrl: '../order/order.html',
							controller: 'order',
							controllerAs: 'ctrl'
						}
					}
				});

		}]);
