<template lang="html">
  <div class="">
    <v-row>
      <v-col cols="8" class="pt-12">
        <LineChart :data="data" :options="options" :height="200"/>
      </v-col>
      <v-col>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th></th>
                <th class="text-center">RW</th>
                <th class="text-center">SW</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in dataTest" :key="index">
                <td class="px-4 text-center">{{ data.text }}</td>
                <td class="px-4 text-center" v-if="index === 9">{{ totalRw }}</td>
                <td class="px-4 text-center" v-else>{{ scores[index] }}</td>
                <td class="px-4 text-center" v-if="index === 9">{{ totalSw }}</td>
                <td class="px-4 text-center" v-else>{{ sw[index] }}</td>
              </tr>
            </tbody>
            <th></th>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center" v-for="(title, index) in iqTable.title" :key="index">{{ title }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center" v-for="(text, index) in iqTable.text" :key="index">{{ text }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-simple-table class="mt-12">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center" v-for="(title, index) in represent.title" :key="index">{{ title }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(body, index) in represent.body" :key="index">
                <td v-for="(text, indexes) in body" :key="indexes"><span v-show="text !== 'check'">{{ text }}</span> <v-icon v-if="text === 'check'">mdi-{{ text }}</v-icon></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-alert color="primary" border="left" outlined>
          <v-row v-if="iqs.length < 1">
            <v-col>
              <p>Tidak Ada IQ yang dapat ditampilkan</p>
            </v-col>
          </v-row>
          <v-row v-if="iqs.length > 0">
            <v-col class="text-h5 py-1" cols="6">
              Tingkat IQ
            </v-col>
            <v-col class="text-h5 py-1">
              {{ iqs[0].iq }}
            </v-col>
          </v-row>
          <v-row v-if="iqs.length > 0">
            <v-col class="text-h5 py-1" cols="6">
              Prosentase
            </v-col>
            <v-col class="text-h5 py-1">
              {{ iqs[0].prosentase }}%
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LineChart from '../../../components/chart/Line'

export default {
  components: {
    LineChart
  },
  mounted () {
    this.$nextTick(() => {
      this.axios.get(this.baseUrl + '/api/ambil-data-test?idUser=' + this.user.detail + '&tipeTest=' + this.testType + '&tglAwal=' + new Date(this.startDate).getTime() + '&tglAkhir=' + new Date(this.endDate).getTime())
        .then(response => {
          this.sesi = response.data[0].sesi
          this.testDate = response.data[0].tanggal_test
          for (var i = 1; i < 10; i++) {
            this.axios.get(this.baseUrl + '/api/ambil-hasil-pemeriksaan-normal?sesiSoal=' + this.sesi + '&tipeTest=' + this.testType + '&nomorTest=' + i)
              .then(response => {
                this.scores.push(response.data.total_score)
                if (this.scores.length === 9) {
                  this.axios.get(this.baseUrl + '/api/ist/ambil-hasil-sw-ist-normen-ge?nilaiRw=' + this.scores[3])
                    .then(response => {
                      this.scores[3] = response.data[0].rw
                      this.$forceUpdate()
                      for (var x = 0; x < 9; x++) {
                        this.totalRw += this.scores[x]
                        if (x === 8) {
                          this.axios.get(this.baseUrl + '/api/ist/ambil-total-sw-ist?tanggalLahir=' + this.user.birthdateEpoch + '&tanggalSelesaiTest=' + this.testDate + '&nilaiRW=' + 35)
                            .then(response => {
                              this.totalSw = response.data[0].sw
                              this.axios.get(this.baseUrl + '/api/ist/ambil-hasil-sw-iq-ist?nilaiSW=' + this.totalSw)
                                .then(response => {
                                  if (response.data.length > 0) {
                                    this.iqs = response.data.map(a => {
                                      return {
                                        iq: a.iq,
                                        prosentase: a.prosentase
                                      }
                                    })
                                  }
                                }).catch(e => {
                                  console.log(e)
                                })
                            }).catch(e => {
                              console.log(e)
                            })
                        }
                        this.axios.get(this.baseUrl + '/api/ist/ambil-hasil-sw-ist?tanggalLahir=' + this.user.birthdateEpoch + '&tanggalSelesaiTest=' + this.testDate + '&mode=' + this.mode[x] + '&nilaiRW=' + this.scores[x])
                          .then(response => {
                            this.sw.push(response.data[0].sw)
                            this.data.datasets[0].data.push(response.data[0].sw)
                            this.$root.$refs.chartLine.render()
                            if (x === 9) {
                              for (var a = 0; a < 10; a++) {
                                for (var b = 0; b < this.rangeSW.length; b++) {
                                  if (this.sw[a] <= this.rangeSW[b].atas) {
                                    this.$set(this.represent.body[a], b + 2, 'check')
                                    break
                                  }
                                }
                              }
                            }
                          }).catch(e => {
                            console.log(e)
                          })
                      }
                    }).catch(e => {
                      console.log(e)
                    })
                }
              }).catch(e => {
                console.log(e)
              })
          }
        }).catch(e => {
          console.log(e)
        })
    })
  },
  props: [
    'testType',
    'startDate',
    'endDate',
    'user'
  ],
  data () {
    return {
      sesi: '',
      testDate: '',
      scores: [],
      iqs: [],
      sw: [],
      totalRw: 0,
      totalSw: 0,
      mode: ['SE', 'WA', 'AN', 'GE', 'ME', 'RA', 'ZR', 'FA', 'WU'],
      baseUrl: process.env.VUE_APP_LOCAL_BACKEND,
      dataTest: [
        { text: 'SE', rw: 13, sw: 111 },
        { text: 'WA', rw: 14, sw: 116 },
        { text: 'AN', rw: 11, sw: 106 },
        { text: 'GE', rw: 11, sw: 96 },
        { text: 'ME', rw: 14, sw: 109 },
        { text: 'RA', rw: 12, sw: 111 },
        { text: 'ZR', rw: 19, sw: 126 },
        { text: 'FA', rw: 12, sw: 108 },
        { text: 'WU', rw: 14, sw: 116 },
        { text: 'JML', rw: 120, sw: 114 }
      ],
      data: {
        labels: ['SE', 'WA', 'AN', 'GE', 'ME', 'RA', 'ZR', 'FA', 'WU'],
        datasets: [
          {
            label: 'SW',
            borderColor: 'rgba(50, 115, 220, 0.5)',
            backgroundColor: 'rgba(50, 115, 220, 0)',
            data: []
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 60,
              max: 130,
              stepSize: 10
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          display: false
        }
      },
      iqTable: {
        title: ['Sangat Rendah (SR)', 'Rendah (RD)', 'Rata-rata (RT)', 'Diatas Rata-rata (DR)', 'Tinggi (TG)', 'Sangat Tinggi (ST)'],
        text: ['Dibawah 79', '80-89', '90-109', '110-119', '120-129', '>130']
      },
      rangeSW: [
        {
          atas: 79,
          bawah: 0
        },
        {
          atas: 89,
          bawah: 80
        },
        {
          atas: 109,
          bawah: 90
        },
        {
          atas: 119,
          bawah: 110
        },
        {
          atas: 129,
          bawah: 120
        },
        {
          atas: 300,
          bawah: 130
        }
      ],
      represent: {
        title: ['No', 'Uraian', 'SR', 'RD', 'RT', 'DR', 'TG', 'ST'],
        body: [
          ['1', 'Kemampuan untuk membuat penilaian terhadap realitas konkrit, tanggap terhadap suatu permasalahan.', '', '', '', '', '', ''],
          ['2', 'Kemampuan dalam menerima, mengolah informasi yang diterima.', '', '', '', '', '', ''],
          ['3', 'Kemampuan analisa untuk melihat keterkaitan, pola hubungan sebab akibat, dan menganalogikan dalam permasalahan baru. Ada kelincahan berpikir.', '', '', '', '', '', ''],
          ['4', 'Kemampuan untuk mengungkapkan gagasan dalam bentuk konseptual; berpikir logis melalui bahasa.', '', '', '', '', '', ''],
          ['5', 'Kemampuan untuk mengingat suatu informasi, ada atensi, minat terhadap informasi.', '', '', '', '', '', ''],
          ['6', 'Kemampuan berhitung praktis dan berpikir logis; ketepatan dalam mengambil keputusan, menyelesaikan masalah.', '', '', '', '', '', ''],
          ['7', 'Kemampuan berhitung ritmis, aritmatis, konsentrasi, mampu melihat serangkaian peristiwa.', '', '', '', '', '', ''],
          ['8', 'Kemampuan mengintegrasikan pengetahuan/info yang dimiliki, mampu mengambil intisari masalah; komprehensif.', '', '', '', '', '', ''],
          ['9', 'Kemampuan untuk membayangkan persoalan yang abstrak, kemampuan antisipasi.', '', '', '', '', '', '']
        ]
      }
    }
  }
}
</script>

<style lang="css" scoped>
table th + th { border-left:1px solid #dddddd; }
table td + td { border-left:1px solid #dddddd; }
</style>
