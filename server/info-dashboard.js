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

router.get('/info-pengguna', function (req, res) {

})

router.get('/info-test', function (req, res) {

})

router.get('/jumlah-pengguna', function (req, res) {

})

module.exports = router
