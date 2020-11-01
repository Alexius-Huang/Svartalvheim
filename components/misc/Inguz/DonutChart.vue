<template>
  <section class="donut-chart chart">
    <div class="title-wrapper">
      <h1 class="title">Donut Chart</h1>
    </div>

    <article class="infos">
      <template v-for="({ title: t, content: c }) in chartInfo">
        <h2 class="title" :key="t">{{ t }}</h2>
        <p v-for="(paragraph, j) in c" :key="`${t}-${j}`" v-html="paragraph" />
      </template>

      <p><span class="tag">Sociology</span> Racial and ethnic categories in U.S. in 2010</p>

      <div class="chart sociology-example">
        <div class="chart-wrapper">
          <span class="svg-wrapper" ref="ethnicityChartWrapper">
            <svg viewBox="0 0 42 42" class="donut">
              <circle class="donut-hole" cx="21" cy="21" :r="r" fill="transparent"></circle>
              <circle class="donut-ring" cx="21" cy="21" :r="r" fill="transparent" stroke="#444" stroke-width="3"></circle>

              <circle
                v-for="{ name, color, strokeDashArray, strokeDashOffset } in ethnicityDerivedData"
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
import { donutChart as chartInfo } from '@/resources/inguz/info.json';

export default {
  data() {
    return {
      chartInfo,
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

<style lang="sass">
@import '~/sass/colors.sass'
section.donut-chart
  > article.infos > p > a:link
    color: $yellow-500
    font-weight: bold
    &:visited
      color: $yellow-700
    &:hover
      color: $yellow-300
</style>

<style scoped lang="sass">
@import '~/sass/helpers.sass'
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import './_shared.sass'

div.sociology-example.chart
  > .chart-wrapper
    width: 100%
    text-align: center
    margin-top: 30pt
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

@media screen and (max-width: 769px)
  .chart > .chart-wrapper
    > span.svg-wrapper > svg
      width: 300px
      height: 300px

    > ul.legends
      padding: 0
      width: 75vw

@media screen and (max-width: 476px)
  .chart > .chart-wrapper
    > span.svg-wrapper > svg
      width: 250px
      height: 250px

    > ul.legends > li
      > span.color
        width: 20px
        height: 20px
      > span.content
        font-size: 10pt
</style>
