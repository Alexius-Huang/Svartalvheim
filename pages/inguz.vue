<template>
  <main>
    <section class="left">
      <div class="title-wrapper">
        <h1 class="title">Visualizations</h1>
      </div>
    </section><!--

 --><section class="chart-grid">
      <div class="chart" @click="inspectChartDetail('line-chart')">
        <img class="chart-bg" :src="imgs.lineChart" alt="Line Chart" />
        <span class="label">Line Chart <img class="icon" :src="icons.chevronRight" /></span>
      </div><!--
   --><div class="chart" @click="inspectChartDetail('donut-chart')">
        <img class="chart-bg" :src="imgs.donutChart" alt="Donut Chart" />
        <span class="label">Donut Chart <img class="icon" :src="icons.chevronRight" /></span>
      </div><!--
   --><div class="chart" @click="inspectChartDetail('bar-chart')">
        <img class="chart-bg" :src="imgs.barChart" alt="Bar Chart" />
        <span class="label">Bar Chart <img class="icon" :src="icons.chevronRight" /></span>
      </div><!--
   --><div class="chart" @click="inspectChartDetail('heat-map')">
        <img class="chart-bg" :src="imgs.heatMap" alt="Heat Map" />
        <span class="label">Heat Map <img class="icon" :src="icons.chevronRight" /></span>
      </div>
    </section>

    <nuxt-child />
  </main>
</template>

<script>
import lineChartImg from '@/assets/inguz/line-chart-bg.gif';
import donutChartImg from '@/assets/inguz/donut-chart-bg.gif';
import barChartImg from '@/assets/inguz/bar-chart-bg.gif';
import heatMapImg from '@/assets/inguz/heat-map-bg.gif';
import chevronRight from '@/assets/icons/material/chevron-right-main.svg';

export default {
  data() {
    return {
      imgs: {
        lineChart: lineChartImg,
        donutChart: donutChartImg,
        barChart: barChartImg,
        heatMap: heatMapImg,
      },
      icons: {
        chevronRight,
      },
    };
  },
  methods: {
    inspectChartDetail(type) {
      this.$router.push({
        name: 'inguz-chart',
        params: { chart: type },
      });
    },
  },
};
</script>

<style scoped lang="sass">
@import '../sass/colors.sass'
@import '../sass/helpers.sass'
@import '../sass/shared.sass'

main
  position: relative
  width: 100vw
  font-size: 0

  > section.left
    position: absolute
    left: 0
    top: 0
    font-size: 0
    width: calc(100% - 720px)
    height: 100vh
    padding: 24pt 24pt 0 24pt
    box-sizing: border-box
    overflow-y: auto
    @include title-style

  > section.chart-grid
    position: absolute
    right: 0
    top: 0
    width: 720px
    height: 100vh
    font-size: 0
    overflow-y: auto
    > .chart
      cursor: pointer
      font-size: 0
      vertical-align: top
      display: inline-block
      width: 360px
      height: 360px
      box-sizing: border-box
      position: relative
      overflow: hidden

      &:after
        content: ''
        position: absolute
        width: 100%
        height: 100%
        left: 0
        top: 0
        opacity: 0
        background-image: linear-gradient(to top, transparentize($yellow-500, .88) 0%, transparent 33.3%)
        transition: .25s

      > img.chart-bg
        width: 100%
        height: 100%
        object-fit: cover
        opacity: .72
        transition: .25s
      > span.label
        position: absolute
        display: inline-block
        font-family: $base-font-family
        font-size: 24pt
        color: white
        right: -100%
        bottom: 10pt
        transition: .25s
        > img.icon
          width: 24pt
          height: 24pt
          vertical-align: middle
          display: inline-block

      &:hover
        > img.chart-bg
          opacity: .48
          transition: .25s
        > span.label
          right: 10pt
          transition: .25s
      &:hover:after
        opacity: 1
        transition: .25s

  > .chart-section
    position: fixed

@media screen and (max-width: 1080px)
  main
    width: 100vw
    > section.left
      position: relative
      width: 100%
      height: auto
      display: inline-block
    > section.chart-grid
      position: relative
      display: inline-block
      width: 100%
      height: auto
      margin-top: 48pt

      > .chart
        width: 33.3%
        height: 200pt
        > img.chart-bg
          opacity: .48
          transition: .25s
        > span.label
          right: 10pt
          transition: .25s
        &:after
          opacity: 1
          transition: .25s

@media screen and (max-width: 768px)
  main
    width: 100vw
    box-sizing: border-box
    > section.left
      > div.title-wrapper
        > h1.title
          height: 40pt
          line-height: 40pt
          font-size: 30pt
    > section.chart-grid
      > .chart
        width: 50%
        > span.label
          font-size: 20pt

@media screen and (max-width: 426px)
  main
    > section.left
      > div.title-wrapper
        > h1.title
          height: 30pt
          line-height: 30pt
          font-size: 24pt
    > section.chart-grid
      > .chart
        height: 150pt
        > span.label
          font-size: 16pt
</style>