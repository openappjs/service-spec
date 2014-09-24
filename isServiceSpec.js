var debug = require('debug')('service-spec:isServiceSpec');

var isEntitySchema = require('entity-schema/isEntitySchema');

module.exports = function isServiceSpec (spec) {
  debug(spec);

  return !!(
    typeof spec === 'object' &&
    typeof spec.id === 'string' &&
    typeof spec.methods === 'object' &&
    Object.keys(spec.methods).every(function (methodKey) {
      return (
        typeof spec.methods[methodKey] === 'object' &&
        typeof spec.methods[methodKey].input === 'object' &&
        Object.keys(spec.methods[methodKey].input).every(function (inKey) {
          return isEntitySchema(spec.methods[methodKey].input[inKey]);
        }) &&
        typeof spec.methods[methodKey].output === 'object' &&
        Object.keys(spec.methods[methodKey].output).every(function (outKey) {
          return isEntitySchema(spec.methods[methodKey].output[outKey]);
        })
      );
    })
  );
};
