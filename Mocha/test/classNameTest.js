var chai = require('chai');
var assert = chai.assert;
var expect = require('chai').expect;
var functions = require("../js/className.js");

describe('addClass', function() {
  
  /*beforeEach(function(){
  	console.log("Executing this before each test");
  })

  afterEach(function(){
  	console.log("Executing this after each test");
  })*/

  it('should add class to element', function() {
    var element = { className: '' };

    functions.addClass(element, 'test-class');

    assert.equal(element.className, 'test-class');
  });



  it('should not add a class which already exists', function() {
	  var element = { className: 'exists' };

	  functions.addClass(element, 'exists');

	  var numClasses = element.className.split(' ').length;
	  assert.equal(numClasses, 1);
	});

  it('should append new class after existing one', function() {
	  var element = { className: 'exists' };

	  functions.addClass(element, 'new-class');

	  var classes = element.className.split(' ');
	  assert.equal(classes[1], 'new-class');
	});
});

/*describe('sum', function(){
	it('test for coverage report', function(){
		var addition = functions.sum(2,3);
		expect(addition).to.equal(5);
		addition = functions.sum(-2,-3);
		expect(addition).to.equal(-5);
		addition = functions.sum(2,-3);
		expect(addition).to.equal(-1);
		addition = functions.sum(5,-3);
		expect(addition).to.equal(2);
	});
});*/