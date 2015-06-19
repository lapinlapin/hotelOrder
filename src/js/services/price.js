hotelApp
	.factory('$price', function() {
		var price = {
			days: 2,
			room: {
				cost: 0,
				image: ''
			},
			people: [],
			services: []
		};

		return {
			setPrice: function(key, data) {
				price[key] = data;
			},
			getPrice: function() {
				return price;
			}
		}
	});