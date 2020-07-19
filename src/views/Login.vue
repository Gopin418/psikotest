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
                    label="Nama"
                    name="name"
                    outlined
                    color="primary"
                    v-model="user.name"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Nomor Peserta"
                    name="user_number"
                    outlined
                    color="primary"
                    v-model="user.user_number"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  depressed
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
      user: {
        name: '',
        user_number: ''
      },
      instruction: [
        [true, 120],
        [true, 120],
        [true, 120],
        [true, 120],
        [true, 120],
        [true, 120],
        [true, 120],
        [true, 120],
        [true, 120]
      ]
    }
  },
  mounted () {
    this.$cookies.remove('instruction')
  },
  methods: {
    save () {
      this.$cookies.set('user', this.user)
      this.$cookies.set('instruction', JSON.stringify(this.instruction))
      this.$store.commit('instructionReset', this.instruction)
      this.$store.commit('questionsDataReset')
      this.$store.commit('resetCurrent')
      this.$store.commit('testReset')
      this.$store.commit('instructionDataReset')
      this.$router.push('first-test')
      this.user = {
        name: '',
        user_number: ''
      }
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
