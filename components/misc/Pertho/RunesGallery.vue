<template>
  <section class="runes-gallery">
    <div
      v-for="type in attesTypes"
      :key="type"
      class="runes-section"
    >
      <h3 class="rune-type-title">{{ type }}'s Åtte</h3>
      <span v-for="r in attes[type]" :key="r.name" class="rune-wrapper">
        <img :src="runeImages[r.name]" />
      </span>
    </div>
  </section>
</template>

<script>
export default { props: ['runeImages', 'attesTypes', 'attes'] };
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

$rune-width: 100pt
$rune-between-gap: 15pt
$runes-per-row: 4
$row-between-gap: 15pt

section.runes-gallery
  padding-top: 100pt
  width: ($rune-width + $rune-between-gap) * $runes-per-row
  margin: 0 auto
  text-align: center
  > div.runes-section
    display: block
    height: 100vh

    > h3.rune-type-title
      font: 32pt/50pt $base-font-family
      color: white

  > div.runes-section > span.rune-wrapper
    display: inline-block
    width: $rune-width
    margin-right: $rune-between-gap
    border: 1pt solid transparentize($yellow-500, .5)
    border-radius: 3pt
    margin-top: $row-between-gap
    position: relative
    overflow: hidden
    transition: box-shadow .25s
    &:nth-child(#{$runes-per-row}n + 1)
      margin-right: 0

    &:hover
      box-shadow: 0pt 0pt 5pt $yellow-500
      transition: box-shadow .25s

    &::after
      content: ''
      pointer-events: none
      display: inline-block
      position: absolute
      width: 100%
      height: 100%
      left: -100%
      top: -150%
      transition: top .25s
      $shade-1: rgba(255, 255, 255, 0.025)
      $shade-2: rgba(255, 255, 255, 0.1)
      $shade-3: rgba(255, 255, 255, 0.15)
      $shade-position: 60%
      background: linear-gradient(to right, transparent 0%, $shade-1 $shade-position, $shade-2 ($shade-position + 7.5%), $shade-3 ($shade-position + 9%), $shade-2 ($shade-position + 11%), $shade-1 ($shade-position + 16%), transparent 100%)
      transform: rotate(60deg)

    &:hover::after
      top: 0
      left: 0
      transition: top .25s

  > div.runes-section > span.rune-wrapper > img
    width: 100%
    height: auto
    background-color: transparent
    border-radius: 3pt
</style>
