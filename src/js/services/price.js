hotelApp
	.factory('$price', function() {
		var price = {
			days: 2,
			room: {
				cost: 0,
				image: ''
			},
			people: [],
			peopleCount: 1,
			services: []
		},
		sum = 0;

		return {
			calculate: function() {
				function getServicesSum() {
					price.services.forEach(function(service) {
						if (service.people) {
							sum += (parseInt(days) * parseInt(peopleCount) * parseInt(service.cost));
						} else {
							sum += (parseInt(days) * parseInt(service.cost));
						}
					});
					console.log('services sum = '+sum);
				}

				function getRoomSum() {
					sum += (parseInt(price.room.cost) * parseInt(price.days));
					console.log('room sum = '+sum);
				}

				function setSummaryToPrice() {
					price.totalSum = sum;
				}

				getServicesSum();
				getRoomSum();
				setSummaryToPrice();
			},
			setPrice: function(key, data) {
				price[key] = data;
			},
			getPrice: function() {
				return price;
			}
		}
	});