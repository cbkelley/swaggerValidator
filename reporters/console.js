/**
 * Created by cbkelley on 2/18/15.
 */

var linter = require('./../lib/specs');

module.exports = function (swaggerDoc, result) {
	if (typeof result !== undefined) {
		console.log('Provided documentation is not Swagger Compliant:');
		if (result.errors.length > 0) {
			console.log('Errors\n------');
			result.errors.forEach(function (err) {
				console.log('#/' + err.path.join('/') + ': ' + err.message);
			});
			console.log('Errors End \n------');
		}

		if (result.warnings.length > 0) {
			console.log('Warnings\n------');
			result.warnings.forEach(function (warn) {
				console.log('#/' + warn.path.join('/') + ': ' + warn.message);
			});
			console.log('Warnings End \n------');
		}

		if (result.apiDeclarations) {
			result.apiDeclarations.forEach(function (adResult, index) {
				var errorHeader = 'API Declaration (' + swaggerDoc[index].resourcePath + ') Errors';
				var warningHeader = 'API (' + swaggerDoc[index].resourcePath + ') Warnings';

				if (adResult.errors.length > 0) {

					console.log(errorHeader);
					console.log(new Array(errorHeader.length + 1).join('-'));

					adResult.errors.forEach(function (err) {
						console.log('#/' + err.path.join('/') + ': ' + err.message);
					});

					console.log('');
				}

				if (adResult.warnings.length > 0) {
					console.log(warningHeader);
					console.log(new Array(warningHeader.length + 1).join('-'));

					adResult.warnings.forEach(function (warn) {
						console.log('#/' + warn.path.join('/') + ': ' + warn.message);
					});
				}
			});
		}
	} else {
		console.log('Documents appear to be swagger compliant');
	}
};