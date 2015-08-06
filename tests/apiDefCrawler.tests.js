/**
 * Created by kellcb2 on 8/5/15.
 */

var _ = require('lodash'),
	should = require('should'),
	rewire = require('rewire'),
	swagger
	ApiDefCrawler;

describe('apiDefCrawler', function(){

	describe('when given a swagger 1.2 route', function(){
		beforeEach('Setup apiDefCrawler in for mocking', function(done){
			ApiDefCrawler = rewire('../lib/apiDefCrawler.js');
			done();
		});

		it('should successfully return the root swagger document and the api definitions in an array', function(done){
			//TODO figure out how to mock a nested method (request.request?) blegh...
			done();
		});
	});
});