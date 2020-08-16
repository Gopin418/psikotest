<template lang="html">
  <div class="">
    <v-row>
      <v-col cols="8">
        <LineChart :data="data" :options="options" :height="200"/>
      </v-col>
      <v-col>
        <table border="1">
          <tr>
            <td></td>
            <td class="text-center">RW</td>
            <td class="text-center">SW</td>
          </tr>
          <tr v-for="(data, index) in dataTest" :key="index">
            <td class="px-4 text-center">{{ data.text }}</td>
            <td class="px-4 text-center">{{ data.rw }}</td>
            <td class="px-4 text-center">{{ data.sw }}</td>
          </tr>
        </table>
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
      }
    }
  }
}
</script>

<style lang="css" scoped>
.chartRW {
  position: relative;
  margin-left: 8px;
  margin-top: -208px;
}
</style>
