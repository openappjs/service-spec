var expect = require('chai').expect;
var jjv = require('jjv');

var person = {
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
};

var membership = {
  id: "Membership",
  prefixes: {
    "": "http://schema.org/",
    foaf: "http://xmlns.com/foaf/0.1/",
    org: "http://www.w3.org/TR/vocab-org#",
  },
  type: 'object',
  properties: {
    member: {
      context: "org:member",
      oneOf: [{
        $ref: "Person",
      }, {
        $ref: "Group",
      }],
    },
  },
};

describe("#oa-type", function () {
  var env = jjv();
  var Type;
  var types = {};

  it("should require module", function () {
    Type = require('../');
    expect(Type).to.exist;
  });

  it("should create person type", function () {
    var personType = types[person.id] = Type(env, person);
    expect(personType).to.exist;
    expect(personType).to.have.property("id", person.id);
    expect(personType).to.have.property("schema", person);
    expect(personType.merged).to.deep.equal(person);
    expect(personType).to.have.property("env", env);
    expect(personType).to.have.property("validate");
    expect(personType).to.have.property("context");
  });

  it("should be idempotent", function () {
    Type(env, person);
  });

  it("should create membership type", function () {
    var membershipType = types[membership.id] = Type(env, membership);
    expect(membershipType).to.exist;
    expect(membershipType).to.have.property("id", membership.id);
    expect(membershipType).to.have.property("schema", membership);
    expect(membershipType.merged).to.deep.equal(membership);
    expect(membershipType).to.have.property("env", env);
    expect(membershipType).to.have.property("validate");
    expect(membershipType).to.have.property("context");
  });

  describe(".context()", function () {
    it("of personType should be correct", function () {
      expect(types[person.id].context())
      .to.deep.equal({
        "@vocab": "http://schema.org/",
        foaf: "http://xmlns.com/foaf/0.1/",
        org: "http://www.w3.org/TR/vocab-org#",
        name: "foaf:name",
        memberships: "org:hasMembership",
      });
    });
  });

  describe("Type.isType()", function () {
    it("of personType should be true", function () {
      expect(Type.isType(person)).to.be.true;
    });
  });

  describe("relations", function () {
    it("of personType should be { 'memberships': {} }", function () {
      expect(types[person.id].relations).to.deep.equal({
        memberships: person.properties.memberships,
      });
    });

    it("of membershipType should be { 'member': {} }", function () {
      expect(types[membership.id].relations).to.deep.equal({
        member: membership.properties.member,
      });
    });
  });
});
