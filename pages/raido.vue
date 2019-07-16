<template>
  <main>
    <section class="leaflet-map-wrapper">
      <div id="map" ref="map" />
    </section>
  </main>
</template>

<script>
const mapURL = 'https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=7PXrAg6ZzuqHjFFS541h';

export default {
  computed: {
    state() { return this.$store.state.raido; },
    map() { return this.state.map; },
    $map() { return this.state.$map; },
  },
  methods: {
    getters(prop) {
      return this.$store.getters[`raido/${prop}`];
    },
    commit(localMutation, payload) {
      this.$store.commit(`raido/${localMutation}`, payload);
    },
    dispatch(localAction, payload) {
      this.$store.dispatch(`raido/${localAction}`, payload);
    },
  },
  async mounted() {
    const { map: $map } = this.$refs;
    if (process.browser) {
      const map = L.map('map', {
        center: [23.6978, 120.9605],
        zoom: 2,
      });
      const layer = L.tileLayer(mapURL);

      layer.addTo(map);

      this.dispatch('initialize');
    }
  },
};
</script>

<style lang="sass">
a:link[href="https://leafletjs.com"]
  display: none
</style>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

main > section.leaflet-map-wrapper
  > div#map
    background-color: #222
    width: 100vw
    height: 100vh
</style>
