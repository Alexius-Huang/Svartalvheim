<template>
  <section class="contact">
    

    <div class="screen-wrapper">
      <span class="screen">
        <span class="header-bar">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <span class="url-input-bar">
          <div class="input-bar">
            {{ t1 }}_
          </div>
        </span>

        <span class="content-section">
          <a href="https://www.facebook.com/wyvern.maxwell.alexius" target="_blank" class="file">
            <span class="inner-file-wrapper">
              <img :src="icons.Facebook" alt="Facebook" />
              <span class="title">Facebook</span>
            </span>
          </a>
          <a href="https://www.linkedin.com/in/huang-alexius-a95258a4/" target="_blank" class="file">
            <span class="inner-file-wrapper">
              <img :src="icons.LinkedIn" alt="LinkedIn" />
              <span class="title">LinkedIn</span>
            </span>
          </a>
          <a href="https://medium.com/@maximilianhuang" target="_blank" class="file">
            <span class="inner-file-wrapper">
              <img :src="icons.Medium" alt="Medium" />
              <span class="title">Medium</span>
            </span>
          </a>
          <a href="https://github.com/Maxwell-Alexius" target="_blank" class="file">
            <span class="inner-file-wrapper">
              <img :src="icons.GitHub" alt="GitHub" />
              <span class="title">GitHub</span>
            </span>
          </a>
        </span>
      </span>
    </div>
  </section>
</template>

<script>
import Facebook from '@/assets/icons/social-media/facebook.png';
import LinkedIn from '@/assets/icons/social-media/linkedin.png';
import Medium from '@/assets/icons/social-media/medium.png';
import GitHub from '@/assets/icons/social-media/github.png';

export default {
  data() {
    return {
      text: ['Maxwell-Alexius\'s Info'],
      t1: '',
      textAnimationInterval: null,
      textAnimationTimeout: null,
      icons: { Facebook, LinkedIn, Medium, GitHub },
    };
  },
  mounted() {
    const setTextAnimation = () => {
      return window.setInterval(() => {
        if (this.t1 !== this.text[0]) {
          this.t1 += this.text[0][this.t1.length];
        } else {
          window.clearInterval(this.textAnimationInterval);
          this.textAnimationTimeout = window.setTimeout(() => {
            this.t1 = '';
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
@import '~/sass/helpers.sass'

section.contact
  height: 50vh

div.screen-wrapper
  width: 100vw
  position: relative
  > span.screen
    position: absolute
    left: 0
    right: 0
    top: 0
    margin: 0 auto
    display: inline-block
    width: 50vw
    height: 70vh
    border: 1pt solid white
    border-radius: 5pt
    box-sizing: border-box
    > span.header-bar
      display: block
      width: 100%
      height: 30pt
      line-height: 30pt
      border-bottom: 1pt solid white
      box-sizing: border-box
      @include vertical-align
      font-size: 0

      > span
        display: inline-block
        width: 10pt
        height: 10pt
        border-radius: 50%
        border: 1pt solid white
        box-sizing: border-box
        margin-left: 10pt
        + span
          margin-left: 6pt

    > span.url-input-bar
      background-color: rgba(255, 255, 255, 0.32)
      height: 25pt
      width: 100%
      display: inline-block
      border-bottom: 1pt solid white
      padding-left: 5pt

      > div.input-bar
        background-color: $grey-900
        width: 80%
        padding: 0 8pt
        height: 20pt
        line-height: 20pt
        font-size: 12pt
        color: white
        font-family: 'Share Tech Mono', 'Roboto Mono', monospace
        border: 1pt solid white
        margin-top: 2pt
        box-sizing: border-box

    > span.content-section
      cursor: pointer
      display: block
      width: 100%
      height: calc(100% - 55pt)
      text-align: center
      padding-top: 5%
      overflow-y: auto

      > a
        display: inline-block
        width: 150pt
        height: 150pt
        opacity: 0.54
        text-align: center
        @include vertical-align
        transition: .25s
        &:hover
          opacity: 0.87
          transform: scale(1.2)
          transition: .25s
          > span.inner-file-wrapper > img
            background-color: $yellow-500
            border-color: $yellow-500
            transition: .25s
        > span.inner-file-wrapper
          width: 55%
          display: inline-block
          > img
            box-sizing: border-box
            border: 3pt solid white
            border-radius: 50%
            background-color: white
            width: 100%
          > span.title
            color: white
            font-weight: 500
            font-size: 14pt

@media screen and (max-width: 768px)
  div.screen-wrapper
    > span.screen
      height: 300pt
      width: 90vw
      > span.content-section
        > a
          width: 100pt
          height: 100pt
</style>
