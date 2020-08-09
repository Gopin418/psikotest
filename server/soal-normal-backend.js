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

router.post('/simpan-data-jawaban-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = session.idUser
  var sesi = session.sesi

  var tipeTest = req.body.test_type
  var nomorTest = req.body.test_number
  var waktu = req.body.time
  var jawaban = req.body.answer_data

  //  var Query0 = ' SELECT id_test, sesi FROM t_test WHERE id_user = ? and sesi = ? '

  var Query1 = ' INSERT INTO t_test (id_user, sesi, tipe_test, nomor_test, waktu) '
  Query1 += ' VALUES (?, ?, ?, ?, ?) '

  var Query2 = ' UPDATE t_jawaban_normal SET jawaban_terakhir = \'0\' WHERE id_test = ? and nomor_soal = ? '

  var Query3 = ' INSERT INTO t_jawaban_normal (id_test, nomor_soal, index_jawaban, jawaban, jawaban_terakhir) '
  Query3 += ' VALUES (?, ?, ?, ?, \'1\') '

  sql.beginTransaction(function (_err) {
    // var data = [idUser, sesi]

    // sql.query(Query0, data, function (_err, results, fields) {
    //   if (results.length > 0) {
    //     res.status(501).send({ error: 'Test ini sudah pernah dilakukan, tidak bisa lagi diulangi.' })
    //     return
    //   }

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

      var idTest = results.insertId
      console.log(idTest)

      for (let i = 0; i < jawaban.length; i++) {
        var nomorSoal = jawaban[i][0]
        data = [idTest, nomorSoal]
        sql.query(Query2, data, function (_err, results, fields) {
          if (_err) {
            pError.kirimPesanError(res, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
            return
          }

          for (let j = 1; j < 21; j++) {
            var indexJawaban = j
            if (jawaban[i][indexJawaban] === undefined) {
              break
            }
            data = [idTest, nomorSoal, indexJawaban, jawaban[i][indexJawaban]]
            sql.query(Query3, data, function (_err, results, fields) {
              console.log(_err)
              if (_err) {
                pError.kirimPesanError(res, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
                return
              }
              if (i >= jawaban.length - 1) {
                console.log('Commit simpan-data-jawaban-normal')
                sql.commit(function (_err) {
                  if (_err) {
                    pError.kirimPesanError(res, sql, _err, 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
                    return
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
//  })
})

module.exports = router
