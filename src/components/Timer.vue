<template lang="html">
  <div class="">
    <v-card outlined>
      <v-card-title class="pb-0">
        <p class="mx-auto font-weight-thin text-h3">{{ countdown.format('mm:ss') }}</p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      timeout: '',
      timeText: '',
      countdown: moment(60, 'minutes'),
      count: 0
    }
  },
  created () {
    this.$root.$refs.timer = this
  },
  computed: {
    counter () {
      return this.$store.state.timer
    }
  },
  methods: {
    timeSet () {
      this.timeText = this.countdown.format('mm:ss')
      this.timeout = setInterval(() => {
        this.count += 1
        this.$store.commit('setTime', this.count)
        this.countdown = moment(this.countdown).subtract(1, 'seconds')
        this.timeText = this.countdown.format('mm:ss')
        if (this.counter === 180) {
          this.count = 0
          this.$store.commit('setTime', 0)
        }
        if (this.timeText === '00:00') {
          clearInterval(this.timout)
          this.countdown = moment(60, 'minutes')
        }
      }, 1000)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
