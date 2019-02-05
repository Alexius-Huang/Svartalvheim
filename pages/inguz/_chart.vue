<template>
  <section class="chart-wrapper" :class="{ hide: !chartType }">
    <div class="inner-wrapper">
      <line-chart  v-if="chartType === 'line-chart'"       />
      <donut-chart v-else-if="chartType === 'donut-chart'" />
      <bar-chart   v-else-if="chartType === 'bar-chart'"   />
      <heat-map    v-else-if="chartType === 'heat-map'"    />
    </div>
  </section>
</template>

<script>
import LineChart from '@/components/misc/Inguz/LineChart';
import DonutChart from '@/components/misc/Inguz/DonutChart';
import BarChart from '@/components/misc/Inguz/BarChart';
import HeatMap from '@/components/misc/Inguz/HeatMap';

export default {
  components: { LineChart, DonutChart, BarChart, HeatMap },
  computed: {
    chartType() { return this.$route.params.chart },
  },
};
</script>

<style scoped lang="sass">
@import '../../sass/helpers.sass'
@import '../../sass/colors.sass'
@import '../../sass/shared.sass'

section.chart-wrapper
  background-color: $grey-900
  position: fixed
  left: 0
  right: 0
  top: 0
  width: 100vw
  height: 100vh
  overflow: auto
  margin: 0 auto
  font-size: 0
  opacity: 1
  transition: .25s
  padding-bottom: 72pt
  &.hide
    opacity: 0
    pointer-events: none
    transition: .25s
  > div.inner-wrapper
    padding: 48pt 0
    width: 960px
    margin: 0 auto

@media screen and (max-width: 960px)
  section.chart-wrapper
    width: 100vw

    > div.inner-wrapper
      width: 100vw
      padding: 48pt 24pt
      box-sizing: border-box
</style>
