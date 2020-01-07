<template>
  <section class="introduction">
    <div class="title-wrapper">
      <h1 class="title">{{ t1 }}<span class="highlight">{{ t2 }}</span>_</h1>
    </div>

    <div class="info-wrapper">
      <a target="_blank" href="https://github.com/Maxwell-Alexius" data-link-name="> GitHub">
        > GitHub
      </a>
      <a target="_blank" href="https://twitter.com/AlexiusMaxwell" data-link-name="> Twitter">
        > Twitter
      </a>
      <a target="_blank" href="mailto:alexius.huang@gmail.com" data-link-name="> Gmail">
        > Gmail
      </a>
    </div>

    <div class="description-wrapper">
      <p class="description">Passionated Front-End Developer which has both experience on working in the office and working as a contractor remotely.</p>
      <p class="description">Eagers to dedicate time to improve the programming skills, diving deep into JavaScript, learning from design patterns and from building the tools from scratch.</p>
      <p class="description">Appreciates the art of coding and values maintainability as an important role in developing projects and products.</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      titleText: [
        'About ',
        'Maxwell',
      ],
      t1: '',
      t2: '',
      textAnimationInterval: null,
      textAnimationTimeout: null,
    };
  },
  mounted() {
    const setTextAnimation = () => {
      return window.setInterval(() => {
        if (this.t1 !== this.titleText[0]) {
          this.t1 += this.titleText[0][this.t1.length];
        } else if (this.t2 !== this.titleText[1]) {
          this.t2 += this.titleText[1][this.t2.length];
        } else {
          window.clearInterval(this.textAnimationInterval);
          this.textAnimationTimeout = window.setTimeout(() => {
            this.t1 = '';
            this.t2 = '';
            this.textAnimationInterval = setTextAnimation();
          }, 3000);
        }
      }, 50);
    }
    this.textAnimationInterval = setTextAnimation();
  },
  beforeDestroy() {
    window.clearInterval(this.textAnimationInterval);
    window.clearTimeout(this.textAnimationTimeout);
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'

section.introduction
  width: 80vw
  margin: 0 auto

div.title-wrapper
  h1.title
    height: 72pt
    line-height: 72pt
    border-left: 10pt solid white
    padding-left: 24pt
    color: white
    letter-spacing: 1pt
    margin-bottom: 24pt
    font-size: 48pt
    &:before
      content: ' $> '
    > span.highlight
      color: $yellow-500

div.info-wrapper
  font-size: 0
  > a
    background-color: white
    font-family: $base-font-family
    text-decoration: none
    display: inline-block
    height: 42pt
    line-height: 42pt
    font-size: 24pt
    padding: 0 12pt
    border-radius: 1pt
    background-color: #444
    color: $yellow-500
    opacity: .6
    transition: .25s
    position: relative
    margin-right: 6pt

    &:hover
      opacity: 1
      transition: .25s

    &:after
      pointer-events: none
      position: absolute
      width: 0
      height: 42pt
      line-height: 42pt
      display: inline-block
      border-radius: 1pt
      left: 0
      top: 0
      color: #333
      background-color: $yellow-500
      box-sizing: border-box
      content: attr(data-link-name)
      overflow: hidden
    &:hover:after
      width: 100%
      padding: 0 12pt
      transition: width .25s

div.description-wrapper
  margin-top: 12pt
  > p.description
    font-weight: 500
    font-size: 18pt
    line-height: 1.7
    letter-spacing: 1pt
    color: white
    &:first-letter
      color: $yellow-500
      font-size: 24pt
    + p.description
      margin-top: 16pt

@media screen and (max-width: 768px)
  div.title-wrapper
    height: 96pt
    margin-bottom: 24pt
    h1.title
      font-size: 32pt
      height: auto
      line-height: 48pt
      &:before
        content: ''

  div.info-wrapper
    margin-top: -6pt
    > a
      font-size: 18pt
      color: #333
      background-color: $yellow-500
      opacity: 1
      height: 32pt
      line-height: 32pt
      margin-top: 6pt
      &:after
        display: none

  p.description
    font-size: 16pt
    line-height: 1.7
</style>
