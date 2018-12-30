<template>
  <section class="introduction">
    <div class="title-wrapper">
      <h1 class="title">{{ t1 }}<span class="highlight">{{ t2 }}</span>_</h1>
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
@import '../../sass/colors.sass'

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

p.description
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

  p.description
    font-size: 16pt
    line-height: 1.7
</style>
