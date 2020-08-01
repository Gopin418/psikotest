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

router.post('/simpan-data-jawaban-normal', function (req, res) {
  var token = req.headers.authorization
  console.log(token)
  var session = ''

  try {
    session = JWT.verify(token)
    console.log(session)
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

  var Query1 = ' INSERT INTO t_test (id_user, sesi, tipe_test, nomor_test, waktu) '
  Query1 += ' VALUES (?, ?, ?, ?, ?) '

  var Query2 = ' UPDATE t_jawaban_normal SET pasti = 0 WHERE id_test = ? and nomor_soal = ? '

  var Query3 = ' INSERT INTO t_jawaban_normal (id_test, nomor_soal, index_soal, jawaban, pasti) '
  Query3 += ' VALUES (?, ?, ?, ?, 1) '

  sql.beginTransaction(function (_err) {
    var data = [idUser, sesi, tipeTest, nomorTest, waktu]

    sql.query(Query1, data, function (_err, results, fields) {
      if (_err) {
        res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
        sql.rollback(function (_err) {})
        throw _err
      }

      var idTest = results.insertId
      console.log(idTest)

      for (let i = 0; i < jawaban.length; i++) {
        var nomorSoal = jawaban[i][0]
        data = [idTest, nomorSoal]
        sql.query(Query2, data, function (_err, results, fields) {
          if (_err) {
            res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
            sql.rollback(function (_err) { })
            throw _err
          }

          for (let j = 1; j < 21; j++) {
            var indexSoal = j
            if (jawaban[i][indexSoal] === undefined) {
              break
            }
            data = [idTest, nomorSoal, indexSoal, jawaban[i][indexSoal]]
            sql.query(Query3, data, function (_err, results, fields) {
              console.log(_err)
              if (_err) {
                res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
                sql.rollback(function (_err) { })
                throw _err
              }
              if (i >= jawaban.length - 1) {
                console.log('Commit Data!')
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
          }
        })
      }
    })
  })
})

module.exports = router
