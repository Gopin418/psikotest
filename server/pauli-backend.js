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
// var HashMap = require('hashmap')
// var Storage = require('node-storage')

var router = require('express').Router()

router.post('/simpan-data-jawaban-pauli', function (req, res) {
  var sesi = req.body.sesi
  var kodeTest = req.body.kdTest // atau testKe
  var waktu = req.body.waktu // waktu
  var angkaAtas = req.body.angkaAtas // array
  var angkaBawah = req.body.angkaBawah // array
  var jawaban = req.body.jawaban // array
})

router.post('/simpan-data-jawaban-pauli', function (req, res) {
  var token = req.headers.Authorization
  console.log(req)
  var session = ''

  try {
    session = JWT.verify(token)
  } catch (_err) {
    res.status(501).send({ error: 'Sesi anda sudah tidak valid, silahkan login ulang.' })
    console.error(_err)
    return
  }

  var idUser = session.idUser
  var sesi = session.sesi

  var tipeTest = req.body.test_type
  var nomorTest = req.body.test_number
  var waktu = req.body.time
  var angkaAtas = req.body.upper_number // array
  var angkaBawah = req.body.bottom_number // array
  var jawaban = req.body.answers // array

  //  var Query0 = ' SELECT id_test, sesi FROM t_test WHERE id_user = ? and sesi = ? '

  var Query1 = ' INSERT INTO t_test (id_user, sesi, tipe_test, nomor_test, waktu) '
  Query1 += ' VALUES (?, ?, ?, ?, ?) '

  var Query2 = ' INSERT INTO t_jawaban_normal (id_test, angka_atas, angka_bawah, jawaban, status) '
  Query2 += ' VALUES (?, ?, ?, ?, ?, ?, ?, 1) '

  sql.beginTransaction(function (_err) {
    // var data = [idUser, sesi]

    // sql.query(Query0, data, function (_err, results, fields) {
    //   if (results.length > 0) {
    //     res.status(501).send({ error: 'Test ini sudah pernah dilakukan, tidak bisa lagi diulangi.' })
    //     return
    //   }
    var data = [idUser, sesi, tipeTest, nomorTest, waktu]

    sql.query(Query1, data, function (_err, results, fields) {

      if (_err) {
        if (_err.code === 'ER_DUP_ENTRY') {
          res.status(501).send({ error: 'Test ini sudah pernah dilakukan, tidak bisa lagi diulangi.' })
        } else {
          pError.kirimPesanError(req, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
          return
        }
      }

      var idTest = results.insertId
      console.log(idTest)

      for (let i = 0; i < jawaban.length; i++) {
        var angkaAtas1 = (angkaAtas[i] === undefined) ? null : angkaAtas[i]
        var angkaBawah1 = (angkaBawah[i] === undefined) ? null : angkaBawah[i]
        var jawaban1 = (jawaban[i] === undefined) ? null : jawaban[i]

        var status = (angkaAtas1 + angkaBawah1) === jawaban1 ? 1 : 0

        data = [idTest, angkaAtas1, angkaBawah1, jawaban1, status]

        sql.query(Query2, data, function (_err, results, fields) {
          console.log(_err)
          if (_err) {
            pError.kirimPesanError(req, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
            return
          }
          if (i >= jawaban.length - 1) {
            sql.commit(function (_err) {
              if (_err) {
                pError.kirimPesanError(req, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
                return
              }
              console.log('success!')
              res.send({ succes: 'success' })
            })
          }
        })
      }
    })
  })
//  })
})

module.exports = router
