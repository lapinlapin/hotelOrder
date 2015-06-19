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