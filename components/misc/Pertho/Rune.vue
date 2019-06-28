<template>
  <div
    class="rune-wrapper"
    @click="$emit('click', $event)"
    :style="{ 'z-index': 100 - order }"
    :class="{ 'enable-rotate': enableRotate }"
  >
    <div class="rune" :class="{ flipped }">
      <div class="rune-face front">
        <img :src="img.valknutSmall" />
      </div>
      <div class="rune-face back">
        <img :src="runeImages[name]" />
      </div>
    </div>

    <button
      v-for="position in positions" :key="position.join(',')"
      @mousedown="handleRotateBtnMousedown({ event: $event, position })"
      class="rotate-btn" :class="position" ref="rotate-btns"
    ></button>
  </div>
</template>

<script>
import valknutSmall from '@/assets/icons/pertho/valknut-small.svg';

export default {
  props: ['flipped', 'name', 'order', 'enableRotate'],
  data() {
    return {
      img: { valknutSmall },
      rotating: false,
      positions: [
        ['left', 'top'],
        ['left', 'bottom'],
        ['right', 'top'],
        ['right', 'bottom'],
      ],
    };
  },
  computed: {
    state() { return this.$store.state.pertho; },
    animating() { return this.state.animating; },
    runeImages() { return this.state.runeImages; },
    rotateBtns() { return this.$refs['rotate-btns']; },
  },
  methods: {
    handleRotateBtnMousedown({ event, position }) {
      const { rotateBtns } = this;
      this.$emit('rotate-start', { event, position, rotateBtns });
    },
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
  position: relative

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

$btn-area-size: 20px
$btn-visible-size: 5px
div.rune-wrapper > button.rotate-btn
  position: absolute
  @include btn-reset
  display: inline-block
  width: $btn-area-size
  height: $btn-area-size
  border-radius: $btn-area-size / 2
  background-color: transparent
  pointer-events: none

  &.left
    left: 0
  &.right
    right: 0
  &.top
    top: 0
  &.bottom
    bottom: 0
  &:before
    content: ''
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    display: inline-block
    width: $btn-visible-size
    height: $btn-visible-size
    border-radius: $btn-visible-size / 2
    pointer-events: none
    background-color: transparent

div.rune-wrapper.enable-rotate > button.rotate-btn
  pointer-events: visible
  &:before
    background-color: transparentize($yellow-500, .5)
</style>
