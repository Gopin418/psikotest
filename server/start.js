/* eslint-disable no-unused-vars */
// require("amd-loader");

// var config = require('./config')
require('dotenv').config()
var fs = require('fs')
var express = require('express')
var app = express()
var compression = require('compression')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
// var HashMap = require('hashmap')
// var Storage = require('node-storage')
// var webPush = require('web-push')
var cors = require('cors')
var fileUpload = require('express-fileupload')
// var JWT = require('./jwt-auth')
// var mysql = require('mysql')
// var sql = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root',
//   database: 'psikotest-psi'
// })

// const publicVapidKey = 'BKg-JjiryYZNMJSb2VrmVhchqVMQh048v0uaktugBPmDNMIBVkGk_XJh6804nYr7ih5TQy6ShM4iI9KPeqLw2XM'
// const privateVapidKey = 'QhlzIkne0CoBTte09KIcWcGqyEtHbm0bQCY4tC1P1kY'

// webPush.setVapidDetails('mailto:syamsu.', publicVapidKey, privateVapidKey)

app.use(cors())
app.use(compression())
app.use(fileUpload({
  createParentPath: true,
  fileSize: 5 * 1024 * 1024,
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
app.use(bodyParser.json({
  extended: true,
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))
app.use(bodyParser.urlencoded({
  extended: true,
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))
app.use(cookieParser())
app.set('port', 1111)

var server = null

// eslint-disable-next-line eqeqeq
if (process.env.MODE == 'https') {
  console.log('HTTPS')
  var privateKey = fs.readFileSync('/opt/cert/file.pem', 'utf8')
  var certificate = fs.readFileSync('/opt/cert/file.pem', 'utf8')

  var credentials = { key: privateKey, cert: certificate }
  var https = require('https')
  server = https.createServer(credentials, app)
} else {
  console.log('HTTP')
  var http = require('http')
  server = http.createServer(app)
}

server.listen(app.get('port'), function () {
  console.log('Express Server for HTPP / HTTPS Server & Notification Server, listening on port ' + server.address().port)
})

/// ///////////////////////
// ROUTE SECTION
/// //////////////////////

var auth = require('./auth-backend')
var normal = require('./soal-normal-backend')
var pauli = require('./pauli-backend')
var admin = require('./admin-backend')
var info = require('./info-backend')

app.use('/api', auth)
app.use('/api', normal)
app.use('/api', pauli)
app.use('/api', admin)
app.use('/api', info)

// app.use('/swagger-ui.html', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// var io = require('socket.io')(server)
