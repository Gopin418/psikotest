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
            md="5"
          >
            <v-card class="rounded-lg pa-2" outlined>
                <v-card-title>Buat Akun</v-card-title>
                <v-card-subtitle>Buat akun dan lanjutkan ke PSI</v-card-subtitle>
              <v-card-text>
                <v-form class="pt-4">
                  <v-row>
                    <v-col class="py-0">
                      <v-text-field
                        label="Nama Depan"
                        name="firstName"
                        outlined
                        dense
                        autofocus
                        color="primary"
                        type="text"
                        v-model="user.firstName"
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0">
                      <v-text-field
                        label="Nama Belakang"
                        name="lastName"
                        outlined
                        dense
                        color="primary"
                        type="text"
                        v-model="user.lastName"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="py-0">
                      <v-text-field
                        label="Tempat Lahir"
                        name="city"
                        outlined
                        dense
                        color="primary"
                        type="text"
                        v-model="user.city"
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="5">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="user.birthdate"
                        persistent
                        width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="user.birthdate"
                            label="Tanggal lahir"
                            outlined
                            readonly
                            dense
                            v-bind="attrs"
                            v-on="on"></v-text-field>
                          </template>
                          <v-date-picker
                          ref="picker"
                          v-model="user.birthdate"
                          scrollable
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">Batal</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(user.birthdate)">Simpan</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" class="py-0">
                      <v-select
                        :items="['Laki-laki', 'Perempuan']"
                        label="Jenis Kelamin"
                        outlined
                        v-model="user.gender"
                        dense></v-select>
                    </v-col>
                  </v-row>
                  <p>Email dan kata sandi akun</p>
                  <v-row>
                    <v-col class="pt-0">
                      <v-text-field
                       dense
                       outlined
                       type="email"
                       persistent-hint
                       hint="Gunakan alamat email aktif yang sering dipakai"
                       label="Alamat Email"
                       v-model="user.email"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0">
                      <v-text-field
                        outlined
                        type="password"
                        label="Kata Sandi"
                        persistent-hint
                        hint="Gunakan 8 karakter atau lebih"
                        dense
                        v-model="user.password"></v-text-field>
                    </v-col>
                    <v-col class="py-0">
                      <v-text-field
                        outlined
                        type="password"
                        label="Konfirmasi Kata Sandi"
                        dense
                        v-model="user.password"></v-text-field>
                    </v-col>
                    <v-col cols="1" class="pa-0">
                      <v-btn icon>
                        <v-icon>mdi-eye-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  href="/login"
                  class="text-capitalize">Sudah punya akun</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  depressed
                  class="text-capitalize px-8 py-5">Daftar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      modal: false,
      user: {
        firstName: '',
        lastName: '',
        city: '',
        birthdate: '',
        gender: '',
        email: '',
        password: ''
      }
    }
  },
  watch: {
    modal (value) {
      value && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    register () {
      axios.post('localhost:8000/api/register', this.user)
        .then(response => {
          // expected 201 code before redirect to Login page
          if (response.messages.code === 201) {
            this.$router.push('login')
          } else {
            console.log(response.messages.message)
          }
        }).catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
