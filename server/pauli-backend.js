/* eslint-disable no-unused-vars */
var mysql = require('mysql')
var sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'remindertugas'
})
var HashMap = require('hashmap')
var Storage = require('node-storage')

var router = require('express').Router()

router.post('/simpan-data-jawaban-pauli', function (req, res) {
  var sesi = req.body.sesi
  var kodeTest = req.body.kdTest
  var waktu = req.body.waktu
  var jawaban = req.body.jawaban
})
