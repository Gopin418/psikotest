<template lang="html">
  <div class="">
      <div v-for="remember in remembers" :key="remember.length">
        <p class="text-h5 font-weight-bold">Instruksi:</p>
        <p class="text-subtitle-1"> <pre>{{ remember.instruction }}</pre> </p>
        <br>
        <div v-for="rememberGroup in remember.remembers" :key="rememberGroup.title">
          <v-card outlined class="py-0 mb-3">
            <v-card-text>
              <v-btn color="primary" class="mr-4 text-capitalize" depressed readonly>{{ rememberGroup.title }}</v-btn> <span class="text-h6">:</span>
              <v-btn v-for="child in rememberGroup.remember" :key="child" class="ml-4 text-capitalize" outlined rounded color="primary" readonly>{{ child }}</v-btn>
            </v-card-text>
          </v-card>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    remembers () {
      return this.$store.state.rememberData
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
