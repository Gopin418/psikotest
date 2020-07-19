<template lang="html">
  <div class="">
      <div v-for="instruction in instructions" :key="instruction.questions[0].answer">
        <p class="text-h5 font-weight-bold">Instruksi:</p>
        <p> <pre>{{ instruction.instruction }}</pre> </p>
        <br>
        <div v-for="question in instruction.questions" :key="question.title">
          <div v-show="current == question.number">
            <p class="font-weight-bold">{{ question.title }}</p>

            <v-row>
              <v-col>
                <p class="text-h5 text-center pt-3">{{ question.question }}</p>
              </v-col>
              <v-col>
                <v-text-field
                  label="Jawaban"
                  name="answer"
                  outlined
                  color="primary"
                  :value="question.answers.answer"
                  readonly
                  autofocus
                  type="text"
                ></v-text-field>
              </v-col>
            </v-row>

            <br><br>
            <p>{{ question.answers.hint }}</p>
            <p>{{ question.answers.message }}</p>

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
