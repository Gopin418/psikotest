<template lang="html">
  <div class="">
    <v-card outlined>
      <v-card-text>
        <p class="text-h5 font-weight-bold">Instruksi:</p>
        <p>Soal-soal 01-20 terdiri atas kalimat kalimat.<br>
          Pada setiap kalimat satu kata hilang dan disediakan 5 (lima) kata pilihan sebagai penggantinya.<br>
          Pilihlah kata yang tepat yang dapat menyempurnakan kalimat itu!
        </p>
        <br>
        <p>Silahkan kerjakan contoh soal dibawah ini:</p>
        <p class="font-weight-bold">Contoh 0{{ current+1 }}</p>
        <div v-for="question in questions" class="" :key="question.id">
          <p v-show="current === question.id">{{ question.text }}</p>
          <form class="answer" action="index.html" method="post">
            <v-radio-group v-show="current === question.id" row>
              <v-radio v-for="selection in question.selections"
              :key="selection.id"
              :label="selection.letter + ' ' + selection.text"
              :value="selection.text"
              :color="selection.select == true ? 'primary' : 'red'"></v-radio>
            </v-radio-group>
          </form>
          <p v-for="selection in question.selections" v-show="current === question.id && selection.select == true" :key="selection.id">Jawaban yang benar ialah: <u>keledai</u> <br>
            Oleh karena itu, pada <b>soal berikutnya setelah contoh soal</b>, huruf {{ selection.letter }} yang harus dipilih
          </p>
          <v-radio-group v-model="question.row" v-show="current === question.id" row>
            <v-radio v-for="selection in question.selections"
            :key="selection.id"
            :label="selection.letter"
            value=""
            :color="selection.select == true ? 'primary' : 'red'"></v-radio>
          </v-radio-group>
        </div>
        <br>
        <v-row>
          <v-col class="pb-0">
            <v-btn class="text-capitalize font-weight-regular" text
            @click="back()" v-show="current > 0">Kembali</v-btn>
          </v-col>
          <v-col class="text-right pb-0">
            <v-btn class="text-capitalize font-weight-regular" depressed color="primary"
            @click="next()" v-show="current < 1">Selanjutnya</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 0,
      questions: [
        {
          id: 0,
          text: 'Seekor kuda mempunyai kesamaan terbanyak dengan seekor ......',
          selections: [
            { id: 0, letter: '(a)', text: 'kucing', select: false },
            { id: 1, letter: '(b)', text: 'bajing', select: false },
            { id: 2, letter: '(c)', text: 'keledai', select: true },
            { id: 3, letter: '(d)', text: 'lembu', select: false },
            { id: 4, letter: '(e)', text: 'anjing', select: false }
          ],
          row: 2
        },
        {
          id: 1,
          text: 'Seekor ayam tidak mempunyai kesamaan terbanyak dengan seekor ......',
          selections: [
            { id: 0, letter: '(a)', text: 'burung', select: true },
            { id: 1, letter: '(b)', text: 'angsa', select: false },
            { id: 2, letter: '(c)', text: 'bebek', select: false },
            { id: 3, letter: '(d)', text: 'kalkun', select: false },
            { id: 4, letter: '(e)', text: 'puyuh', select: false }
          ],
          row: 0
        }
      ]
    }
  },
  methods: {
    next () {
      this.current += 1
    },
    back () {
      this.current -= 1
    }
  }
}
</script>

<style lang="css" scoped>
</style>
