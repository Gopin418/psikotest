<template lang="html">
  <div>
    <v-row class="pa-0">
      <Sidebar />
      <v-col cols=1>
      </v-col>
      <v-col class="py-0">
        <v-card class="ml-4 pa-6 pr-10 elevation-12" absolute width="100%" height="100%">
          <v-row>
            <v-col>
              <Header />
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default {
  components: {
    Sidebar,
    Header
  }
}
</script>

<style lang="css" scoped>
.v-sheet.v-card:not(.v-sheet--outlined) {
  z-index: 100;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
</style>
