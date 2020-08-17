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
              v-model="questionNumber[index]"
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
              dense></v-select>
            </v-col>
            <v-col cols="3">
              <v-btn class="text-capitalize" color="primary" depressed @click="createKey(index, keys[index])">Buat</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(answeres, indexes) in keyAnswers[index]" :key="indexes" cols="2">
              <v-text-field
                v-if="answersType === 'Satu'"
                :label="'Kunci ' + (indexes + 1)"
                @keyup="keyAnswers[index][indexes] = $event.target.value"
                name="answers"
                outlined
                dense></v-text-field>

                <v-textarea
                v-if="answersType === 'Dua'"
                :label="'Kunci ' + (indexes + 1)"
                @keyup="keyAnswers[index][indexes] = $event.target.value"
                name="answers"
                auto-grow
                outlined
                persistent-hint
                hint="Tekan Enter untuk kunci jawaban berikutnya"></v-textarea>

                <v-text-field
                :label="'Score ' + (indexes + 1)"
                @keyup="score[index][indexes] = $event.target.value"
                name="score"
                outlined
                dense></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions v-if="newAnswers === true">
        <v-spacer></v-spacer>
        <v-btn class="text-capitalize px-8 py-5" color="primary" @click="confirmationDialog = true" depressed>Simpan</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="confirmationDialog" persistent width="400" scrollable>
      <v-card>
        <v-card-title>
          <p>Simpan Kunci Jawaban ?</p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" class="text-capitalize" @click="confirmationDialog = false">Batal</v-btn>
          <v-btn depressed color="primary" class="px-7 text-capitalize" @click="save()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: [
    'testType',
    'answersType',
    'answersData',
    'testNumber',
    'createAnswers'
  ],
  data () {
    return {
      baseUrl: process.env.VUE_APP_LOCAL_BACKEND,
      confirmationDialog: false,
      confirmationText: 'Simpan Kunci Jawaban ?',
      keyCount: [],
      keyAnswers: [],
      score: [],
      newAnswers: false,
      answers: 0,
      questionNumber: [],
      keys: [],
      keysId: [],
      data: []
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
    save () {
      this.data = [{
        id_kunci: this.keysId ? this.keysId : 0,
        tipe_test: this.testType,
        nomor_test: this.testNumber,
        tipe_kunci_jawaban: this.answersType === 'Satu' ? 1 : 2,
        nomor_soal: this.questionNumber,
        index_jawaban: 1,
        kunci_jawaban: this.keyAnswers,
        nilai_score: this.score
      }]
      this.axios.post(this.baseUrl + '/api/simpan-kunci-jawaban-normal', this.data)
        .then(response => {
          this.questionNumber = []
          this.keyAnswers = []
          this.score = []
          this.answers = 1
          this.refresh()
          this.confirmationDialog = false
        }).catch(e => {
          console.log(e)
        })
    },
    createKey (index, answers) {
      console.log(index + ' : ' + answers)
      this.keyAnswers[index] = new Array(answers)
      this.score[index] = new Array(answers)
      this.refresh()
    },
    createArray (length) {
      var arr = new Array(length || 0)
      var i = length
      if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1)
        while (i--) arr[(length - 1) - i] = this.createArray.apply(this, args)
      }
      return arr
    },
    createAnswer () {
      if (this.answersData.length < 1) {
        this.newAnswers = true
        this.answers += 1
        this.refresh()
      } else {
        for (var i = 0; i < this.answersData.length; i++) {
          this.keyAnswers[i] = new Array(this.answersData[i].kunci_jawaban)
          this.score[i] = new Array(JSON.stringify(this.answersData[i].nilai_score))
          this.keysId[i] = this.answersData[i].id_kunci_jawaban_normal
          this.questionNumber = new Array(JSON.stringify(this.answersData[i].nomor_soal))
        }
      }
      console.log(this.questionNumber)
    },
    refresh () {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
