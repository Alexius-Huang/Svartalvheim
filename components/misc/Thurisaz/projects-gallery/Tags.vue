<template>
  <ul class="tags" :class="[theme]">
    <li v-if="wip" class="wip special">
      <img class="icon" :src="icons.warning" />
      <span class="text">Under Construction</span>
    </li><!--
 --><li v-if="developing" class="developing special">
      <img class="icon" :src="icons.fastForward" />
      <span class="text">Ongoing</span>
    </li><!--
 --><li v-for="tag in tags" :key="tag">{{ tag }}</li>
  </ul>
</template>

<script>
import fastForward from '@/assets/material/fast-forward-white.svg';
import warning from '@/assets/material/warning-white.svg';

export default {
  props: ['tags', 'developing', 'wip', 'theme'],
  data() {
    return {
      icons: { fastForward, warning },
    };
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

ul.tags, ul.tags.dark
  padding: 2pt 0 6pt 0
  > li
    display: inline-block
    width: auto
    height: 18pt
    padding: 0 5pt
    margin-right: 4pt
    font: 8pt/18pt $default-font-family
    color: $yellow-500
    background-color: transparent
    border: 1pt solid $yellow-500
    border-radius: 2pt
    margin-top: 4pt

    &.special
      @include vertical-align
      > span.text
        color: white
      > img.icon
        width: 14pt
        height: 14pt

    &.special.wip
      background-color: $red-400
      border-color: $red-400
      display: none

    &.special.developing
      border-color: $teal-500
      background-color: $teal-500

  &.light > li
    border-color: #222
    color: #222

@media screen and (max-width: 768px)
  ul.tags > li.wip.special
    display: inline-block
</style>
