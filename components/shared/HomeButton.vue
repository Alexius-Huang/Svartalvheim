<template>
  <button class="home-btn" @click="handleNavigation">
    <img class="icon" :src="icons.home" alt="home" />

    <span class="hover-style" />
    <img class="hover-icon" :src="icons.homeDark" />
  </button>
</template>

<script>
import home from '@/assets/material/home-main.svg';
import homeDark from '@/assets/material/home-dark.svg';

export default {
  data() {
    return {
      icons: { home, homeDark },
    };
  },
  methods: {
    handleNavigation() {
      this.$router.push({ name: 'maxwell-alexius' });
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

button.home-btn
  @include btn-reset
  display: inline-block
  z-index: 999998
  position: fixed
  height: 36pt
  width: 36pt
  right: 30pt
  top: 30pt
  text-align: center
  box-sizing: border-box
  border: 1pt solid transparentize($yellow-500, .5)
  border-radius: 50%
  cursor: pointer
  overflow: hidden
  > img.icon
    display: inline-block
    vertical-align: middle
    pointer-events: none
    width: 24pt
    height: 24pt

  > span.hover-style
    position: absolute
    display: inline-block
    left: -50%
    top: -50%
    box-sizing: border-box
    text-align: center
    width: 200%
    height: 0
    transform: rotate(-45deg)
    background-color: $yellow-500
    pointer-events: none
    transition: .25s
  > img.hover-icon
    position: absolute
    display: inline-block
    opacity: 0
    width: 24pt
    height: 24pt
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto

  &:hover > span.hover-style
    height: 200%
    transition: .25s
  &:hover > img.hover-icon
    opacity: 1
    transition: .25s
</style>
