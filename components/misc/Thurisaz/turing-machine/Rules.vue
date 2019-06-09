<template>
  <div class="rules">
    <h3>Rules</h3>

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
          <span>{{ state }}</span><!--
        --><span :class="{ 'use-base-font': !isNull(currentValue) }">
            {{ isNull(currentValue) ? 'Any' : currentValue }}
          </span><!--
        --><span class="use-base-font">{{ writeValue }}</span><!--
        --><span>{{ isNull(direction) ? 'No Move' : direction }}</span><!--
        --><span :class="{ highlight: isNull(nextState) }">
            {{ isNull(nextState) ? 'HALT' : nextState }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rules', 'matchedRuleIndex', 'isNull'],
};
</script>

<style scoped lang="sass">
@import '../../../../sass/colors.sass'
@import '../../../../sass/shared.sass'

div.rules
  box-sizing: border-box
  width: 100%
  margin-top: 20pt
  padding-left: 20pt
  padding-bottom: 96pt
  > h3
    color: white
    font-family: $base-font-family

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
      > div.row
        transition: background-color .25s
        &.active
          background-color: #555
          transition: background-color .25s
        > span
          color: white
          width: 20%
          height: 18pt
          line-height: 18pt
          box-sizing: border-box
          padding-left: 5pt
          display: inline-block
          font-size: 12pt

          &.use-base-font
            font-family: $base-font-family

          &.highlight
            color: $yellow-500
</style>

