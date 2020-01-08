<template>
  <div
    class="project-info full-post-style"
    :class="{ 'has-cover': cover !== null }"
  >
    <under-construction-ribbon class="ribbon-wrapper" :wip="wip" />

    <div class="logo-wrapper">
      <img class="logo" :src="logo" /><!--
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
        :src="cover"
        class="cover"
        @click="showPicture({ url: cover, title, content: description })"
      /><!--
  --></div><!--
  --><p class="title">
      <a v-if="link !== null" target="_blank" :href="link">{{ title }}</a>
      <template v-else>{{ title }}</template>
    </p>

    <!-- Links -->
    <a v-if="contributionLink" class="contribution-link" :href="contributionLink" target="_blank">
      <img class="icon" :src="icons.done" />
      <span class="content">Check Out My Contribution!</span>
    </a>
    <a v-if="website" class="website" :href="website" target="_blank">
      <img class="icon" :src="icons.worldwide" />
      <span class="url">{{ trim(website, 25) }}</span>
    </a>

    <tags v-bind="{ tags, developing, wip }" theme="dark" />
    <p class="description">{{ description }}</p>
    <p class="date">{{ date }}</p>
  </div>
</template>

<script>
import Tags from './Tags';
import UnderConstructionRibbon from './UnderConstructionRibbon';
import worldwide from '@/assets/material/worldwide-main.svg';
import done from '@/assets/material/done-teal-500.svg';

export default {
  components: { Tags, UnderConstructionRibbon },
  props: [
    'title',
    'description',
    'link',
    'date',
    'tags',
    'cover',
    'logo',
    'company',
    'position',
    'companyWebsite',
    'website',
    'wip',
    'developing',
    'contributionLink',
  ],
  data() {
    return {
      icons: { worldwide, done },
    };
  },
  methods: {
    showPicture(info) {
      this.$store.commit('picture-modal/setData', [info]);
    },
    trim(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      }

      return text;
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'
@import './_shared.sass'

div.full-post-style
  position: relative

  > div.ribbon-wrapper
    margin: -6pt -16pt
    width: calc(100% + 16pt)

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
</style>
