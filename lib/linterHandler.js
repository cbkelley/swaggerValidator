/**
 * Created by kellcb2 on 4/14/15.
 */

var specLinter = require('./../lib/specs'),
	_ = require('lodash');

module.exports = function(swaggerRootDoc, apiDefinitions, next){

	var self = this;
	var specVersion = swaggerRootDoc.swaggerVersion || swaggerRootDoc.swagger;
	next = next || apiDefinitions;

	self.lintV1 = function(){
		if(apiDefinitions && _.isArray(apiDefinitions)) {
			var spec = specLinter.v1;
			spec.validate(swaggerRootDoc, apiDefinitions, function (err, result) {
				next(err, result);
			});
		} else {
			next({message:'apiDefinitions[] is required to validate swagger 1.2'})
		}

	};

	self.lintV2 = function(){
		var spec = specLinter.v2;
		spec.validate(swaggerRootDoc, function(err, result){
			next(err, result);
		});
	};


	switch(specVersion){
		case '1.2':
			self.lintV1();
			break;
		case '2.0':
			self.lintV2();
			break;
		default:
			next({message: 'Could not determine version for swagger spec.'});
	}
	return self;

};