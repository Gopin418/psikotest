<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="rounded-lg pa-2" outlined>
              <v-toolbar
                color="white"
                flat
              >
                <v-toolbar-title class="mx-auto">Masuk</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form class="pt-4">
                  <v-text-field
                    label="Email"
                    name="email"
                    outlined
                    color="primary"
                    v-model="user.email"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Kata Sandi"
                    name="password"
                    outlined
                    color="primary"
                    v-model="user.password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  depressed
                  :loading="loading"
                  class="text-capitalize"
                  @click.prevent="save">Masuk</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  props: {
    source: String
  },
  data () {
    return {
      loading: false,
      user: {
        email: '',
        password: ''
      },
      hostURL: process.env.VUE_APP_LOCAL_BACKEND
    }
  },
  methods: {
    save () {
      this.loading = true
      this.axios.post(this.hostURL + '/api/auth/login-admin', this.user)
        .then(response => {
          this.loading = false
          this.$session.set('token', response.data.token)
          this.$session.set('userName', response.data.namaUser)
          this.$router.push('dashboard')
        }).catch(e => {
          console.log(e)
          this.loading = false
        })
    }
  }
}
</script>
<style media="screen">
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
    color: #E0E0E0 !important
  }
  .v-label {
    color: #757575 !important
  }
</style>
