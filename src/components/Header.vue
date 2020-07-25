<template>
  <div>
    <v-app-bar
      color="#FFF"
      class="px-4 outline-bottom"
      flat
    >

      <v-toolbar-title>Psikotest Online</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn depressed color="primary" class="mr-4">{{ user[0].firstName }} / {{ user[0].userNumber }}</v-btn>

      <v-btn @click="logout()" icon>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      backendUrl: process.env.VUE_APP_BACKEND_URL
    }
  },
  created () {
    const user = {
      firstName: this.$cookies.get('name'),
      userNumber: this.$cookies.get('number')
    }

    this.$store.commit('saveUser', user)
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$cookies.remove('token')
      this.$cookies.remove('name')
      this.$cookies.remove('number')
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
