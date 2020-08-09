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

  var Query = 'SELECT * FROM t_users WHERE tipe_user = 0'

  sql.query(Query, function (_err, results, fields) {
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

  var idUser = req.params.idUser
  var tipeTest = req.params.tipeTest
  var tanggalAwal = req.params.tglAwal
  var tanggalAkhir = req.params.tglAkhir

  var Query = ' SELECT a.FROM, a.nama_user, a.tempat_lahir, a.tanggal_lahir, a.jenjang_pendidikan, '
  Query += ' a.jenis_kelamin, b.sesi, b.tanggal_test, c.id_test, c.tipe_test,  c.nomor_test, c.waktu '
  Query += ' FROM t_users a JOIN  t_sesi_test b ON a.FROM = b.FROM '
  Query += ' JOIN t_test c ON a.FROM = c.FROM and b.sesi = c.sesi '
  Query += ' WHERE a.FROM = ? and c.tipe_test = ? and b.tanggal_test between ? and ? '
  Query += ' ORDER BY a.FROM, c.tipe_test, c.nomor_test '

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

  var QueryKunci = 'SELECT * FROM t_kunci_jawaban_normal '
  QueryKunci += ' WHERE tipe_test = ? , nomor_test = ? '
  QueryKunci += ' ORDER BY nomor_soal, index_jawaban '

  var QueryTest = 'SELECT  a.sesi, a.tipe_test, a.nomor_test, b.nomor_soal, b.index_jawaban, b.jawaban '
  QueryTest += ' FROM t_test a '
  QueryTest += ' JOIN t_jawaban_normal b ON a.id_test = b.id_test '
  QueryTest += ' WHERE a.sesi = ? and a.tipe_test = ? and a.nomor_test = ? and  b.jawaban_terakhir = 1 '
  QueryTest += ' ORDER BY nomor_soal, index_jawaban '

  var data = [tipeTest, nomorTest]
  sql.query(QueryKunci, data, function (_err, results, fields) {
    if (_err) {
      res.status(501).send({ error: 'Mengambil kunci jawaban gagal, silahkan ulangi.' })
      console.error(_err)
      return
    }

    if (results.length < 1) {
      res.status(501).send({ error: 'Kunci jawaban tidak ditemukan, silahkan isi kunci jawabannya terlebih dahulu.' })
    }

    var kunciJawaban = results

    sql.query(QueryKunci, data, function (_err, results, fields) {
      if (_err) {
        res.status(501).send({ error: 'Mengambil jawaban test gagal, silahkan ulangi.' })
        console.error(_err)
        return
      }

      if (results.length < 1) {
        res.status(501).send({ error: 'Jawaban test tidak ditemukan, silahkan cek ulang.' })
      }

      var jawaban = results

      for (let i = 0; i < kunciJawaban.length; i++) {
        for (let j = 0; j < jawaban.length; j++) {
          if (jawaban[j].tipe_test === kunciJawaban[i].tipe_test &&
            jawaban[j].nomor_test === kunciJawaban[i].nomor_test &&
            jawaban[j].index_jawaban === kunciJawaban[i].index_jawaban) {
            if (kunciJawaban[i].tipe_kunci_jawaban === '1') {
              kunciJawaban[i].benar = (kunciJawaban[i].kunci_jawaban.trim() === jawaban[j].jawaban.trim()) ? 1 : 0
              kunciJawaban[i].salah = (kunciJawaban[i].kunci_jawaban.trim() !== jawaban[j].jawaban.trim()) ? 0 : 1
            } else {
              kunciJawaban[i].benar = (kunciJawaban[i].kunci_jawaban.split(',').includes(jawaban[j].jawaban.trim())) ? 1 : 0
              kunciJawaban[i].salah = (kunciJawaban[i].kunci_jawaban.split(',').includes(jawaban[j].jawaban.trim())) ? 0 : 1
            }
          }
        }
      }
    })
  })
})

module.exports = router
