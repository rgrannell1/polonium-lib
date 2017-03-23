
"use strict"





const crypto    = require('crypto')
const bigInt    = require("big-integer")

const constants = require('../commons/constants')





const convertHexToBase62 = (charset, hex) => {

	const digits = [ ]
	const chars  = charset.split('')
	var num      = bigInt(hex, constants.bases.HEXIDECIMAL)

	while (num.gt(0)) {

		let ith = num.mod(chars.length)

		digits.push(chars[ith])
		num = num.divide(chars.length)

	}

	return digits.join('')

}





const slavePassword = { }





slavePassword.derive = config => {

	return new Promise((res, rej) => {

		crypto.pbkdf2(
			config.password,
			config.salt,
			config.rounds,
			config.len,
			config.digest,
			(err, key) => {
				return err ? rej(err) : res(key)
			}
		)

	})

}

slavePassword.format = (config, password) => {

	return convertHexToBase62(
		constants.charsets.ALPHANUMERIC,
		password.toString('hex')
	)

}

















module.exports = slavePassword
