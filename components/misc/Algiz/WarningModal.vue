<template>
  <section class="warning-modal" :class="{ show }">
    <div class="wrapper">
      <span class="warning-symbol">!</span>
      <p>
        This page adopts a non-standard styling property which may cause rendering issues.
      </p>
      <p>
        For better experience,
        it is advised to use the <span :style="{ 'text-decoration': 'underline' }">Chrome</span> browser.
      </p>

      <button @click="show = false">Understood</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return { show: true };
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'

section.warning-modal
  position: fixed
  width: 100vw
  height: 100vh
  left: 0
  top: 0
  background-color: rgba(0, 0, 0, 0.8)
  z-index: 100
  opacity: 0
  transition: .25s
  pointer-events: none
  &.show
    opacity: 1
    pointer-events: visible
    transition: .25s

  > div.wrapper
    width: 300px
    height: 250px
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    text-align: center

    > span.warning-symbol
      height: 50px
      line-height: 50px
      font-family: $base-font-family
      font-size: 24pt
      color: $grey-900
      position: relative
      &:before
        content: ''
        position: absolute
        left: -22px
        top: -8px
        z-index: -1
        width: 0
        height: 0
        border-bottom: 45px solid $yellow-500
        border-left: 25px solid transparent
        border-right: 25px solid transparent
    > p
      margin-top: 12pt
      font-family: $base-font-family
      color: $yellow-500
      font-size: 12pt
      line-height: 20pt
      letter-spacing: .7pt
      + p
        margin-top: 8pt

    > button
      color: $grey-900
      background-color: white
      border: none
      font-family: $base-font-family
      font-size: 12pt
      height: 30pt
      line-height: 30pt
      margin-top: 12pt
      padding: 0 12pt
</style>
