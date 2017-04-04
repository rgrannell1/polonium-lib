
"use strict"

const expect = require('chai').expect
const pl     = require('../index')




const cases = [
	{
		config: {
			salt:     'HtW3itBBHsoWSEyX4apc',
			password: 'B06hT2hN9xUKkwxP6oFf',
			len:       20,
			rounds:    1000000,
			digest:    'sha1'
		},
		derivedPassword: 'WFhD5Krxk0KiVUtkLoLU'
	}
]





describe('known test cases', ( ) => {

	cases.forEach(testCase => {

		it (`matches each expected test-case`, ( ) => {

			return pl.polonium.call(null, testCase.config)
			.then(
				password => {

					expect(password).to.have.length(testCase.config.len)
					expect(password).to.be.equal(testCase.derivedPassword)

				}
			)

		})

	})

})
