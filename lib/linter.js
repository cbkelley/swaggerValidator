/**
 * Created by kellcb2 on 4/14/15.
 */

var linter = require('./../lib/specs');

module.exports = function(swaggerDoc, swaggerRootDoc, next){

	var self = this;

	self.lintV1 = function(){
		var spec = linter.v1;
		spec.validate(swaggerRootDoc, swaggerDoc, function(err, result){
			next(result);
		});
	};

	self.lintV2 = function(){
		//TODO Implement V2 Validation.  Ignoring for now since we don't use V2 here.
		next();
	};

	if (swaggerRootDoc.swaggerVersion < 2){
		self.lintV1(swaggerDoc, swaggerRootDoc);
	} else {
		self.lintV2(swaggerDoc);
	}
	return self;

};