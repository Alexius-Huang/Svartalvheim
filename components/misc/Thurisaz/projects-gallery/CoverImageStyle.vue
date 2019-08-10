<template>
  <div class="cover-image-style">
    <div class="cover-img-wrapper">
      <img
        :src="cover"
        @click="showPicture({ url: cover, title, content: description })"
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
    <p class="date">{{ date }}</p>
  </div>
</template>

<script>
import worldwide from '@/assets/icons/material/worldwide-main.svg';

export default {
  props: ['title', 'description', 'date', 'tags', 'link', 'website', 'cover'],
  data() {
    return {
      icons: { worldwide },
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

div.cover-image-style
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
</style>
