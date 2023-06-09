'use strict';

const { expect } = require('chai');
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    const { input } = req.params
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const stringOutput = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: stringOutput
    })
  })

};
