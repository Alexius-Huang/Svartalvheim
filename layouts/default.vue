<template>
  <div>
    <transition
      name="fade"
      mode="out-in"
    >
      <nuxt/>
    </transition>

    <div ref="scriptHolder"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('async', '');
    scriptEl.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=UA-133870809-1');
    this.$refs.scriptHolder.appendChild(scriptEl);

    const googleAnalyticScript = document.createElement('script');
    googleAnalyticScript.innerText = "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-133870809-1');";
    this.$refs.scriptHolder.appendChild(googleAnalyticScript);
  },
};
</script>


<style lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'

html
  font-family: $default-font-family
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
  user-select: none

.fade-enter-active,
.fade-leave-active
  transition-duration: 0.3s
  transition-property: opacity
  transition-timing-function: ease

.fade-enter,
.fade-leave-active
  opacity: 0

ul
  padding: 0
li
  list-style-type: none

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
