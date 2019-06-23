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
            <!-- Define Gradients -->
            <defs v-for="product in products" :key="`${product}-linear-gradient`">
              <linearGradient :id="`${product}-area-gradient`" gradientTransform="rotate(90)">
                <stop offset="0"    :stop-color="`var(--${product}-color-start)`" stop-opacity="1" />
                <stop offset="100%" :stop-color="`var(--${product}-color-end)`"   stop-opacity="0" />
              </linearGradient>
            </defs>

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
                v-for="i in totalQuarters" :key="`y-${i}`"
                class="axis" :class="{ 'annual-axis': i % 4 === 0 }"
                :x1="(axis.width / (totalQuarters - 1)) * (i - 1)"
                :y1="axis.height"
                :x2="(axis.width / (totalQuarters - 1)) * (i - 1)"
                y2="0"
              />

              <!-- Render the x-direction scales indicate values -->
              <line
                v-for="i in 10" :key="`x-${i}`"
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
                v-for="i in 11" :key="`y-label-${i}`"
                class="vertical-label"
                :x="axis.translation[0] - label.gapFromAxis[0]"
                :y="(axis.height / 10) * (11 - i)"
              >{{ (i - 1) * label.incomeLabel.delta }}{{ label.incomeLabel.unit }}</text>

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

            <g
              class="area-visualization-group"
              :transform="`translate(${area.translation})`"
            >
              <g
                v-for="product in products" :key="`${product}-income-area`"
                class="area-group" :class="{ [product]: true }"
              >
                <polygon
                  :points="areaPolygonized[product]"
                  ref="product-polygon" />
                <polyline :points="areaPathized[product]">
                </polyline>
              </g>
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
const _decapitalize = ([cap, ...rest]) => `${cap.toLowerCase()}${rest.join('')}`;

export default {
  data() {
    const products = ['iPhone', 'iPad', 'Mac', 'Other'];
    const shownFrom = 2012;
    const shownTo = 2018;
    const totalYears = (shownTo - shownFrom) + 1;
    const totalQuarters = totalYears * 4;
    const chartSize = { width: 800, height: 400 };

    /* Product Revenue Each Quarter */
    const PREQ = products.reduce((_preq, product) =>
      Object.assign(_preq, {
        [`${_decapitalize(product)}REQ`]:
          data.map(({ year, Q1, Q2, Q3, Q4 }) => ({
            year,
            result: [Q1[product], Q2[product], Q3[product], Q4[product]]
          })),
      }), {});

    /* Product Revenue Each Year */
    const PREY = products.reduce((_prey, product) =>
      Object.assign(_prey, {
        [`${_decapitalize(product)}REY`]:
          PREQ[`${_decapitalize(product)}REQ`].map(
            ({ year, result }) => ({ year, result: _sum(result) })
          )
      }), {});

    /* Nulled point represent pre-animated state */
    const nulledPoints = [];
    const delta = chartSize.width / (totalQuarters - 1);
    for (let i = 0; i < totalQuarters; i += 1) {
      nulledPoints.push(_round(i * delta));
      nulledPoints.push(chartSize.height);
    }

    const nulledPolyline = nulledPoints.join(' ');
    const nulledPolygon = [
      0, chartSize.height,
      ...nulledPoints,
      chartSize.width, chartSize.height,
    ].join(' ');

    /* Default animate state */
    // const preAnimateState = products.reduce((state, product) =>
    //   Object.assign(state, {
    //     [product]: { polyline: nulledPolyline, polygon: nulledPolygon }
    //   }), {});

    return {
      chartInfo,
      products,
      data,

      shownFrom,
      shownTo,
      totalYears,
      totalQuarters,

      focusedProducts: [],
      timeInterval: 'Quarter',   // ['Annual' || 'Quarter']

      svg: { width: 960, height: 600 },
      axis: { ...chartSize, translation: [100, 75] },
      area: { ...chartSize, translation: [100, 75] },
      label: {
        translation: [0, 75],
        gapFromAxis: [10, 15],
        incomeLabel: { delta: 10, unit: 'M $' }, // Million U.S. dollar
      },

      nulled: {
        points: nulledPoints,
        // polyline: nulledPolyline,
        // polygon: nulledPolygon,
      },
      // preAnimateState,
      // animationDefaultAttributes: {
      //   attributeName: 'points',
      //   dur: '1000ms',
      //   repeatCount: '1',
      //   keyTimes: '0; 1',
      //   keySplines: '0 .75 .25 1',
      //   calcMode: 'spline',
      //   fill: 'freeze',
      // },

      ...PREQ,
      ...PREY,
    };
  },
  computed: {
    areaBoundries() {
      const {
        timeInterval,
        products,
        focusedProducts,
        totalQuarters,
        area: { width, height },
        label: { incomeLabel: { delta } },
        nulled,
      } = this;

      return products.reduce((boundries, product) =>
        Object.assign(boundries, {
          [product]:
            focusedProducts.includes(product) ? (
              this[`${_decapitalize(product)}REQ`]
                .flatMap(({ result }) => result)
                .map((value, i) => {
                  const y = _round(height - ((value / delta) * (height / 10)));
                  const x = _round((width / (totalQuarters - 1)) * i);
                  return [x, y];
                })
            ) : nulled.points
        }), {});
    },

    areaPolygonized() {
      const { areaBoundries: AB, products: P } = this;
      return P.reduce((result, product) => Object.assign(result, {
          [product]: this.polygonize(AB[product]),
        }), {});
    },
    areaPathized() {
      const { areaBoundries: AB, products: P } = this;
      return P.reduce((result, product) => Object.assign(result, {
          [product]: this.pathize(AB[product]),
        }), {});
    },
  },
  methods: {
    pathize(points) {
      const { area: { width: w, height: h } } = this;
      if (!points.flat) return `0 ${h} ${w} ${h}`;
      return points.flat().join(' ');
    },
    polygonize(points) {
      const { area: { width: w, height: h } } = this;
      return `0 ${h} ${this.pathize(points)} ${w} ${h}`;
    },
  },
  mounted() {
    // Examples:
    // console.log(this.data);
    // console.log(this.iPhoneREQ);
    // console.log(this.iPhoneREY);

    setTimeout(() => {
      this.focusedProducts = ['iPhone'];
    }, 1000);
    // setTimeout(() => {
    //   this.focusedProducts = ['iPad'];
    // }, 2000);
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
    border: 1px solid transparentize($yellow-500, 0.95)

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
        font-size: 10pt
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

    > g.area-visualization-group > g.area-group
      > polyline
        fill: none
        stroke-width: 3
        stroke-linejoin: round

      > polyline,
      > polygon
        transition: points .25s

      &.iPhone
        > polyline
          stroke: $yellow-700
        > polygon
          fill: url(#iPhone-area-gradient)
      &.iPad
        > polyline
          stroke: $light-green-700
        > polygon
          fill: url(#iPad-area-gradient)
      &.Mac
        > polyline
          stroke: $teal-700
        > polygon
          fill: url(#Mac-area-gradient)
      &.Other
        > polyline
          stroke: $blue-700
        > polygon
          fill: url(#Other-area-gradient)

#iPhone-area-gradient
  --iPhone-color-start: #FFEB3B // Equivalent to $yellow-500
  --iPhone-color-end: white

#iPad-area-gradient
  --iPad-color-start: #8BC34A // Equivalent to $light-green-500
  --iPad-color-end: white

#Mac-area-gradient
  --Mac-color-start: #009688 // Equivalent to $teal-500
  --Mac-color-end: white

#Other-area-gradient
  --Other-color-start: #4FC3F7 // Equivalent to $blue-300
  --Other-color-end: white
</style>