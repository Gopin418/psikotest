<template lang="html">
  <div class="">
    <Header />
    <v-container fluid class="px-10 pt-8">
      <v-row v-for="(menu, index) in menus" :key="index">
        <v-col cols="3">
          <v-card @click="testSelect(menu.type, menu.link)" min-width="300" outlined hover>
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
        { title: 'IST', type: 'ist', link: '/ist' },
        { title: 'Pauli Test', type: 'pauli', link: '/pauli' },
        { title: 'CFIT', type: 'cfit', link: '/cfit' },
        { title: 'Kuisioner', type: 'survey', link: '/surveys' }
      ]
    }
  },
  methods: {
    testSelect (test, link) {
      this.$store.commit('setTest', test)
      this.$cookies.set('type', test)
      this.$router.push(link)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
