<script type="text/javascript">
import { PolarArea } from 'vue-chartjs'

export default {
  extends: PolarArea,
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
