
"use strict"





const crypto    = require('crypto')
const bigInt    = require("big-integer")

const constants = require('../commons/constants')





const convertCharset = (charset, inputBase, str) => {

	const digits = [ ]
	const chars  = charset.split('')
	var num      = bigInt(str, inputBase)

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

	return convertCharset(
		constants.charsets.ALPHANUMERIC,
		constants.bases.HEXIDECIMAL,
		password.toString('hex')
	).slice(0, config.len)

}





module.exports = slavePassword
