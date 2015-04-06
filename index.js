//var stuff
var apiDefCrawler = require('./lib/apiDefCrawler.js'),
	swaggerLinter = require('./lib/swaggerLinter.js'),
	_ = require('lodash'),
	async = require('async');


module.exports = swaggerValidator = function(options){

	this.run = function(callback){
		apiDefCrawler.getDefs(options.swagger, function(err, docs, root){
			swaggerLinter(docs, root, function(){
				callback(null, docs);
			});
		});
	};
};