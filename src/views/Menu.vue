<template lang="html">
  <div class="">
    <Header />
    <v-container fluid class="px-10 pt-8">
      <v-row v-for="(menu, index) in menus" :key="index">
        <v-col cols="3">
          <v-card :href="menu.link" min-width="300" outlined hover>
            <v-card-text>
              <v-row>
                <v-col class="pa-0 pl-3">
                  {{ menu.title }}
                </v-col>
                <v-col class="pa-0 text-right pr-3">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
  mounted () {
    this.$cookies.remove('instruction')
    this.$store.commit('questionsDataReset')
    this.$store.commit('resetCurrent')
    this.$store.commit('testReset')
    this.$store.commit('instructionDataReset')
  },
  data () {
    return {
      menus: [
        { title: 'IST', link: '/first-test' },
        { title: 'Pauli Test', link: '/second-test' },
        { title: 'CFIT', link: '/cfit' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
