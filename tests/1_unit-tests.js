const chai = require('chai');
const assert = chai.assert;
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
      input = '1//3km'
      assert.isNull(convertHandler.getNum(input), "Double divide sign should return null")
      done()
    })
    test('No numerical input', function (done) {
      let input = 'mi'
      assert.equal(convertHandler.getNum(input), 1)
      input = 'lbs'
      assert.equal(convertHandler.getNum(input), 1)
      input = 'l'
      assert.equal(convertHandler.getNum(input), 1)
      input = 'L'
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })
  })
  suite('Function convertHandler.getUnit(input)', function() {
    test('Correct input unit', function (done) {
      let input = ['mi', 'km', 'kg', 'lbs', 'l', 'GAL', 'MI', 'KM', 'KG', 'LBS', 'L']
      let output = ['mi', 'km', 'kg', 'lbs', 'l', 'gal', 'mi', 'km', 'kg', 'lbs', 'l']
      input.forEach((element, idx) => {
        assert.equal(convertHandler.getUnit(element), output[idx])
      })
      done()
    })
    test('Invalid input unit test', function (done) {
      let input = '123kgm'
      assert.isNull(convertHandler.getUnit(input))
      input = '12what'
      assert.isNull(convertHandler.getUnit(input))
      done()
    })
  })
});
