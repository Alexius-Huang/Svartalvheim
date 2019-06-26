<template>
  <section class="menu-section">
    <div class="menu-section-wrapper">
      <h2 class="title">What do you seek for?</h2>

      <div class="selection-group">
        <button @click="$emit('daily-rune', $event)">
          <span class="img-wrapper">
            <img :src="img.valknutSmall" alt="Daily Rune - Valknut" />
          </span>
          <span class="text">Daily Rune</span>
        </button><!--
      --><button @click="$emit('divination', $event)">
          <span class="img-wrapper">
            <img :src="img.raven" alt="Divination - Raven" />
          </span>
          <span class="text">Divination</span>
        </button><!--
      --><button @click="$emit('lore', $event)">
          <span class="img-wrapper">
            <img :src="img.vikingHelmet" alt="Lores of Rune - Odin" />
          </span>
          <span class="text">Lores of Rune</span>
        </button>
      </div>
    </div>
  </section>  
</template>

<script>
import valknutSmall from '@/assets/icons/pertho/valknut-small.svg';
import vikingHelmet from '@/assets/icons/pertho/viking-helmet.svg';
import raven from '@/assets/icons/pertho/raven.svg';

export default {
  data() {
    return {
      img: { valknutSmall, vikingHelmet, raven },
    };
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

section.menu-section
  height: 100vh
  width: 100vw
  @include vertical-align
  > div.menu-section-wrapper
    width: 100%
    height: auto
    display: inline-block
    text-align: center

    > h2.title
      font: 18pt/24pt $base-font-family
      color: white

    > div.selection-group
      margin-top: 50pt
    > div.selection-group > button
      @include btn-reset
      width: 150pt
      height: auto
      box-sizing: border-box
      background-color: transparent
      border: 3pt double transparentize($yellow-500, 0.7)
      border-radius: 3pt
      padding: 50pt 0
      opacity: .7
      transition: .25s

      + button
        margin-left: 16pt

      &:hover
        opacity: 1
        box-shadow: 0pt 0pt 5pt $yellow-500
        transition: .25s

    > div.selection-group > button > span.img-wrapper
      display: block

    > div.selection-group > button > span.img-wrapper > img
      height: 100pt
      width: 100pt
      object-fit: contain

    > div.selection-group > button > span.text
      line-height: 28pt
      font-size: 20pt

@media screen and (max-width: 769px)
  section.menu-section
    > div.menu-section-wrapper > div.selection-group > button
      opacity: 1
</style>
