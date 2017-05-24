# MOCHA

**WHAT IS MOCHA?**

Mocha is a JavaScript test framework running on node.js. Its features include browser support, asynchronous testing, test coverage reports, and use of any assertion library.
 
 
**WHY TESTING?**
  1. Unit Tests allows you to make big changes to code quickly.
  2.  Tests help you really understand the design of the code you are working on, an give us 
      confidence in the quality of the software.
  3. Good Tests can help with code re-use and migration.
  4. They can be vital to ensuring the software adheres to a business solution.
  5. Simplifies Integration
  
  
**STEPS TO INSTALL MOCHA**
  
  1. To install Mocha Globally run
     
          npm install --global mocha
      
     As a Developement Dependency we can use :
          
          npm install --save-dev mocha
     
  2. Mocha can also be installed using Bower
          
          bower install mocha

**RELATED ARTICLES**
    
      https://mochajs.org/
      https://github.com/mochajs/mocha
      http://thejsguy.com/2015/01/12/jasmine-vs-mocha-chai-and-sinon.html
      https://marcofranssen.nl/jasmine-vs-mocha/
  
**A BASIC EXAMPLE IN THE USE OF MOCHA**


    var assert = require("assert")
    describe('Foo', function(){
      describe('#getBar(value)', function(){
        it('should return 100 when value is negative') // placeholder
        it('should return 0 when value is positive', function(){
          assert.equal(0, Foo.getBar(10));
        })
      })
    })  
  


**ADVANTAGES OF MOCHA :**
 1. Makes Asynchronous Testing Simpler (using the "Done parameter" in callback)
 2. Supports different assertion libraries as it runs independently of it. Most commonly used with Chai
 3. Intgrates well with Nodejs
 4. Runs in both Nodejs as well as browser which allow for client AND serverside testing.
 5. When used in Conjunction with Istanbul , we can obtain test coverage which is highly useful in determining test quality.
 
 
**DISADVANTAGES OF MOCHA :**
  1. Beginners might find it hard to select and setup assertion libraries and mocking utilities
  2. Mocha runs all tests in the same process which means shared memory and no isolation.
  3. Since it is newer support might be lacking in certain areas
  
  
**ALTERNATIVES TO MOCHA :**

A few examples of alternatives to Mocha are : 

 1. Jasmine
 
 2. QUnit
 
**WHY MOCHA OVER SPECIFIED ALTERNATIVES**
1. QUnit lacks fluent syntax and is difficult to configure
2. Both QUnit and earlier versions of Jasmine struggle with Asynchronous testing
3. Mocha provides support for all kinds of tests -unit, funcitonal and e2e
    while Jasmine seems to lennd itself to only unit tests.
 


#### ScreenCast Link : 

https://www.youtube.com/watch?v=UDUzUj9aPY8&feature=youtu.be

https://youtu.be/2qcMpIRvhNk


