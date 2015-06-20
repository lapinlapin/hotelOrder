/*
 *   @name Сервис записи и получения параметров для сервера.
 *   @return Возвращает объект с 2мя методами: записать параметр, получить параметры
 */
hotelApp
	.factory('$paramsSetter', function() {
		var orderParams = {};

		return {
			setParam: function(key, data) {
				orderParams[key] = data;
			},
			getParams: function() {
				return orderParams;
			}
		}
	});