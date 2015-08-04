/**
 * Created by kellcb2 on 8/4/15.
 */

var should = require('should'),
	_ = require('lodash'),
	specLinter = require('../lib/specs.js'),
	petStoreSwaggerV2 = require('./swaggerV2Artifacts/petstore-minimal.json'),
	petStoreRootDoc = require('./swaggerArtifacts/petStoreRootDoc.json'),
	petsDefinitions = require('./swaggerArtifacts/petsDefinitions.json'),
	usersDefinitions = require('./swaggerArtifacts/usersDefinitions.json'),
	linterV1 = specLinter.v1,
	linterV2 = specLinter.v2,
	petStoreDefsList = [
		petsDefinitions,
		usersDefinitions
	];

describe.only('Specs', function() {

	describe('when given valid swagger documents', function() {
		it('should return no errors or results v2 swagger doc', function (done) {
			linterV2.validate(petStoreSwaggerV2, function (err, result) {
				should.not.exist(err);
				should.not.exist(result);
				done();
			});
		});
		it('should return no errors or results v1.2 swagger docs and apiDefinitions', function (done) {
			linterV1.validate(petStoreRootDoc, petStoreDefsList, function (err, result) {
				should.not.exist(err);
				should.not.exist(result);
				done();
			});
		});
	});

	describe('when given invalid swagger documents', function(){
		it('should return results with indicated error for v2 swagger doc', function(done){
			var badV2Swagger = _.clone(petStoreSwaggerV2);
			delete badV2Swagger.paths['/pets'].get.responses;
			linterV2.validate(petStoreSwaggerV2, function (err, result) {
				should.not.exist(err);
				var expected = {
					errors:[{
						code: 'OBJECT_MISSING_REQUIRED_PROPERTY',
						message: 'Missing required property: responses',
						path: [
							'paths',
							'/pets',
							'get'
						]
					}],
					warnings:[]
				};
				result.should.eql(expected);
				done();
			});
		});

		it('should return results with indicated error for v1.2 swagger doc', function(done){
			var badDefs = _.clone(petStoreDefsList);
			badDefs.pop();
			linterV1.validate(petStoreRootDoc, badDefs, function (err, result) {
				should.not.exist(err);
				var expected = {
						apiDeclarations: [{
							errors: [],
							warnings: []
						}],
					errors:[{
						code: 'UNUSED_RESOURCE_PATH',
						message: 'Resource path is defined but is not used: /users',
						path: [
							'apis',
							'0',
							'path'
						]
					}],
					warnings: []
				};
				result.should.eql(expected);
				done();
			});
		});
	});

});