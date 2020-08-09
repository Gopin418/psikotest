<script type="text/javascript">
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data'],
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRation: false
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
