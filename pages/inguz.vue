<template>
  <main>
    <line-chart class="chart-section line-chart" />
  </main>
</template>

<script>
import LineChart from '@/components/misc/Inguz/LineChart';

export default {
  components: { LineChart },
};
</script>

<style scoped lang="sass">
main
  max-width: 960px
  width: 100vw
  padding: 48pt 0
  margin: 0 auto
  > .chart-section
    + .chart-section
      margin-top: 48pt
@media screen and (max-width: 768px)
  main
    width: 100vw
    padding: 24pt
    box-sizing: border-box
</style>
