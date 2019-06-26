<template>
  <div class="tape" :class="{ editing }">
    <h3>
      Tape

      <button
        v-if="!editing"
        class="edit-btn"
        :disabled="executeState !== Execute.READY && executeState !== Execute.EDITING"
        @click="handleCellsEdit"
      >{{ editBtnText }}</button>

      <button
        v-else
        class="complete-btn"
        @click="handleEditComplete"
      >Done</button>
    </h3>

    <label class="cell add-cell" /><!--
 --><label
      v-for="(cell, i) in cells"
      class="cell"
      :class="{
        active: i === position,
        error: executeState === Execute.ERROR,
        unavailable: !availableValues.has(cell),
      }"
      :key="i"
    >
      <span class="tag" v-if="i === initialPosition">
        Initial Position
      </span>
      <span class="thumbtack" />

      <template v-if="!editing">{{ cell }}</template>
      <input
        v-else
        ref="cell-input"
        class="cell-value"
        type="text"
        v-model="inputs.cells[i]"
        @focus="handleCellInputFocus($event, i)"
        @blur="handleCellInputBlur($event, i)"
        @input="handleValidateCellInput($event, i)"
      />
    </label><!--
 --><label class="cell add-cell" />
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
    'cells',
    'initialCells',
    'executeState',
    'initialPosition',
    'position',
    'availableValues',
  ],
  data() {
    return {
      Execute,
      editing: false,
      inputs: {
        cells: [...this.cells],
      },
    };
  },
  computed: {
    editBtnText() {
      return (
        this.executeState === Execute.READY   ||
        this.executeState === Execute.EDITING
      ) ? 'Edit' : 'Executing ...';
    },
  },
  methods: {
    handleCellsEdit() {
      this.$emit('edit');
      this.editing = true;
    },

    handleCellInputFocus(_, index) {
      const { cells } = this.inputs;
      cells[index] = '';
      this.inputs.cells = [...cells];
    },
    handleCellInputBlur(_, index) {
      const { cells } = this.inputs;
      if (!this.availableValues.has(cells[index])) {
        const originalValue = this.cells[index];
        cells[index] = originalValue;
        this.inputs.cells = [...cells];
      }
    },

    handleValidateCellInput(e, index) {
      const { target: $el } = e;
      const { value } = $el;
      const { cells } = this.inputs;

      if (!this.availableValues.has(value)) {
        cells[index] = '';
        this.inputs.cells = [...cells];
      } else {
        $el.blur();
        const $nextEl = this.$refs['cell-input'][index + 1];
        if ($nextEl) {
          $nextEl.focus();
        }
        this.$emit('update-cell', { index, value });
      }
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
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'
@import '~/sass/animation.sass'

$cell-size: 50pt
$font-size: 25pt

div.tape
  margin-top: 25pt
  width: 100%
  height: 180pt
  text-align: center
  overflow-x: scroll
  overflow-y: hidden
  white-space: nowrap

  &.editing
    > label.cell
      animation: shaking 3s
      border-width: 2pt

  > h3
    text-align: left
    color: white
    font-family: $base-font-family
    margin-bottom: 30pt
    padding-left: 20pt

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

  > label.cell
    position: relative
    display: inline-block
    vertical-align: top
    border-radius: 2.5pt
    font-size: $font-size
    text-align: center
    line-height: $cell-size
    width: $cell-size
    height: $cell-size
    border: 1pt solid $yellow-500
    color: white
    font-family: $default-font-family
    font-weight: 500
    transition: color background-color .25s
    + label.cell
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

    > input.cell-value
      @include input-text-reset
      display: inline-block
      text-align: center
      width: $cell-size - 2pt
      height: $cell-size - 2pt
      line-height: $cell-size - 2pt
      font-size: $font-size


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

    &.unavailable
      background-color: $red-500
      border-color: $red-500

</style>
