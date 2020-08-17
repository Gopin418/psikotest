console.log(require('crypto').randomBytes(64).toString('hex'))
console.log(require('crypto').randomBytes(10).toString('hex'))

var dateSelesai = new Date(1597665670000)
var dateLahir = new Date(1345204870000)
var antara = new Date(dateSelesai - dateLahir)
var epoch = new Date('1970-01-01 00:00:00+0700')
console.log(antara.getYear() - epoch.getYear())
console.log(antara.getMonth() - epoch.getMonth())
