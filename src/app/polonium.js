
"use strict"





const is = require('is')

const slavePassword = require('../app/slave-password')
const constants     = require('../commons/constants')





const validators = { }

validators.salt = salt => {

	if (!is.string(salt)) {
		throw new TypeError('salt value must be a string')
	}

	if (salt.length === 0) {
		throw new Error('no salt value was provided.')
	}

}

validators.len = len => {

	if (!is.number(len)) {
		throw new TypeError('length value must be a number')
	}

}

validators.rounds = rounds => {

	if (!is.number(rounds)) {
		throw new TypeError('the number of rounds to run must be a number')
	}

}

validators.digest = digest => {

	if (!is.string(digest)) {
		throw new TypeError('the output digest method value must be a string')
	}

}

validators.password = password => {

	if (!is.string(password)) {
		throw new TypeError('the output password method value must be a string')
	}

}





const polonium = config => {

	return polonium.validate(config)
		.then(( ) => {
			return slavePassword.derive(config)
		})
		.then(password => {
			return slavePassword.format(config, password)
		})

}

polonium.validate = config => {

	return new Promise(res => res( ))
	.then(( ) => {
		polonium.validate.config(config)
	})
	.then(( ) => {
		polonium.validate.security(config)
	})

}

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

			throw new Error(constants.errors.UNKNOWN_PARAMETER)

		}

	})


}

polonium.validate.security = config => {

	const passwordRank = constants.data.COMMON_PASSWORDS.indexOf(config.password)

	// this is ranked first to let the user know they chose a lousy password.
	if (passwordRank !== -1) {
		throw new Error(`${constants.errorCodes.COMMON_PASSWORD}: The provided master-password is too common (ranked #${passwordRank} of 10,000 most common passwords)`)
	}

	if (constants.data.ENGLISH_WORDS.indexOf(config.password.toLowerCase( )) !== -1) {
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
