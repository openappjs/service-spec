var expect = require('chai').expect;
var jjv = require('jjv');

var thing = {
  id: "Thing",
  prefixes: {
    "": "http://schema.org",
  },
  type: 'object',
  properties: {
    name: {
      description: "The name of the item.",
      type: "string",
      context: "name",
    },
  },
};

var person = {
  id: "Person",
  allOf: [{
    $ref: "Thing",
  }, {
    prefixes: {
      foaf: "http://xmlns.com/foaf/0.1/",
    },
    type: 'object',
    properties: {
      nick: {
        type: "string",
        context: "foaf:nick",
      },
    },
  }],
};

describe("#oa-type/merge", function () {
  var merge = require('../lib/merge');

  var env = require('jjv')();
  env.addSchema(thing);

  describe("allOf", function () {
    it("should merge person type correctly", function () {
      var merged = merge(env, person);
      console.log(merged);
    });
  });
});
