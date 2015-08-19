//var stuff
var apiDefCrawler = require('./lib/apiDefCrawler.js'),
	linter = require('./lib/linterHandler.js'),
	_ = require('lodash');


module.exports = swaggerValidator = function(options){
	var report;
	options = options || {};
	if (options.reporter){
		report = require('./reporters/' + options.reporter);
	} else {
		report = require('./reporters/console');
	}

	this.run = function(callback){
		apiDefCrawler.getDefs(options.swagger, function(err, root, defs){
			if(typeof callback !== 'function'){
				callback = typeof defs === 'function' ? callback : function(){};
			}
			linter(root, defs, function(result){
				report(defs, result);
				callback(null);
			});
		});
	};

	this.fetchAndValidate = function(swaggerEndpoint, reporter, callback){
		apiDefCrawler.getDefs(swaggerEndpoint, function(err, root, defs){
			linter(root, defs, function(err, result){
				if (_.isString(reporter)){
					try {
						var report = require('./reporters/' + reporter);
					} catch (ex) {
						console.log('could not find requested reporter');
					}
					report(defs, result);
				} else if (_.isFunction(reporter)) {
					callback = reporter;
				}
				if (_.isFunction(callback)){
					callback(result);
				}
			});
		});
	};

	this.validate = function(root, defs, callback){
		if(typeof callback !== 'function'){
			callback = typeof defs === 'function' ? defs : function(){};
		}
		linter(root, defs, function(err, result){
			callback(err, result);
		});
	};
};