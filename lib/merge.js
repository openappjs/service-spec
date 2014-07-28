var debug = require('debug')('oa-type:merge');
var _ = require('lodash');
var deepMerge = require('deepest-merge');

var resolve = require('./resolve');

module.exports = function (env, schema) {
  debug("merging", schema);

  var toMerge = _.clone(schema);
  var merged;

  if (schema.allOf) {
    // deep merge all of the schemas
    merged = deepMerge.apply(
      this,
      _.map(toMerge.allOf,
        _.partial(resolve, env)
      )
    );
    // ensure merged id is correct
    merged.id = schema.id;
  }

  else if (schema.anyOf) {
    // TODO
    merged = toMerge;
  }

  else if (schema.oneOf) {
    // TODO
    merged = toMerge;
  }

  else if (schema.not) {
    // TODO
    merged = toMerge;
  }

  else {
    merged = toMerge;
  }

  debug("merged", merged);
  return merged;
};
