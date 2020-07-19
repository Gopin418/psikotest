<template lang="html">
  <div class="">
    <div v-for="questions in questions" :key="questions.timer">
      <div v-for="question in questions.questions" v-show="current == question.number" class="" :key="question.number">
      <p class="font-weight-bold">Soal {{ question.number }}</p>
        <v-row>
          <v-col>
            <p class="text-h5 text-center pt-3">{{ question.question }}</p>
          </v-col>
          <v-col>
            <v-text-field
              label="Jawaban"
              name="name"
              outlined
              color="primary"
              :value="question.answer"
              autofocus
              type="text"
            ></v-text-field>
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
  date () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  mounted () {
    axios.get(this.baseUrl + '/json/' + this.testNumber + '/test.json')
      .then(response => {
        this.$store.commit('questionsDataUpdate', response.data)
      }).catch(e => {
        console.log(e)
      })
  },
  computed: {
    current () {
      return this.$store.state.current
    },
    questions () {
      return this.$store.state.questions
    },
    testNumber () {
      return this.$store.state.testNumber
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
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
  color: #E0E0E0 !important
}
.v-label {
  color: #757575 !important
}
</style>
