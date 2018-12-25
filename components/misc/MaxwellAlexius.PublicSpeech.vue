<template>
  <section class="public-speech">
    <h1>Public Speech Experiences</h1>

    <ul>
      <li>
        <h2>SITCON Taiwan, Taipei 2018</h2>
        <p>跨越時間軸 - 創造美好使用者體驗 (Travel Through Timeline - Realizing Graceful User Experience)</p>
      </li>
      <li>
        <h2>SITCON Hong Kong 2017</h2>
        <p>Welcome the Brand New Ruby-like Language - Goby</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
};
</script>

<style scoped lang="sass">
@import '../../sass/colors.sass'
@import '../../sass/helpers.sass'

section.public-speech
  > h1
    text-align: center
    color: white
    font-size: 48pt
    width: 80vw
    margin: 0 auto
    position: relative
    animation: speech-animation 5s infinite
    &:before
      content: ''
      position: absolute
      width: 200pt
      height: 75pt
      border-radius: 5pt
      background-color: $yellow-500
      right: 50pt
      top: -100pt
    &:after
      content: ''
      position: absolute
      border-left: 30pt solid transparent
      border-right: 30pt solid transparent
      border-bottom: 30pt solid $yellow-500
      right: 175pt
      top: -50pt
      transform: rotate(-45deg)

  > ul
    width: 80vw
    margin-top: 96pt
    margin: 96pt auto 0 auto
    > li
      list-style-type: none
      color: $grey-900
      letter-spacing: 1pt
      width: 75%
      box-sizing: border-box
      padding: 24pt 18pt
      border-radius: 5pt
      position: relative
      > h2
        font-size: 24pt
        height: 40pt
        line-height: 40pt
        border-left: 3pt solid $grey-900
        padding-left: 12pt
      > p
        font-size: 16pt
        margin-top: 8pt
        
      + li
        margin-top: 48pt

      &:nth-child(2n + 1)
        margin-left: 25%
        background-color: $yellow-500
        &:before
          content: ''
          position: absolute
          border-left: 30pt solid transparent
          border-right: 30pt solid transparent
          border-bottom: 30pt solid $yellow-500
          transform: rotate(45deg)
          right: 0
          bottom: -15pt

      &:nth-child(2n)
        background-color: white
        &:before
          content: ''
          position: absolute
          border-left: 30pt solid transparent
          border-right: 30pt solid transparent
          border-bottom: 30pt solid white
          transform: rotate(-45deg)
          left: 0
          bottom: -15pt
@keyframes speech-animation
  0%
    transform: rotate(0)
  2.5%
    transform: rotate(-10deg)
  7.5%
    transform: rotate(10deg)
  10%
    transform: rotate(0deg)
</style>
