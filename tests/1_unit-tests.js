const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      let input = '12km'
      assert.equal(convertHandler.getNum(input), 12)
      input = '12L'
      assert.equal(convertHandler.getNum(input), 12)
      input = '00123lbs'
      assert.equal(convertHandler.getNum(input), 123)
      done()
    })
    test('Decimal number input', function (done) {
      let input = '1.2km'
      assert.equal(convertHandler.getNum(input), 1.2)
      done()
    })
    test('Fractional input', function (done) {
      let input = '1/2km'
      assert.equal(convertHandler.getNum(input), 0.5)
      input = '3/0km'
      assert.isNull(convertHandler.getNum(input), "Divide by zero should return null")
      input = '3/1kg'
      assert.equal(convertHandler.getNum(input), 3)
      done()
    })
    test('Fractional input with decimals', function (done) {
      let input = '5.4/3lbs'
      assert.equal(convertHandler.getNum(input), 5.4/3)
      input = '8/1.4km'
      assert.equal(convertHandler.getNum(input), 8/1.4)
      input = '5.4/0lbs'
      assert.isNull(convertHandler.getNum(input), "Divide by zero should return null")
      input = '5/0.0lbs'
      assert.isNull(convertHandler.getNum(input), "Divide by zero should return null")
      input = '5.4/3.1lbs'
      assert.equal(convertHandler.getNum(input), 5.4/3.1)
      done()
    })
    test('Double fraction input', function (done) {
      let input = '3/2/3lbs'
      assert.isNull(convertHandler.getNum(input), "Double fraction should return null")
      done()
    })
  })
});
