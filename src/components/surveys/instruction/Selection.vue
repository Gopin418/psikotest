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
                  v-model="question.answers.answer[index]"
                  :items="question.answers.answer"></v-select>
              </v-col>
            </v-row>
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
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      answer: []
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
