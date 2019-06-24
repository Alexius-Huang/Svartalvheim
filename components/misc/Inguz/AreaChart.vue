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
          <svg id="area-chart" :width="svg.width" :height="svg.height">
            <!-- Define Gradients -->
            <defs v-for="product in products" :key="`${product}-linear-gradient`">
              <linearGradient :id="`${product}-area-gradient`" gradientTransform="rotate(90)">
                <stop offset="0"    :stop-color="`var(--${product}-color-start)`" stop-opacity="1" />
                <stop offset="25%"  :stop-color="`var(--${product}-color-start)`"   stop-opacity="0.5" />
                <stop offset="100%" :stop-color="`var(--${product}-color-end)`"   stop-opacity="0" />
              </linearGradient>
            </defs>

            <g
              class="axis-group" :class="{ [timeIntervalMode]: true }"
              :transform="`translate(${axis.translation})`"
            >
              <line class="axis main-axis" v-bind="mainAxisAttributes" />

              <!-- Render the x-direction scales indicate time -->
              <line
                v-for="i in (timeIntervalMode === 'Quarter' ? totalQuarters : totalYears)"
                :key="`y-${i}`" class="axis"
                :class="{ 'annual-axis': (timeIntervalMode === 'Quarter') && (i % 4 === 0) }"
                v-bind="deriveTimeScaleFromIndex(i)"
              />

              <!-- Render the y-direction scales indicate values -->
              <line
                v-for="i in 10" :key="`x-${i}`"
                class="axis"
                v-bind="deriveRevenueScaleFromIndex(i)"
              />
            </g>

            <g
              class="label-group" :class="{ [timeIntervalMode]: true }"
              :transform="`translate(${label.translation})`"
            >
              <text
                id="label-caption"
                :x="axis.translation[0] + (area.width / 2)"
                :y="-caption.offsetFromChart"
              >{{ caption.title }}</text>

              <text
                v-for="i in 11" :key="`y-label-${i}`"
                class="vertical-label"
                :x="axis.translation[0] - label.gapFromAxis[0]"
                :y="(axis.height / 10) * (11 - i)"
                :fill-opacity="0.3 + (i * (0.7 / 11))"
              >{{ deriveRevenueLabelFromIndex(i) }}</text>

              <text
                id="y-label-descriptor" class="label-descriptor"
                :x="axis.translation[0] - label.gapFromAxis[0]"
                y="-25"
              >Revenue</text>

              <template v-if="timeIntervalMode === 'Quarter'">
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
              </template>

              <template v-else-if="timeIntervalMode === 'Annual'">
                <template v-for="({ year, ...rest }, i) in data">
                  <g
                    class="horizontal-label-wrapper"
                    :key="year"
                    :transform="`translate(${[
                      axis.translation[0] + ((axis.width / (totalYears - 1)) * i),
                      axis.height + label.gapFromAxis[1]
                    ]})`"
                  >
                    <text class="horizontal-label">{{ year }}</text>
                  </g>
                </template>
              </template>

              <text
                id="x-label-descriptor" class="label-descriptor"
                :x="axis.translation[0] + axis.width + 10"
                :y="axis.height"
              >Time</text>
            </g>

            <g
              class="area-visualization-group"
              :transform="`translate(${area.translation})`"
            >
              <!-- Using SnapSVG to control the animation -->
              <g
                v-for="product in products" :key="`${product}-income-area`"
                :id="`${product}-area-group`"
                class="area-group"
                :class="{ [product]: true, hide: !focusedProducts.includes(product) }"
              />
            </g>
          </svg>
        </div>

        <div class="btn-group">
          <h3 class="title">Visualization Config.</h3>

          <span class="label-group-title">Product Type</span>
          <template v-for="product in products">
            <input
              :disabled="loading"
              :key="`${product}-toggle-input`" :id="`${product}-toggler`"
              type="checkbox" v-model="focusedProducts" :value="product"
            />
            <label :for="`${product}-toggler`" :key="`${product}-label`">
              <span class="text">{{ product }}</span>
              <span class="order">{{ focusedProducts.indexOf(product) + 1 }}</span>
            </label>
          </template>

          <span class="label-group-title">Time Interval</span>
          <input id="time-annual-mode" type="radio" v-model="timeIntervalMode" value="Annual" />
          <label for="time-annual-mode">
            <span class="text">Annual</span>
          </label>

          <input id="time-quarter-mode" type="radio" v-model="timeIntervalMode" value="Quarter" />
          <label for="time-quarter-mode">
            <span class="text">Quarter</span>
          </label>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { areaChart as chartInfo } from './info.json';
import data from '@/resources/inguz/apple-income-statistic.json';

let snapsvg, mina;
if (process.browser) {
  snapsvg = Snap;
  mina = window.mina;
}

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

    return {
      $svg: null,
      $areaGroups: {},
      $areaPolygons: {},
      $areaPolylines: {},

      chartInfo,
      products,
      data,

      shownFrom,
      shownTo,
      totalYears,
      totalQuarters,

      focusedProducts: [],
      timeIntervalMode: 'Annual',   // ['Annual' || 'Quarter']

      svg: { width: 960, height: 600 },
      axis: { ...chartSize, translation: [100, 100] },
      area: { ...chartSize, translation: [100, 100] },
      label: {
        translation: [0, 100],
        gapFromAxis: [10, 20],
        incomeLabel: {
          delta: { annual: 30, quarter: 10 },  // Million U.S. dollar
          unit: 'M $',
        },
      },
      caption: {
        title: 'Apple Inc. Unaudited Revenue Summary Data From 2012 to 2018',
        offsetFromChart: 45,
      },

      nulledPoints: nulledPoints,

      ...PREQ,
      ...PREY,

      loading: true,
    };
  },
  computed: {
    mainAxisAttributes() {
      const { axis: { width: w, height: h } } = this;
      return { x1: 0, y1: h, x2: w, y2: h };
    },
    areaBoundries() {
      const {
        timeIntervalMode: TIM,
        products,
        focusedProducts,
        totalQuarters: TQ,
        totalYears: TY,
        area: { width, height },
        label: { incomeLabel: { delta: { annual, quarter } } },
        nulledPoints,
      } = this;

      const delta = TIM === 'Quarter' ? quarter : annual;
      const cumulationCache = Array.from(Array(nulledPoints.length)).map(_ => 0);

      const sortedProducts = [...focusedProducts];
      products
        .filter(p => !focusedProducts.includes(p))
        .forEach((product) => { sortedProducts.push(product); });

      if (TIM === 'Annual') {
        return sortedProducts.reverse().reduce((boundries, product, i) =>
          Object.assign(boundries, { [product]:
            focusedProducts.includes(product) ? (
              this[`${_decapitalize(product)}REY`]
                .map(({ result }) => result)
                .flatMap((value, j) => {
                  const cumulatedYDelta = cumulationCache[j];
                  const currentYDelta = (value / delta) * (height / 10);
                  const y = _round(height - (currentYDelta + cumulatedYDelta));
                  const x = _round((width / (TY - 1)) * j);
                  const point = [x, y];

                  cumulationCache[j] += currentYDelta;
                  return [point, point, point, point];
                })
            ) : nulledPoints
          }), {});
      }

      return sortedProducts.reverse().reduce((boundries, product, i) =>
        Object.assign(boundries, { [product]:
          focusedProducts.includes(product) ? (
            this[`${_decapitalize(product)}REQ`]
              .flatMap(({ result }) => result)
              .map((value, j) => {
                const cumulatedYDelta = cumulationCache[j];
                const currentYDelta = (value / delta) * (height / 10);
                const y = _round(height - (currentYDelta + cumulatedYDelta));
                const x = _round((width / (TQ - 1)) * j);
                const point = [x, y];

                cumulationCache[j] += currentYDelta;
                return point;
              })
          ) : nulledPoints
        }), {});
    },

    areaChartVariable() {
      const { focusedProducts: v1, timeIntervalMode: v2 } = this;
      return [v1, v2];
    },
  },
  methods: {
    /* Hint: v-for i in N index starts from 1 instead of 0 */
    deriveTimeScaleFromIndex(i) {
      const {
        timeIntervalMode: mode,
        totalQuarters: TQ,
        totalYears: TY,
        axis: { width: w, height: h }
      } = this;

      const partition = (mode === 'Quarter' ? TQ : TY) - 1;
      const x = (w / partition) * (i - 1);
      return { x1: x, y1: h, x2: x, y2: 0 };
    },
    deriveRevenueScaleFromIndex(i) {
      const { axis: { width: w, height: h } } = this;
      const y = (h / 10) * (i - 1);
      return { x1: 0, y1: y, x2: w, y2: y };
    },
    deriveRevenueLabelFromIndex(i) {
      const { timeIntervalMode: mode, label } = this;
      const { incomeLabel: { delta, unit } } = label;
      const { annual: AD, quarter: QD } = delta;

      return `${(i - 1) * (mode === 'Quarter' ? QD : AD)}${unit}`;
    },
    /* Polygon requires the left-bottom and the right bottom corner points in the chart */
    polygonize(points) {
      const { area: { width: w, height: h } } = this;
      return [[0, h], ...points, [w, h]];
    },
  },
  mounted() {
    setTimeout(() => {
      this.focusedProducts = ['iPhone'];
      this.loading = false;
    }, 1000);

    this.$svg = snapsvg('#area-chart');
    const { products, $svg, nulledPoints } = this;

    const $areaGroups = {};
    const $areaPolygons = {};
    const $areaPolylines = {};

    products.reverse().forEach((product) => {
      const $areaGroup = $svg.select(`g#${product}-area-group`);
      const $areaPolygon = $svg.polygon(this.polygonize(nulledPoints));
      const $areaPolyline = $svg.polyline(nulledPoints);

      $areaPolygon.addClass('product-polygon');
      $areaPolyline.addClass('product-polyline');
      $areaGroup.append($areaPolygon);
      $areaGroup.append($areaPolyline);

      Object.assign($areaGroups, { [product]: $areaGroup });
      Object.assign($areaPolygons, { [product]: $areaPolygon });
      Object.assign($areaPolylines, { [product]: $areaPolyline });
    });

    this.$areaGroups = $areaGroups;
    this.$areaPolygons = $areaPolygons;
    this.$areaPolylines = $areaPolylines;
  },

  watch: {
    areaChartVariable() {
      const {
        $areaPolygons,
        $areaPolylines,
        products,
        areaBoundries: AB,
      } = this;

      products.forEach((product) => {
        const $areaPolygon = $areaPolygons[product];
        const $areaPolyline = $areaPolylines[product];
        const points = AB[product];

        $areaPolygon.animate({ points: this.polygonize(points) }, 500, mina.easeinout);
        $areaPolyline.animate({ points }, 500, mina.easeinout);
      });
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

svg#area-chart > g.area-visualization-group > g.area-group
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
      stroke: $light-green-800
    > polygon
      fill: url(#iPad-area-gradient)
  &.Mac
    > polyline
      stroke: $teal-800
    > polygon
      fill: url(#Mac-area-gradient)
  &.Other
    > polyline
      stroke: $blue-900
    > polygon
      fill: url(#Other-area-gradient)

  &.hide > polygon,
  &.hide > polyline
    opacity: 0
    transition: .25s

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
          stroke: #444
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

      > text.label-descriptor
        font: normal bolder 12pt $base-font-family
        letter-spacing: .5pt
        fill: $yellow-600

      > text#x-label-descriptor
        text-anchor: start

      > text#label-caption
        text-anchor: middle
        font: normal 16pt $base-font-family
        fill: $yellow-500

      > text.vertical-label
        fill: $yellow-700

      > g.horizontal-label-wrapper > text
          transform: rotate(-35deg)
          font-size: 8pt

          &.annual-label
            font-size: 10pt
            fill: #aaa

      &.Annual > g.horizontal-label-wrapper > text
        transform: rotate(0)
        text-anchor: middle
        font-size: 10pt
        fill: #aaa

  > div.btn-group
    margin-top: 24pt
    > h3.title
      font: 14pt $base-font-family
      color: $yellow-500
      margin-bottom: 12pt

    > input[type="checkbox"],
    > input[type="radio"],
    > label > span.order
      text-align: center
      display: none
      width: 20pt
      height: 20pt
      line-height: 30pt
      border-radius: 10pt
      font: 14pt $base-font-family
      background-color: #333
      margin-left: 5pt

    > label
      @include vertical-align
      display: inline-block
      margin-right: 8pt
      font: 12pt/30pt $default-font-family
      color: #888
      box-sizing: border-box
      border: 1pt solid #888
      border-radius: 1pt
      padding: 0 8pt
      height: 30pt
      transition: .25s
      cursor: pointer

    > span.label-group-title
      display: inline-block
      font: bolder 12pt/30pt $default-font-family
      margin-right: 8pt
      color: white

    > label + span.label-group-title
      margin-left: 12pt

    > input[type="checkbox"]:disabled,
    > input[type="radio"]:disabled
      + label
        opacity: .25

    > input[type="checkbox"]:checked,
    > input[type="radio"]:checked
      + label
        transition: .25s
        color: #333
      + label > span.order
        display: inline-block

      &#iPhone-toggler + label,
      &#time-annual-mode + label,
      &#time-quarter-mode + label
        border-color: $yellow-500
        background-color: $yellow-500
        > span.order
          color: $yellow-500
      &#iPad-toggler + label
        border-color: $light-green-500
        background-color: $light-green-500
        > span.order
          color: $light-green-500
      &#Mac-toggler + label
        border-color: $teal-500
        background-color: $teal-500
        > span.order
          color: $teal-500
      &#Other-toggler + label
        border-color: $blue-300
        background-color: $blue-300
        > span.order
          color: $blue-300
</style>