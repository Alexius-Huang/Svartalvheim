<template>
  <section class="bar-chart chart">
    <div class="title-wrapper">
      <h1 class="title">Area Chart</h1>
    </div>

    <article class="infos">
      <template v-for="({ title: t, content: c }) in chartInfo">
        <h2 class="title" :key="t">{{ t }}</h2>
        <p v-for="(paragraph, j) in c" :key="`${t}-${j}`" v-html="paragraph" />
      </template>

      <p>
        <span class="tag">Finance & Accounting</span>
        Apple's Products' Revenue From 2012 to 2018 (in Million U.S. Dollars) Quarter Results
      </p>

      <div class="chart finance-accounting-example">
        <div class="svg-wrapper">
          <svg :width="svg.width" :height="svg.height">
            <g
              class="axis-group"
              :transform="`translate(${axis.translation})`"
            >
              <!-- Render Main Base Axis -->
              <line
                class="axis main-axis"
                x1="0"
                :y1="axis.height"
                :x2="axis.width"
                :y2="axis.height"
              />

              <!-- Render the y-direction scales indicate time -->
              <line
                v-for="i in totalQuarters" :key="i"
                class="axis" :class="{ 'annual-axis': i % 4 === 0 }"
                :x1="(axis.width / (totalQuarters - 1)) * (i - 1)"
                :y1="axis.height"
                :x2="(axis.width / (totalQuarters - 1)) * (i - 1)"
                y2="0"
              />

              <!-- Render the x-direction scales indicate values -->
              <line
                v-for="i in 10" :key="i"
                class="axis"
                x1="0"
                :y1="(axis.height / 10) * (i - 1)"
                :x2="axis.width"
                :y2="(axis.height / 10) * (i - 1)"
              />
            </g>

            <g
              class="label-group"
              :transform="`translate(${label.translation})`"
            >
              <text
                v-for="i in 11" :key="i"
                class="vertical-label"
                :x="axis.translation[0] - label.gapFromAxis[0]"
                :y="(axis.height / 10) * (11 - i)"
              >{{ i - 1 }}</text>

              <!-- Need to do label rotation which wraps the text again with <g> tag -->
              <template v-for="({ year, ...rest }, i) in data">
                <g
                  class="horizontal-label-wrapper"
                  v-for="(quarter, j) in Object.keys(rest)"
                  :key="`${year}-${quarter}`"
                  :transform="`translate(${[
                    axis.translation[0] + ((axis.width / (totalQuarters - 1)) * (i * 4 + j)),
                    axis.height + label.gapFromAxis[1]
                  ]})`"
                >
                  <text
                    :class="{ 'annual-label': quarter === 'Q4' }"
                    class="horizontal-label"
                  >{{ year }} {{ quarter }}</text>
                </g>
              </template>
            </g>
          </svg>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { areaChart as chartInfo } from './info.json';
import data from '@/resources/inguz/apple-income-statistic.json';

const _roundDigits = 100;
const _round = num => Math.round(num * _roundDigits) / _roundDigits;
const _sum = arr => _round(arr.reduce((acc, cur) => acc + cur));

const deriveProductRevenueEachQuarter = function (product) {
  return function () {
    const { data } = this;
    return data.map(({ year, Q1, Q2, Q3, Q4 }) => ({
      year,
      result: [Q1[product], Q2[product], Q3[product], Q4[product]]
    }));
  };
};

const deriveProductRevenueEachYear = function (product) {
  return function () {
    const { [`${decapitalize(product)}RevenueEachQuarter`]: PREQ } = this;
    return PREQ.map(({ year, result }) => ({ year, result: _sum(result) }));
  };
};

const products = ['iPhone', 'iPad', 'Mac', 'Other'];
const decapitalize = ([cap, ...rest]) => `${cap.toLowerCase()}${rest.join('')}`;

export default {
  data() {
    const shownFrom = 2012;
    const shownTo = 2018;
    const totalYears = (shownTo - shownFrom) + 1;
    const totalQuarters = totalYears * 4;

    return {
      chartInfo,
      data,

      shownFrom,
      shownTo,
      totalYears,
      totalQuarters,

      mode: 'iPhone',           // [Products || 'All']
      timeInterval: 'Annual',   // ['Annual' || 'Quarter']

      svg: { width: 960, height: 600 },
      axis: { width: 800, height: 400, translation: [100, 75] },
      label: { translation: [0, 75], gapFromAxis: [10, 20] },
    };
  },
  computed: {
    ...products.reduce((computedObj, product) => {
      const decapitalized = decapitalize(product);

      /* Product Revenue Each Quarter */
      const PREQ = deriveProductRevenueEachQuarter(product);
      const PREQComputedName = `${decapitalized}RevenueEachQuarter`;

      /* Product Revenue Each Year */
      const PREY = deriveProductRevenueEachYear(product);
      const PREYComputedName = `${decapitalized}RevenueEachYear`;

      const computedValues = { [PREQComputedName]: PREQ, [PREYComputedName]: PREY };
      return Object.assign(computedObj, computedValues);
    }, {}),

    totalRevenueEachQuarter() {
      const { data } = this;
      return data.map(({ year, Q1, Q2, Q3, Q4 }) => ({
        year,
        Q1: _sum(Object.values(Q1)),
        Q2: _sum(Object.values(Q2)),
        Q3: _sum(Object.values(Q3)),
        Q4: _sum(Object.values(Q4)),
      }));
    },
    totalRevenueEachYear() {
      const { totalRevenueEachQuarter: TREQ } = this;
      return TREQ.map(({ year, ...quarters }) => ({ year, result: _sum(Object.values(quarters)) }));
    },
  },
  mounted() {
    // Examples:
    // console.log(this.iPhoneRevenueEachQuarter);
    // console.log(this.iPhoneRevenueEachYear);
    // console.log(this.data);
    // console.log(this.totalRevenueEachQuarter);
    // console.log(this.totalRevenueEachYear);
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

div.chart.finance-accounting-example
  margin-top: 50pt
  > div.svg-wrapper
    display: block
    text-align: center
  > div.svg-wrapper > svg
    display: inline-block
    border: 1px solid $yellow-500

    > g.axis-group
      > line.axis
        fill: none
        stroke-width: 1
        stroke: #444

        &.annual-axis
          stroke: #555
          stroke-dasharray: 3, 3

        &:not(.annual-axis):not(.main-axis)
          stroke-dasharray: 1, 5

        &.main-axis
          stroke: #555
          stroke-width: 2

    > g.label-group
      > text,
      > g.horizontal-label-wrapper > text
        font-size: 12pt
        font-family: $default-font-family
        font-style: italic
        fill: #777
        dominant-baseline: middle
        text-anchor: end

      // > text.vertical-label
      > g.horizontal-label-wrapper > text
          transform: rotate(-35deg)
          font-size: 8pt

          &.annual-label
            font-size: 10pt
            fill: #aaa
</style>