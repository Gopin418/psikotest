
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
  },
  check: function (req, res) {
    var token = req.headers.authorization
    console.log(token)
    try {
      const session = this.verify(token)
      console.log(session)
      return session
    } catch (_err) {
      res.status(501).send({ error: 'Sesi anda sudah tidak valid, silahkan login ulang.' })
      console.error(_err)
      return undefined
    }
  }
}
