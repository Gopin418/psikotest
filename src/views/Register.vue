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
                <v-stepper :value="11">
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
                        <v-col>
                          <v-text-field
                           dense
                           outlined
                           type="text"
                           persistent-hint
                           hint="Gunakan nomor telepon aktif"
                           label="Nomor Telepon"
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
                            :return-value.sync="date"
                            persistent
                            width="290px">
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model="date"
                                label="Tanggal lahir"
                                outlined
                                readonly
                                dense
                                v-bind="attrs"
                                v-on="on"></v-text-field>
                              </template>
                              <v-date-picker
                              ref="picker"
                              v-model="date"
                              scrollable
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">Batal</v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(date)">Simpan</v-btn>
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
                      <v-row>
                        <v-col cols="6" class="py-0">
                          <v-text-field
                          label="Suku Bangsa"
                          name="bangsa"
                          outlined
                          dense
                          color="primary"
                          type="text"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6" class="py-0">
                          <v-text-field
                          label="Agama"
                          name="religion"
                          outlined
                          dense
                          color="primary"
                          type="text"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-textarea
                          label="Alamat"
                          name="address"
                          outlined
                          dense
                          auto-grow
                          min-height="100"
                          color="primary"
                          type="text"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Nama"
                          name="father_name"
                          outlined
                          dense
                          type="text"
                          color="primary"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6" class="py-0">
                          <v-select
                            :items="educations"
                            label="Jenjang Pendidikan"
                            outlined
                            dense></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-textarea
                          label="Alamat"
                          name="address"
                          outlined
                          dense
                          auto-grow
                          min-height="100"
                          color="primary"
                          type="text"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="4">
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Nama"
                          name="mother_name"
                          outlined
                          dense
                          type="text"
                          color="primary"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6" class="py-0">
                          <v-select
                            :items="educations"
                            label="Jenjang Pendidikan"
                            outlined
                            dense></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-textarea
                          label="Alamat"
                          name="address"
                          outlined
                          dense
                          auto-grow
                          min-height="100"
                          color="primary"
                          type="text"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="5">
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Kelas"
                          name="current_class"
                          outlined
                          dense
                          type="text"
                          color="primary"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Asal Sekolah"
                          name="current_school"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class='py-0'>
                          <v-text-field
                          label="Cita-cita"
                          name="goals"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-textarea
                          label="Alasan"
                          name="reason"
                          type="text"
                          color="primary"
                          row-height="24"
                          rows="1"
                          dense
                          outlined
                          auto-grow
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Keinginan jurusan yang diambil"
                          name="major_hope"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Jurusan harapan orang tua"
                          name="parent_major_dream"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <p>Agar kami mendapatkan informasi, boleh kah kamu ceritakan bagaimana cara kamu belajar sejauh ini? (Cara mana yang paling menggambarkan kamu) Pilih min. 2 jawaban</p>
                          <v-row>
                            <v-col class='py-0'>
                              <v-card height="145" outlined>
                                <v-card-text>
                                  Belajar sambil berjalan-jalan atau menggerakkan tangan.
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col class='py-0'>
                              <v-card height="145" outlined>
                                <v-card-text>
                                  Belajar dengan membayangkan materi di dalam kepala.
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col class='py-0'>
                              <v-card height="145" outlined>
                                <v-card-text>
                                  Belajar dengan membaca keras-keras / melafalkan.
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                          <v-row justify="space-around">
                            <v-checkbox class="mx-auto" label=""></v-checkbox>
                            <v-checkbox class="mx-auto" label=""></v-checkbox>
                            <v-checkbox class="mx-auto" label=""></v-checkbox>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Adakah waktu khusus untuk belajar"
                          name="special_study_time"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Berapa lama waktu yang digunakan untuk belajar"
                          name="study_time"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-row>
                            <v-col class="py-0">
                              <v-card outlined>
                                <v-card-text>
                                  Sebutkan 3 matapelajaran yang disukai
                                  <v-row class="mt-4">
                                    <v-col class="py-0">
                                      <v-text-field
                                      name="like"
                                      type="text"
                                      color="primary"
                                      outlined
                                      dense></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col class="py-0">
                                      <v-text-field
                                      name="like"
                                      type="text"
                                      color="primary"
                                      outlined
                                      dense></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col class="py-0">
                                      <v-text-field
                                      name="like"
                                      type="text"
                                      color="primary"
                                      outlined
                                      dense></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col class="py-0">
                              <v-card outlined>
                                <v-card-text>
                                  Sebutkan 3 matapelajaran yang tidak disukai
                                  <v-row class="mt-4">
                                    <v-col class="py-0">
                                      <v-text-field
                                      name="like"
                                      type="text"
                                      color="primary"
                                      outlined
                                      dense></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col class="py-0">
                                      <v-text-field
                                      name="like"
                                      type="text"
                                      color="primary"
                                      outlined
                                      dense></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col class="py-0">
                                      <v-text-field
                                      name="like"
                                      type="text"
                                      color="primary"
                                      outlined
                                      dense></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row class="mt-8">
                        <v-col class="py-0">
                          <v-text-field
                          label="Pada pelajaran apa anda mendapatkan nilai bagus? berapa?"
                          name="best_subject"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Pada pelajaran apa anda mendapatkan nilai kurang baik? berapa?"
                          name="underscore_subject"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Apakah anda mengikuti bimbingan belajar?"
                          name="course"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Sudah berapa lama anda mengikuti bimbingan belajar tersebut? (Kosongkan jika tidak ada)"
                          name="course_time"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Apakah anda mengikuti kursus bahasa?"
                          name="language_course"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Sudah berapa lama anda mengikuti kursus bahasa tersebut? (Kosongkan jika tidak ada)"
                          name=""
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="6">
                      <v-row>
                        <v-col class="py-0">
                          SD
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Nama Sekolah"
                          name="school_name"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Kota"
                          name="school_city"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Periode"
                          name="years"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          SLTP/SMP
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Nama Sekolah"
                          name="school_name"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Kota"
                          name="school_city"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Periode"
                          name="years"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          SMA/SMK/MA*
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Nama Sekolah"
                          name="school_name"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Kota"
                          name="school_city"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Periode"
                          name="years"
                          type="text"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Jika sudah lulus SMA apa prioritas anda?"
                          name="aftergrade_priority"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-2">
                          <p>Pilihan Jurusan atau karir</p>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Pilihan 1"
                          name="choices"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Pilihan 2"
                          name="choices"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Pilihan 3"
                          name="choices"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="7">
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Jenis Kursus"
                          name="course_type"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Tempat (Kota)"
                          name="course_city"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Lamanya"
                          name="course_years"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Instansi"
                          name="course_instance"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="8">
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Jenis Organisasi"
                          name="organization_type"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Jabatan"
                          name="organization_jabatan"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Tempat (Kota)"
                          name="organization_city"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                        <v-col class="py-0">
                          <v-text-field
                          label="Lamanya"
                          name="organization_years"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="9">
                      <v-row>
                        <v-col class="py-0">
                          <v-card outlined>
                            <v-card-text>
                              Olahraga
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                        <v-col class="py-0">
                          <v-card outlined>
                            <v-card-text>
                              Kesenian
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="10">
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Kegemaran / Hobi"
                          name="hobby"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Cita-cita"
                          name="dreams"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Saya anak ke"
                          name="child_on"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Apakah saudara pernah sakit keras?"
                          name="heavy_sickness"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Jika Ya, penyakit apa?"
                          name="sickness"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Bilamana Ya, Tahun kapan?"
                          name="sickness_year"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Apa akibatnya?"
                          name="sickness_effect"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Apakah saudara pernah kecelakaan berat?"
                          name="heavy_crash"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Jika Ya, kecelakaan apa?"
                          name="crash"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Bilamana Ya, Tahun kapan?"
                          name="crash_year"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Apa akibatnya?"
                          name="crash_effect"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Apakah saudara pernah mengikuti psikotes?"
                          name="have_psikotest"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Jika Ya, dalam rangka apa?"
                          name="why_psikotest"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <v-text-field
                          label="Kapan?"
                          name="when_psikotest"
                          type="text"
                          color="primary"
                          outlined
                          dense></v-text-field>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="11">
                      <v-row>
                        <v-col class="py-0">
                          <v-card outlined>
                            <v-card-text>
                              Kelebihan
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                        <v-col class="py-0">
                          <v-card outlined>
                            <v-card-text>
                              Kekurangan
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <v-text-field
                                  label=""
                                  name=""
                                  type="text"
                                  color="primary"
                                  outlined
                                  dense></v-text-field>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
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
                  @click="step >= 1 ? back() : $router.push('/')">{{ step > 1 ? 'Kembali' : 'Sudah punya akun' }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  color="primary"
                  class="text-capitalize px-8 py-5"
                  @click="step === 9 ? register() : next()">{{ step === 9 ? 'Daftar' : 'Selanjutnya' }}</v-btn>
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

export default {
  data () {
    return {
      backendUrl: process.env.VUE_APP_BACKEND_URL,
      educations: ['Sekolah Dasar', 'Sekolah Lanjutan Tingkat Pertama', 'Sekolah Lanjutan Tingkat Atas', 'Diploma', 'Strata 1', 'Strata 2', 'Strata 3'],
      modal: false,
      step: 1,
      type: 'password',
      icon: 'eye-off',
      subtitle: [
        'Daftar Akun',
        'Identitas Diri',
        'Identitas Ayah',
        'Identitas Ibu'
      ],
      date: '',
      user: {
        fullname: '',
        city: '',
        birthdate: 0,
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
      this.axios.post(this.backendUrl + '/api/auth/registrasi', this.user)
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
