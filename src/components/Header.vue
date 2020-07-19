<template>
  <div>
    <v-app-bar
      color="#FFF"
      class="px-4 outline-bottom"
      flat
    >

      <v-toolbar-title>Psikotest Online</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn depressed color="primary" class="mr-4">{{ user[0].name }} / {{ user[0].user_number }}</v-btn>

      <v-btn @click="logout()" icon>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('saveUser', this.$cookies.get('user'))
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$cookies.remove('user')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
.outline-bottom {
  border-bottom: 1px solid #E0E0E0 !important
}
</style>
