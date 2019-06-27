<template>
  <div
    class="shuffle-section"
    :class="{ animating }"
    @mousedown="handleMousedown"
  >
    <rune
      v-for="(rune, index) in deck" :key="rune.name"
      v-bind="{
        flipped: rune.flipped,
        name: rune.name,
        order: index + 1,
      }"
      class="rune" :class="{ holding }"
      :data-deck-index="index"
      :style="{
        left: `${rune.left}px`,
        top: `${rune.top}px`,
        transform: runeRotate(rune.rotateDegree),
        transition: holding ? 'none' : 'left .25s, top .25s',
      }"
    />
  </div>
</template>

<script>
import throttle from '@/utils/throttle';
import Rune from '@/components/misc/Pertho/Rune';

export default {
  components: { Rune },
  data() {
    return {
      holding: false,

      previousPosition: [],
    };
  },
  computed: {
    state() { return this.$store.state.pertho; },
    animating() { return this.state.animating; },
    runes() { return this.state.runes; },
    runeWidth() { return this.state.runeWidth; },
    runeHeight() { return this.state.runeHeight; },
    deck() { return this.state.deck; },
  },
  methods: {
    runeRotate(degree) {
      const { runeWidth: rw, runeHeight: rh } = this;
      return `translate(${-rw / 2}px, ${-rh / 2}px) rotate(${degree}deg)`;
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

    handleMousedown(event) {
      if (this.animating) return;
      const { target: $el } = event;

      if ($el.classList.contains('rune')) {
        this.holding = true;
        const index = Number.parseInt($el.getAttribute('data-deck-index'), 10);
        const { pageX: x, pageY: y } = event;
        this.previousPosition = [x, y];
        this.commit('place-rune-to-top', index);
      }
    },
    handleMousemove: throttle(function (event) {
      if (this.animating) return;

      if (this.holding) {
        const { deck, previousPosition } = this;
        const { pageX: x, pageY: y } = event;
        const [previousX, previousY] = previousPosition;

        const [deltaX, deltaY] = [x - previousX, y - previousY];
        this.previousPosition = [x, y];
        const { left, top } = deck[0];
        const newPosition = { left: left + deltaX, top: top + deltaY };

        this.commit('move-top-rune-position', newPosition);
      }
    }, 1000 / 60),
    handleMouseup(event) {
      this.holding = false;
      this.previousPosition = [];
    },
  },
  mounted() {
    document.body.addEventListener('mousemove', this.handleMousemove.bind(this));
    document.body.addEventListener('mouseup', this.handleMouseup.bind(this));
  },
  destroyed() {
    document.body.removeEventListener('mousemove', this.handleMousemove);
    document.body.removeEventListener('mouseup', this.handleMouseup);
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

// Rune Size
$width-height-ratio: 174.18 / 104.94
$width: 100px
$height: $width * $width-height-ratio

div.shuffle-section
  width: 100vw
  height: 100vh
  position: absolute
  left: 0
  top: 0

  > .rune
    position: absolute
    transform: translate(-$width / 2, -$height / 2)
    pointer-events: visible
</style>
