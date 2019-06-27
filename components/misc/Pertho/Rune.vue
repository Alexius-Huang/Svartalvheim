<template>
  <div
    class="rune-wrapper"
    @click="$emit('click', $event)"
    :style="{ 'z-index': 100 - order }"
  >
    <div class="rune" :class="{ flipped }">
      <div class="rune-face front">
        <img :src="img.valknutSmall" />
      </div>
      <div class="rune-face back">
        <img :src="runeImages[name]" />
      </div>
    </div>
  </div>
</template>

<script>
import valknutSmall from '@/assets/icons/pertho/valknut-small.svg';

export default {
  props: ['flipped', 'name', 'order'],
  data() {
    return {
      img: { valknutSmall },
    };
  },
  computed: {
    state() { return this.$store.state.pertho; },
    animating() { return this.state.animating; },
    runeImages() { return this.state.runeImages; },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

// Rune Size
$width-height-ratio: 174.18 / 104.94
$width: 100px
$height: $width * $width-height-ratio

div.rune-wrapper
  width: $width
  height: $height
  perspective: 500px
  pointer-events: visible

  > div.rune
    width: 100%
    height: 100%
    position: relative
    transition: transform 1s
    transform-style: preserve-3d
    pointer-events: none
    &.flipped
      transform: rotateY(180deg)

div.rune-wrapper > div.rune > div.rune-face
  position: absolute
  height: 100%
  width: 100%
  backface-visibility: hidden
  border: 3pt double transparentize($yellow-500, .7)
  border-radius: 3pt
  background-color: #222
  box-sizing: border-box

  > img
    border-radius: 3pt
    pointer-events: none

  &.front
    text-align: center
    @include vertical-align
    > img
      display: inline-block
      width: 60%
      height: auto
      margin-top: -10pt

  &.back
    transform: rotateY(180deg)
</style>
