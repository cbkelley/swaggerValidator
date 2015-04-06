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
### Setting up the config
    pending

### Execute the compliance validation (linting)
Execute swagger output

    $ swaggerValidator -s <swagger documentation url>

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
* swagger-tools - MIT


