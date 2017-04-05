
"use strict"

const expect = require('chai').expect
const pl     = require('../index')




const cases = [
	{
		config: {
			salt:     '167275349293536',
			password: '465539108774705',
			len:       20,
			rounds:    1000000,
			digest:    'sha1'
		},
		derivedPassword: 'xoCQXFdqxyVE3EKmEox6'
	},
	{
		config: {
			salt:     '157746924526645',
			password: '519990378156692',
			len:       20,
			rounds:    1000000,
			digest:    'sha1'
		},
		derivedPassword: 'cjujhKHsyMBXJnpMuffv'
	},
	{
		config: {
			salt:     '848134379954775',
			password: '837590806008142',
			len:       20,
			rounds:    1000000,
			digest:    'sha1'
		},
		derivedPassword: 'OoQneTof7l6nUVOQ7jxq'
	},
	{
		config: {
			salt:     '060133017671930',
			password: '856832465889692',
			len:       20,
			rounds:    1000000,
			digest:    'sha1'
		},
		derivedPassword: '2XjbmfI8uY7OQx82D2oo'
	},
	{
		config: {
			salt:     '377049113462092',
			password: '752261007374591',
			len:       20,
			rounds:    1000000,
			digest:    'sha1'
		},
		derivedPassword: 'DdrxvaaGFCK4duM9oIiI'
	}
]





describe('known test cases', function ( ) {

	this.timeout(1e6)

	cases.forEach(testCase => {

		it (`matches each expected test-case`, ( ) => {

			return pl.polonium(testCase.config)
			.then(
				password => {

					expect(password).to.have.length(testCase.config.len)
					expect(password).to.be.equal(testCase.derivedPassword)

				}
			)

		})

	})

})
