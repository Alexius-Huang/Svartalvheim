<template>
  <div class="opening">
    <h1>A Flash of Eternity</h1>

    <blockquote>
To see a World in a Grain of Sand<br />
And a Heaven in a Wild Flower,<br />
Hold Infinity in the palm of your hand<br />
And Eternity in an hour.
    </blockquote>

  </div>
</template>

<script>
export default {
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

div.opening
  > h1
    font: 50pt $base-font-family
    color: $yellow-500
  > blockquote
    font: 18pt/24pt $default-font-family
    color: white

  > video#big-bang-vid
    min-width: 100vw
    min-height: 100vh
    position: fixed
    left: 0
    top: 0
    z-index: 1
</style>
