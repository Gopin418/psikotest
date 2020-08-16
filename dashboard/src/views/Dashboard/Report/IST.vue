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
                <td class="px-4 text-center">{{ data.rw }}</td>
                <td class="px-4 text-center">{{ data.sw }}</td>
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
                <td v-for="(text, indexes) in body" :key="indexes"><span v-if="text !== 'check'">{{ text }}</span> <v-icon v-if="text === 'check'">mdi-{{ text }}</v-icon></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
  data () {
    return {
      dataTest: [
        { text: 'SW', rw: 13, sw: 111 },
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
            data: [111, 116, 106, 96, 109, 111, 126, 108, 116]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 70,
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
      represent: {
        title: ['No', 'Uraian', 'SR', 'RD', 'RT', 'DR', 'TG', 'ST'],
        body: [
          ['1', 'Kemampuan untuk membuat penilaian terhadap realitas konkrit, tanggap terhadap suatu permasalahan.', '', '', '', 'check', '', ''],
          ['2', 'Kemampuan dalam menerima, mengolah informasi yang diterima.', '', '', '', 'check', '', ''],
          ['3', 'Kemampuan analisa untuk melihat keterkaitan, pola hubungan sebab akibat, dan menganalogikan dalam permasalahan baru. Ada kelincahan berpikir.', '', '', 'check', '', '', ''],
          ['4', 'Kemampuan untuk mengungkapkan gagasan dalam bentuk konseptual; berpikir logis melalui bahasa.', '', '', 'check', '', '', ''],
          ['5', 'Kemampuan untuk mengingat suatu informasi, ada atensi, minat terhadap informasi.', '', '', 'check', '', '', ''],
          ['6', 'Kemampuan berhitung praktis dan berpikir logis; ketepatan dalam mengambil keputusan, menyelesaikan masalah.', '', '', '', 'check', '', ''],
          ['7', 'Kemampuan berhitung ritmis, aritmatis, konsentrasi, mampu melihat serangkaian peristiwa.', '', '', '', '', 'check', ''],
          ['8', 'Kemampuan mengintegrasikan pengetahuan/info yang dimiliki, mampu mengambil intisari masalah; komprehensif.', '', '', 'check', '', '', ''],
          ['9', 'Kemampuan untuk membayangkan persoalan yang abstrak, kemampuan antisipasi.', '', '', '', 'check', '', '']
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
