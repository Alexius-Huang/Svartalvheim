<template>
  <section class="line-chart">
    <div class="title-wrapper">
      <h1 class="title">Line Chart</h1>
    </div>

    <article class="infos">
      <template v-for="({ title: t, content: c }) in chartInfo">
        <h2 class="title" :key="t">{{ t }}</h2>
        <p v-for="(paragraph, j) in c" :key="`${t}-${j}`" v-html="paragraph" />
      </template>

      <p><span class="tag">Physics</span> Describes the distance of travelling with respect to the velocity and with respect to the acceleration of a vehicle.</p>
      <div class="charts physics-example">
        <div class="chart">
          <p class="legend">Acceleration</p>
          <span class="x-axis" />
          <span class="y-axis" />
          <span class="x-line" v-for="i in 25" :key="`acceleration-x-${i}`" :style="{ bottom: `${10 + (80 / 25) * i}%` }" />
          <span class="y-line" v-for="i in 25" :key="`acceleration-y-${i}`" :style="{ left: `${10 + (90 / 25) * i}%` }" />

          <span class="svg-wrapper">
            <svg
              class="svg-bg physics-chart acceleration-chart"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              ref="accelerationChart" 
            >
              <path class="line-chart-path" :d="accelerationChartPath" />
            </svg>
          </span>

          <span
            class="dot"
            v-for="([x, y], i) in accelerationData"
            :key="`acceleration-data-${i}`"
            ref="accelerationDataNodes"
            :style="{
              left: `${10 + (90 / 5) * x}%`,
              bottom: `${10 + (80 / 25) * y}%`,
            }"
          />
        </div>

        <div class="chart">
          <p class="legend">Velocity</p>
          <span class="x-axis" />
          <span class="y-axis" />
          <span class="x-line" v-for="i in 25" :key="`velocity-x-${i}`" :style="{ bottom: `${10 + (80 / 25) * i}%` }" />
          <span class="y-line" v-for="i in 25" :key="`velocity-y-${i}`" :style="{ left: `${10 + (90 / 25) * i}%` }" />

          <span class="svg-wrapper">
            <svg
              class="svg-bg physics-chart velocity-chart"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              ref="velocityChart" 
            >
              <path class="line-chart-path" :d="velocityChartPath" />
            </svg>
          </span>

          <span
            class="dot"
            v-for="([x, y], i) in velocityData"
            :key="`velocity-data-${i}`"
            ref="velocityDataNodes"
            :style="{
              left: `${10 + (90 / 5) * x}%`,
              bottom: `${10 + (80 / 25) * y}%`,
            }"
          />
        </div>

        <div class="chart">
          <p class="legend">Distance Travelled</p>
          <span class="x-axis" />
          <span class="y-axis" />
          <span class="x-line" v-for="i in 25" :key="`distance-x-${i}`" :style="{ bottom: `${10 + (80 / 25) * i}%` }" />
          <span class="y-line" v-for="i in 25" :key="`distance-y-${i}`" :style="{ left: `${10 + (90 / 25) * i}%` }" />

          <span class="svg-wrapper">
            <svg
              class="svg-bg physics-chart distance-chart"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              ref="distanceChart" 
            >
              <path class="line-chart-path" :d="distanceChartPath" />
            </svg>
          </span>

          <span
            class="dot"
            v-for="([x, y], i) in distanceData"
            :key="`distance-data-${i}`"
            ref="distanceDataNodes"
            :style="{
              left: `${10 + (90 / 5) * x}%`,
              bottom: `${10 + (80 / 25) * y}%`,
            }"
          />
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import curve from '@/utils/curve';
import { lineChart as chartInfo } from './info.json';

export default {
  data() {
    return {
      chartInfo,
      accelerationData: [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2],
        [5, 2],
      ],
      velocityData: [
        [0, 0],
        [1, 2],
        [2, 4],
        [3, 6],
        [4, 8],
        [5, 10],
      ],
      distanceData: [
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16],
        [5, 25],
      ],
      accelerationChartPath: '',
      velocityChartPath: '',
      distanceChartPath: '',
    };
  },

  methods: {
    plot() {
      const {
        accelerationDataNodes,
        accelerationChart,
        velocityDataNodes,
        velocityChart,
        distanceDataNodes,
        distanceChart,
      } = this.$refs;
      const { left: al, top: at } = accelerationChart.getBoundingClientRect();

      const accelerationChartPath = curve(
        Array.from(accelerationDataNodes).map(($node) => {
          const { left: l, top: t } = $node.getBoundingClientRect();
          return [l - al + 4, t - at + 4];
        })
      );
      this.accelerationChartPath = accelerationChartPath;

      const { left: vl, top: vt } = velocityChart.getBoundingClientRect();

      const velocityChartPath = curve(
        Array.from(velocityDataNodes).map(($node) => {
          const { left: l, top: t } = $node.getBoundingClientRect();
          return [l - vl + 4, t - vt + 4];
        })
      );
      this.velocityChartPath = velocityChartPath;

      const { left: dl, top: dt } = distanceChart.getBoundingClientRect();

      const distanceChartPath = curve(
        Array.from(distanceDataNodes).map(($node) => {
          const { left: l, top: t } = $node.getBoundingClientRect();
          return [l - dl + 4, t - dt + 4];
        })
      );
      this.distanceChartPath = distanceChartPath;
    },
  },

  mounted() {
    this.plot();
  },
};
</script>

<style lang="sass">
@import '../../../sass/colors.sass'
section.line-chart
  > article.infos > p > a:link
    color: $yellow-500
    font-weight: bold
    &:visited
      color: $yellow-700
    &:hover
      color: $yellow-300
</style>

<style scoped lang="sass">
@import '../../../sass/helpers.sass'
@import '../../../sass/colors.sass'
@import '../../../sass/shared.sass'

section.line-chart
  @include title-style

  > article.infos
    margin-top: 24pt
    > h2.title
      font-size: 24pt
      letter-spacing: .7pt
      color: white
      font-family: $base-font-family
      + p
        margin-top: 6pt

    > p
      font-size: 12pt
      letter-spacing: .5pt
      color: white
      line-height: 1.7
      + p
        margin-top: 8pt

      > span.tag
        background-color: $yellow-500
        font-family: $base-font-family
        display: inline-block
        color: $grey-900
        padding: 0 10pt
        margin-right: 5pt

      + h2.title
        margin-top: 18pt

      + .charts
        margin-top: 24pt

.charts
  font-size: 0
  &.physics-example > .chart
    width: 33%
    height: 250pt
    display: inline-block
    position: relative
    > p.legend
      height: 20pt
      width: 90%
      text-align: center
      line-height: 20pt
      font-size: 12pt
      font-family: $base-font-family
      position: absolute
      top: 0pt
      left: 10%
      color: $yellow-500
    > .x-axis
      width: 90%
      position: absolute
      bottom: 10%
      right: 0
      height: 1pt
      background-color: rgba(255, 255, 255, 0.54)
      &:before
        content: ''
        display: inline-block
        position: absolute
        width: 0
        height: 0
        border-top: 5px solid transparent
        border-bottom: 5px solid transparent
        border-left: 8px solid rgba(255, 255, 255, 0.54)
        right: -8px
        bottom: -4px
    > .y-axis
      height: 80%
      position: absolute
      bottom: 10%
      left: 10%
      width: 1pt
      background-color: rgba(255, 255, 255, 0.54)
      &:before
        content: ''
        display: inline-block
        position: absolute
        width: 0
        height: 0
        border-left: 5px solid transparent
        border-right: 5px solid transparent
        border-bottom: 8px solid rgba(255, 255, 255, 0.54)
        top: -8px
        left: -4px

    > .x-line,
    > .y-line
      display: inline-block
      background-color: rgba(255, 255, 255, .06)
      position: absolute

    > .x-line
      width: 90%
      height: 1px
      right: 0
      transform: translateY(0.5px)
    > .y-line
      height: 80%
      width: 1px
      bottom: 10%
      transform: translateX(-0.5px)

    > span.svg-wrapper
      position: absolute
      width: 90%
      height: 80%
      right: 0
      bottom: 10%
      > svg
        > path.line-chart-path
          fill: transparent
          stroke: $yellow-500
          stroke-width: 1

    > span.dot
      background-color: $yellow-500
      display: inline-block
      width: 8px
      height: 8px
      transform: translate(-4px, 4px)
      border-radius: 50%
      position: absolute

@media screen and (max-width: 768px)
  .charts
    &.physics-example > .chart
      width: 100%
      // height: 250pt
      display: block  
</style>
