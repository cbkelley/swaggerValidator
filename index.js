//var stuff
var apiDefCrawler = require('./lib/apiDefCrawler.js'),
	lintReporter = require('./lib/lintReporter.js'),
	_ = require('lodash'),
	async = require('async');


module.exports = swaggerValidator = function(options){

	this.run = function(callback){
		apiDefCrawler.getDefs(options.swagger, function(err, docs, root){
			lintReporter(docs, root, function(){
				callback(null, docs);
			});
		});
	};
};