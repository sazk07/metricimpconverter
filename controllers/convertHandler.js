function ConvertHandler() {

  this.getNum = function(input) {
    let result
    const regex1 = /^[0-9]+/
    const numberPartOfInput = regex1.exec(input)
        try {
          const numberPartOfInputCastToNumber = Number(numberPartOfInput[0])
          if (input === 'mi' || input === 'km' || input === 'kg' || input === 'lbs' || input === 'gal' || input === 'L') {
            numberPartOfInputCastToNumber = 1
          }
          if (numberPartOfInputCastToNumber < 1) {
            result = "invalid unit and number"
          } else {
            numberPartOfInput === 'null' ? result = 'invalid unit' : result = numberPartOfInputCastToNumber
          }
        } catch(err) {
          result = 'invalid unit'
        }
    return result
  };

  this.getUnit = function(input) {
    let result;
    // get unit from input using regex
    const regex2 = /[^0-9]+/
    const unitPartOfInput = regex2.exec(input)
    const unitValue = unitPartOfInput[0]
    console.log(unitValue)
    if (unitValue !== 'mi' && unitValue !== 'km' && unitValue !== 'lbs' && unitValue !== 'kg' && unitValue !== 'gal' && unitValue !== 'L' && unitValue !== 'l') {
      result = 'invalid unit'
    } else {
      result = unitValue
    }
    return result
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    // cases: km to mi. kg to lbs. gal to L.
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
    let result;
    switch (initUnit) {
      case 'km':
        result = initNum / miToKm
        break;
      case 'mi':
        result = initNum * miToKm
        break;
      case 'gal':
        result = initNum * galToL
        break;
      case 'L':
        result = initNum / galToL
        break;
      case 'l':
        result = initNum / galToL
        break;
      case 'lbs':
        result = initNum * lbsToKg
        break;
      case 'kg':
        result = initNum / lbsToKg
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
