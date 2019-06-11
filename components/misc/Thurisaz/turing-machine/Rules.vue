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
            tabindex="1"
            :class="{ unavailable: !isNull(state) && !availableStates.has(state) }"
            :title="stateDescriptions.get(state)"
            @blur="handleUncheckToggler('current-state-toggler', i)"
          >
            <span>{{ state }}</span>
            <template v-if="editing">

            <input type="checkbox" ref="current-state-toggler" />
            <ul class="dropdown">
              <li
                v-for="s in Array.from(availableStates)"
                :key="s"
                @click="handleChangeCurrentState(i, s)"
              >{{ s }}</li>
            </ul>

            </template>
          </label><!--
       --><label
            tabindex="1"
            class="value-font"
            :class="{ unavailable: !isNull(currentValue) && !availableValues.has(currentValue) }"
          >
            <span>{{ isNull(currentValue) ? 'Any' : currentValue }}</span>
          </label><!--
       --><label
            tabindex="1"
            class="value-font"
            :class="{ unavailable: !isNull(writeValue) && !availableValues.has(writeValue) }"
          ><span>{{ writeValue }}</span></label><!--
       --><label tabindex="1"><span>{{ isNull(direction) ? 'No Move' : direction }}</span></label><!--
       --><label
            tabindex="1"
            :title="stateDescriptions.get(nextState)"
            :class="{
              highlight: isNull(nextState),
              unavailable: !isNull(nextState) && !availableStates.has(nextState),
            }"
          >
            <span>{{ isNull(nextState) ? 'HALT' : nextState }}</span>
          </label>
        </div>
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
      this.$emit('change-current-state', { index, state });
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

          > input[type="checkbox"]:not(:checked) + ul
            display: none

</style>

