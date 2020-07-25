/* eslint-disable no-unused-vars */
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
  var angkaAtas = req.body.upper_number // array
  var angkaBawah = req.body.bottom_number // array
  var jawaban = req.body.answers // array

  var Query = ' INSERT INTO t_test (id_user, sesi, tipe_test, nomor_test, waktu) '
  Query += ' VALUES (?, ?, ?, ?, ?) '

  sql.beginTransaction(function (_err) {
    var data = [idUser, sesi, tipeTest, nomorTest, waktu]

    sql.query(Query, data, function (_err, results, fields) {
      console.log(_err)
      if (_err) {
        res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
        sql.rollback(function (_err) { })
        throw _err
      }

      var idTest = results.insertId
      console.log(idTest)

      Query = ' UPDATE t_jawaban_pauli pasti = 0 WHERE id_test = ? and nomor_soal = ? '
      Query += ' VALUES (?, ?) '
      for (let i = 0; i < jawaban.length; i++) {
        var nomorSoal = jawaban[i][0]
        data = [idTest, nomorSoal]
        var angkaAtas1 = (angkaAtas[i] === undefined) ? null : angkaAtas[i]
        var angkaBawah1 = (angkaBawah[i] === undefined) ? null : angkaBawah[i]
        var jawaban1 = (jawaban[i] === undefined) ? null : jawaban[i]

        var status = (angkaAtas1 + angkaBawah1) === jawaban1 ? 1 : 0

        sql.query(Query, data, function (_err, results, fields) {
          if (_err) {
            res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
            sql.rollback(function (_err) { })
            throw _err
          }
          Query = ' INSERT INTO t_jawaban_normal (id_test, angka_atas, angka_bawah, jawaban, status) '
          Query += ' VALUES (?, ?, ?, ?, ?, ?, ?, 1) '
          data = [idTest, nomorSoal, angkaAtas1, angkaBawah1, jawaban1, status]
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
    })
  })
})

module.exports = router
