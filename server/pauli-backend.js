/* eslint-disable no-unused-vars */
require('dotenv').config()
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
  var sesi = req.body.sesi
  var kodeTest = req.body.kdTest // atau testKe
  var waktu = req.body.waktu // waktu
  var angkaAtas = req.body.angkaAtas // array
  var angkaBawah = req.body.angkaBawah // array
  var jawaban = req.body.jawaban // array
  





})

module.exports = router
