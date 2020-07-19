<template lang="html">
  <div class="">
      <div v-for="instruction in instructions" :key="instruction.questions[0].answer">
        <p class="text-h5 font-weight-bold">Instruksi:</p>
        <p> <pre>{{ instruction.instruction }}</pre> </p>
        <br>
        <div v-for="question in instruction.questions" :key="question.title">
          <div v-show="current == question.number">
            <p class="font-weight-bold">{{ question.title }}</p>
            <p v-if="testNumber == 5">{{ question.question }}</p>
            <pre v-if="testNumber == 6" class="text-h6 text-center">{{ question.question }}</pre>
            <v-row>
              <v-checkbox v-for="i in 10" :key="i" class="mx-auto" :label="i != 10 ? i.toString() : '0'"></v-checkbox>
            </v-row>
            <br><br>
            <p>{{ question.answers.hint + ' ' + question.answers.answer}}</p>
            <p>{{ question.answers.message }}</p>
            <v-row class="mx-10" v-if="testNumber == 5 || testNumber == 6">
              <v-checkbox v-for="i in 10" :key="i"
              class="mx-auto"
              :input-value="i == $store.state.numAnswers[0][current - 1][0]
              || i == $store.state.numAnswers[0][current - 1][1]
              || i - 10 == $store.state.numAnswers[0][current - 1][0]
              || i - 10 == $store.state.numAnswers[0][current - 1][1]"
              readonly
              :label="i != 10 ? i.toString() : '0'"></v-checkbox>
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
    instructions () {
      return this.$store.state.instructionData
    },
    numAnswers () {
      return this.$store.state.numAnswers
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
