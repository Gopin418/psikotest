/* eslint-disable no-unused-vars */
var JWT = require('./jwt-auth')
var mysql = require('mysql')
var sql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

var router = require('express').Router()

router.post('/simpan-pengesahan-jawaban-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = session.idUser
  var sesi = session.sesi


})

router.post('/simpan-periksa-jawaban-normal', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = session.idUser
  var sesi = session.sesi

  var sesiSoal = req.body.sesi_soal
  var tipeTest = req.body.tipe_test
  var nomorTest = req.body.nomor_test
  var benar = req.body.benar
  var salah = req.body.salah
  var catatan = req.body.catatan

  var Query1 = 'select id_hasil_penilaian_normal '
  Query1 += ' from t_hasil_penilaian_normal '
  Query1 += ' where sesi_soal = ? and tipe_test = ? and nomor_test = ? '

  var Query2 = 'update t_hasil_penilaian_normal '
  Query2 += ' set benar = ?, salah = ?, catatan = ?,  tanggal_periksa = ?, id_user_pemeriksa = ?  '
  Query2 += ' where sesi_soal = ? and tipe_test = ? and nomor_test = ? '

  var Query3 = 'insert into t_hasil_penilaian_normal '
  Query3 += ' (sesi_soal, tipe_test, nomor_test, benar, salah, catatan, tanggal_periksa, id_user_pemeriksa) '
  Query3 += ' VALUES (?, ?, ?, ?, ?, ?, ?, ?) '

  sql.beginTransaction(function (_err) {
    var data = [sesiSoal, tipeTest, nomorTest]
    sql.query(Query1, data, function (_err, results, fields) {
      if (results.length > 0) { // UPDATE
        data = [benar, salah, catatan, new Date().getTime(), idUser, sesiSoal, tipeTest, nomorTest]
        sql.query(Query2, data, function (_err, results, fields) {
          if (_err) {
            res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
            sql.rollback(function (_err) { })
            console.error(_err)
            return
          }
          console.log('Commit ubah simpan-periksa-jawaban-normal')
          sql.commit(function (_err) {
            if (_err) {
              res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
              sql.rollback(function (_err) { })
              console.error(_err)
              return
            }
            console.log('success!')
            res.send({ succes: 'success' })
          })
        })
      } else { // INSERT
        data = [sesiSoal, tipeTest, nomorTest, benar, salah, catatan, new Date().getTime(), idUser]
        sql.query(Query3, data, function (_err, results, fields) {
          if (_err) {
            res.status(501).send({ error: 'Pemeriksaan gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
            sql.rollback(function (_err) { })
            console.error(_err)
            return
          }
          console.log('Commit tambah simpan-periksa-jawaban-normal')
          sql.commit(function (_err) {
            if (_err) {
              res.status(501).send({ error: 'Pemeriksaan gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
              sql.rollback(function (_err) { })
              console.error(_err)
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

  var Query1 = ' INSERT INTO t_test (id_user, sesi, tipe_test, nomor_test, waktu) '
  Query1 += ' VALUES (?, ?, ?, ?, ?) '

  var Query2 = ' UPDATE t_jawaban_normal SET jawaban_terakhir = \'0\' WHERE id_test = ? and nomor_soal = ? '

  var Query3 = ' INSERT INTO t_jawaban_normal (id_test, nomor_soal, index_jawaban, jawaban, jawaban_terakhir) '
  Query3 += ' VALUES (?, ?, ?, ?, \'1\') '

  sql.beginTransaction(function (_err) {
    var data = [idUser, sesi, tipeTest, nomorTest, waktu]

    sql.query(Query1, data, function (_err, results, fields) {
      if (_err) {
        res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
        sql.rollback(function (_err) {})
        console.error(_err)
        return
      }

      var idTest = results.insertId
      console.log(idTest)

      for (let i = 0; i < jawaban.length; i++) {
        var nomorSoal = jawaban[i][0]
        data = [idTest, nomorSoal]
        sql.query(Query2, data, function (_err, results, fields) {
          if (_err) {
            res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
            sql.rollback(function (_err) { })
            console.error(_err)
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
                res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
                sql.rollback(function (_err) { })
                console.error(_err)
                return
              }
              if (i >= jawaban.length - 1) {
                console.log('Commit simpan-data-jawaban-normal')
                sql.commit(function (_err) {
                  if (_err) {
                    res.status(501).send({ error: 'Test gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin' })
                    sql.rollback(function (_err) { })
                    console.error(_err)
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
})

module.exports = router
