<template lang="html">
  <div class="">
    <Header/>
    <v-container>
      <v-row>
        <v-col v-for="a in 15" :key="a">
          <table>
            <tr v-for="i in 10" :key="i">
              <td height="57" class="py-3">{{ Math.floor(Math.random() * 9) + 1 }}</td>
              <td rowspan="10" v-if="i === 1">
                <table class="my-4">
                  <tr v-for="x in 9" :key="x" class="spaceUnder">
                    <td>
                      <v-text-field maxlength="1" @keyup="keyUp" class="pa-0" outlined dense></v-text-field>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  components: {
    Header
  },
  data () {
    return {
      answers: []
    }
  },
  mounted () {
    this.timer()
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
    keyUp (answer) {
      if (answer.keyCode >= 48 && answer.keyCode <= 57) {
        this.answers.push(answer.key)
      }
      console.log(answer.key)
      console.log(this.answers)
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
</style>
