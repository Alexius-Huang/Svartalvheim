<template>
  <main>
    <jumbotron
      :valknut="img.valknut"
      ref="jumbotron"
      @start="navigateTo('menu')"
    />

    <menu-section
      ref="menu"
      @daily-rune="handleStartDailyRuneMode"
    />

    <template v-if="!loading">
      <runes-gallery ref="gallery" v-bind="{ runeImages, attes, attesTypes}" />
    </template>

    <section
      v-if="!loading"
      class="card-shuffle-area"
      :class="{ 'daily-rune': mode === 'Daily Rune' }"
    >
      <h2 class="sub-title">Shuffle Runes</h2>

      <shuffle-section />

      <!-- <div
        class="shuffle-section"
        :class="{ animating }"
        @mousedown="handleShuffleSectionMousedown"
      >
        <rune
          v-for="rune in deck" :key="rune.name"
          v-bind="{ flipped: rune.flipped, order: rune.order, name: rune.name }"
          :rune-image="runeImages[rune.name]"
          class="rune"
          :style="{
            left: `${rune.left}px`,
            top: `${rune.top}px`,
            transform: runeRotate(rune.rotateDegree),
          }"
        />
      </div> -->
    </section>
  </main>
</template>

<script>
import Jumbotron from '@/components/misc/Pertho/Jumbotron';
import MenuSection from '@/components/misc/Pertho/MenuSection';
import RunesGallery from '@/components/misc/Pertho/RunesGallery';
import ShuffleSection from '@/components/misc/Pertho/ShuffleSection';
import valknut from '@/assets/icons/pertho/valknut.svg';
import valknutSmall from '@/assets/icons/pertho/valknut-small.svg';

export default {
  components: { Jumbotron, MenuSection, RunesGallery, ShuffleSection },
  data() {
    /* Default width and height */
    let width = 1440;
    let height = 1080;

    if (process.browser) {
      const { innerWidth, innerHeight } = window;
      [width, height] = [innerWidth, innerHeight];
    }
    return {
      img: { valknut, valknutSmall },
      attesTypes: ['Freyr', 'Heimdallr', 'Tyr'],
      width,
      height,
    };
  },
  computed: {
    state() { return this.$store.state.pertho; },
    loading() { return this.state.loading; },
    animating() { return this.state.animating; },
    runeImages() { return this.state.runeImages; },
    runes() { return this.state.runes; },
    runeWidth() { return this.state.runeWidth; },
    runeHeight() { return this.state.runeHeight; },
    attes() { return this.getters('attes'); },
    deck() { return this.state.deck; },
    mode() { return this.state.mode; },

    $menu() {
      const { menu } = this.$refs;
      return menu ? menu.$el : null;
    },
    $jumbotron() {
      const { jumbotron } = this.$refs;
      return jumbotron ? jumbotron.$el : null;
    },
    $gallery() {
      const { gallery } = this.$refs;
      return gallery ? gallery.$el : null;
    },
  },
  methods: {
    getters(prop) {
      return this.$store.getters[`pertho/${prop}`];
    },
    commit(localMutation, payload) {
      this.$store.commit(`pertho/${localMutation}`, payload);
    },
    dispatch(localAction, payload) {
      this.$store.dispatch(`pertho/${localAction}`, payload);
    },
    animate(animateAction, payload) {
      this.$store.dispatch(`pertho/animation/${animateAction}`, payload);
    },
    navigateTo(section) {
      const $el = this[`$${section}`];
      const { top } = $el.getBoundingClientRect();
      window.scrollTo({ top, left: 0, behavior: 'smooth' });
    },

    async handleStartDailyRuneMode() {
      this.commit('set-mode', 'Daily Rune');

      await this.animate('showoff-deck');
    },
  },
  async mounted() {
    await this.dispatch('initialize');
  },
}
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

main
  height: 100vh
  width: 100vw

// // Rune Size
// $width-height-ratio: 174.18 / 104.94
// $width: 100px
// $height: $width * $width-height-ratio

main > section.card-shuffle-area
  pointer-events: none
  position: fixed
  left: 0
  top: 0
  width: 100vw
  height: 100vh
  background-color: #222
  opacity: 0
  font: 12pt $base-font-family
  color: $yellow-500
  pointer-events: none

  &.daily-rune
    pointer-events: visible
    opacity: 1
    transition: .25s
  
  > h2.sub-title
    text-align: center
    margin: auto 0
    margin: 24pt 0
    font: 24pt $base-font-family
    color: $yellow-500

  // > div.shuffle-section
  //   width: 100vw
  //   height: 100vh
  //   position: absolute
  //   left: 0
  //   top: 0
  //   // pointer-events: none

  //   > .rune
  //     position: absolute
  //     transform: translate(-$width / 2, -$height / 2)
  //     transition: left .25s, top .25s
  //     pointer-events: visible

  //   // &.animating > .rune
  //   //   pointer-events: none
</style>
