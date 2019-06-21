<template>
  <main>
    <section class="left">
      <div class="title-wrapper">
        <h1 class="title">Visualizations</h1>
      </div>
    </section><!--

 --><section class="inguz-chart-grid chart-grid">
      <div
        class="chart"
        v-for="chart in charts" :key="chart"
        @click="inspectChartDetail(chart)"
      >
        <img class="chart-bg" :src="imgs[chart]" :alt="label[chart]" />
        <span class="label">{{ label[chart] }} <img class="icon" :src="icons.chevronRight" /></span>
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
import pictogramChartImg from '@/assets/inguz/pictogram-chart-bg.gif';
import chevronRight from '@/assets/icons/material/chevron-right-main.svg';

export default {
  data() {
    return {
      charts: ['line-chart', 'donut-chart', 'bar-chart', 'heat-map', 'pictogram-chart'],
      imgs: {
        'line-chart': lineChartImg,
        'donut-chart': donutChartImg,
        'bar-chart': barChartImg,
        'heat-map': heatMapImg,
        'pictogram-chart': pictogramChartImg,
      },
      label: {
        'line-chart': 'Line Chart',
        'donut-chart': 'Donut Chart',
        'bar-chart': 'Bar Chart',
        'heat-map': 'Heat Map',
        'pictogram-chart': 'Pictogram Chart',
      },
      icons: { chevronRight },
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

      > img.chart-bg
        width: 100%
        height: 100%
        object-fit: cover
        opacity: .72
        transition: .25s

      > span.label
        display: inline-block
        font-family: $base-font-family
        font-size: 24pt
        color: white
        position: absolute
        right: -100%
        bottom: 10pt
        transition: .25s
        > img.icon
          width: 24pt
          height: 24pt
          vertical-align: middle
          display: inline-block

      &::after
        content: ''
        position: absolute
        width: 100%
        height: 100%
        left: 0
        top: 0
        opacity: 0
        background-image: linear-gradient(to top, transparentize($yellow-500, .88) 0%, transparent 33.3%)
        transition: .25s

      &:hover
        > img.chart-bg
          opacity: .48
          transition: .25s
        > span.label
          right: 10pt
          transition: .25s
      &:hover::after
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
          font-size: 18pt
          right: 10pt
          transition: .25s
        &:after
          opacity: 1
          transition: .25s

@media screen and (max-width: 768px)
  main
    width: 100vw
    box-sizing: border-box
    > section.left > div.title-wrapper > h1.title
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
    > section.left > div.title-wrapper > h1.title
      height: 30pt
      line-height: 30pt
      font-size: 24pt
    > section.chart-grid
      > .chart
        height: 150pt
        > span.label
          font-size: 14pt
</style>
