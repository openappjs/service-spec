var expect = require('chai').expect;
var jjv = require('jjv');

var person = {
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
  var Type;
  var types = {};

  it("should require module", function () {
    Type = require('../');
    expect(Type).to.exist;
  });

  it("should create person type", function () {
    var personType = types[person.name] = Type(env, person);
    expect(personType).to.exist;
    expect(personType).to.have.property("name", person.name);
    expect(personType).to.have.property("schema", person.schema);
    expect(personType).to.have.property("env", env);
    expect(personType).to.have.property("validate");
    expect(personType).to.have.property("context");
  });

  it("should be idempotent", function () {
    Type(env, person);
  });
})
