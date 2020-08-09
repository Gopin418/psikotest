<template lang="html">
  <div class="">
    <v-row>
      <v-col>
        <p>{{ user }}</p>
        <v-divider></v-divider>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_LOCAL_BACKEND,
      user: this.$session.get('userName'),
      items: [
        {
          text: 'Dashboard',
          disabled: true
        },
        {
          text: this.$route.name,
          disabled: true
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
