'use strict'

function ConvertHandler() {

  this.getNum = function(input) {
    let result
    let number1
    let number2
    const regex1 = /(^[\d\.?]+)\/?([\d\.?]+)?/
    try {
      const checkForMoreThanOneSlash = input.split('/')
      if (checkForMoreThanOneSlash.length > 2) {
        result = 'invalid number'
      } else {
        const numberPartOfInputArr = input.match(regex1)
        const partOne = numberPartOfInputArr[1]
        const partTwo = numberPartOfInputArr[2]
        number1 = Number(partOne)
        if (!partTwo) {
          number2 = 1
        } else {
          number2 = Number(partTwo)
        }
        result = number1 / number2
        if (!isFinite(result)) {
          throw new Error("Attempted divide by zero")
        }
      }
    } catch (error) {
      console.error(`getNum error: ${error.name}: ${error.message}`)
      result = null
    }
    return result
  };

  this.getUnit = function(input) {
    let result;
    const regex2 = /[a-zA-Z]+/
    try {
      const unitPartOfInputArr = regex2.exec(input)
      const unitString = unitPartOfInputArr[0]
      switch (unitString) {
        case 'mi':
          result = unitString
          break;
        case 'km':
          result = unitString
          break;
        case 'kg':
          result = unitString
          break;
        case 'lbs':
          result = unitString
          break;
        case 'gal':
          result = unitString
          break;
        case 'l':
          result = unitString
          break;
        case 'MI':
          result = unitString.toLowerCase()
          break;
        case 'KM':
          result = unitString.toLowerCase()
          break;
        case 'KG':
          result = unitString.toLowerCase()
          break;
        case 'LBS':
          result = unitString.toLowerCase()
          break;
        case 'GAL':
          result = unitString.toLowerCase()
          break;
        case 'L':
          result = unitString
          break;
        default:
          result = null
          break;
      }
    } catch (error) {
      console.error(`getUnit error: ${error}`)
      result = null
    }
    return result
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'mi':
        result = 'km'
        break;
      case 'km':
        result = 'mi'
        break;
      case 'kg':
        result = 'lbs'
        break;
      case 'lbs':
        result = 'kg'
        break;
      case 'gal':
        result = 'L'
        break;
      case 'L':
        result = 'gal'
        break;
      case 'l':
        result = 'gal'
        break;
      default:
        result = "invalid unit"
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'kg':
        result = 'kilograms'
        break;
      case 'mi':
        result = "miles"
        break;
      case 'km':
        result = "kilometres"
        break;
      case 'lbs':
        result = 'pounds'
        break;
      case 'gal':
        result = 'gallons'
        break;
      case 'L':
        result = 'litres'
        break;
      case 'l':
        result = 'litres'
        break;
      default:
        result = 'invalid unit'
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let exactResult
    let result;
    switch (initUnit) {
      case 'km':
        exactResult = initNum / miToKm
        result = Math.round((exactResult + Number.EPSILON) * 100000) / 100000
        break;
      case 'mi':
        exactResult = initNum * miToKm
        result = Math.round((exactResult + Number.EPSILON) * 100000) / 100000
        break;
      case 'gal':
        exactResult = initNum * galToL
        result = Math.round((exactResult + Number.EPSILON) * 100000) / 100000
        break;
      case 'L':
        exactResult = initNum / galToL
        result = Math.round((exactResult + Number.EPSILON) * 100000) / 100000
        break;
      case 'l':
        exactResult = initNum / galToL
        result = Math.round((exactResult + Number.EPSILON) * 100000) / 100000
        break;
      case 'lbs':
        exactResult = initNum * lbsToKg
        result = Math.round((exactResult + Number.EPSILON) * 100000) / 100000
        break;
      case 'kg':
        exactResult = initNum / lbsToKg
        result = Math.round((exactResult + Number.EPSILON) * 100000) / 100000
        break;
      default:
        break;
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };

}

module.exports = ConvertHandler;
