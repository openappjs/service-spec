var expect = require('chai').expect;
var jjv = require('jjv');

var personSchema = {
  id: "Person",
  prefixes: {
    "": "http://schema.org/",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "org": "http://www.w3.org/TR/vocab-org#",
  },
  type: 'object',
  properties: {
    name: {
      type: "string",
      context: "foaf:name",
    },
    memberships: {
      type: "array",
      context: "org:hasMembership",
      items: {
        reverse: "member",
        $ref: "Membership",
      },
    },
  },
};

describe("#types", function () {
  var env = jjv();
  var Types;
  var types;

  it("should require module", function () {
    Types = require('../');
    expect(Types).to.exist;
  });

  it("should create new types map", function () {
    types = new Types(env);
    expect(types).to.exist;
  });

  it("should add person type", function () {
    types.set(personSchema);
    var personType = types.get("Person");
    expect(personType).to.exist;
    expect(personType).to.have.property("name", "Person");
    expect(personType).to.have.property("schema", personSchema);
    expect(personType).to.have.property("env", env);
    expect(personType).to.have.property("validate");
    expect(personType).to.have.property("context");
  });
})
