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

router.post('/tambah-kunci-jawaban-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var kunciJawaban = req.body.kunciJawaban

  var Query1 = ' INSERT INTO  t_kunci_jawaban_normal '
  Query1 += ' (tipe_test, )'

  sql.beginTransaction(function (_err) {
    for (let i = 0; i < kunciJawaban.length; i++) {

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

  var Query1 = 'SELECT id_hasil_penilaian_normal '
  Query1 += ' FROM t_hasil_penilaian_normal '
  Query1 += ' WHERE sesi_soal = ? and tipe_test = ? and nomor_test = ? '
  Query1 += ' and tanggal_periksa is not null and id_user_pemeriksa is not null '

  var Query2 = 'UPDATE t_hasil_penilaian_normal '
  Query2 += ' SET tanggal_pengesahan = ?, id_user_yang_mengesahkan = ?  '
  Query2 += ' WHERE sesi_soal = ? and tipe_test = ? and nomor_test = ? '

  var Query21 = 'UPDATE t_test '
  Query21 += ' SET tanggal_pengesahan = ? '
  Query21 += ' WHERE sesi = ? and tipe_test = ? and nomor_test = ? '

  var tanggal = Date.now()

  sql.beginTransaction(function (_err) {
    var data = [sesiSoal, tipeTest, nomorTest]
    sql.query(Query1, data, function (_err, results, fields) {
      if (results.length > 0) { // UPDATE
        data = [tanggal, idUser, sesiSoal, tipeTest, nomorTest]
        sql.query(Query2, data, function (_err) {
          if (_err) {
            pError.kirimPesanError(res, sql, _err, 'Pengesahan gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
            return
          }

          data = [tanggal, sesiSoal, tipeTest, nomorTest]
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
        })
      } else { // INSERT
        res.status(501).send({ error: 'Form pemeriksaan tidak ditemukan, silahkan cek ulang.' })
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

  var Query1 = 'SELECT id_hasil_penilaian_normal '
  Query1 += ' FROM t_hasil_penilaian_normal '
  Query1 += ' WHERE sesi_soal = ? and tipe_test = ? and nomor_test = ? '

  var Query2 = 'UPDATE t_hasil_penilaian_normal '
  Query2 += ' SET benar = ?, salah = ?, catatan = ?,  tanggal_periksa = ?, id_user_pemeriksa = ?  '
  Query2 += ' WHERE sesi_soal = ? and tipe_test = ? and nomor_test = ? '

  var Query21 = 'UPDATE t_test '
  Query21 += ' SET tanggal_periksa = ? '
  Query21 += ' WHERE sesi = ? and tipe_test = ? and nomor_test = ? '

  var Query3 = 'INSERT INTO t_hasil_penilaian_normal '
  Query3 += ' (sesi_soal, tipe_test, nomor_test, benar, salah, catatan, tanggal_periksa, id_user_pemeriksa) '
  Query3 += ' VALUES (?, ?, ?, ?, ?, ?, ?, ?) '

  var tanggal = Date.now()

  sql.beginTransaction(function (_err) {
    var data = [sesiSoal, tipeTest, nomorTest]
    sql.query(Query1, data, function (_err, results, fields) {
      if (results.length > 0) { // UPDATE
        data = [benar, salah, catatan, tanggal, idUser, sesiSoal, tipeTest, nomorTest]
        sql.query(Query2, data, function (_err) {
          if (_err) {
            pError.kirimPesanError(res, sql, _err, 'Pemeriksaan gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
            return
          }

          data = [tanggal, sesiSoal, tipeTest, nomorTest]
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
        })
      } else { // INSERT
        data = [sesiSoal, tipeTest, nomorTest, benar, salah, catatan, tanggal, idUser]
        sql.query(Query3, data, function (_err) {
          if (_err) {
            pError.kirimPesanError(res, sql, _err, 'Pemeriksaan gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
            return
          }
          console.log('Commit tambah simpan-periksa-jawaban-normal')
          sql.commit(function (_err) {
            if (_err) {
              pError.kirimPesanError(res, sql, _err, 'Pemeriksaan gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
              return
            }
            console.log('success!')
            res.send({ succes: 'success' })
          })
        })
      }
    })
  })
})

router.get('/ambil-info-hasil-test-ist', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  console.log('OKE')
})

module.exports = router
