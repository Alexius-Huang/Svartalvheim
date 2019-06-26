<template>
  <main>
    <jumbotron
      :valknut="img.valknut"
      ref="jumbotron"
      @start="navigateTo('ui')"
    />

    <section class="ui-section" ref="ui">
      <div class="ui-section-wrapper">
        <h2 class="title">What do you seek for?</h2>

        <div class="selection-group">
          <button>
            <span class="img-wrapper">
              <img :src="img.valknutSmall" alt="Daily Rune - Valknut" />
            </span>
            <span class="text">Daily Rune</span>
          </button><!--
       --><button>
            <span class="img-wrapper">
              <img :src="img.raven" alt="Divination - Raven" />
            </span>
            <span class="text">Divination</span>
          </button><!--
       --><button>
            <span class="img-wrapper">
              <img :src="img.vikingHelmet" alt="Lores of Rune - Odin" />
            </span>
            <span class="text">Lores of Rune</span>
          </button>
        </div>
      </div>
    </section>

    <template v-if="!loading">
      <runes-gallery ref="gallery" v-bind="{ runeImages, attes, attesTypes}" />
    </template>
  </main>
</template>

<script>
import Jumbotron from '@/components/misc/Pertho/Jumbotron';
import RunesGallery from '@/components/misc/Pertho/RunesGallery';
import valknut from '@/assets/icons/pertho/valknut.svg';
import valknutSmall from '@/assets/icons/pertho/valknut-small.svg';
import vikingHelmet from '@/assets/icons/pertho/viking-helmet.svg';
import raven from '@/assets/icons/pertho/raven.svg';

export default {
  components: { Jumbotron, RunesGallery },
  data() {
    return {
      img: { valknut, valknutSmall, vikingHelmet, raven },
      attesTypes: ['Freyr', 'Heimdallr', 'Tyr'],
    };
  },
  computed: {
    state() { return this.$store.state.pertho; },
    loading() { return this.state.loading; },
    runeImages() { return this.state.runeImages; },
    runes() { return this.state.runes; },
    attes() { return this.getters('attes'); },

    $ui() { return this.$refs.ui; },
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
    navigateTo(section) {
      const $el = this[`$${section}`];
      const { top } = $el.getBoundingClientRect();
      window.scrollTo({ top, left: 0, behavior: 'smooth' });
    },
  },
  async mounted() {
    const { commit, dispatch } = this.$store;
    await dispatch('pertho/initialize');
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

main > section.ui-section
  height: 100vh
  width: 100vw
  @include vertical-align
  > div.ui-section-wrapper
    width: 100%
    height: auto
    display: inline-block
    text-align: center

    > h2.title
      font: 18pt/24pt $base-font-family
      color: white

    > div.selection-group
      margin-top: 50pt
    > div.selection-group > button
      @include btn-reset
      width: 150pt
      height: auto
      background-color: transparent
      border: 1pt solid transparentize($yellow-500, 0.7)
      border-radius: 3pt
      padding: 50pt 0
      opacity: .7
      transition: .25s

      + button
        margin-left: 16pt

      &:hover
        opacity: 1
        box-shadow: 0pt 0pt 5pt $yellow-500
        transition: .25s

    > div.selection-group > button > span.img-wrapper
      display: block

    > div.selection-group > button > span.img-wrapper > img
      height: 100pt
      width: 100pt
      object-fit: contain

    > div.selection-group > button > span.text
      line-height: 28pt
      font-size: 20pt

@media screen and (max-width: 769px)
  main > section.ui-section
    > div.ui-section-wrapper > div.selection-group > button
      opacity: 1
</style>
