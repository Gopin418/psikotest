<script type="text/javascript">
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'options'],
  created () {
    this.$root.$refs.chartLine = this
  },
  mounted () {
    this.render()
  },
  methods: {
    render () {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>
