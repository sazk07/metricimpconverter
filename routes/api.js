'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  const convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    const { input } = req.query
    let initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    if (initUnit === null) {
      if (isNaN(initNum)) {
        res.send('invalid number and unit')
      } else if (initNum <= 0) {
        res.send('invalid number and unit')
      } else {
        res.send('invalid unit')
      }
    } else {
      if (initNum <= 0 && initNum !== null) {
        res.send('invalid number')
      } else if (initNum > 0 && initNum !== null) {
        initNum = initNum
      } else {
        if (initNum === null) {
          initNum = 1
        } else {
          res.send('invalid number')
        }
      }
    }
    const initUnitString = convertHandler.spellOutUnit(initUnit)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const returnUnitString = convertHandler.spellOutUnit(returnUnit)
    const stringOutput = convertHandler.getString(initNum, initUnitString, returnNum, returnUnitString)
    res.json({
      initNum,
      initUnit: initUnit,
      returnNum,
      returnUnit,
      string: stringOutput
    })
  })
};
