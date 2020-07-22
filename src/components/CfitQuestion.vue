<template lang="html">
  <div class="">
    <v-card outlined>
      <v-card-text>

        <div v-if="this.$store.state.currentTest == 'selection'">
          <InstructionSelection v-show="this.$store.state.instructionStatus == true"/>
          <TestSelection v-show="this.$store.state.instructionStatus == false"/>
        </div>

         <v-row v-show="this.$store.state.currentTest != 'remember'">
          <v-col class="pb-0">
            <v-btn class="text-capitalize font-weight-regular text-body-2" text
            @click="back()" v-show="current > this.$store.state.numbers[0] || current > 1 && this.$store.state.instructionStatus == true">Kembali</v-btn>
          </v-col>
          <v-col class="text-right pb-0">
            <v-btn class="text-capitalize font-weight-regular" depressed v-show="current < this.$store.state.instructionLength && this.$store.state.instructionStatus == true" color="primary"
            @click="next()">Selanjutnya</v-btn>

            <v-btn class="text-capitalize font-weight-regular" depressed v-show="current < this.$store.state.numbers[1] && this.$store.state.instructionStatus == false" color="primary"
            @click="next()">Selanjutnya</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import InstructionSelection from '../components/cfit/instruction/Selection'
import TestSelection from '../components/cfit/test/Selection'

export default {
  components: {
    InstructionSelection,
    TestSelection
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      instruction: JSON.parse(this.$cookies.get('instruction'))
    }
  },
  mounted () {
    this.$store.commit('instructionUpdate', JSON.parse(this.$cookies.get('instruction')))
  },
  computed: {
    current () {
      return this.$store.state.current
    },
    testNumber () {
      return this.$store.state.testNumber
    }
  },
  methods: {
    next () {
      this.$store.commit('next')
    },
    back () {
      this.$store.commit('back')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
