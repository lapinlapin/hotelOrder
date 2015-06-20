/*
 *   @name Сервис заглушка, разрешает или не разрешает переходить к следующему шагу.
 *   @return Возвращает объект с методами: записывает true или false, читает параметр.
 */
hotelApp
	.factory('$stepError', function() {
		var stepError;

		return {
			setErrorValue: function(val) {
				stepError = val;
			},
			getErrorValue: function() {
				return stepError;
			}
		}
	});