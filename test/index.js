var expect = require('chai').expect;

var EntitySchema = require('entity-schema');

var personSchema = EntitySchema({
  id: "Person",
  properties: {
    name: {
      type: "string",
    },
  },
});

var peopleSpec = {
  id: "People",
  methods: {
    find: {
      input: {
        query: {
          $ref: "Person",
        },
      },
      output: {
        people: {
          type: "array",
          items: {
            $ref: "Person",
          },
        },
      },
    },
    get: {
      input: {
        id: {
          type: "string",
        },
      },
      output: {
        person: {
          $ref: "Person",
        },
      },
    },
    create: {
      input: {
        person: {
          $ref: "Person",
        },
      },
      output: {
        person: {
          $ref: "Person",
        },
      },
    },
    update: {
      input: {
        person: {
          $ref: "Person",
        },
      },
      output: {
        person: {
          $ref: "Person",
        },
      },
    },
    remove: {
      input: {
        id: {
          type: "string",
        },
      },
      output: {},
    },
  },
};

describe("#ServiceSpec", function () {
  var ServiceSpec;

  it("should require module", function () {
    ServiceSpec = require('../');
    expect(ServiceSpec).to.exist;
    expect(ServiceSpec).to.have.property("isServiceSpec");
    expect(ServiceSpec.isServiceSpec).to.be.a('function');
  });

  it("should create person service spec", function () {
    var personServiceSpec = ServiceSpec(peopleSpec)
    expect(personServiceSpec).to.exist;
    expect(personServiceSpec).to.have.property("methods", peopleSpec.methods);
    expect(personServiceSpec).to.have.property("options")
      .that.deep.equals({});
    expect(personServiceSpec).to.have.property("use", ServiceSpec.prototype.use);
  });

  describe("ServiceSpec.isServiceSpec()", function () {
    var personServiceSpec;

    before(function () {
      personServiceSpec = ServiceSpec(peopleSpec);
    });

    it("of personServiceSpec should be true", function () {
      expect(ServiceSpec.isServiceSpec(personServiceSpec)).to.be.true;
    });
  });
});
