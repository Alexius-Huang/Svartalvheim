<template>
  <g class="score" :transform="scoreTranslation">
    <note
      v-for="n in 8"
      :key="n"
      type="hi-hat"
      :beat="n"
      :beat-between-gap="beatBetweenGap"
    />
    <line :x1="width" :y1="0" :x2="width" :y2="tabRowHeight" />
  </g>
</template>

<script>
import Note from './Note';

export default {
  props: [
    'offsetX',        // Translation offset from left most of the tab-row
    'width',          // The width of the score unit
    'tabRowHeight',   // The height of the tab-row
    'beatsPerScore',  // The beats number specified in the beginning of the musical sheet
  ],
  components: { Note },
  computed: {
    scoreTranslation() {
      return `translate(${[this.offsetX, 0]})`;
    },
    beatBetweenGap() {
      const { width, beatsPerScore: bps } = this;
      return width / (bps * 2 + .5);
    },
  },
};
</script>

<style scoped lang="sass">
g.score
  > line
    fill: none
    stroke: white
    stroke-width: 1
</style>
