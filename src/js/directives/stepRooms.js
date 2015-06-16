hotelApp
	.directive('stepRooms', function() {
		return {
			restrict: 'A',
			scope: {},
			link: function(scope, elem, attrs) {
				console.log('step 1 initing');
			},
			templateUrl: '../stepRooms.html',
			replace: true
		}
	});
