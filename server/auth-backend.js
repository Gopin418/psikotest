/* eslint-disable no-unused-vars */
// require('dotenv').config()
var JWT = require('./jwt-auth')
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
  var Query = 'select * from t_users where email = ? and password = ?'
  sql.query(Query, user, function (_err, results, fields) {
    if (_err) {
      res.status(501).send({ error: 'E-Mail atau password tidak dikenal, silahkan coba lagi.' })
      throw _err
    }

    sql.beginTransaction(function (_err) {
      var tanggalTest = Date.now()
      var sesi = require('crypto').randomBytes(10).toString('hex')
      var idUser = results.data.id_user
      var namaUser = results.data.nama_user
      var tempatLahir = results.data.tempat_lahir
      var tanggalLahir = results.data.tanggal_lahir
      var jenisKelamin = results.data.jenis_kelamin
      var jenjangPendidikan = results.data.jenjang_pendidikan
      var payload = {
        idUser: idUser,
        sesi: sesi
      }

      var Query = 'INSERT INTO t_sesi_test (id_user, sesi, tanggal_test) VALUES (?, ?, ?)'
      var data = [idUser, sesi, tanggalTest]
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
          var token = {
            token: JWT.sign(payload),
            namaUser: namaUser,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            jenisKelamin: jenisKelamin,
            jenjangPendidikan: jenjangPendidikan,
            tanggalTest: tanggalTest
          }

          res.send(token)
        })
      })
    })
  })
})

module.exports = router
