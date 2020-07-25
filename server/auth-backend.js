/* eslint-disable no-unused-vars */
var JWT = require('./jwt-auth')
var mysql = require('mysql')
var sql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

var router = require('express').Router()

router.post('/auth/registrasi', function (req, res) {
  sql.beginTransaction(function (_err) {
    var Query = ' INSERT INTO t_users (email, password, nama_user, tempat_lahir, '
    Query += ' tanggal_lahir, jenis_kelamin, jenjang_pendidikan, aktif) '
    Query += ' VALUES (?, ?, ?, ?, ?, ?, ?, 1)'

    const data = [req.body.email, req.body.password, req.body.fullname,
      req.body.city, req.body.birthdate, req.body.gender, req.body.education]

    sql.query(Query, data, function (_err) {
      if (_err) {
        res.status(501).send({ error: 'Gagal menyimpan data registrasi, silahkan coba lagi.' })
        sql.rollback(function (_err) { })
        throw _err
      }
      sql.commit(function (_err) {
        if (_err) {
          res.status(501).send({ error: 'Gagal menyimpan sesi, silahkan coba lagi.' })
          sql.rollback(function (_err) { })
          throw _err
        }
      })
    })
  })
})

router.post('/auth/login', function (req, res) {
  var email = req.body.email
  var password = req.body.password

  var user = [email, password]
  var Query = 'select * from t_users where email = ? and password = ? and aktif = 1'
  sql.query(Query, user, function (_err, results, fields) {
    if (_err) {
      res.status(501).send({ error: 'E-Mail atau password tidak dikenal, silahkan coba lagi.' })
      throw _err
    }

    sql.beginTransaction(function (_err) {
      var tanggalTest = Date.now()
      var sesi = require('crypto').randomBytes(10).toString('hex')
      // res.send(results[0])
      var idUser = results[0].id_user
      var namaUser = results[0].nama_user
      var tempatLahir = results[0].tempat_lahir
      var tanggalLahir = results[0].tanggal_lahir
      var jenisKelamin = results[0].jenis_kelamin
      var jenjangPendidikan = results[0].jenjang_pendidikan
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