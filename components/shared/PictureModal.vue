<template>
  <div class="picture-modal" :class="{ active: data.length !== 0 }">
    <div v-if="data.length !== 0" class="img-wrapper">
      <div class="clear-btn-wrapper">
        <button class="clear-btn" @click="clear">
          <span />
          <span />
        </button>
      </div><!--

   --><img :src="info.url" /><!--

   --><div class="picture-info">
        <p class="title">{{ info.title }}</p>
        <p v-if="info.content" class="content">{{ trim(info.content, 100) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { index: 0 };
  },
  computed: {
    state() { return this.$store.state['picture-modal']; },
    data() { return this.state.data; },
    info() { return this.data[this.index]; },
  },
  methods: {
    clear() {
      this.$store.commit('picture-modal/clear');
    },
    trim(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      }
      return text;
    },
  },
  watch: {
    data() {
      this.index = 0;
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

div.picture-modal
  position: fixed
  left: 0
  top: 0
  width: 100vw
  height: 100vh
  pointer-events: none
  opacity: 0
  transition: .25s
  background-color: transparentize(#222, .2)
  z-index: 10000
  text-align: center
  @include vertical-align

  &.active
    pointer-events: visible
    opacity: 1
    transition: .25s

  > div.img-wrapper
    box-sizing: border-box
    display: inline-block
    max-width: 960px
    max-height: 720px
    position: relative
    overflow-y: hidden

    > div.clear-btn-wrapper
      position: absolute
      width: 30pt
      height: 30pt
      right: 0
      top: 0
      > button.clear-btn
        @include btn-reset
        width: 100%
        height: 100%
        background-color: #222
        > span
          position: absolute
          display: inline-block
          width: 25pt
          height: 3pt
          border-radius: 1.5pt
          background-color: $yellow-500
          transform-origin: left top
        > span:nth-child(1)
          transform: rotate(45deg)
          left: 8pt
          top: 6pt
        > span:nth-child(2)
          transform: rotate(-45deg)
          left: 6pt
          top: 23pt

    > img
      background-color: #222
      width: 100%
      height: auto

      &:hover + div.picture-info
        opacity: 1
        transition: .25s

    > div.picture-info
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      box-sizing: border-box
      padding: 16pt 12pt
      background-color: transparentize(#222, .3)
      opacity: 0
      transition: .25s
      > p
        text-align: left
      > p.title
        font: 18pt $default-font-family
        color: $yellow-500
      > p.content
        margin-top: 5pt
        font: lighter 12pt $default-font-family
        color: white

@media screen and (max-width: 960px)
  div.picture-modal > div.img-wrapper
    width: 100vw

@media screen and (max-width: 768px)
  div.picture-modal > div.img-wrapper > div.picture-info
    padding: 12pt 8pt
    > p.title
      font-size: 14pt
    > p.content
      font-size: 10pt

@media screen and (max-width: 425px)
  div.picture-modal > div.img-wrapper > div.picture-info
    display: none
</style>
