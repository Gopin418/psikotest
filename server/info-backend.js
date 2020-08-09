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

router.get('/ambil-kunci-jawaban-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var tipeTest = req.params.tipeTest
  var nomorTest = req.params.nomorTest
  var nomorSoal = req.params.nomorSoal

  var Query1 = 'SELECT * FROM t_kunci_jawaban_normal '
  Query1 += ' WHERE tipe_test = ? and nomor_test = ? and nomor_soal = ? '
  Query1 += ' ORDER BY nomor_soal, index_jawaban '

  var data = [tipeTest, nomorTest, nomorSoal]
  sql.query(Query1, data, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

router.get('/ambil-data-test', function (req, res) {

  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var tanggalAwal = req.params.tanggalAwal
  var tanggalAkhir = req.params.tanggalAkhir

  var Query = 'SELECT a.id_user, a.nama_user, a.tempat_lahir, a.tanggal_lahir, a.jenjang_pendidikan '
})

router.get('/ambil-detil-data-test', function (req, res) {

  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUserTest = req.params.idUserTest
  var sesiTest = req.params.sesiTest
})

router.get('/ambil-hasil-pemeriksaan-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var sesiSoal = req.params.sesiSoal
  var tipeTest = req.params.tipeTest
  var nomorTest = req.params.nomorTest
})

module.exports = router
