<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="sass">
@import '../sass/colors.sass'

html
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16pt
  font-weight: 100
  word-spacing: 1pt
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
  color: $grey-900
  background-color: $grey-900

*, *:before, *:after
  box-sizing: border-box
  margin: 0

::-webkit-scrollbar
  width: 0px
  background: transparent

/* optional: show position indicator in red */
::-webkit-scrollbar-thumb
  // background: #FF0000

code
  font-family: 'Share Tech Mono', 'Roboto Mono', monospace
  color: $yellow-500
  padding: 3pt 5pt
  border-radius: 2pt
  background-color: transparentize($grey-900, 0.1)
</style>
