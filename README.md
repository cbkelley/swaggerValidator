SwaggerValidator
==========

SwaggerValidator will 'lint' the public documentation for your REST Api and verify compliance with the rules
outlined in the [Swagger Specification](https://github.com/wordnik/swagger-spec).


Installation
------------
You'll need to have [nodejs](http://nodejs.org/download/) installed before installing the SwaggerValidator.

Currently SwaggerValidator is only available on the Pearson NPM server. Install with npm:

    $ npm install swaggerValidator

Basic Use
---------
### Execute the compliance validation (linting)
Execute swagger output

    $ swagger-validator -s <swagger documentation url>
    
The Linter can also be used programatically two ways.

    SwaggerValidator = require("swagger-validator");
    swaggerValidator = new SwaggerValidator();

    //fetch and validate swagger via endpoint.  'console' is optional and can be left blank if 
    //you'd like to refrain from having the reporter dump to the console. 
    swaggerValidator.fetchAndValidate('www.someDomain.com/api-docs', 'console', callback(result){
        //do stuff here
    });
    
    //pass swagger docs directly to the linter
    swaggerValidator.fetchAndValidate(docs, root, callback(result){
        //do stuff here
    });


Getting Help
------------
Contact any of the project contributors by email.

Contributors
------------
Jeff Marquez
Allen Clayton
Chris Kelley


Inspiration, History, and Licenses
-------------------------------------
### Things that inspired us
Originally were working an a testing tool that would generate some basic tests based off of Swagger documentation.
However we found that Swagger was implemented in so many different (incorrect) ways that it became impossible to complete
that project.  Now we're putting together this tool so we can get all our swagger docs compliant, then we can pick up
that other project again.

### History
version 0.0.1
* Hijacked some code from the Kranky Kong POC for Swagger Traversal.  It was easier than starting from scratch.

### Future Plans
 * Implement Linting
 * Make this a module to be used in code not against a command line.


### Technology
SwaggerValidator is built on _node.js_ and makes use of these modules:
* lodash (Jeff's favorite)
* async
* joi
* request
* cli-color (because Color! even though it's currently not being used, it will)
* commander

#### Underlying licenses
* lodash (appears to be MIT)
* async - MIT
* joi - MIT-like, some modifications about not using contributors to promote or endorse derived software
* request - apache
* cli-color - MIT
* commander - MIT


