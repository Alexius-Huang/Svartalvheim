<template>
  <div class="rules">
    <h3>
      Rules
      <button
        v-if="!editing"
        class="edit-btn"
        :disabled="executeState !== Execute.READY && executeState !== Execute.EDITING"
        @click="handleRulesEdit"
      >{{ editBtnText }}</button>

      <button
        v-else
        class="complete-btn"
        @click="handleEditComplete"
      >Done</button>
    </h3>

    <div class="rule-table">
      <div class="thead">
        <span>Current State</span><!--
     --><span>Current Cell Content</span><!--
     --><span>Value to Write</span><!--
     --><span>Direction to Move</span><!--
     --><span>New State</span>
      </div>

      <div class="tbody">
        <div
          v-for="({
            state,
            currentValue,
            writeValue,
            nextState,
            direction,
          }, i) in rules"
          :key="i"
          class="row"
          :class="{ active: matchedRuleIndex === i }"
        >
          <button
            v-if="editing"
            class="delete-btn"
            @click="handleDeleteRule(i)"
          >X</button><!--
       --><label
            ref="current-state-label"
            tabindex="1"
            :class="{ unavailable: !isNull(state) && !availableStates.has(state) }"
            :title="stateDescriptions.get(state)"
            @blur="handleUncheckToggler('current-state-toggler', i)"
          >
            <span>{{ isUndefined(state) ? 'Undefined' : state }}</span>

            <template v-if="editing">
            <input type="checkbox" ref="current-state-toggler" />
            <ul class="dropdown">
              <li
                v-for="s in Array.from(availableStates)"
                :key="s"
                :class="{ highlight: s === state }"
                @click="handleChangeCurrentState(i, s)"
              >{{ s }}</li>
            </ul>
            </template>
          </label><!--
       --><label
            ref="current-value-label"
            tabindex="1"
            class="value-font"
            :class="{ unavailable: !isNull(currentValue) && !availableValues.has(currentValue) }"
            @blur="handleUncheckToggler('current-value-toggler', i)"
          >
            <span>
              {{
                isNull(currentValue) ? 'Ignored' :
                isUndefined(currentValue) ? 'Undefined' : currentValue
              }}
            </span>

            <template v-if="editing">
            <input type="checkbox" ref="current-value-toggler" />
            <ul class="dropdown">
              <li
                v-for="v in [...Array.from(availableValues), 'Ignored']"
                :key="v"
                :class="{ highlight: v === currentValue || (v === 'Ignored' && isNull(currentValue)) }"
                @click="handleChangeCurrentValue(i, v === 'Ignored' ? null : v)"
              >{{ v }}</li>
            </ul>
            </template>
          </label><!--
       --><label
            ref="write-value-label"
            tabindex="1"
            class="value-font"
            :class="{ unavailable: !isNull(writeValue) && !availableValues.has(writeValue) }"
            @blur="handleUncheckToggler('write-value-toggler', i)"
          >
            <span>{{ isUndefined(writeValue) ? 'Undefined' : writeValue }}</span>

            <template v-if="editing">
            <input type="checkbox" ref="write-value-toggler" />
            <ul class="dropdown">
              <li
                v-for="v in Array.from(availableValues)"
                :key="v"
                :class="{ highlight: v === currentValue }"
                @click="handleChangeWriteValue(i, v)"
              >{{ v }}</li>
            </ul>
            </template>
          </label><!--
       --><label
            ref="direction-label"
            tabindex="1"
            :class="{ unavailable: isUndefined(direction) }"
            @blur="handleUncheckToggler('direction-toggler', i)"
          >
            <span>
              {{
                isNull(direction) ? 'No Move' :
                isUndefined(direction) ? 'Undefined' : direction
              }}
            </span>

            <template v-if="editing">
            <input type="checkbox" ref="direction-toggler" />
            <ul class="dropdown">
              <li
                v-for="d in ['LEFT', 'RIGHT', 'No Move']"
                :key="d"
                :class="{ highlight: d === direction || (d === 'No Move' && isNull(direction)) }"
                @click="handleChangeDirection(i, d === 'No Move' ? null : d)"
              >{{ d }}</li>
            </ul>
            </template>
          </label><!--
       --><label
            ref="next-state-label"
            tabindex="1"
            :title="stateDescriptions.get(nextState)"
            :class="{
              highlight: isNull(nextState),
              unavailable: !isNull(nextState) && !availableStates.has(nextState),
            }"
            @blur="handleUncheckToggler('next-state-toggler', i)"
          >
            <span>
              {{
                isNull(nextState) ? 'HALT' :
                isUndefined(nextState) ? 'Undefined' : nextState
              }}
            </span>
          
            <template v-if="editing">
            <input type="checkbox" ref="next-state-toggler" />
            <ul class="dropdown">
              <li
                v-for="s in [...Array.from(availableStates), 'HALT']"
                :key="s"
                :class="{ highlight: s === nextState || (s === 'HALT' && isNull(nextState)) }"
                @click="handleChangeNextState(i, s === 'HALT' ? null : s)"
              >{{ s }}</li>
            </ul>
            </template>
          </label>
        </div>

        <button
          v-if="executeState === Execute.EDITING"
          class="add-rule-btn"
          @click="handleAddEmptyNewRuleField"
        >+ Add New Rule</button>
      </div>
    </div>
  </div>
</template>

<script>
const Execute = {
  READY: 1,
  EXECUTING: 2,
  PAUSE: 3,
  HALT: 4,
  ERROR: 5,
  EDITING: 6,
};

export default {
  props: [
    'rules',
    'executeState',
    'matchedRuleIndex',
    'stateDescriptions',
    'availableStates',
    'availableValues',
  ],
  data() {
    return {
      Execute,
      editing: false,
    };
  },
  computed: {
    editBtnText() {
      return (
        this.executeState === Execute.READY   ||
        this.executeState === Execute.EDITING
      ) ? 'Edit' : 'Cannot Edit While Running Program ...';
    },
  },
  methods: {
    isNull(value) { return value === null; },
    isUndefined(value) { return value === undefined; },
    handleRulesEdit() {
      this.$emit('edit');
      this.editing = true;
    },
    handleUncheckToggler(refName, index) {
      const $$togglers = this.$refs[refName];
      if (Array.isArray($$togglers)) {
        const $el = $$togglers[index];
        if ($el) {
          $el.checked = false;
        }
      }
    },

    handleChangeCurrentState(index, state) {
      this.$emit('change', { key: 'state', index, value: state });
      const $el = this.$refs['current-value-label'][index];
      window.setImmediate(() => {
        $el.focus();
        $el.click();
      });
    },
    handleChangeCurrentValue(index, value) {
      this.$emit('change', { key: 'currentValue', index, value });
      const $el = this.$refs['write-value-label'][index];
      window.setImmediate(() => {
        $el.focus();
        $el.click();
      });
    },
    handleChangeWriteValue(index, value) {
      this.$emit('change', { key: 'writeValue', index, value });
      const $el = this.$refs['direction-label'][index];
      window.setImmediate(() => {
        $el.focus();
        $el.click();
      });
    },
    handleChangeDirection(index, direction) {
      this.$emit('change', { key: 'direction', index, value: direction })
      const $el = this.$refs['next-state-label'][index];
      window.setImmediate(() => {
        $el.focus();
        $el.click();
      });
    },
    handleChangeNextState(index, state) {
      this.$emit('change', { key: 'nextState', index, value: state });
      const $el = this.$refs['current-state-label'][index + 1];
      if ($el) {
        window.setImmediate(() => {
          $el.focus();
          $el.click();
        });
      } else {
        this.handleAddEmptyNewRuleField();
      }
    },

    handleAddEmptyNewRuleField() {
      this.$emit('append-new-rule-empty');

      window.setImmediate(() => {
        const { rules } = this;
        const index = rules.length - 1;
        const $el = this.$refs['current-state-label'][index];
        if ($el) {
          $el.focus();
          $el.click();
        }
      });
    },

    handleDeleteRule(index) {
      this.$emit('delete-rule', index);
    },
    handleEditComplete() {
      this.$emit('edit-complete');
      this.resetFlagsAndInputs();
    },
    resetFlagsAndInputs() {
      this.editing = false;
    },
  },
  watch: {
    executeState() {
      const { executeState: s } = this;
      if (s !== Execute.EDITING) {
        this.resetFlagsAndInputs();
      }
    },
  },
};
</script>

<style scoped lang="sass">
@import '../../../../sass/colors.sass'
@import '../../../../sass/shared.sass'
@import '../../../../sass/helpers.sass'

div.rules
  box-sizing: border-box
  width: 100%
  margin-top: 20pt
  padding-left: 20pt
  > h3
    color: white
    font-family: $base-font-family
    > button.edit-btn,
    > button.complete-btn
      @include btn-reset
      float: right
      color: $yellow-500
      padding: 0 10pt
      height: 25pt
      line-height: 25pt
      border: 1pt solid $yellow-500
      border-radius: 2pt
      transition: .25s
      &:hover
        background-color: white
        color: #222
        transition: .25s

      &:disabled, &:disabled:hover
        background-color: #222
        color: transparentize($yellow-500, 0.75)
        border-color: transparentize($yellow-500, 0.75)
        transition: .25s

    > button.complete-btn
      color: #222
      background-color: $yellow-500

  > div.rule-table
    margin-top: 15pt
    > div.thead
      font-size: 0
      margin-bottom: 2.5pt
      border-bottom: 1pt solid $yellow-500
      > span
        width: 20%
        box-sizing: border-box
        padding-left: 5pt
        display: inline-block
        font-family: $base-font-family
        font-size: 14pt
        color: $yellow-500


    > div.tbody
      margin-top: 5pt
      > button.add-rule-btn
        @include btn-reset
        margin-top: 10pt
        font-size: 14pt
        height: 18pt
        line-height: 18pt
        color: $yellow-500

      > div.row
        transition: background-color .25s
        position: relative
        &.active
          background-color: #555
          transition: background-color .25s

        > button.delete-btn
          @include btn-reset
          position: absolute
          width: 18pt
          height: 18pt
          left: -20pt
          top: 0
          color: $yellow-500
          font-size: 14pt
          line-height: 18pt
          font-family: $base-font-family
          transition: .25s
          &:hover
            width: 24pt
            height: 24pt
            font-size: 16pt
            left: -24pt
            top: -3pt
            transition: .25s
            color: $red-500

        > label
          width: 20%
          height: 20pt
          padding-left: 5pt
          box-sizing: border-box
          display: inline-block
          vertical-align: top
          position: relative

          &:focus
            outline: none

          > span
            color: white
            line-height: 20pt
            font-size: 12pt

          &:hover > span
            color: $yellow-600
            text-decoration: underline
            text-decoration-style: dotted

          &.value-font > span
            font-family: $default-font-family
            font-weight: 500

          &.unavailable > span
            color: $red-500

          &.highlight > span
            color: $yellow-500

          > input[type="checkbox"]
            display: none

          > input[type="checkbox"] + ul
            position: absolute
            top: 20pt
            z-index: 1
            background-color: #333
            border-top: 2pt solid $yellow-500
            padding: 5pt 0
            max-height: 150pt
            overflow-y: auto

            > li
              font-size: 10pt
              height: 16pt
              line-height: 16pt
              color: white
              padding: 0 10pt
              &:hover
                background-color: #444

              &.highlight
                color: $yellow-500
                font-style: italic

          > input[type="checkbox"]:not(:checked) + ul
            display: none
</style>

