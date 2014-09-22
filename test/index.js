var expect = require('chai').expect;

var person = {
  schema: {
    id: "Person",
    prefixes: {
      "": "http://schema.org/",
      foaf: "http://xmlns.com/foaf/0.1/",
      org: "http://www.w3.org/TR/vocab-org#",
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
  },
};

describe("#EntitySchema", function () {
  var EntitySchema;

  it("should require module", function () {
    EntitySchema = require('../');
    expect(EntitySchema).to.exist;
    expect(EntitySchema).to.have.property("isEntitySchema");
    expect(EntitySchema.isEntitySchema).to.be.a('function');
  });

  it("should create person schema", function () {
    var personSchema = EntitySchema(person.schema);
    expect(personSchema).to.exist;
    expect(personSchema).to.have.property("schema", person.schema);
    expect(personSchema).to.have.property("options")
      .that.deep.equals({});
    expect(personSchema).to.have.property("use", EntitySchema.prototype.use);
  });

  describe("Type.isType()", function () {
    var personSchema;

    before(function () {
      personSchema = EntitySchema(person.schema);
    });

    it("of personSchema should be true", function () {
      expect(EntitySchema.isEntitySchema(personSchema)).to.be.true;
    });
  });
});
