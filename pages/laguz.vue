<template>
  <main>
    <div class="title-wrapper">
      <h1 class="title">UI Design Portfolio</h1>
    </div>

    <ul class="aside-menu">
      <li>Loader</li>
      <li>Buttons</li>
      <li>Inputs</li>
    </ul>
  </main>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="sass">
@import '../sass/colors.sass'
@import '../sass/shared.sass'
@import '../sass/helpers.sass'

main
  display: block
  width: 960px
  margin: 0 auto
  @include title-style

  > div.title-wrapper
    margin-top: 50pt

  > ul.aside-menu
    width: 200pt
    height: 100vh
    position: fixed
    right: 0
    top: 0
    padding-top: 30pt
    > li
      display: block
      width: 200pt
      height: 30pt
      line-height: 30pt
      box-sizing: border-box
      padding-left: 10pt
      border-left: 3pt solid transparent
      font-size: 12pt
      color: white
      font-family: $base-font-family
      transition: .25s

      + li
        margin-top: 5pt

      &:hover
        border-left-color: $yellow-500
        transition: .25s

</style>
