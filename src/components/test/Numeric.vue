<template lang="html">
  <div class="">
    <div v-for="questions in questions" :key="questions.timer">
      <div v-for="question in questions.questions" v-show="current == question.number" :key="question.num">
      <p class="font-weight-bold">Soal {{ question.number }}</p>
      <p v-if="testNumber == 5">{{ question.question }}</p>
      <p v-if="testNumber == 6" class="text-center text-h6">{{ question.question }}</p>
      <v-row class="mx-10">
        <v-checkbox v-for="i in 10" :key="i"
          class="mx-4"
          :label="i != 10 ? i.toString() : '0'"
          @change="answers(question.number, i, $event)"
          ></v-checkbox>
      </v-row>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      answersData: []
    }
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
  },
  created () {
    this.$root.$refs.numericAnswer = this
  },
  methods: {
    answers (number, answer, event) {
      this.answersData.push([number, answer, event])
      this.$store.commit('saveAnswer', this.answersData)
    },
    reset () {
      this.$store.commit('resetAnswer')
      this.answersData = []
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
