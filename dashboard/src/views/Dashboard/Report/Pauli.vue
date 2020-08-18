<template lang="html">
  <div class="">
    <v-row>
      <v-col>
        <LineChart :data="data" :options="options" :height="100" />
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
      data: {
        labels: [],
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
              min: 1,
              max: 155,
              stepSize: 20
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
  },
  mounted () {
    for (var i = 1; i <= 60; i++) {
      if (i % 3 === 0) {
        this.data.labels.push(i + ' Menit')
        this.data.datasets[0].data.push(Math.floor((Math.random() * 150) + 1))
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
