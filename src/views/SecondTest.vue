<template lang="html">
  <div class="">
    <Header/>
    <v-row class="mx-5">
      <v-col :class="col % 2 === 0 ? 'pt-11' : ''" class="text-center" v-for="col in 40" :key="col">
        <div v-if="col % 2 === 0">
          <v-row v-for="row in 11" :key="row">
            <v-col class="pa-0 mb-1">
              <v-text-field
              autofocus
              class="ma-0 pa-0"
              color="primary"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row v-for="row in 12" :key="row">
            <v-col class="text-center"> {{ Math.floor(Math.random() * 9) + 1 }} </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="css" scoped>
</style>
