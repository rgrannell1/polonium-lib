
"use strict"

const expect = require('chai').expect
const pl     = require('../index')




const cases = [
	{
		config: {
			salt:     'foo',
			password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
			len:       20,
			rounds:    1000000,
			digest:    'sha1'
		},
		derivedPassword: '39EoWqNJ7xcoXkjXe4ML'
	}
]





describe('known test cases', function ( ) {

	this.timeout(1e6)

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
