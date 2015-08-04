/**
 * Created by kellcb2 on 8/4/15.
 */

var should = require('should'),
	_ = require('lodash'),
	linterHandler = require('../lib/linterHandler'),
	petStoreSwaggerV2 = require('./swaggerV2Artifacts/petstore-simple.json'),
	petStoreRootDoc = require('./swaggerArtifacts/petStoreRootDoc.json'),
	petsDefinitions = require('./swaggerArtifacts/petsDefinitions.json'),
	usersDefinitions = require('./swaggerArtifacts/usersDefinitions.json'),
	petStoreDefsList = [
		petsDefinitions,
		usersDefinitions
	];

describe('LinterHanlder', function(){

	describe('when given accurate swagger documents', function(){
		it('should successfully handle swagger 2.0', function(done){
			linterHandler(petStoreSwaggerV2, function(err, result){
				should.not.exist(err);
				done();
			});
		});

		it('should successfully handle swagger 1.2', function(done){
			linterHandler(petStoreRootDoc, petStoreDefsList, function(err, result){
				should.not.exist(err);
				done();
			});
		});
	});

	describe('when given swagger missing versions', function(){
		it('should return error detailing version is missing', function(done){
			var badRoot = _.clone(petStoreRootDoc);
			delete badRoot.swaggerVersion;
			linterHandler(badRoot, petStoreDefsList, function(err, result){
				should.exist(err);
				err.message.should.equal('Could not determine version for swagger spec.');
				done();
			});
		});
	});

	describe('when 1.2 spec is passed in without proper apiDefinitions[]', function(){
		it('should return an error indicating missing documents', function(done){
			linterHandler(petStoreRootDoc, function(err, result){
				should.exist(err);
				err.message.should.equal('apiDefinitions[] is required to validate swagger 1.2');
				done();
			});
		});
	});
});
