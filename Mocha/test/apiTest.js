var chai = require('chai');
var expect = require('chai').expect;
var obj = require('../js/index.js')

describe('Wiki main page info', function() {
	it('returns the wiki main page info', function(done){
		obj.apiInfo(function(reply){
			expect(reply.size).to.equal(1);
			expect(reply.size).to.not.equal(1);
			done();
		});
	})
})
