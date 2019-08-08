<template>
  <area-chart      class="chart-wrapper" v-if="chartType === 'area-chart'"           />
  <bar-chart       class="chart-wrapper" v-else-if="chartType === 'bar-chart'"       />
  <donut-chart     class="chart-wrapper" v-else-if="chartType === 'donut-chart'"     />
  <heat-map        class="chart-wrapper" v-else-if="chartType === 'heat-map'"        />
  <line-chart      class="chart-wrapper" v-else-if="chartType === 'line-chart'"      />
  <pictogram-chart class="chart-wrapper" v-else-if="chartType === 'pictogram-chart'" />
</template>

<script>
import AreaChart from '@/components/misc/Inguz/AreaChart';
import BarChart from '@/components/misc/Inguz/BarChart';
import DonutChart from '@/components/misc/Inguz/DonutChart';
import HeatMap from '@/components/misc/Inguz/HeatMap';
import LineChart from '@/components/misc/Inguz/LineChart';
import PictogramChart from '@/components/misc/Inguz/PictogramChart';

export default {
  components: {
    AreaChart,
    BarChart,
    DonutChart,
    HeatMap,
    LineChart,
    PictogramChart,
  },
  computed: {
    chartType() { return this.$route.params.chart },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/helpers.sass'
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'

.chart-wrapper
  padding: 48pt 0
  width: 960px
  margin: 0 auto

@media screen and (max-width: 960px)
  .chart-wrapper
    width: 100vw
    padding: 48pt 24pt
    box-sizing: border-box
</style>
