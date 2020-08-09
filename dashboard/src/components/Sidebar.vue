<template lang="html">
  <div class="" style="height:100vh">
    <v-navigation-drawer
      class="pl-5 pr-6"
      color="primary"
      :width="200"
      v-model="drawer"
      fixed
    >

    <div class="mt-16 pt-4">
      <div class="mt-16">
        <v-list>
          <v-list-item v-for="item in items" :key="item.title">
            <v-btn :class="item.id == 1 ? 'mt-16' : 'mt-6'" color="white" @click="$router.push({ name: item.page })" outlined fab>
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>

        <v-list>
          <v-list-item class="mt-16">
            <v-btn class="mt-16" color="white" @click="logout()" outlined fab>
              <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>

      </div>
    </div>

    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        { id: 1, title: 'Home', icon: 'mdi-home-outline', page: 'Home' },
        { id: 2, title: 'My Account', icon: 'mdi-file-document', page: 'Question Bank' },
        { id: 3, title: 'Users', icon: 'mdi-account-group-outline', page: 'User List' }
      ],
      mini: true
    }
  },
  methods: {
    logout () {
      this.$session.remove('token')
      this.$router.push({ name: 'login' })
    },
    open (page) {
      this.$store.commit('switch', page)
      this.$cookies.set('lastPage', page)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
