var inherits = require('inherits');
var Map = require('es6-map');
var forIn = require('lodash.forin');

function Type (env, schema) {
  console.log(schema);
  if (!(this instanceof Type)) return new Type(env, schema);

  // save jjv environment
  this.env = env;
  // save schema and derive type name
  this.schema = schema;
  this.name = schema.id;
  // add schema to jjv environment
  env.addSchema(schema.id, schema);
}

Type.prototype.validate = function (obj) {
  return this.env.validate(this.name, obj)
};

Type.prototype.context = function () {
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
  return context;
};

function Types (env) {
  if (!(this instanceof Types)) return new Types(env);
  
  // call Map constructor on this
  Map.call(this);

  // save Map.set
  this.__set = this.set;
  // use our set function
  this.set = this._set;
  delete this._set;

  // save jjv environment
  this.env = env;
}
inherits(Types, Map);

Types.prototype._set = function (schema) {
  var type = new Type(this.env, schema);
  return this.__set(type.name, type);
};

module.exports = Types;
