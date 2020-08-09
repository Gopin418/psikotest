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

router.post('/simpan-kunci-jawaban-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var kunciJawaban = req.body.kunciJawaban

  var Query1 = ' INSERT INTO  t_kunci_jawaban_normal '
  Query1 += ' (tipe_test, nomor_test, nomor_soal, index_jawaban, tipe_kunci_jawaban,  kunci_jawaban, aktif) '
  Query1 += ' VALUES (?, ?, ?, ?, ?, ?, 1) '

  var Query2 = ' UPDATE t_kunci_jawaban_normal '
  Query2 += ' SET tipe_test = ?, nomor_test = ?, nomor_soal = ?, index_jawaban = ?, tipe_kunci_jawaban = ?,  kunci_jawaban = ? '
  Query2 += ' WHERE id_kunci_jawaban_normal = ? '

  var Query = ''
  var data = []
  sql.beginTransaction(function (_err) {
    for (let i = 0; i < kunciJawaban.length; i++) {
      if (kunciJawaban[i][0] < 1) {
        Query = Query1
        data = [kunciJawaban[i][1], kunciJawaban[i][2], kunciJawaban[i][3], kunciJawaban[i][4], 
          kunciJawaban[i][5], kunciJawaban[i][6]]
      } else {
        Query = Query2
        data = [kunciJawaban[i][1], kunciJawaban[i][2], kunciJawaban[i][3], kunciJawaban[i][4],
          kunciJawaban[i][5], kunciJawaban[i][6], kunciJawaban[i][0]]
      }
      sql.query(Query, data, function (_err) {
        console.log('Commit ubah simpan-kunci-jawaban-normal')
        sql.commit(function (_err) {
          if (_err) {
            pError.kirimPesanError(res, sql, _err, 'Simpan kunci jawaban gagal, harap periksa kembali')
            return
          }
          console.log('success!')
          res.send({ succes: 'success' })
        })
      })
    }
  })
})

router.post('/simpan-pengesahan-jawaban-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = session.idUser

  var sesiSoal = req.body.sesi_soal
  var tipeTest = req.body.tipe_test
  var nomorTest = req.body.nomor_test
  var catatan = req.body.catatan

  var Query1 = 'SELECT id_test '
  Query1 += ' FROM t_test '
  Query1 += ' WHERE sesi = ? and tipe_test = ? and nomor_test = ? '

  var Query21 = 'UPDATE t_test '
  Query21 += ' SET catatan_yang_mengesahkan = ?, tanggal_pengesahan = ?, id_user_yang_mengesahkan = ? '
  Query21 += ' WHERE sesi = ? and tipe_test = ? and nomor_test = ? '

  var tanggal = Date.now()

  sql.beginTransaction(function (_err) {
    var data = [sesiSoal, tipeTest, nomorTest]
    sql.query(Query1, data, function (_err, results, fields) {
      if (results.length > 0) { // UPDATE
        data = [catatan, tanggal, idUser, sesiSoal, tipeTest, nomorTest]
        sql.query(Query21, data, function (_err) {
          console.log('Commit ubah simpan-pengesahan-jawaban-normal')
          sql.commit(function (_err) {
            if (_err) {
              pError.kirimPesanError(res, sql, _err, 'Pengesahan gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
              return
            }
            console.log('success!')
            res.send({ succes: 'success' })
          })
        })
      } else { // INSERT
        res.status(501).send({ error: 'Sesi test tidak ditemukan, silahkan cek ulang.' })
      }
    })
  })
})

router.post('/simpan-periksa-jawaban-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = session.idUser

  var sesiSoal = req.body.sesi_soal
  var tipeTest = req.body.tipe_test
  var nomorTest = req.body.nomor_test
  var benar = req.body.benar
  var salah = req.body.salah
  var catatan = req.body.catatan

  var Query1 = 'SELECT id_test '
  Query1 += ' FROM t_test '
  Query1 += ' WHERE sesi = ? and tipe_test = ? and nomor_test = ? '

  var Query21 = 'UPDATE t_test '
  Query21 += ' SET benar = ?, salah = ?, catatan_pemeriksa = ?, tanggal_periksa = ?, id_user_pemeriksa = ? '
  Query21 += ' WHERE sesi = ? and tipe_test = ? and nomor_test = ? '

  var tanggal = Date.now()

  sql.beginTransaction(function (_err) {
    var data = [sesiSoal, tipeTest, nomorTest]
    sql.query(Query1, data, function (_err, results, fields) {
      if (results.length > 0) { // UPDATE
        data = [benar, salah, catatan, tanggal, idUser, sesiSoal, tipeTest, nomorTest]
        sql.query(Query21, data, function (_err) {
          console.log('Commit ubah simpan-periksa-jawaban-normal')
          sql.commit(function (_err) {
            if (_err) {
              pError.kirimPesanError(res, sql, _err, 'Pemeriksaan gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
              return
            }
            console.log('success!')
            res.send({ succes: 'success' })
          })
        })
      } else { // INSERT
        res.status(501).send({ error: 'Sesi test tidak ditemukan, silahkan cek ulang.' })
      }
    })
  })
})

module.exports = router
