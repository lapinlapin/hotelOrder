/*
 *   @name Сервис для калькуляции номера и записи данных для превью.
 *   @return Возвращает объект с методами: подсчета суммы, установки данных конкретного шага, получения данных.
 */
hotelApp
	.factory('$price', function() {
		var price = {
			days: 1,
			dates: {
				from: '',
				to: ''
			},
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

				}

				function getRoomSum() {
					sum += (parseInt(price.room.cost) * parseInt(price.days));
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