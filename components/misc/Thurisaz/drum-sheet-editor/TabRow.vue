<template>
  <g class="tab-row" :transform="tabRowTranslation">
    <g class="line-group">
      <line
        v-for="i in 5"
        :key="i"
        :x1="0"
        :y1="(i - 1) * lineBetweenGap"
        :x2="tabRowWidth"
        :y2="(i - 1) * lineBetweenGap"
      />

      <rect :x="10" :y="10" :width="3" :height="20" fill="white" />
      <rect :x="17" :y="10" :width="3" :height="20" fill="white" />

      <template v-if="num === 1">
        <text class="quarter-note" :x="beginningPaddingWidth + 15" y="20">{{ noteAsBeat }}</text>
        <text class="per-beats" :x="beginningPaddingWidth + 15" y="40">{{ beatsPerScore }}</text>
      </template>
    </g>

    <g class="scores-group">
      <score
        v-for="(notes, i) in scoresData"
        :key="i"
        :offset-x="firstScoreOffset + i * scoreWidth"
        :width="scoreWidth"
        :tab-row-height="tabRowHeight"
        :note-as-beat="noteAsBeat"
        :beats-per-score="beatsPerScore"
        :notes-data="notes"
      />
    </g>
  </g>
</template>

<script>
import Score from './Score';

export default {
  components: { Score },
  props: ['num', 'noteAsBeat', 'beatsPerScore', 'scoresData'],
  data() {
    return {
      lineBetweenGap: 10,
      rowBetweenGap: 70,
      horizontalGap: 50,
      offsetFromTop: 200,
      minScoresContained: 3,
      beginningPaddingWidth: 30,
      beatNoteSpaceWidth: 30,
    };
  },
  computed: {
    scoresContained() {
      const { minScoresContained, scoresData } = this;
      const scoresCount = scoresData.length;
      return scoresCount > minScoresContained ? scoresCount : minScoresContained;
    },
    tabRowHeight() {
      const { lineBetweenGap: lbg } = this;
      return lbg * 4;
    },
    tabRowWidth() {
      const { horizontalGap } = this;
      return 960 - (horizontalGap * 2);
    },
    position() {
      const {
        num,
        offsetFromTop: oft,
        rowBetweenGap: rbg,
        tabRowHeight: trh
      } = this;

      return [50, oft + (num - 1) * (trh + rbg)];
    },
    tabRowTranslation() {
      return `translate(${this.position})`
    },
    firstScoreOffset() {
      const {
        beginningPaddingWidth: bpw,
        beatNoteSpaceWidth: bnsw,
        num,
      } = this;

      return num === 1 ? bpw + bnsw : bpw;
    },
    scoreWidth() {
      const {
        scoresContained: sc,
        firstScoreOffset: fso,
        tabRowWidth: trw,
      } = this;
      return (trw - fso) / sc;
    },
  },
};
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css?family=Yeseva+One&display=swap');
g.tab-row
  > g.line-group > line
    fill: none
    stroke: white
    stroke-width: 1
  > g.line-group > text
    font-family: 'Yeseva One'
    font-size: 30px
    fill: white
    text-anchor: middle
</style>
