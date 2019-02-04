<template>
  <section class="donut-chart chart">
    <div class="title-wrapper">
      <h1 class="title">Donut Chart</h1>
    </div>

    <article class="infos">
      <h2 class="title">What?</h2>
      <p>
        A donut chart is a variant of the pie chart,
        with a blank center allowing for additional information about the data as a whole to be included.
        Donut charts are similar to pie charts in that their aim is to illustrate proportions.
        This type of circular graph can support multiple statistics at once and it provides a better data intensity ratio to standard pie charts.
        It does not have to contain information in the center.
        Referenced from <a href="https://en.wikipedia.org/wiki/Pie_chart">Wikipedia</a>
      </p>

      <h2 class="title">When?</h2>
      <p><b>Less data categories</b> comparison.</p>
      <p><b>Huge value variation</b>.</p>
      <p>Human eye loves <b>circular visual effect</b> which gives us harmony.</p>
      <p>Generally, <b>it can be replaced by histogram / bar chart</b> ... etc.</p>

      <h2 class="title">How?</h2>
      <p>Keep the number of slices to minimum.</p>
      <p>Don't use 3D pie chart / donut chart.</p>
      <p>When data values are too close to compare, consider using bar chart or histogram.</p>
      <p>Don't put legends in the section of the donut chart, put it outside.</p>

      <p><span class="tag">Sociology</span> Racial and ethnic categories in U.S. in 2010</p>

      <div class="chart sociology-example">
        <div class="chart-wrapper">
          <span class="svg-wrapper" ref="ethnicityChartWrapper">
            <svg viewBox="0 0 42 42" class="donut">
              <circle class="donut-hole" cx="21" cy="21" :r="r" fill="transparent"></circle>
              <circle class="donut-ring" cx="21" cy="21" :r="r" fill="transparent" stroke="#444" stroke-width="3"></circle>

              <circle
                v-for="{ name, value, color, strokeDashArray, strokeDashOffset } in ethnicityDerivedData"
                :key="name"
                class="donut-segment"
                cx="21" cy="21" :r="r"
                fill="transparent"
                :stroke="color"
                stroke-width="3"
                :stroke-dasharray="strokeDashArray"
                :stroke-dashoffset="strokeDashOffset"
              />
            </svg>
          </span>

          <ul class="legends">
            <li
              v-for="{ name, color, value } in ethnicity"
              :key="name"
            >
              <span class="color" :style="{ 'background-color': color }" />
              <span class="content">{{ name }} {{ Math.floor(value * 1000) / 10 }}%</span>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import T from '@tweenjs/tween.js';

export default {
  data() {
    return {
      r: (100 / (2 * Math.PI)),
      ethnicity: [
        { name: 'White', value: 0.724, color: '#F9A825' },
        { name: 'Black or African American', value: 0.126, color: '#FBC02D' },
        { name: 'Asian', value: 0.048, color: '#FFF176' },
        { name: 'Other', value: 0.102, color: '#FFFDE7' },
      ],
      animationPercentage: 0,

      showEthnicityChartTooltip: false,
      ethnicityChartTooltipValue: '',
    };
  },
  computed: {
    ethnicityDerivedData() {
      const { ethnicity, animationPercentage } = this;
      let precedingLength = 0;

      return ethnicity.map((d) => {
        const { value } = d;
        const percentage = value * animationPercentage;

        const strokeDashArray = `${percentage} ${100 - percentage}`;
        const strokeDashOffset = 100 - precedingLength + 25;
        precedingLength += percentage;
        return {
          ...d,
          strokeDashArray,
          strokeDashOffset
        };
      });
    },
  },
  methods: {
    animate() {
      this.animationPercentage = 0;
      const animation = { percentage: 0 };
      const animationDestination = { percentage: 100 };

      new T.Tween(animation)
        .to(animationDestination, 2000)
        .easing(T.Easing.Quadratic.Out)
        .onUpdate(() => {
          this.animationPercentage = animation.percentage;
        })
        .start();

      window.setTimeout(() => {
        this.animate();
      }, 6000);
    },
  },
  mounted() {
    function animate(time) {
      requestAnimationFrame(animate);
      T.update(time);
    }
    requestAnimationFrame(animate); 
    this.animate();
  },
};
</script>

<style scoped lang="sass">
@import '../../../sass/helpers.sass'
@import '../../../sass/colors.sass'
@import '../../../sass/shared.sass'

section.donut-chart
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

      > a
        color: $yellow-500
        font-weight: bold
        &:visited
          color: $yellow-700
        &:hover
          color: $yellow-300

      + h2.title
        margin-top: 18pt

      + .charts
        margin-top: 24pt

div.chart
  > .chart-wrapper
    width: 100%
    text-align: center
    > .svg-wrapper
      display: inline-block
      > svg
        width: 300pt
        height: 300pt

    > ul.legends
      width: 50%
      margin: 0 auto
      text-align: left
      > li
        display: inline-block
        line-height: 30pt
        margin-right: 12pt
        > span.color
          display: inline-block
          width: 20pt
          height: 20pt
          margin-right: 8pt
          border-radius: 3pt
          vertical-align: middle
        > span.content
          display: inline-block
          font-size: 12pt
          color: white
          vertical-align: middle
</style>
