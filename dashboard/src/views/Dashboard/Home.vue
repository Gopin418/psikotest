<template lang="html">
  <div class="">
    <v-row>
      <v-col v-for="(card, index) in cards" :key="index">
        <v-card dark :color="card.color">
          <v-card-title>
            {{ card.title }}
          </v-card-title>
          <v-card-text>
            {{ card.value }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <v-card class="pa-6" outlined>
          <barChart :data="chartTarafKecerdasan" :height="200" />
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card class="pa-6" outlined>
          <p class="text-center">Test yang sering digunakan</p>
          <polarChart :data="chartTestDigunakan" :height="255" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import barChart from '../../components/chart/Bar.vue'
import polarChart from '../../components/chart/PolarArea.vue'

export default {
  components: {
    barChart,
    polarChart
  },
  data () {
    return {
      chartTarafKecerdasan: {
        labels: ['<79', '80-89', '90-109', '110-119', '120-129', '>130'],
        datasets: [
          {
            label: 'Taraf Kecerdasan Pengguna Test',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [2, 12, 32, 56, 42, 17]
          }
        ]
      },
      chartTestDigunakan: {
        labels: ['IST', 'Pauli', 'CFIT', 'RMIB'],
        datasets: [
          {
            label: 'Test yang sering digunakan',
            data: [161, 82, 76, 63],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      cards: [
        { title: 'Tes Aktif', value: '2', color: 'primary' },
        { title: 'Tes Tersedia', value: '4', color: 'primary' },
        { title: 'Pengguna', value: '156', color: 'primary' },
        { title: 'Tes Diselesaikan', value: '323', color: 'primary' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
