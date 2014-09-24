var debug = require('debug')('service-spec');

function ServiceSpec (spec) {
  // call new constructor if not already
  if (!(this instanceof ServiceSpec)) {
    return new ServiceSpec(spec);
  }

  debug("constructor", spec);

  // check spec
  if (!ServiceSpec.isServiceSpec(spec)) {
    var err = new Error('spec given is not a spec.')
    err.spec = spec;
    throw err;
  }

  // save id
  this.id = spec.id;
  
  // save methods
  this.methods = spec.methods;
  
  // save options
  // with default of empty object
  this.options = spec.options || {};
}

// prototype function to handle plugin functions
ServiceSpec.prototype.use = function _ServiceSpec_use (plugin) {
  debug("use", plugin);

  plugin.call(this, this);
}

// class function for checking ServiceSpec's
ServiceSpec.isServiceSpec = require('./isServiceSpec');

module.exports = ServiceSpec;
