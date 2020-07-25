
const { JWT, JWK } = require('jose')

const key = JWK.asKey({
  kty: 'oct',
  k: process.env.KEY
})

module.exports = {
  sign: function (payload) {
    return JWT.sign(payload, key, { expiresIn: '24 hours' })
  },
  verify: function (token) {
    return JWT.verify(token, key)
  }
}
