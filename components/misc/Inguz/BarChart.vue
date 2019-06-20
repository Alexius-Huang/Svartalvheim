<template>
  <section class="bar-chart chart">
    <div class="title-wrapper">
      <h1 class="title">Bar Chart</h1>
    </div>

    <article class="infos">
      <template v-for="({ title: t, content: c }) in chartInfo">
        <h2 class="title" :key="t">{{ t }}</h2>
        <p v-for="(paragraph, j) in c" :key="`${t}-${j}`" v-html="paragraph" />
      </template>

      <p>
        <span class="tag">Military Trade</span> U.S. Conventional Arms Sales to Taiwan from 1990 to 2010,
        referenced from <a href="https://www.armscontrol.org/factsheets/taiwanarms">Arms Control Association</a>
      </p>

      <div class="chart trade-example">
        <div class="main-title">
          <h2>U.S. Arms Sales to Taiwan 1990 - 2010 according to U.S. Government Arms Agreement</h2>
        </div>

        <div class="app-switch-wrapper">
          <app-switch
            class="app-switch"
            serial-number="military-trade"
            :default-value="true"
            @change="handleChangeScale"
          />
          <span class="scale">{{ militaryTradeScale === 'linear' ? 'Linear' : 'Logarithmic' }} Scale</span>
        </div>

        <div class="chart-wrapper">
          <div class="chart-legends">
            <span class="legend" v-for="{ year } in militaryTradeData" :key="year">{{ year }}</span>
          </div><div class="chart-bars-wrapper">
            <span
              class="y-axis linear-scale"
              :class="{ hide: militaryTradeScale !== 'linear' }"
              v-for="i in 10"
              :key="`linear-${i}`"
              :style="{ left: `${(i - 1) * 10}%` }"
            >
              <span class="label-value">
                ${{ i - 1 }} B
              </span>
            </span>

            <span class="y-axis logarithmic-scale"
              v-for="(i, j) in logScale"
              :class="{
                hide: militaryTradeScale !== 'logarithmic' || i === 0,
                highlight: Number.isInteger(Math.log10(i))
              }"
              :key="`logarithmic-${j}`"
              :style="{ left: `${Math.log10(i) * 8}%` }"
            >
              <span
                class="label-value"
                v-if="Number.isInteger(Math.log10(i))"
              >{{ parseLogScaleLabel(i) }}</span>
            </span>

            <span
              class="legend"
              v-for="{
                year,
                percentage,
                display,
              } in (
                militaryTradeScale === 'logarithmic' ?
                  derivedMilitaryTradeDataLogarithm :
                  derivedMilitaryTradeDataLinear
              )"
              :key="year"
            >
              <span class="bar" :style="{ width: `${percentage}%` }" />
              <span class="value">{{ display }}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import AppSwitch from '@/components/AppSwitch';
import { barChart as chartInfo } from './info.json';

export default {
  components: { AppSwitch },
  data() {
    return {
      chartInfo,
      militaryTradeData: [
        { year: 2010, value: 1.25 * Math.pow(10, 9), display: '$1.25 B' },
        { year: 2009, value: 3.17 * Math.pow(10, 9), display: '$3.17 B' },
        { year: 2008, value: 608  * Math.pow(10, 6), display: '$608 M' },
        { year: 2007, value: 22   * Math.pow(10, 3), display: '$22 K' },
        { year: 2006, value: 10   * Math.pow(10, 6), display: '$10 M' },
        { year: 2005, value: 244  * Math.pow(10, 6), display: '$244 M' },
        { year: 2004, value: 591  * Math.pow(10, 6), display: '$591 M' },
        { year: 2003, value: 445  * Math.pow(10, 6), display: '$445 M' },
        { year: 2002, value: 71   * Math.pow(10, 6), display: '$71 M' },
        { year: 2001, value: 272  * Math.pow(10, 6), display: '$272 M' },
        { year: 2000, value: 134  * Math.pow(10, 6), display: '$134 M' },
        { year: 1999, value: 546  * Math.pow(10, 6), display: '$546 M' },
        { year: 1998, value: 591  * Math.pow(10, 6), display: '$591 M' },
        { year: 1997, value: 354  * Math.pow(10, 6), display: '$354 M' },
        { year: 1996, value: 449  * Math.pow(10, 6), display: '$449 M' },
        { year: 1995, value: 208  * Math.pow(10, 6), display: '$208 M' },
        { year: 1994, value: 361  * Math.pow(10, 6), display: '$361 M' },
        { year: 1993, value: 5.37 * Math.pow(10, 9), display: '$5.37 B' },
        { year: 1992, value: 478  * Math.pow(10, 6), display: '$478 M' },
        { year: 1991, value: 474  * Math.pow(10, 6), display: '$474 M' },
        { year: 1990, value: 518  * Math.pow(10, 6), display: '$518 M' },
      ],
      militaryTradeScale: 'logarithmic',
      logScale: Array.from(Array(101)).map((_, i) => {
        return ((i + 1) % 10) * Math.pow(10, Math.ceil((i + 1) / 10)); 
      }),
    };
  },
  computed: {
    derivedMilitaryTradeDataLogarithm() {
      const { militaryTradeData } = this;

      return militaryTradeData.map((d) => {
        return {
          ...d,
          percentage: Math.log10(d.value) * 8,
        };
      });
    },
    derivedMilitaryTradeDataLinear() {
      const { militaryTradeData } = this;

      return militaryTradeData.map((d) => {
        return {
          ...d,
          percentage: d.value / Math.pow(10, 8)
        };
      });
    },
  },
  methods: {
    handleChangeScale(active) {
      if (active) {
        this.militaryTradeScale = 'logarithmic';
      } else {
        this.militaryTradeScale = 'linear';
      }
    },
    parseLogScaleLabel(i) {
      let unit;
      switch (true) {
        case Math.log10(i) < 3: unit = ''; break;
        case Math.log10(i) < 6: unit = 'K'; break;
        case Math.log10(i) < 9: unit = 'M'; break;
        default: unit = 'B';
      }
      return `$${1}${'0'.repeat(Math.log10(i) % 3)} ${unit}`;
    },
  },
};
</script>

<style lang="sass">
@import '../../../sass/colors.sass'
section.bar-chart
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
@import './_shared.sass'

div.chart.trade-example
  margin-top: 48pt
  > div.main-title
    > h2
      font-family: $base-font-family
      font-size: 16pt
      text-decoration: underline
      color: white
      letter-spacing: .7pt
      text-align: center
  > div.app-switch-wrapper
    margin-top: 24pt
    > .app-switch
      display: inline-block
      margin-right: 12pt
      vertical-align: middle
    > span.scale
      vertical-align: middle
      font-size: 12pt
      letter-spacing: .7pt
      color: white
      font-family: $base-font-family
      display: inline-block
  > div.chart-wrapper
    margin-top: 24pt
    width: 100%
    font-size: 0
    > div.chart-legends
      width: 50pt
      vertical-align: top
      display: inline-block
      > span.legend
        display: block
        height: 30pt
        line-height: 30pt
        width: 100%
        text-align: right
        font-size: 12pt
        color: white
        padding-right: 12pt
        box-sizing: border-box
        font-family: $mono-font-family
    > div.chart-bars-wrapper
      width: calc(100% - 50pt)
      display: inline-block
      position: relative
      > span.legend
        display: block
        height: 30pt
        @include vertical-align

        > span.bar
          text-align: left
          display: inline-block
          height: 12.5pt
          box-sizing: border-box
          background-color: $yellow-500
          transition: width 1.5s

        > span.value
          color: white
          font-size: 12pt
          font-family: $base-font-family
          margin-left: 5pt
          letter-spacing: .7pt
          display: inline-block
          height: 20pt
          line-height: 20pt

      > span.y-axis
        position: absolute
        top: 0
        height: 100%
        border-right: 1px solid rgba(255, 255, 255, .12)
        opacity: 1
        transition: opacity 1.5s
        z-index: -1

        &.hide
          opacity: 0
          transition: opacity 1.5s

        &.highlight
          border-right: 2px solid rgba(255, 255, 255, .24)
          transform: translateX(-1px)

        > span.label-value
          position: absolute
          font-size: 10pt
          color: white
          bottom: -30pt
          width: 50pt
          height: 30pt
          line-height: 30pt
          left: -25pt
          text-align: center
          display: inline-block

@media screen and (max-width: 769px)
  div.chart.trade-example
    > div.main-title
      > h2
        text-align: left
    > div.chart-wrapper
      > div.chart-bars-wrapper
        > span.y-axis.linear-scale,
        > span.y-axis.logarithmic-scale
          > span.label-value
            font-size: 8pt
            transform-origin: center center
            transform: rotate(45deg)

@media screen and (max-width: 426px)
  div.chart.trade-example
    > div.chart-wrapper
      > div.chart-bars-wrapper
        > span.y-axis.logarithmic-scale
          &.highlight
            border-right-width: 1px
          &:not(.highlight)
            display: none
        > span.legend
          > span.value
            font-size: 9pt
@media screen and (max-width: 321px)
  div.chart.trade-example
    > div.chart-wrapper
      > div.chart-bars-wrapper
        > span.legend
          > span.value
            font-size: 7.5pt
</style>
