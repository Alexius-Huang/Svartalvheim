<template>
  <section class="public-speech">
    <h1>Public Speech Experiences</h1>

    <ul>
      <li>
        <h2>跨越時間軸 - 創造美好使用者體驗 (Travel Through Timeline - Realizing Graceful User Experience)</h2>
        <p class="title">SITCON Taiwan, Taipei 2018</p>
        <p class="location">
          <img :src="icons.pointer" />
          Taipei, Taiwan
        </p>
        <!-- <p class="ppt">
          <img :src="icons.ppt" />
        </p> -->
        <p class="language">
          <img :src="icons.language" />
          Chinese
        </p>
        <p class="date">March 10th, 2018</p>
      </li>
      <li>
        <h2>Welcome the Brand New Ruby-like Language - Goby</h2>
        <p class="title">SITCON Hong Kong 2017</p>
        <p class="location">
          <img :src="icons.pointer" />
          Hong Kong, China
        </p>
        <p class="language">
          <img :src="icons.language" />
          English
        </p>
        <p class="date">October 2nd, 2017</p>
      </li>
    </ul>
  </section>
</template>

<script>
import pointer from '@/assets/icons/pointer.png';
import ppt from '@/assets/icons/ppt.svg';
import language from '@/assets/icons/language.png'; 

export default {
  data() {
    return {
      icons: { pointer, ppt, language },
    };
  }
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'

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
      transiiton: .25s
      &:hover
        transform: scale(1.2)
        transition: .25s

      > h2
        font-size: 20pt
        // height: 40pt
        line-height: 40pt
        border-left: 3pt solid $grey-900
        padding-left: 12pt
      > p
        font-size: 16pt
        margin-top: 8pt

        > img
          width: 16pt
          margin-right: 5pt
          opacity: 0.87
          vertical-align: middle

        &.title
          margin-top: 16pt
          font-size: 20pt
          font-weight: 500

        &.date
          color: white
          position: absolute
          top: -30pt
          left: 0
          font-size: 14pt
          font-style: italic
        
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

@media screen and (max-width: 768px)
  section.public-speech
    > h1
      font-size: 32pt
      &:before
        width: 150pt
        height: 50pt
        top: -65pt
        right: 20pt
      &:after
        border-left: 15pt solid transparent
        border-right: 15pt solid transparent
        border-bottom: 15pt solid $yellow-500
        right: 120pt
        top: -25pt

    > ul
      padding: 0
      > li
        width: 90%
        &:nth-child(2n + 1)
          margin-left: 10%
        > h2
          font-size: 16pt
          line-height: 1.5
        > p
          font-size: 12pt
        > p.date
          font-size: 14pt
        > p.title
          font-size: 14pt
          line-height: 1.7
          text-decoration: underline

          > img
            width: 14pt

        &:hover
          transform: none

@media screen and (max-width: 425px)
  section.public-speech
    > ul > li
      padding: 18pt 14pt
      > p.date
        font-size: 12pt
      > h2
        font-size: 12pt
        line-height: 1.5
        padding-left: 8pt
      > p.title
        margin-top: 6pt
        font-size: 12pt
        line-height: 1.5
</style>
