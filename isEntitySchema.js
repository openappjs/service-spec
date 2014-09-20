var debug = require('debug')('entity-schema:isEntitySchema');

module.exports = function isEntitySchema (obj) {
  debug(obj);

  return !!(
    typeof obj === 'object' &&
    typeof obj.schema === 'object'
  );
};
