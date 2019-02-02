<template>
  <section class="weight-status">
    <div class="title-wrapper">
      <h1 class="title">My Weight</h1>
    </div>

    <div class="weight-average">
      <span class="avg-weight">
        AVERAGE WEIGHT IS <span class="highlight">{{ displayAverageValue }} kg</span>
      </span>
      <br />
      <span class="avg-weight-duration">
        CALCULATED FROM <span class="date">{{ data[0].date }}</span>
        TO <span class="date">{{ data[data.length - 1].date }}</span>
      </span>
    </div>

    <div class="chart-wrapper">
      <div class="chart-x-axis">
        <span class="label" v-for="{ date } in data" :key="date">
          {{ date }}
        </span>
      </div>
      <!-- <div class="chart-y-axis">
      </div> -->
      <svg
        class="svg-bg"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg" 
      >
        <path
          :d="curve"
          fill="transparent"
          stroke="yellow"
          stroke-width="2"
          ref="curve"
          :stroke-dasharray="`${curveTotalLength}px`"
          :stroke-dashoffset="`${curveOffsetLength}px`"
        />
      </svg>

      <div class="chart-main-section" ref="chartMainSection">
        <span
          class="y-axis-line"
          v-for="i in 10"
          :key="i"
          :style="{ left: `${((i - 1) * 10) + 5}%` }"
        />

        <span
          class="max-bound-line"
          :style="maxBoundStyle"
        >
          <span class="label">
            MAX {{ displayMaxValue }} kg
          </span>
        </span>
        <span
          class="min-bound-line"
          :style="minBoundStyle"
        >
          <span class="label">
            MIN {{ displayMinValue }} kg
          </span>
        </span>

        <span
          class="data-node"
          :class="{ animating }"
          v-for="({ date, value }, i) in data"
          :key="date"
          :style="renderStyle(value, i)"
          ref="dataNodes"
        >
          <span class="tooltip">{{ value }} kg</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import weightData from '@/resources/weight.json';
import curve from '@/utils/curve';
import T from '@tweenjs/tween.js';

export default {
  data() {
    return {
      totalData: weightData,
      page: 1,
      pageSize: 10,
      totalPage: Math.ceil(weightData.length / 10),
      svgWidth: 0,
      svgHeight: 500,
      curve: '',
      animating: true,
      curveTotalLength: 1,
      curveOffsetLength: 1,

      displayMaxValue: 0,
      displayMinValue: 0,
      displayAverageValue: 0,
    };
  },
  computed: {
    data() {
      const start = this.pageSize * (this.page - 1);
      const end = start + this.pageSize;
      return this.totalData.slice(start, end).reverse();
    },
    values() { return this.data.map(({ value }) => value); },
    maxValue() { return Math.max(...this.values); },
    minValue() { return Math.min(...this.values); },
    upperBound() { return Math.ceil(this.maxValue) + .5; },
    lowerBound() { return Math.floor(this.minValue) - .5; },
    delta() { return this.upperBound - this.lowerBound; },
    maxBoundStyle() {
      const { maxValue, lowerBound, delta } = this;
      const percentage = ((maxValue - lowerBound) / delta) * 100;
      return { bottom: `${percentage}%` };
    },
    minBoundStyle() {
      const { minValue, lowerBound, delta } = this;
      const percentage = ((minValue - lowerBound) / delta) * 100;
      return { bottom: `${percentage}%` };
    },
  },
  methods: {
    renderStyle(kilos, index) {
      const { lowerBound, delta } = this;
      const percentage = ((kilos - lowerBound) / delta) * 100;

      return {
        left: `${index * 10 + 5}%`,
        bottom: `${percentage}%`,
      };
    },
    plot() {
      const {
        chartMainSection: $el,
        dataNodes: $dataNodes,
      } = this.$refs;
      this.svgWidth = $el.clientWidth;

      const curvePoints = [];
      const { left, top } = $el.getBoundingClientRect();
      Array.from($dataNodes).forEach((node) => {
        const { left: nodeLeft, top: nodeTop } = node.getBoundingClientRect();
        const { left: relativeLeft, top: relativeTop } = {
          left: nodeLeft - left + 7.5,
          top: nodeTop - top + 7.5,
        };

        curvePoints.push([relativeLeft, relativeTop]);
      });
      this.curve = curve(curvePoints);
    }
  },
  watch: {
    curve() {
      setImmediate(() => {
        const { curve: $curve } = this.$refs;
        const totalLength = $curve.getTotalLength();
        this.curveTotalLength = totalLength;
        this.curveOffsetLength = totalLength;
        this.displayMaxValue = 0;
        this.displayMinValue = 0;
        this.animating = true;

        const animation = {
          length: totalLength,
          maxValue: 0,
          minValue: 0,
        };
        const animationDestination = {
          length: 0,
          maxValue: this.maxValue,
          minValue: this.minValue,
        };

        const tween = new T.Tween(animation)
          .to(animationDestination, 1500)
          .easing(T.Easing.Quadratic.Out)
          .onUpdate(() => {
            this.curveOffsetLength = animation.length;
            this.displayMaxValue = Math.floor(animation.maxValue * 10) / 10;
            this.displayMinValue = Math.floor(animation.minValue * 10) / 10;
            this.displayAverageValue = Math.floor(
              ((this.displayMaxValue + this.displayMinValue) * 10) / 2
            ) / 10;
          })
          .onComplete(() => {
            this.animating = false;
          })
          .start();
      });
    },
    page() {
      setImmediate(() => {
        this.plot();
      });
    },
  },
  mounted() {
    this.plot();

    function animate(time) {
      requestAnimationFrame(animate);
      T.update(time);
    }
    requestAnimationFrame(animate);
  },
};
</script>

<style scoped lang="sass">
@import '../../sass/shared.sass'
@import '../../sass/colors.sass'

section.weight-status
  max-width: 750px
  height: 500px
  width: 100%
  margin: 0 auto
  > div.title-wrapper
    height: 50pt
    > h1.title
      margin: 0
      padding-left: 20pt
      font-size: 36pt
      letter-spacing: .7pt
      color: white
      font-family: $base-font-family
      line-height: 50pt
      border-left: 10pt solid $yellow-500

  > div.weight-average
    margin-top: 24pt
    > span.avg-weight-duration
      font-size: 18pt
      color: white
      font-family: $base-font-family
      > .date
        color: $yellow-600
    > span.avg-weight
      font-size: 24pt
      color: white
      font-family: $base-font-family
      > .highlight
        color: $yellow-700

  > .chart-wrapper
    width: 100%
    height: 100%
    margin-top: 24pt
    position: relative
    > div
      position: absolute
      box-sizing: border-box

    > .chart-x-axis
      width: 100%
      height: 100px
      bottom: 0
      left: 0
      transform: translateX(5%)
      > span.label
        display: inline-block
        width: 10%
        font-size: 10pt
        letter-spacing: 1.2pt
        color: $yellow-500
        transform-origin: left top
        transform: rotate(30deg)
        font-weight: bold
        font-family: $base-font-family
        opacity: .72

    > svg.svg-bg
      position: absolute
      width: 100%
      height: calc(100% - 100px)
      top: 0
      right: 0
    > .chart-main-section
      background-image: linear-gradient(to top, transparentize($yellow-500, 0.88) 0%, transparent 86.6%)
      width: 100%
      height: calc(100% - 100px)
      top: 0
      right: 0
      border-bottom: 1.5pt solid transparentize($yellow-500, 0.5) // rgba(255, 255, 255, 0.54)
      border-radius: 1.5pt

      > span.y-axis-line
        position: absolute
        top: 0
        display: inline-block
        width: 0
        height: 100%
        border: .5pt dashed rgba(255, 255, 255, .12)

      > span.max-bound-line,
      > span.min-bound-line
        position: absolute
        left: 0
        width: 100%
        height: 2pt
        display: inline-block
        background-color: $yellow-300
        opacity: .36

        > span.label
          position: absolute
          background-color: $yellow-300
          color: $grey-900
          left: 0pt
          bottom: 0pt
          padding: 0 15pt
          font-size: 12pt
          letter-spacing: 1.2pt
          font-weight: bold
          font-family: $base-font-family
          height: 30pt
          line-height: 30pt
          // &:after
          //   content: ''
          //   display: inline-block
          //   width: 0
          //   height: 0
          //   border-left: 21pt solid transparent
          //   border-right: 21pt solid transparent
          //   border-bottom: 21pt solid $grey-900
          //   position: absolute
          //   right: 0pt
          //   bottom: 2pt
          //   transform-origin: right bottom
          //   transform: rotate(45deg)

      > span.max-bound-line
        background-color: $yellow-500
        > span.label
          background-color: $yellow-500
      > span.min-bound-line
        background-color: $yellow-100
        > span.label
          background-color: $yellow-100

      > span.data-node
        position: absolute
        width: 15px
        height: 15px
        margin-left: -7.5px
        margin-bottom: -7.5px
        // border-radius: 50%
        > span.tooltip
          opacity: 0
          display: inline-block
          position: absolute
          width: 100pt
          height: 30pt
          line-height: 30pt
          font-size: 10pt
          font-weight: bold
          letter-spacing: .7pt
          color: $grey-900
          top: -35pt
          left: -42.5pt
          text-align: center
          transition: .25s
          overflow: hidden

          &:before
            content: ''
            border-radius: 3pt
            position: absolute
            z-index: -1
            left: -5pt
            top: 0
            width: 100%
            height: calc(100% + 20pt)
            background-color: $yellow-500
            transform: rotate(-60deg) translateX(-100px)
            transition: .25s

        &:hover > span.tooltip
          opacity: 1
          transition: .25s
          &:before
            transform: rotate(-60deg) translateX(0)
            transition: .25s

        &:after
          content: ''
          display: inline-block
          vertical-align: top
          width: 15px
          height: 15px
          border-radius: 50%
          background-color: red
          background-color: $yellow-500
          opacity: 1
          transform: scale(1)
          transition: .25s
  
        &.animating:after
          transform: scale(0)
          opacity: 0
          transition: .25s
</style>
