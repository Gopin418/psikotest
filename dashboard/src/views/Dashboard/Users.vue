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
            <v-btn
                small
                color="primary"
                rounded
                @click="getSummary(item)"
                :key="item.detail"
                :disabled="testType !== '' && startDate !== '' && endDate !== '' ? false : true"
                depressed>Lihat hasil test</v-btn>
          </template>
          <template v-slot:item.status="{ item }">
            <span :class="(item.status === 'Aktif' ? 'light-green--text text-accent-3' : 'red--text') + ' font-weight-medium'"><v-icon :color="item.status === 'Aktif' ? 'light-green accent-4' : 'red'" xs>mdi-circle-medium</v-icon>{{ item.status }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="summaryDialog" width="980" scrollable persistent transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-btn icon dark @click="summaryDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Ringkasan IST</v-toolbar-title>
        </v-toolbar>
         <v-card-text class="pt-6">
         <v-card outlined>
            <v-card-text>
              <table>
                <tr>
                  <td>Nomor</td>
                  <td class="px-4">:</td>
                  <td>{{ biodata.detail }}</td>
                </tr>
                <tr>
                  <td>Nama Lengkap</td>
                  <td class="px-4">:</td>
                  <td>{{ biodata.name }}</td>
                </tr>
                <tr>
                  <td>Tempat, Tanggal Lahir</td>
                  <td class="px-4">:</td>
                  <td>{{ biodata.birthplace + ', ' + biodata.birthdate }}</td>
                </tr>
                <tr>
                  <td>Jenis Kelamin</td>
                  <td class="px-4">:</td>
                  <td>{{ biodata.gender }}</td>
                </tr>
                <tr>
                  <td>Pendidikan</td>
                  <td class="px-4">:</td>
                  <td>{{ biodata.education }}</td>
                </tr>
                <tr>
                  <td>Tanggal Test</td>
                  <td class="px-4">:</td>
                  <td>
                    <v-row>
                      <v-col cols="8">
                        <v-select
                          label="Tanggal Test"
                          :items="testDate"
                          outlined
                          dense></v-select>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
          <ISTReport :testType="testType" :startDate="startDate" :endDate="endDate" :user="biodata" v-if="testType === 'ist'" />
          <PauliReport v-if="testType === 'pauli'" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-divider></v-divider>
  </div>
</template>

<script>
import ISTReport from './Report/IST.vue'
import PauliReport from './Report/Pauli.vue'

export default {
  components: {
    ISTReport,
    PauliReport
  },
  data () {
    return {
      summaryDialog: false,
      detailDialog: false,
      periksaDialog: false,
      userId: '',
      testNumber: '',
      testId: '',
      testSession: '',
      testDate: ['23 Juli 2020', '31 Agustus 2019'],
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
      sesi: '',
      biodata: [],
      dataPeriksa: [],
      sliceDataUser: [],
      sliceDataSummary: [],
      error: '',
      hasilPeriksa: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getPeriksa (session, number) {
      this.periksaDialog = !this.periksaDialog
      this.axios.get(this.baseUrl + '/api/ambil-hasil-pemeriksaan-normal?sesiSoal=' + session + '&tipeTest=' + this.testType + '&nomorTest=' + number)
        .then(response => {
          this.hasilPeriksa = response.data
        }).catch(e => {
          this.error = e.response.data.error
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
    getSummary (data) {
      this.biodata = data
      this.testId = data.detail
      this.summaryDialog = !this.summaryDialog
    },
    getData () {
      this.axios.get(this.baseUrl + '/api/ambil-data-peserta')
        .then(response => {
          var month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
          this.users = response.data.map(a => {
            return {
              name: a.nama_user,
              birthdateEpoch: a.tanggal_lahir,
              birthdate: new Date(a.tanggal_lahir).getDate() + ' ' + month[new Date(a.tanggal_lahir).getMonth()] + ' ' + new Date(a.tanggal_lahir).getFullYear(),
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
