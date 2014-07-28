var debug = require('debug')('oa-type');
var forIn = require('lodash.forin');

var merge = require('./lib/merge');

function Type (env, schema) {
  debug("constructor", env, schema);
  // call new constructor if not already
  if (!(this instanceof Type)) {
    return new Type(env, schema);
  }

  // save jjv environment
  this.env = env;

  // save raw schema
  this.schema = schema;

  // save id
  this.id = schema.id;

  // save merged schema
  this.merged = merge(env, schema);

  // add schema to jjv environment
  env.addSchema(this.id, this.schema);
  // TODO types
  // TODO type coercions
  // TODO checks
  // TODO formats
}

Type.prototype.validate = function (obj) {
  return this.env.validate(this.id, obj)
};

Type.prototype.context = function () {
  // create context to return
  var context = {};

  // get prefixes
  forIn(this.schema.prefixes, function (val, key) {
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

module.exports.isType = require('./isType');
