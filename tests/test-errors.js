
'use strict'

const pl = require('../index')

describe('error conditions', function () {
  this.timeout(10 * 60 * 1000)

  const cases = [
    {
      config: {
        'salt': 'facebook',
        'len': 100,
        'rounds': 1e5,
        'digest': 'sha512',
        'password': 'password'
      },
      errorCode: pl.errorCodes.COMMON_PASSWORD
    },
    {
      config: {
        'salt': 'facebook',
        'len': 100,
        'rounds': 1e5,
        'digest': 'sha512',
        'password': 'foo'
      },
      errorCode: pl.errorCodes.PASSWORD_TOO_SHORT
    },
    {
      config: {
        'salt': 'facebook',
        'len': 100,
        'rounds': 1,
        'digest': 'sha512',
        'password': '************'
      },
      errorCode: pl.errorCodes.TOO_FEW_STRETCHING_ROUNDS
    },
    {
      config: {
        'salt': 'facebook',
        'len': 100,
        'rounds': 1,
        'digest': 'sha512',
        'password': 'anglicanisms'
      },
      errorCode: pl.errorCodes.SINGLE_ENGLISH_WORD
    },
    {
      config: {
        'salt': 'facebook',
        'len': 100,
        'rounds': 1e5,
        'password': '************'
      },
      errorCode: pl.errorCodes.MISSING_PARAMETER
    }
  ]

  cases.forEach(testCase => {
    it(`throws the error-code "${testCase.errorCode}" for malformed input`, () => {
      return pl.polonium.call(null, testCase.config)
        .then(
          () => {
            throw 'did not throw error.'
          },
          err => {
            if (!err.message.startsWith(testCase.errorCode)) {
              throw new Error(`expected error-code ${testCase.errorCode} in "${err.message}"`)
            }
          }
        )
    })
  })
})
