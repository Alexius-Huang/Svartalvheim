<template>
  <section class="pictogram-chart chart">
    <div class="title-wrapper">
      <h1 class="title">Pictogram Chart</h1>
    </div>

    <article class="infos">
      <template v-for="({ title: t, content: c }) in chartInfo">
        <h2 class="title" :key="t">{{ t }}</h2>
        <p v-for="(paragraph, j) in c" :key="`${t}-${j}`" v-html="paragraph" />
      </template>

      <p>
        <span class="tag">Crime</span> Intentional homicide rate per 100,000 inhabitants in different countries,
        referenced from <a href="https://en.wikipedia.org/wiki/List_of_countries_by_intentional_homicide_rate" target="_blank">List of countries by intentional homicide rate</a>
      </p>
      <div class="chart crime-example">
        <div class="caption">
          <h2>Intentional Homicide Rate per 100,000 Inhabitants in Different Countries in 2016</h2>
        </div>

        <ul class="list">
          <li v-for="{ countryCode: c, country, rate } in homicideRate" :key="country">
            <span class="country">
              <img class="nation-flag" :src="getNationFlag(c)" :alt="country" />
              <span class="country-name">{{ country }}</span>
              <!-- {{ rate }} -->
            </span><!--

         --><span class="pictogram-cluster">
              <span v-for="i in Math.ceil(rate / 10)" :key="`${c}-${i}`" class="row">
                <template v-if="i !== Math.ceil(rate / 10)">
                  <img
                    v-for="j in 10"
                    :key="`${c}-${i}-${j}`"
                    :src="icons.murder"
                    :class="{ [`delay-${i + j - 2}`]: true }"
                  />
                </template>

                <template v-else>
                  <img
                    v-for="j in Math.floor(rate) % 10"
                    :key="`${c}-${i}-${j}`"
                    :src="icons.murder"
                    :class="{ [`delay-${i + j - 2}`]: true }"
                  />
                  <span
                    class="partial-pictogram"
                    :class="{ [`delay-${i + (Math.floor(rate) % 10) - 1}`]: true }"
                    :style="{
                      width: `${20 * (rate % 1)}pt`,
                      overflow: 'hidden'
                    }"
                  ><img :src="icons.murder" /></span>
                </template>
              </span>
            </span><!--

         --><span :style="deriveLineHeightFromRate(rate)" class="value-rate">
              <span :style="deriveFontSizeFromRate(rate)">{{ rate }}</span>
              <small> Per 100,000 People</small>
            </span>
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script>
import homicideRate from '@/resources/inguz/homicide-rate.json';
import murderIcon from '@/assets/icons/custom/murder-main.svg';
import { pictogramChart as chartInfo } from './info.json';

export default {
  data() {
    return {
      chartInfo,
      icons: { murder: murderIcon },
      homicideRate,
    };
  },
  methods: {
    getNationFlag(code) {
      return require(`../../../assets/national-flags/${code}.svg`);
    },
    deriveFontSizeFromRate(rate) {
      return { 'font-size': `${(rate / 2.5) + 12}pt` };
    },
    deriveLineHeightFromRate(rate) {
      const height = `${rate / 2.5 + 12}pt`;
      return { height, 'line-height': height };
    },
  },
};
</script>

<style lang="sass">
@import '../../../sass/colors.sass'
section.pictogram-chart
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

.chart
  &.crime-example
    margin-top: 48pt
    > div.caption
      > h2
        letter-spacing: 1.7pt
        font-size: 24pt
        font-family: $base-font-family
        color: white
        text-decoration: underline
        text-align: center

    > ul.list
      width: 500pt
      margin: 24pt auto 0 auto
      > li
        display: block
        width: 100%
        height: auto
        padding: 16pt 0
        > span.country
          display: inline-block
          width: 100pt
          height: 30pt
          vertical-align: top
          box-sizing: border-box
          > img.nation-flag
            display: inline-block
            width: 20pt
            height: 20pt
            margin-right: 5pt
            vertical-align: middle
          > span.country-name
            display: inline-block
            height: 30pt
            line-height: 30pt
            vertical-align: middle
            font-size: 12pt
            color: white
            font-family: $base-font-family

        > span.pictogram-cluster
          display: inline-block
          vertical-align: top
          width: 300pt
          > span.row
            display: block
            height: 30pt
            width: 100%
            @include vertical-align
            > img
              width: 20pt
              height: 20pt
              display: inline-block
              + img,
              + span.partial-pictogram
                margin-left: 8pt

            > span.partial-pictogram
              display: inline-block
              height: 20pt
              > img
                width: 20pt
                height: 20pt

            > img,
            > span.partial-pictogram
              animation: shake 10s infinite
              @for $i from 1 through 16
                &.delay-#{$i}
                  animation-delay: #{$i * 50}ms

        > span.value-rate
          position: relative
          display: inline-block
          vertical-align: bottom
          width: 100pt
          height: 40pt
          line-height: 40pt
          color: $yellow-500
          text-align: right
          font-family: $base-font-family
          > small
            position: absolute
            right: 0
            bottom: -12pt
            line-height: 12pt
            font-size: 9pt
            color: white

@keyframes shake
  0%
    transform: scale(0)
  10%
    transform: scale(0)
  15%
    transform: scale(1)
  100%
    transform: scale(1)

@media screen and (max-width: 768px)
  section.pictogram-chart > div.title-wrapper
    height: 40pt
    > h1.title
      line-height: 40pt
      font-size: 24pt

  div.chart.crime-example
    text-align: center

  div.chart.crime-example > ul.list > li
    position: relative
    padding-top: 30pt
    margin-bottom: 50pt

    > span.country
      width: 300pt
      position: absolute
      text-align: left
      top: 0
      left: 0
      right: 0
      margin: 0 auto

    > span.pictogram-cluster > span.row
        text-align: left

    > span.value-rate
      width: 300pt
      position: absolute
      right: 0
      left: 0
      bottom: -25pt
      margin: 0 auto
      padding-right: 30pt
      > small
        padding-right: 30pt

@media screen and (max-width: 425px)
  div.chart.crime-example
    > div.caption > h2
      font-size: 16pt
      text-align: left

    > ul.list
      width: 100%

    > ul.list  > li
      width: 100%
      > span.pictogram-cluster
        width: 100%

      > span.pictogram-cluster > span.row
        height: 20pt
        width: 100%
        > img,
        > span.partial-pictogram > img
          width: 12pt
          height: 12pt

        > span.partial-pictogram
          height: 12pt

      > span.value-rate
        width: 100%
        padding-right: 0
        > small
          padding-right: 0
</style>
