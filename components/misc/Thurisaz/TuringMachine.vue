<template>
  <section class="turing-machine">
    <h2>Turing Machine</h2>

    <tape
      ref="tape"
      :initial-position="initialPosition"
      :position="position"
      :initial-cells="initialCells"
      :cells="cells"
      :execute-state="executeState"
      :available-values="availableValues"
      @edit="handleEditCells"
      @edit-complete="executeState = Execute.READY"
      @update-cell="handleUpdateCell"
    />

    <div class="control">
      <button
        v-if="
          executeState === Execute.EXECUTING ||
          executeState === Execute.PAUSE
        "
        class="control-btn reset-btn"
        @click="reset"
      >Reset</button>

      <label class="delay">
        Step Delay <input type="text" v-model.number="delay" /> ms
      </label>
      <button
        class="control-btn"
        :disabled="!executable"
        @click="handleControlBtn"
      >{{ controlBtnText }}</button>
    </div>

    <rules
      ref="rules"
      :rules="rules"
      :execute-state="executeState"
      :matched-rule-index="matchedRuleIndex"
      :state-descriptions="stateDescriptions"
      :available-states="availableStates"
      :available-values="availableValues"
      @edit="handleEditRules"
      @edit-complete="executeState = Execute.READY"
      @change="handleRuleChange"
      @delete-rule="handleDeleteRule"
      @append-new-rule-empty="handleAppendNewRuleEmpty"
    />

    <advanced-config
      ref="advancedConfig"
      :execute-state="executeState"
      :available-values="availableValues"
      :available-states="availableStates"
      :state-descriptions="stateDescriptions"
      @edit="handleEditConfig"
      @edit-complete="executeState = Execute.READY"
      @append-available-value="handleAppendAvailableValue"
      @delete-available-value="handleDeleteAvailableValue"
      @append-available-state="handleAppendAvailableState"
      @delete-available-state="handleDeleteAvailableState"
    />
  </section>
</template>

<script>
import Tape from './turing-machine/Tape';
import Rules from './turing-machine/Rules';
import AdvancedConfig from './turing-machine/AdvancedConfig';
import example from './turing-machine/example.json';

const {
  initialCells,
  initialPosition,
  initialState,
  rules,
  availableStates: _AS,
  availableValues: _AV,
} = example;

const availableValues = new Set(_AV);
const availableStates = new Set(_AS.map(({ name }) => name));
const stateDescriptions = _AS.reduce(
  (acc, { name, description }) => acc.set(name, description),
  new Map([
    [null, 'Ending of the program.'],
  ]),
);

const Execute = {
  READY: 1,
  EXECUTING: 2,
  PAUSE: 3,
  HALT: 4,
  ERROR: 5,
  EDITING: 6,
};

export default {
  components: { Tape, Rules, AdvancedConfig },
  data() {
    return {
      Execute,
      initialCells,
      cells: initialCells,
      initialPosition,
      initialState,
      availableStates,
      availableValues,
      stateDescriptions,
      rules,

      position: null,
      state: null,
      executeState: Execute.READY,
      delay: 500,
      stepTimeoutObject: null,
      matchedRuleIndex: NaN,
      executable: false,
    };
  },
  computed: {
    controlBtnText() {
      const { executeState } = this;

      return (
        (executeState === Execute.READY     && 'Run')        ||
        (executeState === Execute.EXECUTING && 'Pause')      ||
        (executeState === Execute.PAUSE     && 'Continue')   ||
        (executeState === Execute.HALT      && 'Reset')      ||
        (executeState === Execute.ERROR     && 'Reset')      ||
        (executeState === Execute.EDITING   && 'Done & Run')
      );
    },
  },
  methods: {
    isNull(value) { return value === null; },

    handleControlBtn() {
      const { executeState: s } = this;

      if (
        s === Execute.READY   ||
        s === Execute.EDITING
      ) {
        this.executeState = Execute.EXECUTING;
        this.execute();
      } else if (s === Execute.EXECUTING) {
        window.clearTimeout(this.stepTimeoutObject);
        this.stepTimeoutObject = null;
        this.executeState = Execute.PAUSE;
      } else if (s === Execute.PAUSE) {
        this.stepTimeoutObject = window.setTimeout(() => {
          this.nextStep();
        }, this.delay);
        this.executeState = Execute.EXECUTING;
      } else if (
        s === Execute.HALT  ||
        s === Execute.ERROR
      ) {
        this.reset();
      } else {
        console.error(`Unregistered state: ${this.executeState}`);
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

    handleEditCells() {
      this.executeState = Execute.EDITING;
      this.$refs.rules.resetFlagsAndInputs();
      this.$refs.advancedConfig.resetFlagsAndInputs();
    },
    handleEditRules() {
      this.executeState = Execute.EDITING;
      this.$refs.tape.resetFlagsAndInputs();
      this.$refs.advancedConfig.resetFlagsAndInputs();
    },
    handleEditConfig() {
      this.executeState = Execute.EDITING;
      this.$refs.tape.resetFlagsAndInputs();
      this.$refs.rules.resetFlagsAndInputs();
    },

    handleRuleChange(params) {
      const { key, index, value } = params;
      const { rules } = this;

      rules[index][key] = value;
      this.rules = [...rules];
      this.checkExecutability();
    },

    handleAppendAvailableValue(input) {
      this.availableValues = new Set([...this.availableValues, input]);
      this.checkExecutability();
    },
    handleAppendAvailableState(input) {
      const { name, description } = input;
      const { availableStates: _AS, stateDescriptions: _SD } = this;
      _AS.add(name);
      _SD.set(name, description);

      this.availableStates = new Set([..._AS]);
      this.stateDescriptions = new Map(_SD);
      this.checkExecutability();
    },
    handleAppendNewRuleEmpty() {
      const { rules } = this;
      this.rules = [
        ...rules,
        {
          state: undefined,
          currentValue: undefined,
          writeValue: undefined,
          nextState: undefined,
          direction: undefined,
        },
      ];
      this.executable = false;
    },

    handleUpdateCell(payload) {
      const { index, value } = payload;
      const { initialCells } = this;
      initialCells[index] = value;
      this.initialCells = [...initialCells];
      this.cells = [...initialCells];
      this.checkExecutability();
    },

    handleDeleteRule(index) {
      const { rules: r } = this;
      r.splice(index, 1);
      this.rules = [...r];
      this.checkExecutability();
    },
    handleDeleteAvailableValue(input) {
      const { availableValues: av } = this;
      av.delete(input);
      this.availableValues = new Set([...av]);
      this.checkExecutability();
    },
    handleDeleteAvailableState(input) {
      const { availableStates: as, stateDescriptions: sd } = this;
      as.delete(input);
      sd.delete(input);

      this.availableStates = new Set([...as]);
      this.stateDescriptions = new Map(sd);
      this.checkExecutability();
    },

    reset() {
      window.clearTimeout(this.stepTimeoutObject);
      this.stepTimeoutObject = null;
      this.executeState = Execute.READY;
      this.cells = this.initialCells;
      this.position = null;
      this.state = null;
      this.matchedRuleIndex = NaN;
    },

    checkExecutability() {
      window.setImmediate(() => {
        const { rules: $r, tape: $t } = this.$refs;
        this.executable = !(
          $r.$el.querySelector('.unavailable') ||
          $t.$el.querySelector('.unavailable')
        );
      });
    },
  },
  mounted() {
    this.checkExecutability();
  },
};
</script>

<style scoped lang="sass">
@import '../../../sass/colors.sass'
@import '../../../sass/shared.sass'
@import '../../../sass/helpers.sass'

section.turing-machine
  > h2
    color: $yellow-500
    font-family: $base-font-family
    text-decoration: underline

  > div.control
    margin-top: 20pt
    text-align: right

    > label.delay
      font-size: 12pt
      height: 30pt
      line-height: 30pt
      color: $yellow-500
      margin-right: 15pt
      > input
        @include input-text-reset
        width: 50pt
        font-size: 12pt
        text-align: center
        border-bottom: 1pt solid $yellow-500
        font-family: $default-font-family

        &:focus
          border-bottom-width: 2pt

    > button.control-btn
      @include btn-reset
      border: 0pt solid #222
      width: 100pt
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

      &:disabled
        background-color: $red-500
        opacity: .5

      &.reset-btn
        border: 1pt solid $yellow-500
        color: $yellow-500
        background-color: #222
        float: left
        margin-left: 20pt
        &:hover
          background-color: $yellow-500
          color: #222
</style>
