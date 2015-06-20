hotelApp
	.directive('stepRooms', [
		'$paramsSetter',
		'$timeout',
		'$stepError',
		'$price',
		function($paramsSetter, $timeout, $stepError, $price) {
		return {
			restrict: 'A',
			scope: {
				currentStep: '=',
				blockStep: '@'
			},
			link: function(scope, elem, attrs) {
				scope.rooms = [
					{
						title: '1-комнатный',
						id: 1,
						src: 'img/1room.jpg',
						cost: 1000
					},
					{
						title: '2-комнатный',
						id: 2,
						src: 'img/2rooms.jpg',
						cost: 2500
					},
					{
						title: '3-комнатный',
						id: 3,
						src: 'img/3rooms.jpg',
						cost: 3500
					}
				];

				function clearSelected() {
					$('.stepRooms__rooms-room').each(function() {
						$(this).removeClass('stepRooms__rooms-room_select');
					});
				}

				$timeout(function() {
					$('.stepRooms__rooms-room').on('click', function(e) {
						scope.roomId = $(this).attr('data-id');
						scope.roomCost = $(this).attr('data-cost');
						scope.image = $(this).find('img').attr('data-ng-src');

						console.log('select: cost ' + scope.roomCost + ', id ' + scope.roomId + 'src '+scope.image);

						clearSelected();

						$(this).addClass('stepRooms__rooms-room_select');

						$paramsSetter.setParam('rooms', scope.roomId);
						$price.setPrice('room', {
							cost: scope.roomCost,
							image: scope.image
						});
						clearSelected();
						scope.$emit('stepChanged', parseInt(scope.blockStep) + 1);
						$stepError.setErrorValue(true);
					});
				}, 1500);
			},
			templateUrl: '../stepRooms.html',
			replace: true
		}
	}]);
