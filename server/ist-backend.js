/* eslint-disable no-unused-vars */
var mysql = require('mysql')
var sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'remindertugas'
})
var HashMap = require('hashmap')
var Storage = require('node-storage')

var router = require('express').Router()

router.get('/ambil-info-hasil-test-ist', function (req, res) {
  var sesi = req.params.sesi


})

router.post('/simpan-data-jawaban-ist-mode1', function (req, res) {
  var sesi = req.body.sesi
  var kodeTest = req.body.kdTest
  var waktu = req.body.waktu
  var jawaban = req.body.jawaban

  var Query = 'INSERT INTO t_jawaban_ist (sesi, kode_test, jawaban, waktu) '
  Query += 'VALUES (?, ?, ?, ?)'

  sql.beginTransaction(function (_err) {
    for (let i = 0; i < jawaban.length; i++) {
      const val = [sesi, kodeTest, jawaban[i], waktu]
      sql.query(Query, val, function (_err, results, fields) {
        console.log(_err)
        if (_err) {
          res.status(500).send({ error: _err })
          return sql.rollback(function (_err) {
            throw _err
          })
        }

        if (i === jawaban.length - 1) {
          sql.commit(function (err) {
            if (err) {
              return sql.rollback(function (_err) {
                throw _err
              })
            }
            console.log('success!')
            res.send({ succes: results.insertId })
          })
        }
      })
    }
  })
})

router.post('/simpan-data-jawaban-ist-mode2', function (req, res) {
  var sesi = req.body.sesi
  var kodeTest = req.body.kdTest
  var waktu = req.body.waktu
  var jawaban = req.body.jawaban

  var Query = 'INSERT INTO t_jawaban_ist (sesi, kode_test, jawaban1, jawaban2, waktu) '
  Query += 'VALUES (?, ?, ?, ?, ?)'

  sql.beginTransaction(function (_err) {
    for (let i = 0; i < jawaban.length; i++) {
      const val = [sesi, kodeTest, jawaban[i][0], jawaban[i][1], waktu]
      sql.query(Query, val, function (_err, results, fields) {
        console.log(_err)
        if (_err) {
          res.status(500).send({ error: _err })
          return sql.rollback(function (_err) {
            throw _err
          })
        }

        if (i === jawaban.length - 1) {
          sql.commit(function (err) {
            if (err) {
              return sql.rollback(function (_err) {
                throw _err
              })
            }
            console.log('success!')
            res.send({ succes: results.insertId })
          })
        }
      })
    }
  })
})

router.post('/simpan-data-jawaban-ist-mode3', function (req, res) {
  var sesi = req.body.sesi
  var kodeTest = req.body.kdTest
  var waktu = req.body.waktu
  var jawaban = req.body.jawaban

  var Query = 'INSERT INTO t_jawaban_ist (sesi, kode_test, jawaban1, jawaban2, jawaban3, waktu) '
  Query += 'VALUES (?, ?, ?, ?, ?, ?)'

  sql.beginTransaction(function (_err) {
    for (let i = 0; i < jawaban.length; i++) {
      const val = [sesi, kodeTest, jawaban[i][0], jawaban[i][1], jawaban[i][2], waktu]
      sql.query(Query, val, function (_err, results, fields) {
        console.log(_err)
        if (_err) {
          res.status(500).send({ error: _err })
          return sql.rollback(function (_err) {
            throw _err
          })
        }

        if (i === jawaban.length - 1) {
          sql.commit(function (err) {
            if (err) {
              return sql.rollback(function (_err) {
                throw _err
              })
            }
            console.log('success!')
            res.send({ succes: results.insertId })
          })
        }
      })
    }
  })
})
