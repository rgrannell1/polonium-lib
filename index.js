
"use strict"




const polonium  = require('./src/app/polonium')
const constants = require('./src/commons/constants')







polonium({
	salt:     'foo',
	password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
	len:       20,
	rounds:    1000000,
	digest:    'sha1'
})
.then(x => {
	console.log(x)
})

module.exports = {
	polonium,
	errorCodes: constants.errorCodes
}
