
"use strict"




const constants = {
	charsets: {
		ALPHANUMERIC: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyx"
	},
	limits: {
		LOW_ENTROPY:             80,
		MINIMUM_PASSWORD_LENGTH: 12,
		MINIMUM_ROUNDS:          1e6
	},
	bases: {
		HEXIDECIMAL: 16
	},
	errors: {
		UNKNOWN_PARAMETER: 'unknown parameter provided.'
	},
	errorCodes: {
		COMMON_PASSWORD:           'PL_000',
		PASSWORD_TOO_SHORT:        'PL_001',
		TOO_FEW_STRETCHING_ROUNDS: 'PL_002',
		SINGLE_ENGLISH_WORD:       'PL_003'
	},
	data: {
		COMMON_PASSWORDS: require('../data/common-passwords.json'),
		ENGLISH_WORDS:    require('../data/english-words.json'),
	}
}




module.exports = constants
