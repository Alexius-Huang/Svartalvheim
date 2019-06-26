<template>
  <section class="custom-title-wrapper">
    <div class="custom-inner-title-wrapper">
      <div class="main-img-wrapper shine-effect">
        <img class="main-img" :src="valknut" />
      </div>
      <h1 class="title">Nordic Runes</h1>
      <h2 class="sub-title">Discover Your Inner Spirit</h2>

      <p class="hint">Scroll Down</p>
    </div>
  </section>
</template>

<script>
export default { props: ['valknut'] };
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

main > section.custom-title-wrapper
  height: 100vh
  text-align: center
  @include vertical-align
  > div.custom-inner-title-wrapper
    width: 100%
    height: auto

    > div.main-img-wrapper
      display: inline-block
      height: 50vh
      width: auto
      position: relative
      overflow: hidden
      box-shadow: 0pt 0pt 5pt $yellow-500
      animation: box-shadow-animation 10s ease-in-out infinite
      animation-fill-mode: forwards
      border-radius: 3pt
      > img.main-img
        background-color: transparent
        height: 100%
        width: auto
        border: 1pt solid transparentize($yellow-500, 0.7)
        border-radius: 3pt

    > h1.title
      margin-top: 30pt
      font: 24pt/36pt $base-font-family
      color: white

    > h2.sub-title
      font: 18pt/24pt $base-font-family
      color: $yellow-500

    > p.hint
      font: bolder 12pt/20pt $default-font-family
      color: #aaa
      position: relative
      margin-top: 24pt
      &:after
        position: absolute
        content: ''
        left: 0
        right: 0
        margin: 0 auto
        bottom: -15pt
        @include triangle('bottom', 6pt, 10pt, #aaa)
        animation: floating 3s ease-in-out infinite
        animation-fill: forwards

@keyframes floating
  50%
    bottom: -35pt
  100%
    bottom: -15pt

@keyframes box-shadow-animation
  5%
    box-shadow: 0pt 0pt 10pt $yellow-500
  100%
    box-shadow: 0pt 0pt 5pt $yellow-500

/* TODO: develop better version of shine effect if possible */
.shine-effect:after
  animation: shine 15s ease-in-out infinite
  animation-fill-mode: forwards
  content: ''
  pointer-events: none
  position: absolute
  top: -150%
  left: -300%
  width: 300%
  height: 200%
  opacity: 0
  transform: rotate(30deg)
  background: linear-gradient(to right, rgba(255, 255, 255, 0.025) 0%,rgba(255, 255, 255, 0.025) 77%,rgba(255, 255, 255, 0.5) 92%,rgba(255, 255, 255, 0.0) 100%)

@keyframes shine
  5%
    opacity: 1
    top: -50%
    left: -50%
    transition-property: left, top, opacity
    transition-duration: 0.7s, 0.7s, 0.15s
    transition-timing-function: ease

  100%
    opacity: 0
    top: -50%
    left: -50%
    transition-property: left, top, opacity
</style>
