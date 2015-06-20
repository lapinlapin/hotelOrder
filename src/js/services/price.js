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
				sum = 0;

				function getServicesSum() {
					price.services.forEach(function(service) {
						if (service.people) {
							sum += (parseInt(price.days) * parseInt(price.peopleCount) * parseInt(service.cost));
						} else {
							sum += (parseInt(price.days) * parseInt(service.cost));
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

				return price.totalSum;
			},
			setPrice: function(key, data) {
				price[key] = data;
			},
			getPrice: function() {
				return price;
			}
		}
	});