/* eslint-disable no-unused-vars */
var pError = require('./ada-error')
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

    console.log(req.body)
    console.log(req.rawBody)

    var email = req.body.email
    var password = req.body.email
    var fullname = req.body.fullname
    var city = req.body.city
    var birthdate = req.body.birthdate
    var gender = req.body.gender
    var education = req.body.education

    const data = [email, password, fullname, city, birthdate, gender, education]

    sql.query(Query, data, function (_err) {
      if (_err) {
        if (_err.code === 'ER_DUP_ENTRY') {
          res.status(502).send({ error: 'Gagal menyimpan data registrasi, email sudah digunakan, silahkan ganti.' })
        } else {
          res.status(501).send({ error: 'Gagal menyimpan data registrasi, silahkan coba lagi.' })
        }
        sql.rollback(function (_err) { })
        console.error(_err)
        return
      }
      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(req, sql, _err, 'Gagal menyimpan sesi, silahkan coba lagi.')
          // res.status(501).send({ error: 'Gagal menyimpan sesi, silahkan coba lagi.' })
          // sql.rollback(function (_err) { })
          // console.error(_err)
          return
        }
        res.send({sucess: 'succes' })
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
      console.error(_err)
      return
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
      var tipeUser = results[0].tipe_user

      var payload = {
        idUser: idUser,
        sesi: sesi
      }

      var Query = 'INSERT INTO t_sesi_test (id_user, sesi, tanggal_test) VALUES (?, ?, ?)'
      var data = [idUser, sesi, tanggalTest]
      sql.query(Query, data, function (_err) {
        if (_err) {
          pError.kirimPesanError(req, sql, _err, 'Gagal menyimpan sesi, silahkan coba lagi.')
          return
        }
        sql.commit(function (_err) {
          if (_err) {
            pError.kirimPesanError(req, sql, _err, 'Gagal menyimpan sesi, silahkan coba lagi.')
            return
          }

          var token = {
            token: JWT.sign(payload),
            namaUser: namaUser,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            jenisKelamin: jenisKelamin,
            jenjangPendidikan: jenjangPendidikan,
            tanggalTest: tanggalTest,
            tipeUser: tipeUser
          }

          res.send(token)
        })
      })
    })
  })
})

module.exports = router
