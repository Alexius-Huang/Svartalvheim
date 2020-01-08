<template>
  <div v-if="wip" class="wip-ribbon-wrapper">
    <div class="wip-ribbon">
      <img class="icon" :src="icons.warning" />
      <span class="text">Under Construction</span>
      <img class="icon" :src="icons.warning" />
    </div>
  </div>
</template>

<script>
import warning from '@/assets/material/warning-white.svg'; 

export default {
  props: ['wip'],
  data() { return { icons: { warning } }; },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

$ribbon-height: 30pt
div.wip-ribbon-wrapper
  pointer-events: none
  position: absolute
  overflow: hidden
  left: 8pt
  top: 6pt
  margin: -6pt -8pt
  width: 100%
  height: 100%
  z-index: 10
  transition: .25s

div.wip-ribbon-wrapper > div.wip-ribbon
  position: absolute
  left: -25%
  top: 50%
  width: 150%
  height: $ribbon-height
  background-color: transparentize($red-400, .2)
  text-align: center
  transform-origin: center center
  transform: rotate(10deg)
  @include vertical-align

  > span.text
    color: white
    font: 12pt/30pt $base-font-family
</style>
