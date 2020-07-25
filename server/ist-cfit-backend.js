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

router.get('/ambil-info-hasil-test-ist', function (req, res) {
  var sesi = req.params.sesi
})

router.post('/simpan-data-jawaban-normal', function (req, res) {
  var token = req.headers.Authorization
  console.log(token)
  var session = ''

  try {
    session = JWT.verify(token)
  } catch (_err) {
    res.status(501).send({ error: 'Sesi anda sudah tidak valid, silahkan login ulang.' })
    throw _err
  }

  var idUser = session.idUser
  var sesi = session.sesi

  var tipeTest = req.body.test_type
  var nomorTest = req.body.test_number
  var waktu = req.body.time
  var jawaban = req.body.answer_data

  var Query = ' INSERT INTO t_test (id_user, sesi, tipe_test, nomor_test, waktu) '
  Query += ' VALUES (?, ?, ?, ?, ?) '

  sql.beginTransaction(function (_err) {
    var data = [idUser, sesi, tipeTest, nomorTest, waktu]

    sql.query(Query, data, function (_err, results, fields) {
      console.log(_err)
      if (_err) {
        res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
        sql.rollback(function (_err) {})
        throw _err
      }

      var idTest = results.insertId
      console.log(idTest)

      Query = ' UPDATE t_jawaban_normal pasti = 0 WHERE id_test = ? and nomor_soal = ? '
      Query += ' VALUES (?, ?) '
      for (let i = 0; i < jawaban.length; i++) {
        var nomorSoal = jawaban[i][0]
        data = [idTest, nomorSoal]
        var jalan = 1
        for (let j = 1; j < 21 && jalan === 1; j++) {
          var indexSoal = j
          if (jawaban[indexSoal] === undefined) {
            jalan = 0
          }
          sql.query(Query, data, function (_err, results, fields) {
            if (_err) {
              res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
              sql.rollback(function (_err) { })
              throw _err
            }
            Query = ' INSERT INTO t_jawaban_normal (id_test, nomor_soal, index_soal, jawaban, pasti) '
            Query += ' VALUES (?, ?, ?, ?, 1) '
            data = [idTest, nomorSoal, indexSoal, jawaban]
            sql.query(Query, data, function (_err, results, fields) {
              console.log(_err)
              if (_err) {
                res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
                sql.rollback(function (_err) { })
                throw _err
              }
              if (i >= jawaban.length - 1) {
                sql.commit(function (_err) {
                  if (_err) {
                    res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
                    sql.rollback(function (_err) { })
                    throw _err
                  }
                  console.log('success!')
                  res.send({ succes: 'success' })
                })
              }
            })
          })
        }
      }
    })
  })
})

module.exports = router
