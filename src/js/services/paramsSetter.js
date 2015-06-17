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