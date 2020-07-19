<template lang="html">
  <div class="">
    <v-card class="mb-2" outlined>
      <v-card-title class="pb-0">
        <p class="mx-auto font-weight-thin text-h2">I S T</p>
      </v-card-title>
      <v-card-text class="text-center pt-0 pb-0">
        <p class="font-weight-regular text-h6">Soal {{ numbers[0] }} - {{ numbers[1] }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      questions: []
    }
  },
  computed: {
    testNumber () {
      return this.$store.state.testNumber
    },
    numbers () {
      return this.$store.state.numbers
    }
  }
}
</script>

<style lang="css" scoped>
</style>
