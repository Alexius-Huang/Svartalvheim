<template>
  <main>
    <warning-modal />

    <section class="fenrir">
      <div
        class="parallax-wrapper"
        @scroll="handleScroll"
      >
        <div
          class="parallax-layer"
          v-for="i in 115"
          :style="styleData[i - 1]"
          :key="i"
        ><span /></div>
      </div>

      <div class="hint" :style="{ opacity: hintOpacity }">
        <h3>Scroll Down</h3>
      </div>

      <div class="main-content" :style="{ opacity: contentOpacity }">
        <h1>Fenrisúlfr</h1>
        <p>Monstrous wolf in Norse Mythology</p>
      </div>

      <div class="link-content" :style="{ opacity: linkOpacity }">
        <a class="logo" href="https://svartalvhe.im/" target="_blank">
          <img :src="logo" />
        </a>
        <p>
          Go to my <a href="https://svartalvhe.im/" target="_blank">homepage</a>
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import WarningModal from '@/components/misc/Algiz/WarningModal';
import logo from '@/assets/icons/valknut.svg';

export default {
  components: { WarningModal },
  data() {
    return {
      logo,
      contentOpacity: 0,
      hintOpacity: 1,
      linkOpacity: 0,
      styleData: Array.from(Array(115)).map(() => this.getRandomStyle()),
    };
  },
  methods: {
    handleScroll(e) {
      const target = ((12500 - window.innerHeight) / 2);
      const hintFadeThreshold = target / 2;
      const linkShowThreshold = target;
      const { scrollTop: scroll } = e.target;
      const delta = Math.abs(scroll - target);
      this.contentOpacity = 1 - (delta / target);

      if (scroll > hintFadeThreshold) {
        this.hintOpacity = 0;
      } else {
        this.hintOpacity = (hintFadeThreshold - scroll) / hintFadeThreshold;
      }
      if (scroll < linkShowThreshold) {
        this.linkOpacity = 0;
      } else {
        this.linkOpacity = (scroll - linkShowThreshold) / 200;
        this.linkOpacity = this.linkOpacity > 1 ? 1 : this.linkOpacity;
      }
    },
    getRandomStyle() {
      const translateZ = -(Math.random() * 5);
      const scale = 1 - translateZ;

      return { transform: `translateZ(${translateZ}px) scale(${scale})` };
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

// main
//   padding-bottom: 50vh

@keyframes floating
  0%
    transform: translateY(0)
  50%
    transform: translateY(15pt)
  100%
    transform: translateY(0)

section.fenrir
  width: 100vw
  height: 100vh
  > div.main-content
    position: absolute
    right: 10%
    top: 50%
    font-size: 20pt
    color: $yellow-500
    font-family: $base-font-family
    padding: 10pt 20pt
    background-image: linear-gradient(to top left, $grey-800, transparent)
    pointer-events: none
    text-align: right
    max-width: 300px
    border-right: 5pt solid $yellow-500
    > p
      font-size: 12pt

  > div.link-content
    position: absolute
    width: 100%
    text-align: center
    left: 0
    top: 0
    bottom: 0
    margin: auto 0
    transform: translateY(100px)
    height: 0
    color: $yellow-500
    font-family: $base-font-family
    pointer-events: none
    > a.logo
      pointer-events: visible
      > img
        width: 50pt
        height: 50pt
    > p
      height: 30pt
      line-height: 30pt
      font-size: 16pt
      > a
        color: $yellow-500
        pointer-events: visible

  > div.hint
    pointer-events: none
    position: absolute
    width: 100vw
    height: 100pt
    left: 0
    top: 0
    bottom: 0
    margin: auto 0
    > h3
      letters-spacing: .7pt
      height: 50pt
      line-height: 50pt
      text-align: center
      font-family: $base-font-family
      color: white

    &:before
      content: ''
      width: 0
      height: 0
      position: absolute
      border-top: 10pt solid white
      border-left: 7.5pt solid transparent
      border-right: 7.5pt solid transparent
      top: 50pt
      left: 0
      right: 0
      margin: 0 auto
      animation: floating 1.5s ease-in-out infinite

  > div.parallax-wrapper
    perspective: 1px
    overflow-x: hidden
    overflow-y: auto
    height: 100vh
    -webkit-box-reflect: right calc(-100vw - 10px) linear-gradient(to right, transparent, white);

    > div.parallax-layer
      padding: 5000px 0 7500px 0
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0

@media screen and (max-width: 768px)
  section.fenrir
    > div.parallax-wrapper
      // transform-origin: left top
      // transform: scale(.75)
      // height: 150vh
      // width: 150vw
      // -webkit-box-reflect: right calc(-150vw - 10px) linear-gradient(to right, transparent, white);
      
    > div.main-content
      top: 5%
      right: 5%
      > h1
        font-size: 24pt
      > p
        font-size: 10pt

@import '~/sass/algiz/fenrir.sass'
</style>
