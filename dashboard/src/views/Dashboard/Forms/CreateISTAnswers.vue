<template lang="html">
  <div class="">
    <v-card outlined>
      <v-card-text>
        <p class="text-center" v-if="answersData.length < 1 && newAnswers === false">Belum Ada Kunci Jawaban</p>
        <div v-for="(x, index) in answers" :key="x">
          <v-divider v-if="x > 1"></v-divider>
          <v-row v-if="answersData.length > 0 || newAnswers === true">
            <v-col cols="2">
              <v-text-field
              label="Nomor Soal"
              name="question_number"
              outlined
              dense></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
              label="Jumlah Kunci Jawaban"
              :items="keyCount[index]"
              v-model="keys[index]"
              outlined
              @change="refresh()"
              dense></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="a in keys[index]" :key="a" cols="2">
              <v-text-field
                v-if="answersType === 'Satu'"
                :label="'Kunci ' + a"
                v-model="questionNumber[x]"
                name="answers"
                outlined
                dense></v-text-field>

                <v-textarea
                v-if="answersType === 'Banyak'"
                :label="'Kunci ' + a"
                name="answers"
                auto-grow
                outlined
                persistent-hint
                hint="Tekan Enter untuk kunci jawaban berikutnya"></v-textarea>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions v-if="newAnswers === true">
        <v-spacer></v-spacer>
        <v-btn class="text-capitalize px-8 py-5" color="primary" depressed>Simpan</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [
    'answersType',
    'answersData',
    'createAnswers'
  ],
  data () {
    return {
      keyCount: [],
      newAnswers: false,
      answers: 0,
      questionNumber: [],
      keys: []
    }
  },
  created () {
    this.$root.$refs.createIST = this
  },
  mounted () {
    for (var i = 1; i <= 20; i++) {
      var answers = []
      for (var s = 1; s <= 20; s++) {
        answers.push(s)
      }
      this.keyCount.push(answers)
    }
  },
  methods: {
    createAnswer () {
      this.newAnswers = true
      this.answers += 1
      this.refresh()
    },
    refresh () {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
