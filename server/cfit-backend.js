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

router.get('/ambil-data-cfit', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var Query = 'SELECT * FROM t_cfit_iq'

  sql.query(Query, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

router.post('/simpan-data-cfit', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idCfitIq = req.body.id_cfit_iq
  var totalRawScoreMin = req.body.total_raw_score_min
  var totalRawScoreMax = req.body.total_raw_score_max
  var umurTahunMin = req.body.umur_tahun_min
  var umurTahunMax = req.body.umur_tahun_max
  var umurBulanMin = req.body.umur_bulan_min
  var umurBulanMax = req.body.umur_bulan_max
  var scoreIq = req.body.score_iq

  var Query1 = ' INSERT INTO  t_cfit_iq '
  Query1 += ' (total_raw_score_min, total_raw_score_max, umur_tahun_min, umur_tahun_max, '
  Query1 += '  umur_bulan_min, umur_bulan_max, score_iq, aktif) '
  Query1 += ' VALUES (?, ?, ?, ?, ?, ?, ?, 1) '

  var Query2 = ' UPDATE t_cfit_iq '
  Query2 += ' SET total_raw_score_min = ?, total_raw_score_max = ?, umur_tahun_min = ?, umur_tahun_max = ?, '
  Query2 += ' umur_bulan_min = ?, umur_bulan_max= ?, score_iq = ?  '
  Query2 += ' WHERE  id_ist_info  = ? '

  var Query = ''
  var data = []
  sql.beginTransaction(function (_err) {
    if (idCfitIq === undefined || idCfitIq === null || idCfitIq === 0) {
      Query = Query1
      data = [totalRawScoreMin, totalRawScoreMax, umurTahunMin, umurTahunMax, umurBulanMin, umurBulanMax, scoreIq]
    } else {
      Query = Query2
      data = [totalRawScoreMin, totalRawScoreMax, umurTahunMin, umurTahunMax, umurBulanMin, umurBulanMax, scoreIq, idCfitIq]
    }

    console.log(Query)
    sql.query(Query, data, function (_err, results) {
      console.log('Commit ubah simpan-data-cfit')
      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Simpan data CFIT gagal, harap periksa kembali')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

router.get('/ambil-hasil-score-cfit', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var tanggalLahir = req.query.tanggalLahir
  var tanggalSelesaiTest = req.query.tanggalSelesaiTest
  var nilaiScore = req.query.nilaiScore

  var dateSelesai = new Date(tanggalSelesaiTest)
  var dateLahir = new Date(tanggalLahir)
  var antara = (dateSelesai - dateLahir)
  var epoch = new Date('1970-01-01 00:00:00+0700')
  var umurTahun = antara.getYear() - epoch.getYear()
  var umurBulan = antara.getMonth() - epoch.getMonth()

  var Query = 'SELECT sw FROM t_cfit_iq '
  Query += ' WHERE (? between  total_raw_score_min and total_raw_score_max) '
  Query += ' WHERE (? between umur_tahun_min  and umur_tahun_max ) '
  Query += ' WHERE (? between umur_bulan_min  and umur_bulan_max) '

  var data = [nilaiScore, umurTahun, umurBulan]

  sql.query(Query, data, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

module.exports = router
