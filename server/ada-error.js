module.exports = {
  kirimPesanError: function (res, sql, _err, pesan) {
    res.status(501).send({ error: pesan })
    sql.rollback(function (_err) { })
    console.error(_err)
  }
}
