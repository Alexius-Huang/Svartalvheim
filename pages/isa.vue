<template>
  <main :style="scrollTotalHeightStyle">
    <div class="video-wrapper">
      <video
        @loadeddata="handleVideoLoaded"
        id="bg-vid" preload autobuffer ref="$video"
      >
        <source
          type="video/webm; codecs=&quot;vp8, vorbis&quot;"
          src="instance-of-eternity/big-bang-resize.webm"
        />
      </video>
    </div>

    <div class="universe-wrapper">
      <div class="time"><span class="specific-time" v-html="universeBornSince" />  years after Big Bang</div>

      <opening class="content-block" />
    </div>
  </main>
</template>

<script>
import Opening from '@/components/misc/Isa/Opening';

export default {
  components: { Opening },
  data() {
    return {
      scrollPosition: 0,
      openingHeight: 10000,
      powerHeightScale: 3000,
      totalPowers: 150,
      startingPower: -50,

      duration: 0,
      playbackConstant: 500,
      startScrollPosition: 5000,
      videoScrollDurationHeight: NaN,
    };
  },
  computed: {
    scrollTotalHeightStyle() {
      const { openingHeight: OH, powerHeightScale: PHS, totalPowers: TP } = this;
      const totalHeight = OH + PHS * TP;
      return { height: `calc(100vh + ${totalHeight}px)` };
    },
    universeBornSince() {
      const { openingHeight: OH, scrollPosition: _SP, powerHeightScale: PHS } = this;
      if (_SP < OH) return 0;
      const SP = _SP - OH;

      const remainderScale = SP % PHS;
      const power = Math.floor(SP / PHS) - 50;

      if (power < 0) {
        const divident = (PHS / 9) * 10;
        const normal = 1 + (Math.pow(2, remainderScale / (PHS / 10)) / divident);
        return `${this.round(normal, 2)} × 10<sup><small>${power}</smaller></sup>`;
      }

      return `10<sup><small>${power}</small></sup>`;
    },
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY;
      const { $video } = this.$refs;
      $video.pause();
      console.log(this.scrollPosition);
    },
    handleVideoLoaded() {
      const { $video } = this.$refs;
      this.duration = $video.duration;
      this.videoScrollDurationHeight = Math.floor($video.duration) * this.playbackConstant;

      function scrollUpdateVideo() {
        const {
          scrollPosition: SP,
          startScrollPosition: SSP,
          videoScrollDurationHeight: VSDH,
          playbackConstant: PC,
        } = this;
        if (SP > SSP || SP < (SSP + VSDH)) {
          const frameNumber = (SP - SSP) / PC;

          $video.currentTime = frameNumber;
        }
      }

      window.setInterval(scrollUpdateVideo.bind(this), 1000 / 60);
    },
    round(number, power) {
      const tensOfPower = Math.pow(10, power);
      return Math.round(number * tensOfPower) / tensOfPower; 
    },
  },
  // watch: {
  //   scrollPosition() {
  //   },
  // },
  mounted() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

main
  position: relative
  height: calc(100vh + 150000px)

  > div.video-wrapper
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    > video#bg-vid
      display: block
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      z-index: 1

  > div.universe-wrapper
    pointer-events: none
    width: 100vw
    height: 100vh
    position: fixed
    left: 0
    top: 0

    > div.time
      position: absolute
      width: 100vw
      height: 30pt
      text-align: center
      font: 18pt/30pt $base-font-family
      color: white
      bottom: 20pt
      left: 0

      > span.specific-time
        color: $yellow-500
        font-size: 24pt
        margin-right: 5pt

@media screen and (max-aspect-ratio: 1920/1080)
  div.video-wrapper > video#bg-vid
    height: 100%

@media screen and (min-aspect-ratio: 1920/1080)
  div.video-wrapper > video#bg-vid
    width: 100%
</style>
