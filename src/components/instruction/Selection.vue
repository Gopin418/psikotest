<template lang="html">
  <div class="">
      <div v-for="instruction in instructions" :key="instruction.questions[0].answer">
        <p class="text-h5 font-weight-bold">Instruksi:</p>
        <p> <pre>{{ instruction.instruction }}</pre> </p>
        <br>
        <div v-for="question in instruction.questions" :key="question.title">
          <div v-show="current == question.number">
            <p class="font-weight-bold">{{ question.title }}</p>
            <p>{{ question.question }}</p>
            <v-radio-group row>
              <v-radio v-for="selection in question.question_marks"
              :key="selection"
              :label="selection"
              :value="selection"
              :color="selection == question.answers.answer ? 'primary' : 'red'"></v-radio>
            </v-radio-group>
            <br><br>
            <p>{{ question.answers.hint + ' ' + question.answers.answer}}</p>
            <p>{{ question.answers.message }}</p>
            <v-radio-group v-model="question.answers.answer" row>
              <v-radio v-for="selection in question.question_marks"
              :key="selection"
              :label="selection"
              :value="selection"
              :color="selection == question.answers.answer ? 'primary' : 'red'"
              readonly></v-radio>
            </v-radio-group>
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
    }
  },
  mounted () {
    axios.get(this.baseUrl + '/json/' + this.testNumber + '/instruction.json')
      .then(response => {
        this.$store.commit('instructionDataUpdate', response.data)
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
