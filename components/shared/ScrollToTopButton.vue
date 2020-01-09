<template>
  <button
    class="scroll-to-top"
    :class="{ show: showButton }"
    @click="scrollToTop"
  >
    <img class="icon" :src="icons.chevronUp" alt="Scroll To Top" />
  </button>
</template>

<script>
import chevronUp from '@/assets/material/chevron-up-main.svg';
import throttle from '@/utils/throttle';

export default {
  data() {
    return {
      showButton: false,
      icons: { chevronUp },
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('scroll', throttle(() => {
        this.showButton = window.scrollY > window.innerHeight;
      }, 1000 / 60));
    }
  },
};
</script>

<style lang="sass" scoped>
@import '~/sass/colors.sass'

button.scroll-to-top
  opacity: 0
  pointer-events: none
  width: 50pt
  height: 50pt
  display: inline-block
  position: fixed
  right: 50pt
  bottom: 50pt
  background-color: #222
  border: 1pt solid transparentize($yellow-500, .5)
  box-sizing: border-box
  text-align: center
  border-radius: 50%
  font-size: 0
  transition: .25s
  &:focus
    outline: none

  &.show
    opacity: 1
    pointer-events: visible
    transition: .25s

  > img.icon
    display: inline-block
    width: 36pt
    height: 36pt
    vertical-align: middle

@media screen and (max-width: 768px)
  button.scroll-to-top
    width: 30pt
    height: 30pt
    right: 30pt
    > img.icon
      width: 18pt
      height: 18pt
</style>
