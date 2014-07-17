var expect = require('chai').expect;
var jjv = require('jjv');

var personDescriptor = {
  name: "Person",
  prefixes: {
    "": "http://schema.org/",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "org": "http://www.w3.org/TR/vocab-org#",
  },
  schema: {
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
    types.set(personDescriptor);
    var personType = types.get(personDescriptor.name);
    expect(personType).to.exist;
    expect(personType).to.have.property("name", personDescriptor.name);
    expect(personType).to.have.property("schema", personDescriptor.schema);
    expect(personType).to.have.property("env", env);
    expect(personType).to.have.property("validate");
    expect(personType).to.have.property("context");
  });
})
