
var _ = require('lodash'),
	requestBase = require('request'),
	async = require('async'),
	request = requestBase.defaults({
		pool:{
			maxSockets:100
		}
	});


module.exports = (function () {

	var self = this;
	self.getDefs = function(url, callback){
        callback = typeof callback === 'function' ? callback : function(){};
		var rootSwagger = {};
		var apiDefs = [],
			options = {
				uri: url,
				method: 'GET'
			};

		request(options, function(err, res, body){
			if(err || res.statusCode != 200){
				return callback(err || 'Request failure - url: ' + url + ' returned ' + res.statusCode);
			}

			rootSwagger = JSON.parse(body);
			if(rootSwagger.swaggerVersion) {
				var apis = JSON.parse(body).apis;

				async.forEach(apis, function (api, next) {

					var apiOptions = {
						uri: url + api.path,
						method: 'GET'
					};

					request(apiOptions, function (err, res, body) {
						if (err || res.statusCode != 200) {
							//log and alert
						} else {
							apiDefs.push(JSON.parse(res.body));
						}
						next();
					});

				}, function (err) {
					if (err) {
						return callback(err);
					}
					callback(null, rootSwagger, apiDefs);
				});
			} else {
				callback(null, rootSwagger, null);
			}
		});

	};
	return self;
})();