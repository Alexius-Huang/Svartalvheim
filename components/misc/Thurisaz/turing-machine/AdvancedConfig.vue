<template>
  <div class="advanced-config">
    <div class="available-values">
      <h3>
        Available Values
        <button
          v-if="!availableValuesEditing"
          class="edit-btn"
          :disabled="executeState !== Execute.READY && executeState !== Execute.EDITING"
          @click="handleEditAvailableValues"
        >{{ editBtnText }}</button>

        <button
          v-else
          class="complete-btn"
          @click="handleEditComplete"
        >Done</button>
      </h3>
      <ul :class="{ editing: availableValuesEditing }">
        <li v-for="v in Array.from(availableValues)" :key="v">
          <button
            class="delete-btn"
            @click="handleDeleteAvailableValue(v)"
          >X</button>
          {{ v }}
        </li><!--

     --><li
          v-if="availableValuesEditing && !newAvailableValueAdding"
          class="add-value"
          @click="handleActivateValueInputField"
        >+</li><!--
     --><li
          v-if="availableValuesEditing && newAvailableValueAdding"
          class="add-value"
        >
          <input
            ref="availableValueInput"
            type="text"
            v-model="newAvailableValueInput"
            @input="handleValidateAvailableValueInput"
            @blur="newAvailableValueAdding = false"
          />
        </li>
      </ul>
    </div>

    <div class="available-states">
      <h3>
        Available States
        <button
          v-if="!availableStatesEditing"
          class="edit-btn"
          :disabled="executeState !== Execute.READY && executeState !== Execute.EDITING"
          @click="handleEditAvailableStates"
        >{{ editBtnText }}</button>

        <button
          v-else
          class="complete-btn"
          @click="handleEditComplete"
        >Done</button>
      </h3>
      <ul>
        <li v-for="s in Array.from(availableStates)" :key="s">
          <button
            v-if="availableStatesEditing"
            class="delete-btn"
            @click="handleDeleteAvailableState(s)"
          >X</button><!--
       --><span class="name">{{ s }}</span><!--
       --><span class="description">{{ stateDescriptions.get(s) }}</span>
        </li><!--
     --><li>
          <span class="name highlight">HALT</span><!--
       --><span class="description">End of the program.</span>
        </li><!--
     --><li
          v-if="availableStatesEditing && !newAvailableStateAdding"
          class="add-state"
          @click="handleActivateStateInputField"
        >
          + Add New State
        </li><!--
     --><li
          v-if="availableStatesEditing && newAvailableStateAdding"
          class="add-state"
        >
          <input
            class="add-state-name-field"
            ref="availableStateNameInput"
            placeholder="State Name"
            type="text"
            v-model="newAvailableStateInput.name"
          /><!--
       --><input
            class="add-state-description-field"
            placeholder="State Description"
            type="text"
            v-model="newAvailableStateInput.description"
          />
        </li>
      </ul>
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

const singleCharacterRegex = /^[a-z|A-Z|0-9|\+|\-|*|\/|\%|\\|(|)|\[|\]|\{|\}|\~|"|'|\`|\||&|\$|=|_|<|>|\?|:|;|.|@|#|\^|,]$/;

export default {
  props: [
    'availableValues',
    'availableStates',
    'stateDescriptions',
    'executeState',
  ],
  data() {
    return {
      keydownEvent: null,

      Execute,
      availableValuesEditing: false,
      availableStatesEditing: false,
      newAvailableValueAdding: false,
      newAvailableValueInput: '',
      newAvailableStateAdding: false,
      newAvailableStateInput: {
        name: '',
        description: '',
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
    handleEditAvailableValues() {
      this.$emit('edit');
      this.availableValuesEditing = true;
      this.availableStatesEditing = false;
    },
    handleEditAvailableStates() {
      this.$emit('edit');
      this.availableStatesEditing = true;
      this.availableValuesEditing = false;
    },

    handleActivateValueInputField() {
      this.newAvailableValueAdding = true;
      window.setImmediate(() => {
        this.$refs.availableValueInput.focus();
      });
    },
    handleActivateStateInputField() {
      this.newAvailableStateAdding = true;
      window.setImmediate(() => {
        this.$refs.availableStateNameInput.focus();
      });
    },

    handleValidateAvailableValueInput() {
      const {
        availableValues,
        newAvailableValueInput: input,
      } = this;

      if (
        singleCharacterRegex.test(input) &&
        !availableValues.has(input)
      ) {
        this.$emit('append-available-value', input);
      }

      this.newAvailableValueInput = '';
    },
    handleDeleteAvailableValue(input) {
      this.$emit('delete-available-value', input);
    },

    handleNewAvailableStateEnterKeypress() {
      const {
        newAvailableStateAdding: adding,
        newAvailableStateInput: input
      } = this;

      const { name: n, description: d } = input;
      const name = n.trim();
      const description = d.trim();

      if (adding && !!name && !!description) {
        this.$emit('append-available-state', { name, description });
        this.newAvailableStateInput = { name: '', description: '' };

        this.$refs.availableStateNameInput.focus();
      }
    },
    handleDeleteAvailableState(input) {
      this.$emit('delete-available-state', input);
    },

    handleEditComplete() {
      this.$emit('edit-complete');
      this.resetFlagsAndInputs();
    },
    resetFlagsAndInputs() {
      this.availableValuesEditing = false;
      this.newAvailableValueAdding = false;
      this.newAvailableValueInput = '';
      this.availableStatesEditing = false;
      this.newAvailableStateAdding = false;
      this.newAvailableStateInput = { name: '', description: '' };
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

  mounted() {
    this.keydownEvent = window.addEventListener('keydown', (e) => {
      const { keyCode: k } = e;

      if (this.availableStatesEditing && k === 13) /* ENTER Key */ {
          this.handleNewAvailableStateEnterKeypress();
      }

      if (this.availableValuesEditing && k === 8) /* DELETE Key */ {
        const { availableValues } = this;
        if (availableValues.size === 1) {
          return;
        }

        const arr = Array.from(availableValues);
        this.handleDeleteAvailableValue(arr[arr.length - 1]);
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keydownEvent);
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'
@import '~/sass/animation.sass'

div.advanced-config
  box-sizing: border-box
  width: 100%
  margin-top: 20pt
  padding-left: 20pt
  padding-bottom: 96pt
  > div
    + div
      margin-top: 30pt
    > h3
      color: white
      font-family: $base-font-family
      margin-bottom: 10pt
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

    > ul
      > li
        font-family: $base-font-family
        font-size: 12pt

    &.available-states > ul > li
      position: relative
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
      > span
        font-family: $default-font-family
        display: inline-block
        font-size: 12pt
        color: white
        height: 18pt
        line-height: 18pt
        &.name
          font-weight: 500
          width: 100pt
        &.description
          width: calc(100% - 100pt)
          letter-spacing: .25pt
        &.highlight
          color: $yellow-500

      &.add-state
        font-size: 14pt
        height: 18pt
        line-height: 18pt
        color: $yellow-500

        > input[type="text"]
          @include input-text-reset
          color: white
          border-bottom: 1pt solid $yellow-500
          font-size: 12pt
          height: 18pt
          line-height: 18pt
          font-family: $default-font-family

          &.add-state-name-field
            width: 100pt
          &.add-state-description-field
            width: calc(100% - 100pt)

          &:focus
            border-bottom-width: 2pt

    &.available-values > ul > li
      vertical-align: top
      display: inline-block
      text-align: center
      width: 30pt
      height: 30pt
      line-height: 30pt
      border: 1pt solid $yellow-500        
      color: white
      border-radius: 3pt
      margin-right: 5pt
      margin-top: 5pt
      position: relative
      font-family: $default-font-family
      font-weight: 500
      &.add-value
        border-color: transparentize($yellow-500, 0.7)
        border-style: dashed
        color: transparentize($yellow-500, 0.7)
        font-size: 20pt
        transition: .25s
        &:hover
          color: $yellow-500
          border-color: $yellow-500
          transition: .25s

        > input[type="text"]
          @include input-text-reset
          width: 100%
          height: 30pt
          line-height: 30pt
          vertical-align: top
          font-size: 12pt
          text-align: center
      > button.delete-btn
        @include btn-reset
        position: absolute
        width: 10pt
        height: 10pt
        line-height: 10pt
        right: -5pt
        top: -5pt
        border-radius: 5pt
        background-color: white
        color: #222
        font-size: 8pt
        transition: .25s
        display: none
      &:hover > button
        width: 20pt
        height: 20pt
        line-height: 20pt
        font-size: 12pt
        right: -10pt
        top: -10pt
        border-radius: 10pt
        transition: .25s

    &.available-values > ul.editing > li
      animation: shaking 3s
      margin-right: 10pt
      margin-top: 10pt
      > button.delete-btn
        display: inline-block

</style>

