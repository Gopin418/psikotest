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
// var HashMap = require('hashmap')
// var Storage = require('node-storage')

var router = require('express').Router()

router.post('/simpan-data-jawaban-pauli', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = session.idUser
  var sesi = session.sesi

  var tipeTest = req.body.test_type
  var nomorTest = req.body.test_number
  var waktu = req.body.time
  var angkaAtas = req.body.upper_number // array
  var angkaBawah = req.body.bottom_number // array
  var jawaban = req.body.answers // array

  var Query1 = ' INSERT INTO t_test (id_user, sesi, tipe_test, nomor_test, waktu) '
  Query1 += ' VALUES (?, ?, ?, ?, ?) '

  // var Query2 = ' INSERT INTO t_jawaban_pauli (id_test, angka_atas, angka_bawah, jawaban, benar_salah) '
  // Query2 += ' VALUES (?, ?, ?, ?, ?) '

  var Query2 = ' INSERT INTO t_jawaban_pauli (id_test, urutan, angka_atas, angka_bawah, jawaban, benar_salah) '
  Query2 += ' VALUES ? '

  sql.beginTransaction(function (_err) {
    var data = [idUser, sesi, tipeTest, nomorTest, waktu]

    sql.query(Query1, data, function (_err, results, fields) {
      if (_err) {
        if (_err.code === 'ER_DUP_ENTRY') {
          pError.kirimPesanError(res, sql, _err, 'Test ini sudah pernah dilakukan, tidak bisa lagi diulangi.')
        } else {
          pError.kirimPesanError(res, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
          return
        }
      }
      console.log(results)

      var idTest = results.insertId

      console.log(jawaban)

      var dataJawaban = []
      for (let i = 0; i < jawaban.length; i++) {
        var angkaAtas1 = (angkaAtas[i] === undefined) ? null : angkaAtas[i]
        var angkaBawah1 = (angkaBawah[i] === undefined) ? null : angkaBawah[i]
        var jawaban1 = (jawaban[i] === undefined) ? null : jawaban[i]

        var benarSalah = ((angkaAtas1 + angkaBawah1) % 10) === jawaban1 ? 1 : 0
        console.log('urutan ' + (i + 1) + ' - ' + ((angkaAtas1 + angkaBawah1) % 10) + ' = ' + jawaban1 + ' -> ' + benarSalah)
        dataJawaban.push([idTest, i + 1, angkaAtas1, angkaBawah1, jawaban1, benarSalah])
      }

      sql.query(Query2, [dataJawaban], function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Test Pauli gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
          return
        }
        sql.commit(function (_err) {
          if (_err) {
            pError.kirimPesanError(res, sql, _err, 'Test Pauli gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
            return
          }
          console.log('success!')
          res.send({ succes: 'success' })
        })
      })
    })
  })
})

module.exports = router

// for (let i = 0; i < jawaban.length; i++) {
//   var angkaAtas1 = (angkaAtas[i] === undefined) ? null : angkaAtas[i]
//   var angkaBawah1 = (angkaBawah[i] === undefined) ? null : angkaBawah[i]
//   var jawaban1 = (jawaban[i] === undefined) ? null : jawaban[i]

//   var benarSalah = ((angkaAtas1 + angkaBawah1) % 10) === jawaban1 ? 1 : 0
//   console.log(((angkaAtas1 + angkaBawah1) % 10) + ' = ' + jawaban1 + ' -> ' + benarSalah)

//   data = [idTest, angkaAtas1, angkaBawah1, jawaban1, benarSalah]

//   sql.query(Query2, data, function (_err, results, fields) {
//     if (_err) {
//       pError.kirimPesanError(res, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
//       return
//     }
//     if (i >= jawaban.length - 1) {
//       sql.commit(function (_err) {
//         if (_err) {
//           pError.kirimPesanError(res, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
//           return
//         }
//         console.log('success!')
//         res.send({ succes: 'success' })
//       })
//     }
//   })
// }
