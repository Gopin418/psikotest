<template lang="html">
  <div class="">
    <div v-for="question in questions" v-show="current === question.id" class="" :key="question.id">
    <div class="" v-show="question.type == 'instruction'">
      <p class="text-h5 font-weight-bold">Instruksi:</p>
      <p> <pre>{{ question.instructionText }}</pre> </p>
      <br>
    </div>
    <p class="font-weight-bold" v-show="question.type == 'instruction'">Contoh 0{{ current+1 }}</p>
    <p class="font-weight-bold" v-show="question.type == 'main'">Soal 0{{ current-1 }}</p>
      <p>{{ question.text }}</p>
      <form class="answer" action="index.html" method="post">
        <v-radio-group row>
          <v-radio v-for="selection in question.selections"
          :key="selection.id"
          :label="selection.letter + ' ' + selection.text"
          :value="selection.text"
          :color="selection.select == true || question.type == 'main' ? 'primary' : 'red'"></v-radio>
        </v-radio-group>
      </form>
      <div class="" v-show="question.type == 'instruction'">
        <pre>{{ question.answerText }}</pre>
        <v-radio-group v-model="question.row" v-show="current === question.id" row>
          <v-radio v-for="selection in question.selections"
          :key="selection.id"
          :label="selection.letter"
          value=""
          readonly
          :color="selection.select == true ? 'primary' : 'red'"></v-radio>
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
    questions () {
      return this.$store.state.questions_two
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
