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

  var Query = 'SELECT * FROM t_kunci_jawaban_normal '
  Query += ' WHERE tipe_test = ? and nomor_test = ? and nomor_soal = ? '
  Query += ' ORDER BY nomor_soal, index_jawaban '

  var data = [tipeTest, nomorTest, nomorSoal]
  sql.query(Query, data, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})


router.get('/ambil-data-peserta', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  
})

router.get('/ambil-data-test', function (req, res) {

  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = req.params.idUser
  var tipeTest = req.params.tanggalAkhir
  var tanggalAwal = req.params.tanggalAwal
  var tanggalAkhir = req.params.tanggalAkhir

  var Query = ' SELECT a.id_user, a.nama_user, a.tempat_lahir, a.tanggal_lahir, a.jenjang_pendidikan, '
  Query += ' a.jenis_kelamin, b.sesi, b.tanggal_test, c.id_test, c.tipe_test,  c.nomor_test, c.waktu '
  Query += ' FROM t_users a JOIN  t_sesi_test b ON a.id_user = b.id_user '
  Query += ' JOIN t_test c ON a.id_user = c.id_user and b.sesi = c.sesi '
  Query += ' WHERE a.id_user = ? and c.tipe_test = ? and b.tanggal_test between ? and ? '
  Query += ' ORDER BY a.id_user, c.tipe_test, c.nomor_test '

  var data = [idUser, tipeTest, tanggalAwal, tanggalAkhir]

  sql.query(Query, data, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

router.get('/ambil-detil-data-test-normal', function (req, res) {

  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idTest = req.params.idTest

  var Query = ' SELECT * FROM t_jawaban_normal '
  Query += ' WHERE id_test = ? '
  Query += ' ORDER BY nomor_soal, index_jawaban, jawaban_terakhir '

  var data = [idTest]

  sql.query(Query, data, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })

})

router.get('/ambil-detil-data-test-pauli', function (req, res) {

  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idTest = req.params.idTest

  var Query = ' SELECT * FROM t_jawaban_pauli '
  Query += ' WHERE id_test = ? '
  Query += ' ORDER BY urutan '

  var data = [idTest]

  sql.query(Query, data, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })

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
