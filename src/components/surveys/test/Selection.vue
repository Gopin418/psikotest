<template lang="html">
  <div class="">
    <div v-for="questions in questions" :key="questions.timer">
      <div v-for="question in questions.questions" v-show="current === question.number" class="" :key="question.number">
      <p class="font-weight-bold">Soal {{ question.number }}</p>
      <v-row v-for="(selection, index) in question.question_marks" :key="index">
        <v-col class="py-6 pb-0">
          <p>{{ selection }}</p>
        </v-col>
        <v-col cols="2" class="pb-0">
          <v-select
            label="Urutan"
            dense
            chips
            color="primary"
            @change="answering(question.number, $event, index)"
            :items="numbers"></v-select>
        </v-col>
      </v-row>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      answers: [],
      answersData: [],
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  computed: {
    current () {
      return this.$store.state.current
    },
    testNumber () {
      return this.$store.state.testNumber
    },
    questions () {
      return this.$store.state.questions
    },
    test () {
      return this.$store.state.testType
    },
    instruction () {
      return this.$store.state.instructionStatus
    }
  },
  mounted () {
    axios.get(this.baseUrl + '/json/' + this.test + '/' + this.testNumber + '/test.json')
      .then(response => {
        this.$store.commit('questionsDataUpdate', response.data)
      }).catch(e => {
        console.log(e)
      })
    console.log(this.answersData)
  },
  watch: {
    current (oldValue, newValue) {
      if (this.instruction === false && oldValue > 1) {
        this.answersData.push(this.answers)
        this.$store.commit('saveAnswer', this.answersData)
        console.log(this.answersData)
      }
    }
  },
  methods: {
    answering (number, answer, index) {
      index += 1
      if (this.answers[0] !== this.current) {
        this.answers = []
        for (var x = 0; x < 13; x++) {
          if (x === 0) {
            this.answers.push(number)
          } else {
            this.answers.push(null)
          }
        }
        for (var n = 1; n < this.answers.length; n++) {
          if (n === index) {
            this.answers[n] = answer
          }
        }
      } else if (this.answers[0] === this.current) {
        for (var i = 1; i < this.answers.length; i++) {
          if (i === index) {
            this.answers[i] = answer
          }
        }
      }
      console.log(this.answers)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="css" scoped>
pre {
   font-family: "Roboto";
   white-space: pre-wrap;
   white-space: -moz-pre-wrap;
   white-space: -pre-wrap;
   white-space: -o-pre-wrap;
   word-wrap: break-word;
}
</style>
