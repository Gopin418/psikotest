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

router.post('/auth/registrasi', function (req, res) {
  var Query = ' INSERT INTO t_users (email, password, nama_user, tempat_lahir, '
  Query += ' tanggal_lahir, jenis_kelamin, jenjang_pendidikan, aktif) '
  Query += ' VALUES (?, ?, ?, ?, ?, ?, ?, 1) '

  var email = req.body.email
  var password = req.body.password
  var fullname = req.body.fullname
  var city = req.body.city
  var birthdate = req.body.birthdate
  var gender = req.body.gender
  var education = req.body.education

  var data = [email, password, fullname, city, birthdate, gender, education]

  sql.beginTransaction(function (_err) {
    sql.query(Query, data, function (_err, results) {
      if (_err) {
        if (_err.code === 'ER_DUP_ENTRY') {
          res.status(502).send({ error: 'Gagal menyimpan data registrasi, email sudah digunakan, silahkan ganti.' })
        } else {
          res.status(501).send({ error: 'Gagal menyimpan data registrasi, silahkan coba lagi.' })
        }
        sql.rollback(function (_err) { })
        console.error(_err)
        return
      }

      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Gagal menyimpan data registrasi, silahkan coba lagi simpan lagi atau hub. admin')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

router.post('/auth/ubah-password-by-admin', function (req, res) { // yg melakukan admin
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = req.body.idUser
  var passwordBaru = req.body.passwordBaru

  var data = [passwordBaru, idUser]
  var Query = ' UPDATE t_users SET password = ? WHERE id_user = ? '
  sql.beginTransaction(function (_err) {
    sql.query(Query, data, function (_err, results) {
      if (_err) {
        res.status(501).send({ error: 'Gagal mengubah password, silahkan coba lagi.' })
        sql.rollback(function (_err) { })
        console.error(_err)
        return
      }

      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Gagal mengubah password, silahkan coba lagi simpan lagi atau hub. admin')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

router.post('/auth/ubah-password-sendiri', function (req, res) { // yg melakukan usernya
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var passwordAsli = req.body.passwordAsli
  var passwordBaru1 = req.body.passwordBaru1
  var passwordBaru2 = req.body.passwordBaru2

  if (passwordBaru1 !== passwordBaru2) {
    res.status(501).send({ error: 'Gagal mengubah password, password konfirmasi berbeda.' })
  }

  var data = [passwordBaru1, session.idUser, passwordAsli]
  var Query = ' UPDATE t_users SET password = ? WHERE id_user = ? and password = ? '
  sql.beginTransaction(function (_err) {
    sql.query(Query, data, function (_err, results) {
      if (_err) {
        res.status(501).send({ error: 'Gagal mengubah password, silahkan coba lagi.' })
        sql.rollback(function (_err) { })
        console.error(_err)
        return
      }

      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Gagal mengubah password, silahkan coba lagi simpan lagi atau hub. admin')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

router.post('/auth/ubah-registrasi', function (req, res) { // email dan password di sini tdk bisa diubah.
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var Query = ' UPDATE t_users SET nama_user = ?, tempat_lahir = ?, '
  Query += ' tanggal_lahir = ?, jenis_kelamin = ?, jenjang_pendidikan = ?, '
  Query += ' agama = ?, alamat = ?, nama_ayah = ?, pekerjaan_ayah = ?, alamat_ayah = ?, nama_ibu = ?, pekerjaan_ibu = ?, '
  Query += ' alamat_ibu = ?, hobi = ?, cita2 = ?, anak_ke = ?, jml_saudara = ?, mata_pelajaran_disukai = ?, '
  Query += ' mata_pelajaran_disukai_alasan = ?, mata_pelajaran_tdk_disukai = ?, mata_pelajaran_tdk_disukai_alasan = ?, '
  Query += ' mata_pelajaran_tinggi = ?, mata_pelajaran_rendah, jurusan_sekolah = ?, cara_belajar = ?, tugas_sulit = ?, '
  Query += ' kegiatan_orang_tua = ?, kegiatan_orang_tua_lainnya = ?, sakit_keras_ya_tidak = ?, sakit_keras_ya_penyakit = ?, '
  Query += ' sakit_keras_ya_kapan = ?, sakit_keras_ya_akibat = ?, psikotest_ya_tidak = ?, psikotest_ya_kapan = ?, '
  Query += ' psikotest_tempat = ?, psikotest_tujuan = ? '
  Query += ' WHERE id_user = ? '

  var idUser = req.body.id_user
  var fullname = req.body.fullname
  var city = req.body.city
  var birthdate = req.body.birthdate
  var gender = req.body.gender
  var education = req.body.education
  var agama = req.body.agama
  var alamat = req.body.alamat
  var namaAyah = req.body.nama_ayah
  var pekerjaanAyah = req.body.pekerjaan_ayah
  var alamatAyah = req.body.alamat_ayah
  var namaIbu = req.body.nama_ibu
  var pekerjaanIbu = req.body.pekerjaan_ibu
  var alamatIbu = req.body.alamat_ibu
  var hobi = req.body.hobi
  var cita2 = req.body.cita2
  var anakKe = req.body.anak_ke
  var jmlSaudara = req.body.jml_saudara
  var mataPelajaranDisukai = req.body.mata_pelajaran_disukai
  var mataPelajaranDisukaiAlasan = req.body.mata_pelajaran_disukai_alasan
  var mataPelajaranTdkDisukai = req.body.mata_pelajaran_tdk_disukai
  var mataPelajaranTdkDisukaiAlasan = req.body.mata_pelajaran_tdk_disukai_alasan
  var mataPelajaranTinggi = req.body.mata_pelajaran_tinggi
  var mataPelajaranRendah = req.body.mata_pelajaran_rendah
  var jurusanSekolah = req.body.jurusan_sekolah // Isinya IPA, IPS, BAHASA, dsb. kirim textnya aja. IPA dan IPS hardcoded
  var caraBelajar = req.body.cara_belajar
  var tugasSulit = req.body.tugas_sulit // kirimkan index array, 0, 1, 2, 3 atau 4, dst
  var kegiatanOrangTua = req.body.kegiatan_orang_tua // kirimkan index array, -1, 0, 1, 2, 3 atau 4, dst, ini isi -1 jika pilih lainnya.
  var kegiatanOrangTuaLainnya = req.body.kegiatan_orang_tua_lainnya // isinya text dan kegiatan_orang_tua diset -1
  var sakitKerasYaTidak = req.body.sakit_keras_ya_tidak
  var sakitKerasPenyakit = req.body.sakit_keras_ya_penyakit
  var sakitKerasKapan = req.body.sakit_keras_ya_kapan
  var sakitKerasAkibat = req.body.sakit_keras_ya_akibat
  var psikotestYaTidak = req.body.psikotest_ya_tidak
  var psikotestKapan = req.body.psikotest_ya_kapan
  var psikotestTempat = req.body.psikotest_tempat
  var psikotestTujuan = req.body.psikotest_tujuan

  var data = [fullname, city, birthdate, gender, education,
    agama, alamat, namaAyah, pekerjaanAyah, alamatAyah, namaIbu, pekerjaanIbu, alamatIbu,
    hobi, cita2, anakKe, jmlSaudara, mataPelajaranDisukai, mataPelajaranDisukaiAlasan,
    mataPelajaranTdkDisukai, mataPelajaranTdkDisukaiAlasan, mataPelajaranTinggi, mataPelajaranRendah,
    jurusanSekolah, caraBelajar, tugasSulit, kegiatanOrangTua, kegiatanOrangTuaLainnya, sakitKerasYaTidak,
    sakitKerasPenyakit, sakitKerasKapan, sakitKerasAkibat, psikotestYaTidak, psikotestKapan, psikotestTempat,
    psikotestTujuan, idUser]

  sql.beginTransaction(function (_err) {
    sql.query(Query, data, function (_err, results) {
      if (_err) {
        res.status(501).send({ error: 'Gagal mengubah data peserta, silahkan coba lagi.' })
        sql.rollback(function (_err) { })
        console.error(_err)
        return
      }

      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Gagal mengubah data peserta, silahkan coba lagi simpan lagi atau hub. admin')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

router.post('/auth/registrasi-lengkap', function (req, res) {
  var Query = ' INSERT INTO t_users (email, password, nama_user, tempat_lahir, '
  Query += ' tanggal_lahir, jenis_kelamin, jenjang_pendidikan, '
  Query += ' agama, alamat, nama_ayah, pekerjaan_ayah, alamat_ayah, nama_ibu, pekerjaan_ibu, '
  Query += ' alamat_ibu, hobi, cita2, anak_ke, jml_saudara, mata_pelajaran_disukai, '
  Query += ' mata_pelajaran_disukai_alasan, mata_pelajaran_tdk_disukai, mata_pelajaran_tdk_disukai_alasan, '
  Query += ' mata_pelajaran_tinggi, mata_pelajaran_rendah, jurusan_sekolah, cara_belajar, tugas_sulit, '
  Query += ' kegiatan_orang_tua, kegiatan_orang_tua_lainnya, sakit_keras_ya_tidak, sakit_keras_ya_penyakit, '
  Query += ' sakit_keras_ya_kapan, sakit_keras_ya_akibat, psikotest_ya_tidak, psikotest_ya_kapan, '
  Query += ' psikotest_tempat, psikotest_tujuan, '
  Query += ' ,aktif) '
  Query += ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 1)' // 38 ?

  // console.log(req.body)
  // console.log(req.rawBody)

  var email = req.body.email
  var password = req.body.password
  var fullname = req.body.fullname
  var city = req.body.city
  var birthdate = req.body.birthdate
  var gender = req.body.gender
  var education = req.body.education
  var agama = req.body.agama
  var alamat = req.body.alamat
  var namaAyah = req.body.nama_ayah
  var pekerjaanAyah = req.body.pekerjaan_ayah
  var alamatAyah = req.body.alamat_ayah
  var namaIbu = req.body.nama_ibu
  var pekerjaanIbu = req.body.pekerjaan_ibu
  var alamatIbu = req.body.alamat_ibu
  var sekolah = req.body.sekolah
  // bentuknya array of objek
  // sekolah.jenis_sekolah, pilihannya : TK, SD, SLTP, SLTA, S1, S2, S3
  // sekolah.nama_sekolah
  // sekolah.lokasi
  // sekolah.tahun_lulus (tahun lulus tidak wajib diisi)
  var kursus = req.body.kursus
  // bentuknya array of objek
  // kursus.macam
  // kursus.lokasi
  // kursus.tahun_lulus
  // kursus.instansi
  var organisasi = req.body.organisasi
  // bentuknya array of objek
  // organisasi.nama
  // organisasi.jabatan
  // organisasi.lokasi
  // organisasi.lamanya (hitungan tahun aja)
  var olahraga = req.body.olahraga_seni
  // bentuknya array of objek
  // olahraga_seni.tipe_isian, hard coded : Olah Raga atau Seni
  // olahraga_seni.kegiatan
  // olahraga_seni.aktif = 1 atau 0.
  var hobi = req.body.hobi
  var cita2 = req.body.cita2
  var anakKe = req.body.anak_ke
  var jmlSaudara = req.body.jml_saudara
  var saudara = req.body.saudara
  // bentuknya array of objek
  // saudara.tipe_isian, hard coded : Kakak atau Adik
  // saudara.nama
  // saudara.pekerjaan_sekolah
  var mataPelajaranDisukai = req.body.mata_pelajaran_disukai
  var mataPelajaranDisukaiAlasan = req.body.mata_pelajaran_disukai_alasan
  var mataPelajaranTdkDisukai = req.body.mata_pelajaran_tdk_disukai
  var mataPelajaranTdkDisukaiAlasan = req.body.mata_pelajaran_tdk_disukai_alasan
  var mataPelajaranTinggi = req.body.mata_pelajaran_tinggi
  var mataPelajaranRendah = req.body.mata_pelajaran_rendah
  var jurusanSekolah = req.body.jurusan_sekolah // Isinya IPA, IPS, BAHASA, dsb. kirim textnya aja. IPA dan IPS hardcoded
  var caraBelajar = req.body.cara_belajar
  var tugasSulit = req.body.tugas_sulit // kirimkan index array, 0, 1, 2, 3 atau 4, dst
  var kegiatanOrangTua = req.body.kegiatan_orang_tua // kirimkan index array, -1, 0, 1, 2, 3 atau 4, dst, ini isi -1 jika pilih lainnya.
  var kegiatanOrangTuaLainnya = req.body.kegiatan_orang_tua_lainnya // isinya text dan kegiatan_orang_tua diset -1
  var sakitKerasYaTidak = req.body.sakit_keras_ya_tidak
  var sakitKerasPenyakit = req.body.sakit_keras_ya_penyakit
  var sakitKerasKapan = req.body.sakit_keras_ya_kapan
  var sakitKerasAkibat = req.body.sakit_keras_ya_akibat
  var psikotestYaTidak = req.body.psikotest_ya_tidak
  var psikotestKapan = req.body.psikotest_ya_kapan
  var psikotestTempat = req.body.psikotest_tempat
  var psikotestTujuan = req.body.psikotest_tujuan

  var data = [email, password, fullname, city, birthdate, gender, education,
    agama, alamat, namaAyah, pekerjaanAyah, alamatAyah, namaIbu, pekerjaanIbu, alamatIbu,
    hobi, cita2, anakKe, jmlSaudara, mataPelajaranDisukai, mataPelajaranDisukaiAlasan,
    mataPelajaranTdkDisukai, mataPelajaranTdkDisukaiAlasan, mataPelajaranTinggi, mataPelajaranRendah,
    jurusanSekolah, caraBelajar, tugasSulit, kegiatanOrangTua, kegiatanOrangTuaLainnya, sakitKerasYaTidak,
    sakitKerasPenyakit, sakitKerasKapan, sakitKerasAkibat, psikotestYaTidak, psikotestKapan, psikotestTempat,
    psikotestTujuan]

  var QuerySekolah = 'INSERT INTO t_users_sekolah (id_user, jenis_sekolah, nama_sekolah, lokasi, tahun_lulus) '
  QuerySekolah += ' VALUES ? ' // 5 ?

  var QueryKursus = 'INSERT INTO t_users_kursus (id_user, macam, lokasi, tahun_lulus, instansi) '
  QueryKursus += ' VALUES ? ' // 5 ?

  var QueryOrganisasi = 'INSERT INTO t_users_organisasi (id_user, nama, jabatan, lokasi, lamanya) '
  QueryOrganisasi += ' VALUES ? ' // 5 ?

  var QueryOlahraga = 'INSERT INTO t_users_olahraga_seni (id_user, tipe_isian, kegiatan, aktif_tidak) '
  QueryOlahraga += ' VALUES ? ' // 4 ?

  var QuerySaudara = 'INSERT INTO t_users_saudara (id_user, tipe_isian, nama, pekerjaan_sekolah) '
  QuerySaudara += ' VALUES ? '

  var Query2 = [QuerySekolah, QueryKursus, QueryOrganisasi, QueryOlahraga, QuerySaudara]
  sql.beginTransaction(function (_err) {
    sql.query(Query, data, function (_err, results) {
      if (_err) {
        if (_err.code === 'ER_DUP_ENTRY') {
          res.status(502).send({ error: 'Gagal menyimpan data registrasi, email sudah digunakan, silahkan ganti.' })
        } else {
          res.status(501).send({ error: 'Gagal menyimpan data registrasi, silahkan coba lagi.' })
        }
        sql.rollback(function (_err) { })
        console.error(_err)
        return
      }

      var idUser = results.insertId

      var dataSekolah = []
      for (let i = 0; i < sekolah.length; i++) {
        dataSekolah.push([idUser, sekolah.jenis_sekolah, sekolah.nama_sekolah, sekolah.lokasi, sekolah.tahun_lulus])
      }

      var dataKursus = []
      for (let i = 0; i < kursus.length; i++) {
        dataKursus.push([idUser, kursus.macam, kursus.lokasi, kursus.tahun_lulus, kursus.instansi])
      }

      var dataOrganisasi = []
      for (let i = 0; i < organisasi.length; i++) {
        dataOrganisasi.push([idUser, organisasi.nama, organisasi.jabatan, organisasi.lokasi, organisasi.lamanya])
      }

      var dataOlahraga = []
      for (let i = 0; i < olahraga.length; i++) {
        dataOlahraga.push([idUser, olahraga.tipe_isian, olahraga.kegiatan, olahraga.aktif])
      }

      var dataSaudara = []
      for (let i = 0; i < saudara.length; i++) {
        dataSaudara.push([idUser, saudara.tipe_isian, saudara.nama, saudara.pekerjaan_sekolah])
      }

      data = [dataSekolah, dataKursus, dataOrganisasi, dataOlahraga, dataSaudara]
      var adaError = false

      for (let i = 0; i < Query2.length; i++) {
        sql.query(Query2[i], [data[i]], function (_err) {
          if (_err) {
            pError.kirimPesanError(res, sql, _err, 'Registrasi gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
            adaError = true
          }
        })
        if (adaError) {
          return
        }
      }
      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Registrasi gagal disimpan, silahkan coba lagi simpan lagi atau hub. admin')
          return
        }
        console.log('success!')
        res.send({ succes: 'success' })
      })
    })
  })
})

router.post('/auth/login', function (req, res) {
  login(req, res, '0')
})

router.post('/auth/login-admin', function (req, res) {
  login(req, res, '1')
})

router.post('/auth/logout-selesai-test', function (req, res) {
  var session = JWT.check(req, res)
  if (session === null) {
    return
  }

  var idUser = session.idUser
  var sesi = session.sesi

  var Query = ' UPDATE t_sesi_test SET tanggal_selesai = ? WHERE id_user = ? and sesi = ? '

  sql.beginTransaction(function (_err) {
    var data = [Date.now(), idUser, sesi]
    sql.query(Query, data, function (_err) {
      if (_err) {
        res.status(501).send({ error: 'Tidak bisa mengakhiri sesi, silahkan ulangi.' })
        console.error(_err)
        return
      }

      sql.commit(function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Gagal menyimpan sesi, silahkan coba lagi.')
          return
        }
        console.log('success logout')
        res.send({ succes: 'success' })
      })
    })
  })
})

var login = function (req, res, tipe) {
  var email = req.body.email
  var password = req.body.password

  var user = [email, password, tipe]
  var Query = 'SELECT * FROM t_users WHERE email = ? and password = ? and tipe_user = ? and aktif = 1'
  sql.query(Query, user, function (_err, results, fields) {
    if (_err) {
      res.status(501).send({ error: 'E-Mail atau password tidak dikenal, silahkan coba lagi.' })
      console.error(_err)
      return
    }

    if (results.length < 1) {
      res.status(501).send({ error: 'E-Mail atau password tidak dikenal, silahkan coba lagi.' })
      return
    }

    var idUser = results[0].id_user
    var namaUser = results[0].nama_user
    var tempatLahir = results[0].tempat_lahir
    var tanggalLahir = results[0].tanggal_lahir
    var jenisKelamin = results[0].jenis_kelamin
    var jenjangPendidikan = results[0].jenjang_pendidikan
    var tipeUser = results[0].tipe_user

    var tanggalTest = Date.now()
    var sesi = require('crypto').randomBytes(8).toString('hex') + tanggalTest + require('crypto').randomBytes(4).toString('hex')

    var payload = {
      idUser: idUser,
      sesi: sesi
    }

    sql.beginTransaction(function (_err) {
      // res.send(results[0])
      var Query = 'INSERT INTO t_sesi_test (id_user, sesi, tanggal_test) VALUES (?, ?, ?)'
      var data = [idUser, sesi, tanggalTest]
      sql.query(Query, data, function (_err) {
        if (_err) {
          pError.kirimPesanError(res, sql, _err, 'Gagal menyimpan sesi, silahkan coba lagi.')
          return
        }
        sql.commit(function (_err) {
          if (_err) {
            pError.kirimPesanError(res, sql, _err, 'Gagal menyimpan sesi, silahkan coba lagi.')
            return
          }

          var token = {
            token: JWT.sign(payload),
            namaUser: namaUser,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            jenisKelamin: jenisKelamin,
            jenjangPendidikan: jenjangPendidikan,
            tanggalTest: tanggalTest,
            tipeUser: tipeUser
          }

          res.send(token)
        })
      })
    })
  })
}

module.exports = router
