
'use strict'

const is = require('is')

const slavePassword = require('../app/slave-password')
const constants = require('../commons/constants')

const validators = { }

/*
	@param {string} salt.
	@throws errors describing why the supplied value is incorrect.

	Ensure that a valid PBKDF2 salt-value was supplied.

*/

validators.salt = salt => {
  if (!is.string(salt)) {
    throw new TypeError('salt value must be a string')
  }

  if (salt.length === 0) {
    throw new Error('no salt value was provided.')
  }
}

/*
	@param {number} len.
	@throws errors describing why the supplied value is incorrect.

	Ensure that a valid PBKDF2 output length was supplied.

*/

validators.len = len => {
  if (!is.number(len)) {
    throw new TypeError('length value must be a number')
  }
}

/*
	@param {number} rounds.
	@throws errors describing why the supplied value is incorrect.

	Ensure that a valid number of rounds of PBKDF2 was specified.

*/

validators.rounds = rounds => {
  if (!is.number(rounds)) {
    throw new TypeError('the number of rounds to run must be a number')
  }
}

/*
	@param {string} digest.
	@throws errors describing why the supplied value is incorrect.

	Validate the digest algorithm supplied to PBKDF2.

*/

validators.digest = digest => {
  if (!is.string(digest)) {
    throw new TypeError('the output digest method value must be a string')
  }
}

/*
	@param {string} password.
	@throws errors describing why the supplied value is incorrect.

	Validate the password supplied to PBKDF2.

*/

validators.password = password => {
  if (!is.string(password)) {
    throw new TypeError('the output password method value must be a string')
  }
}

/*
	@param {object} config.

*/

const polonium = config => {
  return polonium.validate(config)
    .then(() => slavePassword(config))
}

/*
	@param {object} config. configuration supplied to polonium.

*/

polonium.validate = config => {
  return Promise.resolve()
    .then(() => {
      polonium.validate.config(config)
    })
    .then(() => {
      polonium.validate.security(config)
    })
}

/*
	@param {object} config. configuration supplied to polonium.

	Validate non-security related details about the supplied configuration.

*/

polonium.validate.config = config => {
  if (!is.object(config)) {
    throw new Error(`${constants.errorCodes.MISSING_PARAMETER}: no configuration was supplied.`)
  }

  const expectedProperties = ['salt', 'len', 'rounds', 'digest', 'password']

  expectedProperties.forEach(expected => {
    if (!config.hasOwnProperty(expected)) {
      throw new Error(`${constants.errorCodes.MISSING_PARAMETER}: a required configuration property - ${expected} - was not supplied.`)
    }
  })

  Object.keys(config).forEach(parameter => {
    if (validators.hasOwnProperty(parameter)) {
      validators[parameter](config[parameter])
    } else {
      throw new Error(constants.errors.UNKNOWN_PARAMETER + ' ' + parameter)
    }
  })
}

/*
	@param {object} config.

	Validate that the supplied polonium configuration is not obviously insecure.

	@throws throws an error when:
	    - a password is too frequently used.
	    - the password is a single English word.
	    - the password is too short.
	    - too few rounds of PBKDF2 were requested.
*/

polonium.validate.security = config => {
  const passwordRank = constants.data.COMMON_PASSWORDS.indexOf(config.password)

  // this is ranked first to let the user know they chose a lousy password.
  if (passwordRank !== -1) {
    throw new Error(`${constants.errorCodes.COMMON_PASSWORD}: The provided master-password is too common (ranked #${passwordRank} of 10,000 most common passwords)`)
  }

  if (constants.data.ENGLISH_WORDS.indexOf(config.password.toLowerCase()) !== -1) {
    throw new Error(`${constants.errorCodes.SINGLE_ENGLISH_WORD}: The master password is too easy to guess, as it is a single English word.`)
  }

  if (config.password.length < constants.limits.MINIMUM_PASSWORD_LENGTH) {
    throw new Error(`${constants.errorCodes.PASSWORD_TOO_SHORT}: The provided master-password is less than ${constants.limits.MINIMUM_PASSWORD_LENGTH} characters long.`)
  }

  if (config.rounds < constants.limits.MINIMUM_ROUNDS) {
    throw new Error(`${constants.errorCodes.TOO_FEW_STRETCHING_ROUNDS}: Fewer that ${constants.limits.MINIMUM_ROUNDS} iterations were specified.`)
  }
}

module.exports = polonium
