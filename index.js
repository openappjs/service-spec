var debug = require('debug')('entity-schema');

function EntitySchema (id, schema, options) {
  // call new constructor if not already
  if (!(this instanceof EntitySchema)) {
    return new EntitySchema(id, schema, options);
  }

  debug("constructor", id, schema, options);

  // if
  if (
    // first argument is an object
    typeof id === 'object'
    // and it has id and schema properties
    && id.id && id.schema
  ) {
    // split up single arg properties into init args
    init.call(this, id.id, id.schema, id.options);
  }
  // otherwise
  else {
    // init using given args
    init.call(this, id, schema, options);
  }
}

function init (id, schema, options) {
  debug("init", id, schema, options);

  // check id
  if (typeof id !== 'string') {
    var err = new Error('id given is not a string.')
    err.id = id;
    throw err;
  }

  // save id
  this.id = id;

  // check schema
  if (typeof schema !== 'object') {
    var err = new Error('schema given is not an object.')
    err.schema = schema;
    throw err;
  }

  // save schema
  this.schema = schema;
  
  // save options
  // with default of empty object
  this.options = options || {};
}

// prototype function to handle plugin functions
EntitySchema.prototype.use = function _EntitySchema_use (plugin) {
  debug("use", plugin);

  plugin.call(this, this);
}

// class function for checking EntitySchema's
EntitySchema.isEntitySchema = require('./isEntitySchema');

module.exports = EntitySchema;
