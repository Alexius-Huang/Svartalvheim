<template>
  <section class="jumbotron">
    <div class="content-wrapper">
      <img :src="icons.Thor" alt="Thor-bg" class="bg">
      <h1>Hi, I'm <span class="text-wrapper">Maxwell Alexius</span>!</h1>
      <h2>Welcome To <span class="text-wrapper">Svartalvheim</span></h2>
    </div>
  </section>
</template>

<script>
import Thor from '@/assets/icons/thor-bg.svg';

export default {
  data() {
    return {
      icons: { Thor },
    };
  },
};
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css?family=Staatliches')
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'

section.jumbotron
  width: 100vw
  height: 100vh
  position: relative
  @include vertical-align
  > img.mobile-bg
    display: none

  > div.content-wrapper
    background-color: $yellow-500
    padding: 32pt 64pt 32pt 96pt
    position: relative
    animation: slideFromLeft 3s
    opacity: .85
    > img.bg
      position: absolute
      animation: slideFromRight 3s
      width: 400pt
      z-index: -1
      right: -25vw
      top: -100%

h1, h2
  font-family: 'Staatliches', 'Roboto'
  color: $grey-900
  letter-spacing: 1pt

h1
  font-size: 42pt

h2
  font-size: 30pt

@media screen and (max-width: 768px)
  section.jumbotron
    position: relative
    width: 100%
    > div.content-wrapper
      padding: 10pt
      opacity: .9

      > img.bg
        opacity: .65
        right: -40vw
        top: -150pt
        height: 350%

  h1
    font-size: 36pt

  h2
    margin-top: 12pt
    font-size: 24pt

@keyframes slideFromLeft
  0%
    opacity: 0
    transform: translateX(-100pt)
  40%
    opacity: 0
    transform: translateX(-100pt)
  100%
    opacity: .65
    transform: translateX(0)

@keyframes slideFromRight
  0%
    transform: translateX(150vw)
  40%
    transform: translateX(150vw)
  100%
    transform: translateX(0)
</style>
