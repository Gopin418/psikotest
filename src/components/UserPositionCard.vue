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
        <div v-show="this.currentInstruction[0] == true && this.rememberStatus == false">
          <p class="text-h6 font-weight-regular">Instruksi</p>
          <v-row class="mx-0">
            <v-col cols="2" class="pa-1" v-for="i in this.$store.state.instructionLength" :key="i">
              <v-btn
              class="mx-auto"
              :outlined="i == current"
              :color="i == current ? 'primary' : 'white'"
              @click="move(i+1)"
              fab depressed>{{ i }}</v-btn>
            </v-col>
          </v-row>
        </div>

        <div v-show="this.currentInstruction[0] == false">
          <p class="text-h6 font-weight-regular">Soal</p>
          <div v-for="question in questions" :key="question.timer">
            <v-row class="mx-0">
              <v-col cols="2" class="pa-1" v-for="i in question.questions" :key="i.number">
                <v-btn
                :outlined="i.number == current"
                :color="i.number == current ? 'primary' : 'white'"
                @click="move(i.number+1)"
                fab depressed>{{ i.number }}</v-btn>
              </v-col>
            </v-row>
          </div>
        </div>
        <v-btn class="text-capitalize font-weight-regular mt-2" @click="startTest()" v-show="currentInstruction[0] == true" :disabled="current < 2 && this.rememberStatus == false" large color="primary" depressed block>Mulai Tes</v-btn>
        <v-btn class="text-capitalize font-weight-regular mt-2"
        @click="testNumber === 9 ? finish() : nextTest()"
        color="primary"
        large
        depressed
        v-show="currentInstruction[0] == false" :disabled="current == this.$store.state.numbers[1] ? false : true"
        block>{{ this.$store.state.testNumber === 9 ? 'Selesai' : 'Lanjut ke IST ' + this.next }}</v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="430">
      <v-card>
        <v-card-title class="headline">Waktu Habis!</v-card-title>
        <v-card-text>Waktu yang diberikan untuk memahami instruksi telah habis, silahkan mulai tes sekarang.</v-card-text>
        <v-card-actions>
          <v-btn class="text-capitalize font-weight-regular mt-2"
          @click="startTest()"
          v-show="currentInstruction[0] == true"
          :disabled="this.rememberStatus == true"
          large
          color="primary"
          depressed
          block>Mulai Tes</v-btn>

          <v-btn class="text-capitalize font-weight-regular mt-2"
          @click="testNumber === 9 ? finish() : nextTest()"
          color="primary"
          large
          depressed
          v-show="currentInstruction[0] == false"
          block>{{ this.$store.state.testNumber === 9 ? 'Selesai' : 'Lanjut ke IST ' + this.next }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      currentInstruction: [],
      dialog: false,
      instruction: [],
      timeOption: [],
      next: 0,
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  created () {
    axios.get(this.baseUrl + '/json/cfit/' + this.testNumber + '/instruction.json')
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
    this.instruction = JSON.parse(this.$cookies.get('instruction'))
    this.currentInstruction.push(this.instruction[0])
    this.currentInstruction = this.currentInstruction.flat()
    setTimeout(() => {
      const timer = setInterval(() => {
        this.$store.commit('setTime', moment(this.date.subtract(1, 'seconds')))
        this.time = this.date.format('mm:ss')
        if (this.time === '00:00') {
          clearInterval(timer)
          this.dialog = true
        }
      }, 1000)
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
    getData () {
      axios.get(this.baseUrl + '/json/cfit/' + this.testNumber + '/instruction.json')
        .then(response => {
          this.$store.commit('instructionDataUpdate', response.data)
          this.$store.commit('numAnswersUpdate', response.data)
          this.timeOption = this.instructions.map(x => {
            return x.timer
          })
        }).catch(e => {
          console.log(e)
        })

      axios.get(this.baseUrl + '/json/cfit/' + this.testNumber + '/test.json')
        .then(response => {
          this.$store.commit('questionsDataUpdate', response.data)
        }).catch(e => {
          console.log(e)
        })
    },
    timeSet (time) {
      this.$store.commit('setTime', moment(time[0] / 60, 'minutes'))
      this.time = this.date.format('mm:ss')
      setTimeout(() => {
        const timer = setInterval(() => {
          this.$store.commit('setTime', moment(this.date.subtract(1, 'seconds')))
          this.time = this.date.format('mm:ss')
          if (this.time === '01:50') {
            clearInterval(timer)
            this.dialog = true
          }
        }, 1000)
      }, 1000)
    },
    startTest () {
      this.dialog = false
      this.timeSet(this.timeOption)
      if (this.testNumber === 9 && this.rememberStatus === true) {
        this.$store.commit('rememberDisable')
        this.getData()
      } else {
        this.currentInstruction[0] = false
        this.$cookies.set('instruction', JSON.stringify(this.instruction))
        this.$store.commit('instructionUpdate', this.instruction)
        this.$store.commit('move', this.numbers[0])
        this.$store.commit('instructionLocalUpdate')
      }
    },
    nextTest () {
      this.dialog = false
      this.$store.commit('moveTest')
      this.timeSet(this.timeOption)
      if (this.testNumber === 9) {
        this.$store.commit('startRemember')
      } else {
        this.getData()
      }

      if (this.testNumber === 9 && this.rememberStatus === false) {
        this.$store.commit('rememberEnable')
      } else if (this.testNumber === 9 && this.rememberStatus === true) {
        this.$store.commit('rememberDisable')
        this.getData()
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
