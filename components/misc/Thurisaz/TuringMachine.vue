<template>
  <section class="turing-machine">
    <h2>Turing Machine</h2>

    <div class="tape">
      <span class="cell add-cell" />
      <span
        v-for="(cell, i) in cells"
        class="cell"
        :class="{
          active: i === position,
          error: executeState === Execute.ERROR,
        }"
        :key="i"
      >
        <span class="tag" v-if="i === initialPosition">
          Initial Position
        </span>
        <span class="thumbtack" />

        {{ cell }}
      </span>
      <span class="cell add-cell" />
    </div>

    <div class="control">
      <button
        class="control-btn"
        @click="handleControlBtn"
      >{{ controlBtnText }}</button>
    </div>

    <rules
      :rules="rules"
      :matched-rule-index="matchedRuleIndex"
      :isNull="isNull"
    />

    <div class="advanced-config">
      <div class="available-states">
      </div>

      <div class="available-values">
      </div>
    </div>
  </section>
</template>

<script>
import Rules from './turing-machine/Rules';
import example from './turing-machine/example.json';

const {
  initialCells,
  initialPosition,
  initialState,
  rules,
  availableStates,
  availableValues,
} = example;

const Execute = {
  READY: 1,
  EXECUTING: 2,
  PAUSE: 3,
  HALT: 4,
  ERROR: 5,
};

export default {
  components: { Rules },
  data() {
    return {
      Execute,
      initialCells,
      cells: initialCells,
      initialPosition,
      initialState,
      availableStates,
      availableValues,
      rules,

      position: null,
      state: null,
      executeState: Execute.READY,
      delay: 1000,
      stepTimeoutObject: null,
      matchedRuleIndex: NaN,
    };
  },
  computed: {
    controlBtnText() {
      const { executeState } = this;

      return (
        (executeState === Execute.READY     && 'Run')      ||
        (executeState === Execute.EXECUTING && 'Pause')    ||
        (executeState === Execute.PAUSE     && 'Continue') ||
        (executeState === Execute.HALT      && 'Reset')    ||
        (executeState === Execute.ERROR     && 'Reset')
      );
    },
  },
  methods: {
    isNull(value) { return value === null; },
    handleControlBtn() {
      if (this.executeState === Execute.READY) {
        this.executeState = Execute.EXECUTING;
        this.execute();
      } else if (this.executeState === Execute.EXECUTING) {
        window.clearTimeout(this.stepTimeoutObject);
        this.stepTimeoutObject = null;
        this.executeState = Execute.PAUSE;
      } else if (this.executeState === Execute.PAUSE) {
        this.stepTimeoutObject = window.setTimeout(() => {
          this.nextStep();
        }, this.delay);
        this.executeState = Execute.EXECUTING;
      } else if (
        this.executeState === Execute.HALT  ||
        this.executeState === Execute.ERROR
      ) {
        this.executeState = Execute.READY;
        this.cells = this.initialCells;
        this.position = null;
        this.state = null;
        this.matchedRuleIndex = NaN;
      }
    },
    execute() {
      this.cells = [...this.initialCells];
      this.position = this.initialPosition;
      this.state = this.initialState;

      const value = this.cells[this.position];
      const matchedRuleIndex = this.rules.findIndex(
        ({ state: s, currentValue: v }) =>
          s === this.state && (v === value || v === null)
      );
      this.matchedRuleIndex = matchedRuleIndex;

      this.stepTimeoutObject = setTimeout(() => {
        this.nextStep();
      }, this.delay);
    },

    nextStep() {
      const {
        state,
        position,
        rules,
        cells,
        matchedRuleIndex
      } = this;

      if (matchedRuleIndex === -1) {
        this.executeState = Execute.ERROR;
        return;
      }

      const value = cells[position];
      const matchedRule = rules[matchedRuleIndex];

      const {
        nextState: newState,
        writeValue,
        nextState,
        direction,
      } = matchedRule;

      this.state = newState;

      const newCells = [...cells];
      newCells.splice(position, 1, writeValue);
      this.cells = newCells;

      if (direction !== null) {
        this.position = this.position + (direction === 'LEFT' ? -1 : 1);
      }

      if (this.state === null) {
        this.state = 'HALT';
        this.executeState = Execute.HALT;
        return;
      }

      /* Show current execution rule */
      const newValue = this.cells[this.position];
      const newMatchedRuleIndex = rules.findIndex(
        ({ state: s, currentValue: v }) =>
          s === this.state && (v === newValue || v === null)
      );
      this.matchedRuleIndex = newMatchedRuleIndex;

      this.stepTimeoutObject = setTimeout(() => {
        this.nextStep();
      }, this.delay);
    },
  },
};
</script>

<style scoped lang="sass">
@import '../../../sass/colors.sass'
@import '../../../sass/shared.sass'
@import '../../../sass/helpers.sass'

$cell-size: 50pt

section.turing-machine
  > h2
    color: $yellow-500
    font-family: $base-font-family
    text-decoration: underline

  > div.tape
    margin-top: 25pt
    width: 100%
    height: 120pt
    text-align: center
    overflow-x: scroll
    overflow-y: hidden
    white-space: nowrap
    > span.cell
      position: relative
      display: inline-block
      vertical-align: top
      border-radius: 2.5pt
      font-size: 25pt
      text-align: center
      line-height: $cell-size
      width: $cell-size
      height: $cell-size
      border: 1pt solid $yellow-500
      color: white
      font-family: $base-font-family
      transition: color background-color .25s
      + span.cell
        margin-left: 5pt

      &.add-cell
        border-color: transparentize($yellow-500, 0.5)

      > span.tag
        position: absolute
        white-space: normal
        text-align: center
        line-height: normal
        bottom: -55pt
        left: 0
        display: block
        width: $cell-size
        height: 25pt
        font-size: 10pt
        font-family: $base-font-family
        color: $yellow-500
 
      > span.thumbtack
        position: absolute
        display: none
        left: calc(50% - 6pt)
        bottom: -20pt
        margin: auto 0

      &.active > span.thumbtack
        display: inline-block
        @include triangle('top', 6pt, 9pt)
      &.active
        color: #222
        background-color: $yellow-500
        transition: .25s
        &.error
          background-color: $red-500
          border-color: $red-500

  > div.control
    margin-top: 20pt
    padding-right: 10pt
    text-align: right
    > button.control-btn
      @include btn-reset
      border: 0pt solid #222
      width: 50pt
      height: 30pt
      line-height: 30pt
      border-radius: 2.5pt
      background-color: $yellow-500
      color: #222
      font-size: 12pt
      transition: .25s
      &:hover
        background-color: white
        color: #222
        transition: .25s
      &:active
        background-color: #ddd
</style>
