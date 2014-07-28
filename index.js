var debug = require('debug')('oa-type');
var _ = require('lodash');

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
  // TODO add types
  // TODO add type coercions
  // TODO add checks
  // TODO add formats
}

Type.prototype.validate = function (obj) {
  return this.env.validate(this.id, obj)
};

Type.prototype.context = function () {
  // create context to return
  var context = {};

  // get prefixes
  _.forIn(this.merged.prefixes, function (val, key) {
    if (typeof key === 'string' && key.length === 0) {
      key = "@vocab";
    }
    context[key] = val;
  });

  // get top-level context
  if (this.merged.context) {
    context[this.schema.id] = this.schema.context;
  }

  // get property contexts
  _.forIn(this.merged.properties, function (propSchema, propName) {
    if (propSchema.context) {
      context[propName] = propSchema.context;
    }
  });

  // TODO merge context of nested objects
  // TODO merge context of nested references

  // strip when key, value is the same
  return _.omit(context, function (value, key) {
    return key === value;
  });
};

Type.isType = require('./isType');

module.exports = Type;
