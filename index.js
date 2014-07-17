var forIn = require('lodash.forin');

function Type (env, descriptor) {
  // call new constructor if not already
  if (!(this instanceof Type)) {
    return new Type(env, descriptor);
  }

  // save jjv environment
  this.env = env;

  // save name
  this.name = descriptor.name;

  // save prefixes
  this.prefixes = descriptor.prefixes;

  // save schema
  this.schema = descriptor.schema;
  // add schema to jjv environment
  env.addSchema(this.name, this.schema);

  // TODO types
  // TODO type coercions
  // TODO checks
  // TODO formats
}

Type.prototype.validate = function (obj) {
  return this.env.validate(this.name, obj)
};

Type.prototype.context = function () {
  // create context to return
  var context = {};

  // get prefixes
  forIn(this.prefixes, function (val, key) {
    if (typeof key === 'string' && key.length === 0) {
      key = "@vocab";
    }
    context[key] = val;
  });

  // get top-level context
  if (this.schema.context) {
    context[this.schema.id] = this.schema.context;
  }

  // get property contexts
  forIn(this.schema.properties, function (propSchema, propName) {
    if (propSchema.context) {
      context[propName] = propSchema.context;
    }
  });

  // TODO merge context of nested objects
  // TODO merge context of nested references
  return context;
};

module.exports = Type;
