hotelApp
	.directive('breadCrumbs', function() {
		return {
			restrict: 'A',
			scope: {
				currentPosition: '='
			},
			link: function(scope, elem, attrs) {
				scope.breadCrumbs = [
					{
						title: 'Шаг 1'
					},
					{
						title: 'Шаг 2'
					},
					{
						title: 'Шаг 3'
					},
					{
						title: 'Шаг 4'
					},
					{
						title: 'Шаг 5'
					}
				]
			},
			templateUrl: '../breadCrumbs.html',
			replace: true
		}
	});
