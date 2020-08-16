<template lang="html">
  <div class="">
    <p>Buat Kunci Jawaban Baru</p>
    <v-row>
      <v-col cols="2">
        <v-select
        label="Tipe Test"
        :items="testType"
        v-model="selectedTestType"
        outlined
        dense>
        </v-select>
      </v-col>
      <v-col cols="2">
        <v-select
        label="Nomor Tes"
        :items="testNumber"
        v-model="selectedTestNumber"
        outlined
        dense></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
        label="Tipe Jawaban"
        :items="answersType"
        v-model="selectedAnswerType"
        outlined
        dense></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn class="text-capitalize"
        :disabled="selectedTestType === null || selectedTestNumber === null || selectedAnswerType === null"
        @click="show()"
        depressed
        color="primary"
        block>Tampilkan</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn class="text-capitalize"
        :disabled="selectedTestType === null || selectedTestNumber === null || selectedAnswerType === null"
        @click="$root.$refs.createIST.createAnswer()"
        depressed
        outlined
        color="primary"
        block>Tambah Jawaban</v-btn>
      </v-col>
    </v-row>
      <CreateIST v-if="selected === 'ist'"
      :answersType="selectedAnswerType"
      :testNumber="selectedTestNumber"
      :answersData="answersData"
      :testType="selected" />
      <CreateCFIT v-if="selected === 'cfit'" />
    <v-row>
    </v-row>
  </div>
</template>

<script>
import CreateIST from './Forms/CreateISTAnswers'
import CreateCFIT from './Forms/CreateCFITAnswers'

export default {
  components: {
    CreateIST,
    CreateCFIT
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_LOCAL_BACKEND,
      testNumber: [],
      selectedTestNumber: null,
      testType: ['ist', 'cfit'],
      selectedTestType: null,
      answersType: ['Satu', 'Dua'],
      selectedAnswerType: null,
      selected: null,
      answersData: []
    }
  },
  mounted () {
    for (var i = 1; i <= 20; i++) {
      this.testNumber.push(i)
    }
  },
  methods: {
    show () {
      this.selected = this.selectedTestType

      this.axios.get(this.baseUrl + '/api/ambil-kunci-jawaban-normal?tipeTest=' + this.selected + '&nomorTest=' + this.selectedTestNumber)
        .then(response => {
          this.answersData = response.data
          if (this.answersData.length > 0) {
            this.$root.$refs.createIST.createAnswer()
          }
        }).catch(e => {
          console.log(e.response.data.error)
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
