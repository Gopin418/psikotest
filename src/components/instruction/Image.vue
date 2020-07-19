<template lang="html">
  <div class="">
      <div v-for="instruction in instructions" :key="instruction.questions[0].answer">
        <p class="text-h5 font-weight-bold">Instruksi:</p>
        <p> <pre>{{ instruction.instruction }}</pre> </p>
        <br>
        <div v-for="(question, number) in instruction.questions" :key="number">
          <div v-show="current == question.number">
            <p class="font-weight-bold">{{ question.title }}</p>
            <v-img width="128" :src="baseUrl + '/img/' + question.question + '.png'"></v-img>
            <v-row>
              <v-col v-for="(selection, alphabets, index) in question.question_marks" :key="index">
                <p class="text-center">{{ alphabets }}</p>
                <v-card class="py-3 text-center"
                hover
                outlined
                round
                :elevation="elevate(answers, question.number, alphabets)"
                :color="color(answers, question.number, alphabets)"
                @click.native="instructionAnswering( [alphabets, question.number], instruction.questions.length )">
                  <v-img class="mx-auto" width="120" :src="baseUrl + '/img/' + selection + '.png'"></v-img>
                </v-card>
              </v-col>
            </v-row>
            <br><br>
            <p>{{ question.answers.hint + ' ' + question.answers.answer}}</p>
            <p>{{ question.answers.message }}</p>
            <v-row>
              <v-col v-for="(selection, alphabets) in question.question_marks" :key="alphabets">
                <p class="text-center">{{ alphabets }}</p>
                <v-card class="py-3 text-center"
                outlined
                :color="question.answers.answer == alphabets ? 'primary' : ''" round
                :elevation="question.answers.answer == alphabets ? '12' : '0'">
                  <v-img class="mx-auto" width="120" :src="baseUrl + '/img/' + selection + '.png'"></v-img>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      alphabet: ['A', 'B', 'C', 'D', 'E'],
      answers: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      instructionAnswers: []
    }
  },
  computed: {
    current () {
      return this.$store.state.current
    },
    testNumber () {
      return this.$store.state.testNumber
    },
    instructions () {
      return this.$store.state.instructionData
    },
    instructionAnswer () {
      return this.$store.state.instructionAnswer
    }
  },
  mounted () {
    axios.get(this.baseUrl + '/json/' + this.testNumber + '/instruction.json')
      .then(response => {
        this.$store.commit('instructionDataUpdate', response.data)
        this.$store.commit('numAnswersUpdate', response.data)
      }).catch(e => {
        console.log(e)
      })
    this.instructionAnswers.push(this.$store.state.instrutionAnswer)
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
    instructionAnswering (data, length) {
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
