<template lang="html">
  <div class="">
    <p class="text-h6">Bank Soal</p>
    <v-row>
      <v-col v-for="(test, index) in tests" :key="index" cols="2">
        <v-card height="200" outlined>
          <v-card-title>Test {{ test }}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card height="200" outlined>
          <v-card-title>Buat Test Baru</v-card-title>
          <v-card-text class="text-center">
            <v-btn class="my-auto" icon outlined color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <p class="text-h6">Bank Kunci Jawaban</p>
    <v-row>
      <v-col cols="2">
        <v-card height="200" outlined hover @click="$router.push({ name: 'Create Answers' })">
          <v-card-title>Kunci Jawaban Baru</v-card-title>
          <v-card-text class="text-center">
            <v-btn class="my-auto" icon outlined color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tests: ['IST', 'CFIT', 'RMIB', 'PAULI']
    }
  }
}
</script>

<style lang="css" scoped>
</style>
