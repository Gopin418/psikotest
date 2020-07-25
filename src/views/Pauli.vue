<template lang="html">
  <div class="">
    <Header/>
    <Timer class="fixed" v-show="show" />
    <v-container fluid>
      <v-card class="scroll mx-auto px-4" outlined max-height="900" max-width="1300">
        <v-row>
          <v-col v-for="(a, index) in this.pauli" :key="index">
            <table>
              <tr v-for="(i, indexes) in a" :key="indexes">
                <td height="57" class="py-3">{{ i }}</td>
                <td rowspan="10" v-if="indexes === 0">
                  <table width="50" class="my-4">
                    <tr v-for="(x, indexing) in 9" :key="indexing" class="spaceUnder">
                      <td>
                        <v-text-field maxlength="1" @keyup="keyUp(a[indexing], a[x], $event.target.value)" class="pa-0" outlined dense></v-text-field>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="430">
      <v-card>
        <v-card-title class="headline">
          <p class="mx-auto">Tes Pauli</p>
        </v-card-title>
        <v-card-text class="text-center">Diberi waktu 15 menit untuk mengerjakan test.</v-card-text>
        <v-card-actions>
          <v-btn class="text-capitalize font-weight-regular mt-2"
          @click="startTest()"
          large
          color="primary"
          depressed
          block>Mulai Tes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Header from '../components/Header'
import Timer from '../components/Timer'

import axios from 'axios'

export default {
  components: {
    Header,
    Timer
  },
  data () {
    return {
      backendUrl: process.env.VUE_APP_BACKEND_URL,
      answers: [],
      show: false,
      dialog: true,
      pauli: [],
      answersData: {
        test_type: 'pauli',
        test_number: 1,
        upper_number: [],
        bottom_number: [],
        answers: []
      }
    }
  },
  created () {
    var pauli = []
    for (var i = 0; i < 50; i++) {
      for (var x = 0; x < 10; x++) {
        pauli.push(Math.floor(Math.random() * 9) + 1)
      }
      this.pauli.push(pauli)
      pauli = []
    }
  },
  computed: {
    counter () {
      return this.$store.state.timer
    }
  },
  watch: {
    counter (newCount, oldCount) {
      if (newCount === 59) {
        axios.post(this.backendUrl + '/api/answer', this.answerData)
          .then(() => {
            this.answersData.test_number += 1
            this.answersData.upper_number = []
            this.answersData.bottom_number = []
            this.answersData.answers = []
          }).catch(e => {
            console.log(e)
          })
      }
    }
  },
  methods: {
    timer () {
      setTimeout(() => {
        this.answers = []
        this.time()
      }, 10000)
    },
    time () {
      setTimeout(() => {
        this.answers = []
        this.timer()
      }, 10000)
    },
    keyUp (upper, bottom, answer) {
      for (var i = 0; i < 10; i++) {
        if (answer === i.toString()) {
          this.answersData.upper_number.push(upper)
          this.answersData.bottom_number.push(bottom)
          this.answersData.answers.push(answer)
        }
      }
      console.log(this.answersData)
    },
    startTest () {
      this.dialog = false
      this.$root.$refs.timer.timeSet()
    }
  }
}
</script>

<style lang="css" scoped>
/deep/ .v-input__slot {
  margin-bottom: 0 !important;
}
/deep/ .v-text-field__details {
  display: none !important;
}
tr.spaceUnder>td {
  padding-bottom: 8px;
  padding-top: 10px;
}

.fixed {
  position: fixed
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.scroll {
  overflow-y: none !important;
  overflow-x: scroll !important;
}

.row {
  flex-wrap: nowrap;
}
</style>
