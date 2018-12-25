<template>
  <section class="jumbotron">
    <div class="content-wrapper">
      <h1>Hi, I'm <span class="text-wrapper">Maxwell Alexius</span>!</h1>
      <h2>Welcome To <span class="text-wrapper">Svartalvheim</span></h2>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped lang="sass">
@import '../../sass/colors.sass'
@import '../../sass/helpers.sass'

section.jumbotron
  width: 100vw
  height: 100vh
  position: relative
  @include vertical-align

  > div.content-wrapper
    background-color: $yellow-500
    padding: 32pt 64pt 32pt 96pt

h1, h2
  font-family: 'Staatliches', 'Roboto'
  color: $grey-900
  letter-spacing: 1pt

h1
  font-size: 42pt

h2
  font-size: 30pt
  
</style>
