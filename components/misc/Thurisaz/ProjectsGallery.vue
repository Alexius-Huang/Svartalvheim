<template>
  <section class="projects-gallery">
    <ul
      v-for="i in columns" :key="i"
      class="column" :class="[`column-${i}`]"
      ref="columns"
    >
      <li
        v-for="data in columnData[i - 1]" :key="data.title"
      >
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
      this.processedData = sourceData.map(d => ({
        ...d,
        ...d.meta,
        date: this.formatDate(d.date),
        cover: d.meta.cover ? imgURL + d.meta.cover : null,
        logo: d.meta.logo ? imgURL + 'logo/' + d.meta.logo : null,
      }));

      const { columns: $columns } = this.$refs;
      this.columnData = [[], [], []];

      this.processedData.forEach(d => {
        setImmediate(() => {
          const heights = $columns.map($el => $el.clientHeight);
          const index = indexOfMinimum(heights);
          const newColumnData = Array.from(this.columnData);
          newColumnData[index].push(d);
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

@media screen and (max-width: 768px)
  section.projects-gallery > ul.column
    width: calc((100% - 15pt) / 2)
  
@media screen and (max-width: 576px)
  section.projects-gallery > ul.column
    width: 100%

</style>
