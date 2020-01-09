<template>
  <div class="message-modal" :class="{ hide }">
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['message', 'hide'],
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'

div.message-modal
  display: inline-block
  position: fixed
  pointer-events: none
  opacity: 1
  bottom: 20vh
  left: 0
  right: 0
  margin: 0 auto
  width: 200pt
  z-index: 10000
  background-color: $yellow-500
  color: #222
  border-radius: 3pt
  padding: 6pt 10pt
  transition: .25s
  &.hide
    opacity: 0
    transition: .25s
  > p.message
    text-align: center
    font-size: 12pt
    font-weight: bold
</style>
