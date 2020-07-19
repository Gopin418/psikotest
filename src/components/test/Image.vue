<template lang="html">
  <div class="">
    <div v-for="questions in questions" :key="questions.timer">
      <div v-for="question in questions.questions" v-show="current === question.number" class="" :key="question.number">
      <p class="font-weight-bold">Soal {{ question.number }}</p>
        <v-img
        width="128"
        :src="baseUrl + '/img/' + question.question + '.png'"
        :lazy-src="baseUrl + '/img/' + question.question + '.png'"></v-img>
        <v-row>
          <v-col v-for="(selection, alphabets, index) in question.question_marks" :key="index">
            <p class="text-center">{{ alphabets }}</p>
            <v-card class="pa-1 text-center"
            hover
            outlined
            round
            :elevation="elevate(answers, question.number, alphabets)"
            :color="color(answers, question.number, alphabets)"
            @click.native="answering( [alphabets, question.number], questions.questions.length )">
              <v-img width="120" :src="baseUrl + '/img/' + selection + '.png'"></v-img>
            </v-card>
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
      alphabet: ['A', 'B', 'C', 'D', 'E'],
      answers: [],
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
    }
  },
  mounted () {
    if (this.currentTest !== 'remember') {
      axios.get(this.baseUrl + '/json/' + this.testNumber + '/test.json')
        .then(response => {
          this.$store.commit('questionsDataUpdate', response.data)
        }).catch(e => {
          console.log(e)
        })
    }
  },
  methods: {
    elevate (data, number, mark) {
      let elevate = '0'
      for (var i = 0; i < data.length; i++) {
        if (data[i][1] === number && data[i][0] === mark) {
          elevate = '12'
        }
      }
      return elevate
    },
    color (data, number, mark) {
      let color = ''
      for (var i = 0; i < data.length; i++) {
        if (data[i][1] === number && data[i][0] === mark) {
          color = 'primary'
        }
      }
      return color
    },
    answering (data, length) {
      if (this.answers.length === 0) {
        this.answers.push(data)
      } else {
        for (var i = 0; i < this.answers.length; i++) {
          if (this.answers[i][1] === data[1]) {
            this.answers[i] = data
          } else if (this.answers[i + 1] === undefined) {
            this.answers.push(data)
            if (this.answers.length > length) {
              this.answers.shift()
            }
          }
        }
      }
      this.$forceUpdate()
      console.log(this.answers)
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
