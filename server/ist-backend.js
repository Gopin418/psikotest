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

router.get('/ambil-data-ist', function (req, res) {
  var Query = 'SELECT * FROM t_ist_info'

  sql.query(Query, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

router.post('/simpan-data-ist', function (req, res) {
  var idIstInfo = req.body.id_ist_info
  var mode = req.body.mode
  var umurMin = req.body.umur_min
  var umurMax = req.body.umur_max
  var rw = req.body.rw
  var sw = req.body.sw
  //  var m = req.body.m
  //  var s = req.body.s

  var Query1 = ' INSERT INTO  t_ist_info '
  Query1 += ' (mode, umur_min, umur_max, rw, sw, aktif) '
  Query1 += ' VALUES (?, ?, ?, ?, ?, 1) '

  var Query2 = ' UPDATE t_ist_info '
  Query2 += ' SET mode = ?, umur_min = ?, umur_max = ?, rw = ?, '
  Query2 += ' sw = ? '
  Query2 += ' WHERE  	id_ist_info  = ? '

  var Query = ''
  var data = []
  sql.beginTransaction(function (_err) {
    if (idIstInfo === undefined || idIstInfo === null || idIstInfo === 0) {
      Query = Query1
      data = [mode, umurMin, umurMax, rw, sw]
    } else {
      Query = Query2
      data = [mode, umurMin, umurMax, rw, sw, idIstInfo]
    }

    console.log(Query)
    sql.query(Query, data, function (_err, results) {
      console.log('Commit ubah simpan-data-ist')
      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Simpan data IST gagal, harap periksa kembali')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

router.get('/ambil-hasil-sw-ist', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var tanggalLahir = req.query.tanggalLahir
  var tanggalSelesaiTest = req.query.tanggalSelesaiTest
  var mode = req.query.mode
  var nilaiRw = req.query.nilaiRW

  var dateSelesai = new Date(tanggalSelesaiTest)
  var dateLahir = new Date(tanggalLahir)
  var antara = (dateSelesai - dateLahir) 
  var epoch = new Date('1970-01-01 00:00:00+0700')
  var umur = antara.getYear() - epoch.getYear()

  var Query = 'SELECT sw FROM t_ist_info '
  Query += ' WHERE mode = ? and nilaiRw = ? '
  Query += ' and (? between umur_min and umur_max) '

  var data = [mode, nilaiRw, umur]

  sql.query(Query, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

// ////////////////////////////////////
// //////////// NORMAN GE /////////////

router.get('/ambil-hasil-sw-ist-normen-ge', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var nilaiRw = req.query.nilaiRW

  var Query = 'SELECT rw FROM t_ist_norm_ge '
  Query += ' WHERE (? between nilai_atas  and nilai_bawah) '

  var data = [nilaiRw]

  sql.query(Query, data, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

router.get('/ambil-data-norman-ge-ist', function (req, res) {
  var Query = 'SELECT * FROM t_ist_norm_ge'

  sql.query(Query, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

router.post('/simpan-norman-ge-ist', function (req, res) {
  var idIstNormGe = req.body.id_ist_norm_ge
  var nilaiAtas = req.body.nilai_atas
  var nilaiBawah = req.body.nilai_bawah
  var rw = req.body.rw

  var Query1 = ' INSERT INTO  t_ist_info '
  Query1 += ' (nilai_atas, nilai_bawah, rw, aktif) '
  Query1 += ' VALUES (?, ?, ?, 1) '

  var Query2 = ' UPDATE t_ist_info '
  Query2 += ' SET nilai_atas = ?, nilai_bawah = ?, rw = ? '
  Query2 += ' WHERE id_ist_norm_ge  = ? '

  var Query = ''
  var data = []
  sql.beginTransaction(function (_err) {
    if (idIstNormGe === undefined || idIstNormGe === null || idIstNormGe === 0) {
      Query = Query1
      data = [nilaiAtas, nilaiBawah, rw]
    } else {
      Query = Query2
      data = [nilaiAtas, nilaiBawah, rw, idIstNormGe]
    }

    console.log(Query)
    sql.query(Query, data, function (_err, results) {
      console.log('Commit ubah simpan-norman-ge-ist')
      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Simpan data GE IST gagal, harap periksa kembali')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

// ////////////////////////////////////
// //////////// IQ IST /////////////

router.get('/ambil-hasil-sw-iq-ist', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var nilaiRw = req.query.nilaiRW

  var Query = 'SELECT iq, prosentase FROM t_ist_iq '
  Query += ' WHERE sw = ? '

  var data = [nilaiRw]

  sql.query(Query, data, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

router.get('/ambil-data-iq-ist', function (req, res) {
  var Query = 'SELECT * FROM t_ist_iq'

  sql.query(Query, function (_err, results, fields) {
    if (_err) {
      res.status(200).send([])
      console.error(_err)
      return
    }
    res.status(200).send(results)
  })
})

router.post('/simpan-iq-ist', function (req, res) {
  var idIstIq = req.body.id_ist_iq
  var sw = req.body.sw
  var iq = req.body.iq
  var prosentase = req.body.prosentase

  var Query1 = ' INSERT INTO  t_ist_iq '
  Query1 += ' (sw, iq, rw, prosentase, aktif) '
  Query1 += ' VALUES (?, ?, ?, ?, 1) '

  var Query2 = ' UPDATE t_ist_iq '
  Query2 += ' SET sw = ?, iq = ?, rw = ?, prosentase = ? '
  Query2 += ' WHERE id_ist_iq  = ? '

  var Query = ''
  var data = []
  sql.beginTransaction(function (_err) {
    if (idIstIq === undefined || idIstIq === null || idIstIq === 0) {
      Query = Query1
      data = [sw, iq, prosentase]
    } else {
      Query = Query2
      data = [sw, iq, prosentase, idIstIq]
    }

    console.log(Query)
    sql.query(Query, data, function (_err, results) {
      console.log('Commit ubah simpan-iq-ist')
      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Simpan data IQ IST gagal, harap periksa kembali')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

module.exports = router
