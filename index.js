
'use strict'

const polonium = require('./src/app/polonium')
const constants = require('./src/commons/constants')

module.exports = {
  polonium,
  errorCodes: constants.errorCodes
}
