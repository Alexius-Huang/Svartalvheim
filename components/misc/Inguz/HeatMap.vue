<template>
  <section class="heat-map chart">
    <div class="title-wrapper">
      <h1 class="title">Heat Map</h1>
    </div>

    <article class="infos">
      <h2 class="title">What?</h2>
      <p>
        A heat map (or choropleth map) is a graphical representation of data where the individual values contained in a matrix are represented as colors.
        "Heat map" is a newer term but <em>shading matrices</em> have existed for over a century.
        Referenced from <a href="https://en.wikipedia.org/wiki/Heat_map" target="_blank">Wikipedia</a>
      </p>

      <h2 class="title">Which?</h2>
      <p>
        <b>Biology heat maps</b> are typically used in <em>molecular biology</em> to represent the level of expression of many genes across a number of comparable samples (e.g. cells in different states, samples from different patients) as they are obtained from DNA microarrays.
      </p>
      <p>
        The <a href="https://en.wikipedia.org/wiki/Tree_map" target="_blank">tree map</a> is a <b>2D hierarchical partitioning</b> of data that visually resembles a heat map.
      </p>
      <p>
        A <a href="https://en.wikipedia.org/wiki/Mosaic_plot" target="_blank">mosaic plot</a> is a tiled heat map for representing a two-way or higher-way table of data.
      </p>

      <h2 class="title">When?</h2>
      <p>Visualizing <b>2D structured data arrays</b> with elements are quantitative, e.g. visualizing Gaussian-Distribution mathematical model or human population density in worldwide.</p>
      <p>Not only 2D structured data arrays can be used with heat map, it can also be visualizing different <b>region's</b> result such as visualizing the election results in U.S. map.</p>

      <h2 class="title">How?</h2>
      <p>
        Select color scheme properly depends on which kind of data you are visualizing:
        <br />
        Discrete categories can use various colors to visualize.
        <br />
        Same categories with levels of different quantitative values, you can use monochromatic color varying with shades.
      </p>
      <p>Each numerical range between different shade should be even.</p>
      <p>Heat map doesn't necessarily need to draw each elements in square or a 2D matrix. For instance, visualizing regions with different shades in a map.</p>

      <p>
        <span class="tag">Enery Consumption</span> Monthly Electricity Consumption in Taiwan from 2008 - 2017,
        referenced from <a href="https://www.ceicdata.com/en/taiwan/energy-consumption-electricity-bureau-of-energy-ministry-of-economic-affairs/electricity-consumption-total" target="_blank">CEIC Data</a>
      </p>
      <div class="chart energy-consumption-example">
        <div class="caption">
          <h2>Monthly Energy Consumption in Taiwan from 2008 - 2017</h2>
        </div>
        <div class="heat-map-wrapper">
          <div class="rows">
            <div
              class="row"
              v-for="([key, values], i) in Array.from(electricityConsumption)"
              :key="key"
            >
              <span class="legend">{{ key }}</span><!--

           --><span class="values">
                <span
                  v-for="({ kilowatts }, k) in values"
                  class="value"
                  :class="{
                    [determineConsumptionLevel(kilowatts)]: true,
                    [`delay-${i + k}`]: true
                  }"
                  :key="`${key}-${k}`"
                >
                  <span class="tooltip">{{ kilowatts.toLocaleString() }} Kw</span>
                </span>
              </span>
            </div><!--

        --><div class="row">
              <span class="legend"></span><!--

          --><span class="values">
                <span class="label" v-for="label in monthsLabel" :key="label">{{ label }}</span>
              </span>
            </div>

          </div><!--

       --><div class="color-level-labels">
            <span class="label" v-for="i in 16" :key="`label-${i}`">
              {{ (((17 - i) + 12) * 1000).toLocaleString() }} - {{ (((17 - i) + 13) * 1000).toLocaleString() }} Kw
            </span>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import electricityConsumption from '@/resources/inguz/electricity-consumption.json';

export default {
  data() {
    return {
      electricityConsumption: electricityConsumption.reduce((acc, d) => {
        if (acc.has(d.year)) {
          acc.get(d.year).push(d);
        } else {
          acc.set(d.year, [d]);
        }
        return acc;
      }, new Map()),

      monthsLabel: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
    };
  },
  computed: {},
  methods: {
    determineConsumptionLevel(value) {
      console.log(value);
      const level = Math.floor(value / 1000) - 12;
      return `level-${level}`;
    },
  },
};
</script>

<style scoped lang="sass">
@import '../../../sass/helpers.sass'
@import '../../../sass/colors.sass'
@import '../../../sass/shared.sass'

section.heat-map
  @include title-style
  overflow-x: hidden

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

$heat-levels: $yellow-50 $yellow-100 $yellow-200 $yellow-300 $yellow-400 $yellow-500 $yellow-600 $yellow-700 $yellow-800 $yellow-900 $red-400 $red-500 $red-600 $red-700 $red-800 $red-900

.chart
  &.energy-consumption-example
    margin-top: 48pt
    > .caption
      > h2
        font-size: 18pt
        font-family: $base-font-family
        color: white
        text-decoration: underline
        letter-spacing: .7pt
        text-align: center

    > .heat-map-wrapper
      margin-top: 18pt
      text-align: center
      > .rows
        width: 450pt
        display: inline-block
      > .color-level-labels
        margin-left: 10pt
        width: 120pt
        display: inline-block
        vertical-align: top

        > span.label
          vertical-align: top
          font-size: 10pt
          line-height: 20pt
          height: 20pt
          display: inline-block
          width: 100%
          color: white
          &:before
            content: ''
            display: inline-block
            width: 10pt
            height: 10pt
            border-radius: 2pt
            vertical-align: middle
          @each $level in $heat-levels
            &:nth-child(#{17 - index($heat-levels, $level)}):before
              background-color: $level

.rows
  > .row
    width: 100%
    font-size: 0
    + .row
      margin-top: 3pt
    > span.legend
      display: inline-block
      box-sizing: border-box
      width: 50pt
      height: 30pt
      line-height: 30pt
      font-size: 12pt
      font-family: $base-font-family
      vertical-align: top
      color: white
      text-align: right
      padding-right: 10pt
    > span.values
      vertical-align: top
      display: inline-block
      width: 400pt
      > span.value
        display: inline-block
        width: 30pt
        height: 30pt
        border-radius: 3pt
        position: relative
        animation: wobble 10s infinite

        @for $i from 1 through 20
          &.delay-#{$i}
            animation-delay: #{$i * 50}ms

        > span.tooltip
          pointer-events: none
          width: 100pt
          height: 20pt
          line-height: 20pt
          text-align: center
          display: inline-block
          opacity: 0
          position: absolute
          font-size: 11pt
          letter-spacing: .7pt
          font-family: $base-font-family
          border-radius: 3pt
          top: -25pt
          left: -30pt
          background-color: $grey-900
          color: $yellow-500
          transition: .25s
          &:after
            content: ''
            display: inline-block
            position: absolute
            border-left: 5pt solid transparent
            border-right: 5pt solid transparent
            border-top: 10pt solid $grey-900
            bottom: -10pt
            left: 42.5pt
        &:hover
          > span.tooltip
            opacity: 1
            transition: .25s

        @each $level in $heat-levels
          &.level-#{index($heat-levels, $level)}
            background-color: $level

        + span.value
          margin-left: 3pt

      > span.label
        display: inline-block
        width: 30pt
        height: 30pt
        line-height: 30pt
        font-size: 12pt
        font-family: $base-font-family
        color: white
        text-align: center
        + span.label
          margin-left: 3pt

@keyframes wobble
  0%
    transform: scale(1.0)
  90%
    transform: scale(1.0)
  95%
    transform: scale(0.85)
  100%
    transform: scale(1.0)


@media screen and (max-width: 960px)
  .chart
    &.energy-consumption-example
      > .heat-map-wrapper
        > .rows
          width: 100%
        > .color-level-labels
          margin-top: 12pt
          margin-left: 0
          display: block
          width: 100%
          > span.label
            display: inline-block
            width: 120pt

@media screen and (max-width: 769px)
  .chart
    &.energy-consumption-example
      > .caption
        > h2
          font-size: 16pt
      > .heat-map-wrapper
        > .rows
          > .row
            > span.legend
              height: 20pt
              line-height: 20pt
              width: 50pt
              font-size: 10pt
            > span.values
              width: 275pt
              > span.value
                height: 20pt
                width: 20pt
                &:hover > span.tooltip
                  opacity: 0

              > span.label
                width: 20pt
                font-size: 10pt
                height: 20pt
                line-height: 20pt

@media screen and (max-width: 500px)
  .chart
    &.energy-consumption-example
      > .heat-map-wrapper
        > .rows
          > .row
            height: 15px
            + .row
              margin-top: 3px
            > span.legend
              width: 40px
              padding-right: 5pt
            > span.values
              width: 215px
              > span.value
                width: 15px
                height: 15px
                border-radius: 1px
                + span.value
                  margin-left: 3px
              > span.label
                margin-top: 3pt
                width: 15px
                height: 15px
                line-height: 15px
                font-size: 8pt
                + span.label
                  margin-left: 3px
        > .color-level-labels
          margin: 12pt 0 0 0
          > span.label
            font-size: 8pt
            width: 80pt
            margin-right: 5pt
            &:before
              width: 6pt
              height: 6pt
</style>
