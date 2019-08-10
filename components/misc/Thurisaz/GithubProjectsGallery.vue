<template>
  <section class="github-projects-gallery">
    <div class="columns-wrapper">
      <ul
        v-for="i in columns" :key="i"
        class="column" :class="[`column-${i}`]"
        ref="columns"
      >
        <li
          v-for="{
            title,
            description,
            link,
            date,
            tags,
            meta: {
              cover = null,
              logo = null,
              company = null,
              position = null,
              companyWebsite = '#',
              website = null,
            },
          } in columnData[i - 1]" :key="title"
        >
          <div
            class="inner-wrapper column-style-1"
            v-if="cover === null && logo === null"
          >
            <p class="title" :class="{ smaller: title.length > 20 }">
              <a v-if="link !== null" target="_blank" :href="link">{{ title }}</a>
              <template v-else>{{ title }}</template>
            </p>
            <ul class="tags">
              <li v-for="tag in tags" :key="tag">{{ tag }}</li>
            </ul>
            <p class="description">{{ description }}</p>
            <p class="date">{{ formatDate(date) }}</p>
          </div>

          <div
            class="inner-wrapper column-style-2"
            v-else-if="cover !== null && logo === null"
          >
            <div class="cover-img-wrapper">
              <img
                :src="imgURL + cover"
                @click="showPicture({
                  url: imgURL + cover,
                  title,
                  content: description,
                })"
              />
              <p class="title" :class="{ smaller: title.length > 20 }">
                <a v-if="link !== null" target="_blank" :href="link">{{ title }}</a>
                <template v-else>{{ title }}</template>
              </p>
            </div>

            <a v-if="website" class="website" :href="website" target="_blank">
              <img class="icon" :src="icons.worldwide" />
              <span class="url">{{ trim(website, 25) }}</span>
            </a>
            <ul class="tags">
              <li v-for="tag in tags" :key="tag">{{ tag }}</li>
            </ul>
            <p class="description">{{ description }}</p>
            <p class="date">{{ formatDate(date) }}</p>
          </div>

          <div
            class="inner-wrapper column-style-3"
            :class="{ 'has-cover': cover !== null }"
            v-else
          >
            <div class="logo-wrapper">
              <img class="logo" :src="imgURL + logo" /><!--
           --><div class="descriptors">
                <p class="company">
                  {{ company }}
                  <span class="position" v-if="position !== null">{{ position }}</span>
                </p>
                <a class="company-website" target="_blank" :href="companyWebsite">{{ trim(companyWebsite, 20) }}</a>
              </div>
            </div><!--

         --><div v-if="cover !== null" class="cover-wrapper"><!--
           --><img
                :src="imgURL + cover"
                class="cover"
                @click="showPicture({
                  url: imgURL + cover,
                  title,
                  content: description,
                })"
              /><!--
         --></div><!--
         --><p class="title">
              <a v-if="link !== null" target="_blank" :href="link">{{ title }}</a>
              <template v-else>{{ title }}</template>
            </p>
            <a v-if="website" class="website" :href="website" target="_blank">
              <img class="icon" :src="icons.worldwide" />
              <span class="url">{{ trim(website, 25) }}</span>
            </a>
            <ul class="tags">
              <li v-for="tag in tags" :key="tag">{{ tag }}</li>
            </ul>
            <p class="description">{{ description }}</p>
            <p class="date">{{ formatDate(date) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import data from '@/resources/thurisaz/github-project-links.json';
import worldwide from '@/assets/icons/material/worldwide-main.svg';
import indexOfMinimum from '@/utils/indexOfMinimum';

export default {
  data() {
    return {
      data,
      imgURL: 'github-projects-img/',
      columns: 0,
      columnData: [[], [], []],
      innerWidth: null,
      icons: { worldwide },
    };
  },
  methods: {
    showPicture(info) {
      this.$store.commit('picture-modal/setData', [info]);
    },
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
    mapMonthToText(month) {
      switch (month) {
        case 1: return 'January';
        case 2: return 'February';
        case 3: return 'March';
        case 4: return 'April';
        case 5: return 'May';
        case 6: return 'June';
        case 7: return 'July';
        case 8: return 'August';
        case 9: return 'September';
        case 10: return 'October';
        case 11: return 'November';
        case 12: return 'December';
      }
    },
    trim(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      }

      return text;
    },
    formatDate(dateArray) {
      return `${this.mapMonthToText(dateArray[1])} ${dateArray[0]}`;
    },
    renderListItems() {
      const { columns: $columns } = this.$refs;
      this.columnData = [[], [], []];

      this.data.forEach(d => {
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
    columns() {
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

section.github-projects-gallery
  width: 100%
  > div.columns-wrapper
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

section.github-projects-gallery > div.columns-wrapper > ul.column > li > div.inner-wrapper
  p
    font: lighter 12pt/16pt $default-font-family
    color: white

    &.description
      margin: 6pt 0
    &.date
      text-align: right
      font: 10pt/12pt $base-font-family

  a.website
    text-decoration: none
    font: 10pt/16pt $default-font-family
    > span.url, > img.icon
      vertical-align: middle
    > span.url
      margin-left: 6pt
  a.website, a.website:visited
    color: $yellow-500

  ul.tags
    padding: 6pt 0
    > li
      display: inline-block
      width: auto
      height: 18pt
      padding: 0 5pt
      margin-right: 5pt
      font: 8pt/18pt $default-font-family
      color: $yellow-500
      background-color: transparent
      border: 1pt solid $yellow-500
      border-radius: 2pt

  &.column-style-1
    background-color: $yellow-500
    margin: -6pt -8pt
    padding: 6pt 8pt
    border-radius: 3pt
    > p
      color: #222

      &.title
        font: 24pt/30pt $base-font-family
        &.smaller
          font: 18pt/24pt $base-font-family
        > a, > a:visited
          color: #222
        > a:hover
          color: #444

      &.description
        font-weight: bolder
        letter-spacing: default

    > ul.tags > li
      color: #222
      border-color: #222

  &.column-style-2
    > div.cover-img-wrapper
      margin: -6pt -8pt 6pt -8pt
      position: relative
      box-sizing: border-box
      overflow: hidden
      > img
        border-top-left-radius: 3pt
        border-top-right-radius: 3pt
        width: 100%
        height: auto
        transition: .25s
        &:hover
          transform-origin: center center
          transform: scale(1.2)
          transition: .25s
      > p.title
        position: absolute
        width: 100%
        bottom: 0
        right: 0
        text-align: right
        font: 24pt/30pt $base-font-family
        color: $yellow-500
        padding: 6pt 8pt
        background-color: transparentize(#222, .5)

        > a, > a:visited
          color: $yellow-500
        > a:hover
          color: white

        &.smaller
          font: 16pt/24pt $base-font-family

  &.column-style-3
    > div.logo-wrapper
      overflow-x: hidden
      margin-top: 4pt
      margin-bottom: 10pt
      > img.logo
        width: 50pt
        border-radius: 3pt
        height: auto
        vertical-align: middle
      > div.descriptors
        display: inline-block
        box-sizing: border-box
        padding-left: 10pt
        width: calc(100% - 50pt)
        vertical-align: middle

        > p.company
          font: 16pt/20pt $base-font-family
          > span.position
            font-size: 10pt
            color: $yellow-500

        > a.company-website
          font: 10pt/16pt $default-font-family
          color: $yellow-500
          cursor: pointer

    > div.cover-wrapper
      margin: 0 -8pt
      overflow: hidden
      > img
        width: 100%
        height: auto
        transition: .25s
        &:hover
          transform-origin: center center
          transform: scale(1.2)
          transition: .25s

    > p > a, > p > a:visited
      color: $yellow-500
    > p > a:hover
      color: white

    &.has-cover > p
      &.title
        font: 18pt/32pt $base-font-family
        color: $yellow-500

    &:not(.has-cover) > p
      &.title
        background-color: rgba(255, 255, 255, .1)
        font: 16pt/20pt $base-font-family
        margin: 0 -8pt 6pt -8pt
        padding: 8pt 6pt

@media screen and (max-width: 768px)
  section.github-projects-gallery > div.columns-wrapper > ul.column
    width: calc((100% - 15pt) / 2)
  
@media screen and (max-width: 576px)
  section.github-projects-gallery > div.columns-wrapper > ul.column
    width: 100%
  
</style>
