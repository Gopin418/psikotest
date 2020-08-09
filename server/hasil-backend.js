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

router.get('/ambil-info-hasil-test-ist', function (req, res) {
  var sesi = req.params.sesi
})

module.exports = router
