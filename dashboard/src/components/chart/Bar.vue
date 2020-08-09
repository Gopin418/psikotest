<script type="text/javascript">
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
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
