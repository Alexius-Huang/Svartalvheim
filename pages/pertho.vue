<template>
  <main>
    <jumbotron :valknut="img.valknut" />
    
    <template v-if="!loading">
      <runes-gallery v-bind="{ runeImages, attes, attesTypes }" />
    </template>

    <section class="ui-section">
      <!-- TODO: UI -->
    </section>
  </main>
</template>

<script>
import Jumbotron from '@/components/misc/Pertho/Jumbotron';
import RunesGallery from '@/components/misc/Pertho/RunesGallery';
import valknut from '@/assets/icons/elder-futhark/valknut.svg';

export default {
  components: { Jumbotron, RunesGallery },
  data() {
    return {
      img: { valknut },
      attesTypes: ['Freyr', 'Heimdallr', 'Tyr'],
    };
  },
  computed: {
    state() { return this.$store.state.pertho; },
    loading() { return this.state.loading; },
    runeImages() { return this.state.runeImages; },
    runes() { return this.state.runes; },
    attes() { return this.getters('attes'); },
  },
  methods: {
    getters(prop) {
      return this.$store.getters[`pertho/${prop}`];
    }
  },
  async mounted() {
    await this.$store.dispatch('pertho/fetch-rune-images');
    console.log(this.attes);
  },
}
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

main > section.ui-section
  height: 100vh
  width: 100vw
</style>
