<template lang="html">
  <div class="">
    <p class="text-h6">Bank Soal</p>
    <v-row>
      <v-col v-for="(test, index) in tests" :key="index" cols="2">
        <v-card height="200" outlined>
          <v-card-title>Test {{ test }}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card height="200" outlined>
          <v-card-title>Buat Test Baru</v-card-title>
          <v-card-text class="text-center">
            <v-btn class="my-auto" icon outlined color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <p class="text-h6">Bank Kunci Jawaban</p>
    <v-row>
      <v-col v-for="(key, index) in keys" :key="index" cols="2">
        <v-card height="200" outlined hover @click="openModal(key[0])">
          <v-card-title>Test {{ key[1] }}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card height="200" outlined hover @click="$router.push({ name: 'Create Answers' })">
          <v-card-title>Kunci Jawaban Baru</v-card-title>
          <v-card-text class="text-center">
            <v-btn class="my-auto" icon outlined color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="modal" persistent width="1000" scrollable>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-btn icon dark @click="modal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Daftar Kunci Jawaban</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row v-if="type === 'ist'">
            <v-col v-for="(key, index) in listIST" :key="index" cols="2">
              <v-card height="200" outlined hover>
                <v-card-title>Test {{ key }}</v-card-title>
                <v-card-actions class="mt-12 pt-10">
                  <v-spacer></v-spacer>
                  <v-btn class="text-capitalize" text color="primary" @click="lookKey(type, key)">
                    Lihat
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="keyModal" persistent width="500" scrollable>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-btn icon dark @click="keyModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Kunci Jawaban</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col>
              <v-data-table
                :headers="keyHeader"
                :items="keyData"
                :loading="loading"
                :items-per-page="5"
                item-key="number"></v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_LOCAL_BACKEND,
      tests: ['IST', 'CFIT', 'RMIB', 'PAULI'],
      keys: [
        ['ist', 'IST'],
        ['cfit', 'CFIT']
      ],
      modal: false,
      keyModal: false,
      type: '',
      listIST: 9,
      loading: true,
      keyHeader: [
        {
          text: 'Nomor',
          value: 'number',
          align: 'right',
          width: 50
        },
        {
          text: 'Kunci Jawaban',
          value: 'keyAnswer',
          sortable: false
        },
        {
          text: 'Nilai Jawaban',
          value: 'score',
          align: 'left'
        }
      ],
      keyData: []
    }
  },
  methods: {
    openModal (type) {
      this.modal = true
      this.type = type
    },
    lookKey (type, key) {
      this.axios.get(this.baseUrl + '/api/ambil-kunci-jawaban-normal?tipeTest=' + type + '&nomorTest=' + key)
        .then(response => {
          this.keyModal = true
          this.keyData = response.data.map(a => {
            return {
              number: a.nomor_soal,
              keyAnswer: a.kunci_jawaban,
              score: a.nilai_score
            }
          })
          this.loading = false
        }).catch(e => {
          console.log(e.response.data.error)
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
