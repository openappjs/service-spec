module.exports = function (obj) {
  return !!(
    obj.id && (
      obj.allOf ||
      obj.oneOf ||
      obj.anyOf ||
      obj.not ||
      obj.properties
    )
  );
};
