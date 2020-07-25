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
                <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
              <v-card-text>
                <v-stepper :value="step">
                  <v-stepper-items elevation="0">
                    <v-stepper-content step="1">
                      <v-row>
                        <v-col>
                          <v-text-field
                           dense
                           outlined
                           type="email"
                           persistent-hint
                           hint="Gunakan alamat email aktif yang sering dipakai"
                           label="Alamat Email"
                           required
                           v-model="user.email"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                            outlined
                            :type="type"
                            label="Kata Sandi"
                            persistent-hint
                            hint="Gunakan 8 karakter atau lebih"
                            dense
                            v-model="user.password"></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                            outlined
                            :type="type"
                            label="Konfirmasi Kata Sandi"
                            dense
                            v-model="confirmation"></v-text-field>
                        </v-col>
                        <v-col cols="1" class="pa-0">
                          <v-btn icon @click="reveal()">
                            <v-icon>mdi-{{ icon }}-outline</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                      <v-row class="mt-1">
                        <v-col class="py-0">
                          <v-text-field
                            label="Nama Lengkap"
                            name="name"
                            outlined
                            dense
                            color="primary"
                            type="text"
                            v-model="user.fullname"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="7" class="py-0">
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
                      </v-row>
                      <v-row>
                        <v-col cols="7" class="py-0">
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
                            :items="educations"
                            label="Jenjang Pendidikan"
                            outlined
                            v-model="user.education"
                            dense></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6" class="py-0">
                          <v-select
                            :items="['Laki-laki', 'Perempuan']"
                            label="Jenis Kelamin"
                            outlined
                            @change="gender"
                            dense></v-select>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  class="text-capitalize"
                  @click="step === 1 ? $router.push('/') : back()">{{ step === 1 ? 'Sudah punya akun' : 'Kembali' }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  color="primary"
                  class="text-capitalize px-8 py-5"
                  @click="step === 1 ? next() : register()">{{ step === 1 ? 'Selanjutnya' : 'Daftar' }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      color="primary"
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      backendUrl: process.env.VUE_APP_BACKEND_URL,
      educations: ['Sekolah Dasar', 'Sekolah Lanjutan Tingkat Pertama', 'Sekolah Lanjutan Tingkat Atas', 'Diploma', 'Strata 1', 'Strata 2', 'Strata 3'],
      modal: false,
      step: 1,
      type: 'password',
      icon: 'eye-off',
      subtitle: 'Buat akun dan lanjutkan ke PSI',
      user: {
        fullname: '',
        city: '',
        birthdate: '',
        education: '',
        gender: '',
        email: '',
        password: ''
      },
      confirmation: ''
    }
  },
  watch: {
    modal (value) {
      value && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    reveal () {
      switch (this.type) {
        case 'password':
          this.type = 'text'
          this.icon = 'eye'
          break
        case 'text':
          this.type = 'password'
          this.icon = 'eye-off'
          break
        default:
          this.type = 'password'
          this.icon = 'eye-off'
      }
    },
    gender (gender) {
      if (gender === 'Laki-laki') {
        this.user.gender = 1
      } else if (gender === 'Perempuan') {
        this.user.gender = 2
      }
    },
    back () {
      this.step -= 1
      this.subtitle = 'Buat akun dan lanjutkan ke PSI'
    },
    next () {
      this.step += 1
      this.subtitle = this.user.email
    },
    register () {
      this.user.birthdate = new Date(this.user.birthdate).getTime()
      axios.post(this.backendUrl + '/api/auth/registrasi', this.user)
        .then(response => {
          // expected 201 code before redirect to Login page
          if (response.data.messages.code === 201) {
            this.$router.push('/login')
          } else {
            console.log(response.data.messages.message)
          }
        }).catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="css" scoped>
.v-stepper, .v-stepper__content {
  padding: 0;
  box-shadow: none;
}

</style>
