<template lang="html">
  <div class="">
    <v-row class="pa-0">
      <Sidebar />
      <v-col cols=1>
      </v-col>
      <v-col cols=11 class="py-0">

      </v-col>
    </v-row>
  </div>
</template>

<script>
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import LineChart from '../../components/chart/Line'
import axios from 'axios'

export default {
  components: {
    Sidebar,
    LineChart,
    Header
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_LOCAL_BACKEND,
      user: [],

    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    insert (mainString, insString, pos) {
      if (typeof (pos) === 'undefined') {
        pos = 0
      }
      if (typeof (insString) === 'undefined') {
        insString = ''
      }
      return mainString.slice(0, pos) + insString + mainString.slice(pos)
    },
    getData () {
      axios.get(this.baseUrl + '/api/users')
        .then(response => {
          var name = this.$route.params.name
          for (var i = 0; i < name.length; i++) {
            if (name[i] === name[i].toUpperCase() && i !== 0) {
              var newName = this.insert(name, ' ', i)
              this.user = response.data.users.map(a => {
                if (a.first_name + ' ' + a.last_name === newName) {
                  return {
                    name: a.first_name + ' ' + a.last_name,
                    email: a.email
                  }
                }
              })
              this.user = this.user.flat()
            }
          }
        }).catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="css" scoped>
.v-sheet.v-card:not(.v-sheet--outlined) {
  z-index: 100;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
</style>
