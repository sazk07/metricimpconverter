'use strict'

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
      assert.equal(convertHandler.getNum(input), "invalid number")
      input = '1//3km'
      assert.equal(convertHandler.getNum(input), "invalid number")
      done()
    })
    test('No numerical input', function (done) {
      let input = 'mi'
      assert.isNull(convertHandler.getNum(input))
      input = 'lbs'
      assert.isNull(convertHandler.getNum(input))
      input = 'l'
      assert.isNull(convertHandler.getNum(input))
      input = 'L'
      assert.isNull(convertHandler.getNum(input))
      done()
    })
  })
  suite('Function convertHandler.getUnit(input)', function() {
    test('Correct input unit', function (done) {
      let input = ['mi', 'km', 'kg', 'lbs', 'l', 'gal', 'GAL', 'MI', 'KM', 'KG', 'LBS', 'L']
      let output = ['mi', 'km', 'kg', 'lbs', 'L', 'gal', 'gal', 'mi', 'km', 'kg', 'lbs', 'L']
      for (let idx=0; idx< input.length; idx++) {
        assert.equal(convertHandler.getUnit(input[idx]), output[idx])
      }
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
  suite('Function convertHandler.getReturnUnit(input)', function () {
    test('Correct return unit', function (done) {
      let input = ['mi', 'km', 'kg', 'lbs', 'l', 'gal', 'L']
      let output = ['km', 'mi', 'lbs', 'kg', 'gal', 'L', 'gal']
      let idx = 0
      while (idx < input.length) {
        assert.equal(convertHandler.getReturnUnit(input[idx]), output[idx])
        idx++
      }
      done()
    })
  })
  suite('Function convertHandler.spellOutUnit(input)', function () {
    test("Correct spellOut unit", function (done) {
      let input = ['mi', 'km', 'kg', 'lbs', 'l', 'gal']
      let output = ['miles', 'kilometers', 'kilograms', 'pounds', 'litres', 'gallons']
      for (let idx=0; idx<input.length; idx++) {
        assert.equal(convertHandler.spellOutUnit(input[idx]), output[idx])
      }
      done()
    })
  })
  suite('Function convertHandler.convert(initNum, initUnit)', function () {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    test('gal to L', function (done) {
      let initNum = 5
      let initUnit = "gal"
      let expected = 18.92705
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.0001)
      done()
    })
    test('L to gal', function (done) {
      let initNum = 5
      let initUnit = "L"
      let expected = 1.32086
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.00001)
      done()
    })
    test('mi to km', function (done) {
      let initNum = 5
      let initUnit = 'mi'
      let expected = 8.0467
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.00001)
      done()
    })
    test('km to mi', function (done) {
      let initNum = 5
      let initUnit = 'km'
      let expected = 3.10686
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.00001)
      done()
    })
    test('lbs to kg', function (done) {
      let initNum = 5
      let initUnit = 'lbs'
      let expected = 2.26796
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.00001)
      done()
    })
    test('kg to lbs', function (done) {
      let initNum = 5
      let initUnit = 'kg'
      let expected = 11.03
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.01)
      done()
    })
  })
});
