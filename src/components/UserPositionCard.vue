<template lang="html">
  <div class="">
    <v-card class="mb-2" outlined>
      <v-card-title class="text-center">
        <p class="mx-auto text-h3 font-weight-light">{{ testNumber }}</p>
      </v-card-title>
    </v-card>
    <v-card class="mb-2" v-show="time != 0" outlined>
      <v-card-text class="text-center font-weight-light text-h3">{{ time }}</v-card-text>
    </v-card>
    <v-card outlined>
      <v-card-text>
        <div v-show="this.instruction[this.testNumber-1][0] == true && this.rememberStatus == false">
          <p class="text-h6 font-weight-regular">Instruksi</p>
          <v-btn v-for="i in this.$store.state.instructionLength"
          :key="i"
          :outlined="i == current"
          :color="i == current ? 'primary' : 'white'"
          @click="move(i+1)"
          class="mr-2"
          fab depressed>{{ i }}</v-btn>
        </div>

        <div v-show="this.instruction[this.testNumber-1][0] == false">
          <p class="text-h6 font-weight-regular">Soal</p>
          <div v-for="question in questions" :key="question.timer">
            <v-btn v-for="i in question.questions"
            :key="i.number"
            :outlined="i.number == current"
            :color="i.number == current ? 'primary' : 'white'"
            @click="move(i.number+1)"
            class="mr-2"
            fab depressed>{{ i.number }}</v-btn>
          </div>
        </div>
        <v-btn class="text-capitalize font-weight-regular mt-2" @click="startTest()" v-show="instruction[testNumber-1][0] == true" :disabled="current < 2 && this.rememberStatus == false" large color="primary" depressed block>Mulai Tes</v-btn>
        <v-btn class="text-capitalize font-weight-regular mt-2"
        @click="testNumber === 9 ? finish() : nextTest()"
        color="primary"
        large
        depressed
        v-show="instruction[testNumber-1][0] == false" :disabled="current == this.$store.state.numbers[1] ? false : true"
        block>{{ this.$store.state.testNumber === 9 ? 'Selesai' : 'Lanjut ke IST ' + this.next }}</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  data () {
    return {
      jump: 0,
      time: 0,
      instruction: [],
      timeOption: [],
      next: 0,
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  created () {
    this.instruction = JSON.parse(this.$cookies.get('instruction'))
    axios.get(this.baseUrl + '/json/' + this.testNumber + '/instruction.json')
      .then(response => {
        this.$store.commit('instructionDataUpdate', response.data)
        this.timeOption = this.instructions.map(x => {
          return x.timer
        })
        this.$store.commit('setTime', moment(this.timeOption[0] / 60, 'minutes'))
        this.time = this.date.format('mm:ss')
      }).catch(e => {
        console.log(e)
      })
  },
  mounted () {
    this.next = this.testNumber + 1
    setTimeout(() => {
      const timer = setInterval(() => {
        this.$store.commit('setTime', moment(this.date.subtract(1, 'seconds')))
        this.time = this.date.format('mm:ss')
      }, 1000)

      setTimeout(() => {
        clearInterval(timer)
      }, 121 * 1000)
    }, 1000)
  },
  computed: {
    date () {
      return this.$store.state.timer
    },
    current () {
      return this.$store.state.current
    },
    testNumber: {
      get () {
        return this.$store.state.testNumber
      }
    },
    numbers () {
      return this.$store.state.numbers
    },
    questions () {
      return this.$store.state.questions
    },
    instructions () {
      return this.$store.state.instructionData
    },
    rememberStatus () {
      return this.$store.state.rememberStatus
    }
  },
  methods: {
    move (i) {
      this.jump = i - 1
      this.$store.commit('move', this.jump)
    },
    startTest () {
      if (this.testNumber === 9 && this.rememberStatus === true) {
        this.$store.commit('rememberDisable')
        axios.get(this.baseUrl + '/json/' + this.testNumber + '/instruction.json')
          .then(response => {
            this.$store.commit('instructionDataUpdate', response.data)
            this.$store.commit('numAnswersUpdate', response.data)
          }).catch(e => {
            console.log(e)
          })

        axios.get(this.baseUrl + '/json/' + this.testNumber + '/test.json')
          .then(response => {
            this.$store.commit('questionsDataUpdate', response.data)
          }).catch(e => {
            console.log(e)
          })
      } else {
        this.instruction[this.testNumber - 1][0] = false
        this.$cookies.set('instruction', JSON.stringify(this.instruction))
        this.$store.commit('instructionUpdate', this.instruction)
        this.$store.commit('move', this.numbers[0])
        this.$store.commit('instructionLocalUpdate')
      }
    },
    nextTest () {
      this.$store.commit('moveTest')
      if (this.testNumber === 9) {
        this.$store.commit('startRemember')
      } else {
        axios.get(this.baseUrl + '/json/' + this.testNumber + '/instruction.json')
          .then(response => {
            this.$store.commit('instructionDataUpdate', response.data)
            this.$store.commit('numAnswersUpdate', response.data)
            this.timeOption = this.instructions.map(x => {
              return x.timer
            })
            this.$store.commit('setTime', moment(this.timeOption[0] / 60, 'minutes'))
            this.time = this.date.format('mm:ss')
          }).catch(e => {
            console.log(e)
          })

        axios.get(this.baseUrl + '/json/' + this.testNumber + '/test.json')
          .then(response => {
            this.$store.commit('questionsDataUpdate', response.data)
          }).catch(e => {
            console.log(e)
          })
      }

      if (this.testNumber === 9 && this.rememberStatus === false) {
        this.$store.commit('rememberEnable')
      } else if (this.testNumber === 9 && this.rememberStatus === true) {
        this.$store.commit('rememberDisable')
        axios.get(this.baseUrl + '/json/' + this.testNumber + '/instruction.json')
          .then(response => {
            this.$store.commit('instructionDataUpdate', response.data)
            this.$store.commit('numAnswersUpdate', response.data)
          }).catch(e => {
            console.log(e)
          })

        axios.get(this.baseUrl + '/json/' + this.testNumber + '/test.json')
          .then(response => {
            this.$store.commit('questionsDataUpdate', response.data)
          }).catch(e => {
            console.log(e)
          })
      }
    },
    finish () {
      this.$cookies.remove('user')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
