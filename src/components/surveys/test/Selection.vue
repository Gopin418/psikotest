<template lang="html">
  <div class="">
    <div v-for="questions in questions" :key="questions.timer">
      <div v-for="question in questions.questions" v-show="current === question.number" class="" :key="question.number">
      <p class="font-weight-bold">Soal {{ question.number }}</p>
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
            :items="numbers"></v-select>
        </v-col>
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
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      answers: [],
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
    questions () {
      return this.$store.state.questions
    },
    test () {
      return this.$store.state.testType
    }
  },
  mounted () {
    this.axios.get(this.baseUrl + '/json/' + this.test + '/' + this.testNumber + '/test.json')
      .then(response => {
        this.$store.commit('questionsDataUpdate', response.data)
      }).catch(e => {
        console.log(e)
      })
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
    answering (data, length) {
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
