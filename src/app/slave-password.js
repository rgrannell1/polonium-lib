
'use strict'

const crypto = require('crypto')
const bigInt = require('big-integer')

const constants = require('../commons/constants')

const convertCharset = (charset, inputBase, str) => {
  const digits = [ ]
  const chars = charset.split('')
  var num = bigInt(str, inputBase)

  while (num.gt(0)) {
    let ith = num.mod(chars.length)

    digits.push(chars[ith])
    num = num.divide(chars.length)
  }

  return digits.join('')
}

const slavePassword = {
  browser: { },
  local: { }
}

slavePassword.local = config => {
  const derivePassword = new Promise((resolve, reject) => {
    crypto.pbkdf2(
      config.password,
      config.salt,
      config.rounds,
      6 * config.len,
      config.digest,
      (err, key) => {
        return err ? reject(err) : resolve(key)
      }
    )
  })

  return derivePassword
    .then(password => {
      return convertCharset(
        constants.charsets.ALPHANUMERIC,
        constants.bases.HEXIDECIMAL,
        password.toString('hex')
      ).slice(0, config.len)
    })
}

slavePassword.browser = config => {
  const derivePassword = window.crypto.subtle.deriveBits({
    name: 'PBKDF2',
    salt: '',
    iterations: config.rounds,
    hash: {
      name: 'SHA-1'
    }
  })

  return derivePassword
}

module.exports = slavePassword.local
