<template lang="html">
  <div class="">
    <div v-for="questions in questions" :key="questions.timer">
      <div v-for="question in questions.questions" v-show="current === question.number" class="" :key="question.number">
      <p class="font-weight-bold">Soal {{ question.number }}</p>
        <p>{{ question.question }}</p>
          <v-radio-group row>
            <v-radio v-for="selection in question.question_marks"
            :key="selection"
            :label="selection"
            @change="answers(question.number, selection)"
            :value="selection"></v-radio>
          </v-radio-group>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      answersData: [],
      currentTest: 1
    }
  },
  created () {
    this.$root.$refs.answer = this
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
    answeredData () {
      return this.$store.state.answersData
    }
  },
  methods: {
    answers (number, answer) {
      this.answersData.push([number, answer])
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
</style>
