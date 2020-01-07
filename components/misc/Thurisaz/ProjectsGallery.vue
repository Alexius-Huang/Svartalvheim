<template>
  <section class="projects-gallery">
    <ul
      v-for="i in columns" :key="i"
      class="column" :class="[`column-${i}`]"
      ref="columns"
    >
      <li
        v-for="(data, j) in columnData[i - 1]" :key="`${data.title}-${j}`"
        :class="{ 'timeline-block': data.belongsToTimeline }"
      >
        <template v-if="data.belongsToTimeline">
          <span class="year">{{ data.year }}</span>
        </template>

        <template v-else>
          <plain-style
            v-if="data.cover === null && data.logo === null"
            v-bind="data"
          />

          <cover-image-style
            v-else-if="data.cover !== null && data.logo === null"
            v-bind="data"
          />

          <full-post-style
            v-else
            v-bind="data"
          />
        </template>
      </li>
    </ul>
  </section>
</template>

<script>
import indexOfMinimum from '@/utils/indexOfMinimum';
import PlainStyle from './projects-gallery/PlainStyle';
import CoverImageStyle from './projects-gallery/CoverImageStyle';
import FullPostStyle from './projects-gallery/FullPostStyle';

export default {
  components: { PlainStyle, CoverImageStyle, FullPostStyle },
  props: ['sourceData', 'imgUrl'],
  data() {
    return {
      columns: 0,
      columnData: [[], [], []],
      innerWidth: null,
      monthToText: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
      },
      processedData: [],
    };
  },
  computed: {
    /* For watch purpose */
    combinedProps() {
      const { columns, sourceData } = this;
      return { columns, sourceData };
    },
  },
  methods: {
    handleResize() {
      const { innerWidth: w, columns: c } = window;
      this.innerWidth = w;
      if (w > 768 && c !== 3) {
        this.columns = 3;
      } else if (w > 576 && c !== 2) {
        this.columns = 2;
      } else if (c !== 1) {
        this.columns = 1;
      }
    },
    formatDate(dateArray) {
      return `${this.monthToText[dateArray[1]]} ${dateArray[0]}`;
    },
    renderListItems() {
      const { sourceData, imgUrl: imgURL } = this;

      /* Reformatting Data */
      const formattedData = sourceData.map(d => ({
        ...d,
        ...d.meta,
        date: this.formatDate(d.date),
        dateArray: d.date,
        cover: d.meta.cover ? imgURL + d.meta.cover : null,
        logo: d.meta.logo ? imgURL + 'logo/' + d.meta.logo : null,
      }));

      /* Adding Year Object */
      let previousYear = 3000;
      for (let i = 0; i < formattedData.length; i += 1) {
        const d = formattedData[i];
        if (d.dateArray[0] < previousYear) {
          previousYear = d.dateArray[0];
          formattedData.splice(i, 0, { year: previousYear, belongsToTimeline: true });
          i += 1;
        }
      }
      this.processedData = formattedData;

      const { columns: $columns } = this.$refs;
      this.columnData = [[], [], []];

      this.processedData.forEach(d => {
        setImmediate(() => {
          const newColumnData = Array.from(this.columnData);

          if (d.belongsToTimeline) {
            newColumnData[0].push(d);
          } else {
            const heights = $columns.map($el => $el.clientHeight);
            const index = indexOfMinimum(heights);
            newColumnData[index].push(d);
          }

          this.columnData = newColumnData;
        });
      });
    },
  },
  watch: {
    combinedProps() {
      window.setImmediate(() => {
        this.renderListItems();
      });
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize.bind(this));
    const { innerWidth: w } = window;
    if (w > 768) {
      this.columns = 3;
    } else if (w > 576) {
      this.columns = 2;
    } else {
      this.columns = 1;
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scpped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

section.projects-gallery
  width: 100%
  > ul.column
    display: inline-block
    width: calc((100% - 30pt) / 3)
    vertical-align: top
    + ul.column
      margin-left: 15pt
    > li
      border-radius: 3pt
      padding: 6pt 8pt
      width: 100%
      background-color: rgba(255, 255, 255, 0.05)
      + li
        margin-top: 15pt

      &.timeline-block
        height: 200pt
        text-align: right
        background-color: $yellow-500
        position: relative
        &:before
          content: ''
          display: inline-block
          width: 0
          height: 100%
          vertical-align: bottom
        > span.year
          display: inline-block
          color: #222
          margin-bottom: -18pt
          font: 75pt $base-font-family
          vertical-align: bottom
          &:before
            position: absolute
            content: 'Year'
            font-size: 36pt
            color: transparentize(#222, .2)
            transform-origin: left center
            transform: rotate(90deg)
            right: -36pt
            top: -12pt

        + li.timeline-block
          height: auto
          background-color: rgba(255, 255, 255, 0.05)
          > span.year
            color: $yellow-500
            margin-top: -6pt
            font-size: 48pt
            margin-bottom: -12pt
            &:before
              position: relative
              right: 0
              top: 0
              font-size: 18pt
              transform: rotate(0)
              color: $yellow-500
              display: inline-block
              margin-right: 10pt

@media screen and (max-width: 768px)
  section.projects-gallery > ul.column
    width: calc((100% - 15pt) / 2)
  
@media screen and (max-width: 576px)
  section.projects-gallery > ul.column
    width: 100%

    > li.timeline-block
      background-color: transparent
      height: auto
      font-size: 24pt
      text-align: left
      > span.year
        color: $yellow-500
        font-size: 75pt

        &:before
          position: relative
          right: 0
          top: 0
          font-size: 18pt
          transform: rotate(0)
          color: $yellow-500
          display: inline-block
          margin-right: 10pt
</style>
