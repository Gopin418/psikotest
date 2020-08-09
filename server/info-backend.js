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
  Query1 += ' WHERE tipeTest = ? and nomorTest = ? and nomorSoal = ? '

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

module.exports = router
