var debug = require('debug')('oa-type:resolve');

module.exports = function (env, schema) {
  debug(env, schema);
  console.log(env, schema['$ref']);

  if (schema['$ref']) {
    return env.schema[schema['$ref']];
  }

  return schema;
};
