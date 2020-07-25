/* eslint-disable no-unused-vars */
// require('dotenv').config()
var JWT = require('jwt-auth')
var mysql = require('mysql')
var sql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})
// var HashMap = require('hashmap')
// var Storage = require('node-storage')

var router = require('express').Router()

router.post('auth/login', function (req, res) {
  var email = req.body.email
  var password = req.body.password

  var user = [email, password]
  var Query = 'select * from Users where email = ? and password = ?'
  sql.query(Query, user, function (_err, results, fields) {
    if (_err) {
      res.status(501).send({ error: 'E-Mail atau password tidak dikenal, silahkan coba lagi.' })
      throw _err
    }

    sql.beginTransaction(function (_err) {
      var tanggalTest = Date.now()
      var sesi = require('crypto').randomBytes(10).toString('hex')
      var idUser = results.data.id_user
      var namaUser = results.data.namaUser
      var payload = {
        idUser: idUser,
        namaUser: namaUser,
        tanggalTest: tanggalTest,
        sesi: sesi
      }

      var Query = 'INSERT INTO t_sesi_test (id_user, tanggal_test, sesi) VALUES (?, ?, ?)'
      var data = [idUser, tanggalTest, sesi]
      sql.query(Query, data, function (_err) {
        if (_err) {
          res.status(501).send({ error: 'Gagal menyimpan sesi, silahkan coba lagi.' })
          sql.rollback(function (_err) {})
          throw _err
        }
        sql.commit(function (_err) {
          if (_err) {
            res.status(501).send({ error: 'Gagal menyimpan sesi, silahkan coba lagi.' })
            sql.rollback(function (_err) {})
            throw _err
          }
          var token = { token: JWT.sign(payload), namaUser: namaUser, tanggalTest: tanggalTest }
          res.send(token)
        })
      })
    })
  })
})

module.exports = router
