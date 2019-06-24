<template>
  <main>
    <section class="left">
      <div class="title-wrapper">
        <h1 class="title">Visualizations</h1>
      </div>

      <p class="main-description desktop-version">
        Hover through different chart to view its properties and click to see the detailed animations.
      </p>

      <div id="inguz-chart-info" class="info-section" v-if="chartInfo !== null">
        <template v-for="({ title: t, content: c }) in chartInfo">
          <h2 class="sub-title" :key="t">{{ t }}</h2>
          <p v-for="(paragraph, j) in c" :key="`${t}-${j}`" class="content" v-html="paragraph" />
        </template>
      </div>
    </section><!--

 --><section class="inguz-chart-grid chart-grid">
      <div
        class="chart"
        v-for="chart in charts" :key="chart"
        @click="inspectChartDetail(chart)"
      >
        <img class="chart-bg" :src="imgs[chart]" :alt="label[chart]" />
        <span
          class="label"
          @mouseover="handleShowInfo(chart)"
        >{{ label[chart] }} <img class="icon" :src="icons.chevronRight" /></span>
      </div>
    </section>

    <nuxt-child />
  </main>
</template>

<script>
import chartInfos from '@/resources/inguz/info.json';
import areaChartImg from '@/assets/inguz/area-chart-bg.gif';
import barChartImg from '@/assets/inguz/bar-chart-bg.gif';
import donutChartImg from '@/assets/inguz/donut-chart-bg.gif';
import heatMapImg from '@/assets/inguz/heat-map-bg.gif';
import lineChartImg from '@/assets/inguz/line-chart-bg.gif';
import pictogramChartImg from '@/assets/inguz/pictogram-chart-bg.gif';
import chevronRight from '@/assets/icons/material/chevron-right-main.svg';

export default {
  data() {
    return {
      chartInfos,
      chartInfo: null,
      /* Sort in alphebetical order */
      charts: [
        'area-chart',
        'bar-chart',
        'donut-chart',
        'heat-map',
        'line-chart',
        'pictogram-chart',
      ],
      chartsCamelCased: {
        'area-chart': 'areaChart',
        'bar-chart': 'barChart',
        'donut-chart': 'donutChart',
        'heat-map': 'heatMap',
        'line-chart': 'lineChart',
        'pictogram-chart': 'pictogramChart',
      },
      imgs: {
        'area-chart': areaChartImg,
        'line-chart': lineChartImg,
        'donut-chart': donutChartImg,
        'bar-chart': barChartImg,
        'heat-map': heatMapImg,
        'pictogram-chart': pictogramChartImg,
      },
      label: {
        'area-chart': 'Area Chart',
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
    handleShowInfo(chart) {
      const { chartInfos, chartsCamelCased } = this;
      this.chartInfo = chartInfos[chartsCamelCased[chart]];
    },
  },
};
</script>

<style lang="sass">
@import '../sass/colors.sass'

div#inguz-chart-info > p.content > a:link
  color: $yellow-500
  font-weight: bold
  &:visited
    color: $yellow-700
  &:hover
    color: $yellow-300
</style>

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
    padding: 24pt
    box-sizing: border-box
    overflow-y: auto
    @include title-style

    > p.main-description
      font: lighter 10pt/16pt $default-font-family
      letter-spacing: 1px
      color: white
      margin-top: 12pt

    > div.info-section
      margin-top: 24pt
      > h2.sub-title
        color: $yellow-500
        font: 16pt $base-font-family
      > p.content
        color: white
        font: lighter 10pt/16pt $default-font-family
        letter-spacing: 1px
        + p.content
          margin-top: 6pt

      > p.content + h2.sub-title
        margin-top: 18pt

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
        display: block
        text-align: right
        width: 100%
        font-family: $base-font-family
        font-size: 24pt
        color: #aaa
        position: absolute
        right: -100%
        bottom: 10pt
        transition: .25s

        > img.icon
          width: 24pt
          height: 24pt
          vertical-align: middle
          display: inline-block
          transition: .25s

        &:hover
          color: white
          transition: .25s

        &:hover > img.icon
          width: 30pt
          height: 30pt
          transition: .25s

      &::after
        content: ''
        position: absolute
        width: 100%
        height: 100%
        left: 0
        top: 0
        opacity: 0
        pointer-events: none
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
      > p.main-description.desktop-version
        display: none
      > div.info-section
        display: none
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
