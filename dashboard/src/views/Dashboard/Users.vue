<template lang="html">
  <div class="">
    <v-row>
      <v-col cols="2">
        <v-select
        label="Jenis Tes"
        :items="tests"
        v-model="testType"
        outlined
        dense></v-select>
      </v-col>
      <v-col cols="2">
        <v-dialog
          ref="startDateDialog"
          v-model="startDateModal"
          :return-value.sync="startDate"
          persistent
          width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
              v-model="startDate"
              label="Tanggal Awal"
              outlined
              readonly
              dense
              v-bind="attrs"
              v-on="on"></v-text-field>
            </template>
            <v-date-picker
            ref="picker"
            v-model="startDate"
            scrollable
            :max="endDate === '' ? new Date().toISOString().substr(0, 10) : endDate"
            min="1950-01-01">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startDateModal = false">Batal</v-btn>
              <v-btn text color="primary" @click="$refs.startDateDialog.save(startDate)">Simpan</v-btn>
            </v-date-picker>
          </v-dialog>
      </v-col>
      <v-col cols="2">
        <v-dialog
          ref="endDateDialog"
          v-model="endDateModal"
          :return-value.sync="endDate"
          persistent
          width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
              v-model="endDate"
              label="Tanggal Akhir"
              outlined
              readonly
              dense
              v-bind="attrs"
              v-on="on"></v-text-field>
            </template>
            <v-date-picker
            ref="picker"
            v-model="endDate"
            scrollable
            :min="startDate ? startDate : ''">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endDateModal = false">Batal</v-btn>
              <v-btn text color="primary" @click="$refs.endDateDialog.save(endDate)">Simpan</v-btn>
            </v-date-picker>
          </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          :items-per-page="10"
          item-key="name">
          <template v-slot:item.detail="{ item }">
            <v-dialog v-model="summaryDialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  color="primary"
                  rounded
                  v-bind="attrs"
                  v-on="on"
                  @click="getSummary(item.detail)"
                  :key="item.detail"
                  depressed>Lihat Hasil Tes</v-btn>
              </template>
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="summaryDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Hasil Tes</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-data-table
                  :headers="summaryHeaders"
                  :items="summaryData"
                  :loading="loading"
                  :item-per-page="5"
                  item-key="id_test">
                  <template v-slot:item.id_test="{ item }">
                    <v-btn
                      small
                      color="primary"
                      @click="getDetail(item.id_test)"
                      :key="item.detail"
                      depressed>Detail</v-btn>
                    &nbsp;
                    &nbsp;
                    <v-btn
                      small
                      color="primary"
                      @click="getPeriksa(item.sesi, item.nomor_test)"
                      :key="item.detail"
                      depressed>Periksa</v-btn>
                  </template>
                </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog v-model="detailDialog" persistent fullscreen transition="dialog-bottom-transition">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="detailDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Detail Tes</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-data-table
                  :headers="detailHeader"
                  :items="dataDetail"
                  :loading="loading"
                  :items-per-page="5"
                  item-key="id_test">
                </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog v-model="periksaDialog" width="400" persistentz>
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="periksaDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Periksa Tes</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-card class="mt-4" v-for="(data, index) in dataPeriksa" :key="index" outlined>
                    <v-card-text>
                      {{ data }}
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.status="{ item }">
            <span :class="(item.status === 'Aktif' ? 'light-green--text text-accent-3' : 'red--text') + ' font-weight-medium'"><v-icon :color="item.status === 'Aktif' ? 'light-green accent-4' : 'red'" xs>mdi-circle-medium</v-icon>{{ item.status }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      summaryDialog: false,
      detailDialog: false,
      periksaDialog: false,
      userId: '',
      testNumber: '',
      testId: '',
      testSession: '',
      baseUrl: process.env.VUE_APP_LOCAL_BACKEND,
      tests: ['ist', 'pauli', 'cfit', 'rmib'],
      testType: '',
      startDateModal: false,
      endDateModal: false,
      startDate: '',
      endDate: '',
      loading: true,
      summaryHeaders: [
        {
          text: 'Nomor Test',
          value: 'nomor_test'
        },
        {
          text: 'Lama Mengerjakan',
          value: 'waktu'
        },
        {
          text: 'Tanggal Test',
          value: 'tanggal_test'
        },
        {
          text: '',
          value: 'id_test'
        }
      ],
      summaryData: [],
      headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Jenis Kelamin',
          align: 'start',
          sortable: true,
          value: 'gender'
        },
        {
          text: 'Tempat Lahir',
          align: 'start',
          sortable: false,
          value: 'birthplace'
        },
        {
          text: 'Tanggal lahir',
          align: 'end',
          sortable: false,
          value: 'birthdate'
        },
        {
          text: 'Jenjang Pendidikan',
          align: 'start',
          sortable: false,
          value: 'education'
        },
        {
          text: 'Email',
          align: 'start',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Status',
          align: 'start',
          sortable: true,
          value: 'status'
        },
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'detail'
        }
      ],
      users: [],
      dataDetail: [],
      detailHeader: [
        {
          text: 'Nomor Soal',
          value: 'nomor_soal'
        },
        {
          text: 'Jawaban',
          value: 'jawaban'
        },
        {
          text: 'Jawaban Terakhir',
          value: 'jawaban_terakhir'
        }
      ],
      dataPeriksa: [],
      sliceDataUser: [],
      sliceDataSummary: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getPeriksa (session, number) {
      this.periksaDialog = !this.periksaDialog
      this.axios.get(this.baseUrl + '/api/ambil-hasil-pemeriksaan-normal?sesiSoal' + session + '&tipeTest' + this.testType + '&nomorTest' + number)
        .then(response => {
          console.log(response)
        }).catch(e => {
          console.log(e)
        })
    },
    getDetail (id) {
      this.detailDialog = !this.detailDialog
      this.axios.get(this.baseUrl + '/api/ambil-detil-data-test-normal?idTest=' + id)
        .then(response => {
          this.dataDetail = response.data.map(a => {
            return {
              nomor_soal: a.nomor_soal,
              index_jawaban: a.index_jawaban,
              jawaban: a.jawaban,
              jawaban_terakhir: a.jawaban_terakhir === '1' ? 'Ya' : 'Tidak'
            }
          })
        }).catch(e => {
          console.log(e)
        })
    },
    getSummary (id) {
      this.testId = id
      this.summaryDialog = !this.summaryDialog
      this.axios.get(this.baseUrl + '/api/ambil-data-test?idUser=' + id + '&tipeTest=' + this.testType + '&tglAwal=' + new Date(this.startDate).getTime() + '&tglAkhir=' + new Date(this.endDate).getTime())
        .then(response => {
          console.log(response)
          this.summaryData = response.data.map(a => {
            return {
              catatan_pemeriksa: a.catatan_pemeriksa,
              catatan_yang_mengesahkan: a.catatan_yang_mengesahkan,
              id_test: a.id_test,
              id_user: a.id_user,
              jenis_kelamin: a.jenis_kelamin,
              jenjang_pendidikan: a.jenjang_pendidikan,
              nama_pemeriksa: a.nama_pemeriksa,
              nama_user: a.nama_user,
              nama_yang_mengesahkan: a.nama_yang_mengesahkan,
              nomor_test: a.nomor_test,
              sesi: a.sesi,
              tanggal_lahir: a.tanggal_lahir,
              tanggal_pengesahan: a.tanggal_pengesahan,
              tanggal_periksa: a.tanggal_periksa,
              tanggal_test: a.tanggal_test,
              tempat_lahir: a.tempat_lahir,
              waktu: a.waktu
            }
          })
        }).catch(e => {
          console.log(e)
        })
    },
    getData () {
      this.axios.get(this.baseUrl + '/api/ambil-data-peserta')
        .then(response => {
          this.users = response.data.map(a => {
            return {
              name: a.nama_user,
              birthdate: a.tanggal_lahir,
              birthplace: a.tempat_lahir,
              gender: a.jenis_kelamin === '1' ? 'Laki-laki' : 'Perempuan',
              education: a.jenjang_pendidikan,
              email: a.email,
              detail: a.id_user,
              status: a.aktif === '1' ? 'Aktif' : 'Tidak Aktif'
            }
          })
          this.loading = false
        }).catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
