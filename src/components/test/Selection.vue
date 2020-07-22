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
            :value="selection"></v-radio>
          </v-radio-group>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
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
