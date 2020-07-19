<template lang="html">
  <div class="">
    <Header/>
    <v-row class="mt-8">
      <v-col class="pl-12" cols="8">
        <CfitQuestion />
      </v-col>
      <v-col class="pr-12">
        <UserPositionCard />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from '../components/Header'
import CfitQuestion from '../components/CfitQuestion'
import UserPositionCard from '../components/UserPositionCard'

export default {
  components: {
    Header,
    CfitQuestion,
    UserPositionCard
  },
  data () {
    return {
      instruction: [
        [false, 120],
        [true, 120],
        [true, 120],
        [true, 120]
      ]
    }
  },
  mounted () {
    this.$cookies.remove('instruction')
    this.$cookies.set('instruction', JSON.stringify(this.instruction))
    this.$store.commit('instructionReset', this.instruction)
    this.$store.commit('questionsDataReset')
    this.$store.commit('resetCurrent')
    this.$store.commit('testReset')
    this.$store.commit('instructionDataReset')
  }
}
</script>

<style lang="css" scoped>
</style>
