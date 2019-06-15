<template>
  <section class="drum-sheet-editor">
    <h2>Drum Sheet Editor</h2>

    <div class="svg-wrapper">
      <svg
        ref="drumSheet"
        class="drum-sheet-panel"
        :width="svg.width"
        :height="svg.height"
      >
        <tab-row
          v-for="i in 10"
          :key="i"
          :num="i"
          :note-as-beat="noteAsBeat"
          :beats-per-score="beatsPerScore"
        />
      </svg>
    </div>

    <div class="toolbox">
    </div>
  </section>
</template>

<script>
import TabRow from './drum-sheet-editor/TabRow';

export default {
  components: { TabRow },
  data() {
    return {
      noteAsBeat: 4,    // For instance, 4 means a beat represented as quarter-quaver
      beatsPerScore: 4,

      svg: { width: 960, height: 1357 },
      pages: 1,
      page: 1,
    };
  },
  mounted() {},
};
</script>

<style scoped lang="sass">
@import '../../../sass/colors.sass'
@import '../../../sass/shared.sass'
@import '../../../sass/helpers.sass'

section.drum-sheet-editor
  padding-bottom: 96pt
  > h2
    color: $yellow-500
    font-family: $base-font-family
    text-decoration: underline

  > div.svg-wrapper
    margin-top: 30pt
    width: 100%
    height: 1357px

  > div.svg-wrapper > svg
    width: 100%
    height: 1357px
    box-shadow: 0px 0px 5px 0px $yellow-500
    // background-color: #111
</style>
