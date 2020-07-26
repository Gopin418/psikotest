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
                    autofocus
                    color="primary"
                    v-model="user.email"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Kata sandi"
                    name="password"
                    outlined
                    color="primary"
                    v-model="user.password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  href="/register"
                  class="text-capitalize">Buat Akun</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  depressed
                  class="text-capitalize px-8 py-5"
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
      user: {
        email: '',
        password: ''
      },
      backendUrl: process.env.VUE_APP_BACKEND_URL
    }
  },
  methods: {
    save () {
      this.axios.post(this.backendUrl + '/api/auth/login', this.user)
        .then(response => {
          console.log(response.data)
          // expected response with user profile data and session / token
          // this.$router.push('/menu')
          this.$cookies.set('token', response.data.token)
          this.$router.push('/menu')
        }).catch(e => {
          console.log(e)
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
