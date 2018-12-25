<template>
  <div class="diamond" :class="{ active }">
    <div class="inner-content">
      <div class="description-wrapper">
        <span class="description">
          <span class="title">{{ $props.title }}</span>
          <button @click="active = true">Read More</button>
        </span>
      </div>

      <img v-if="!$props.jsIcon" :src="$props.icon" :alt="$props.iconAlt" />
      <span v-else class="js-icon">JS</span>
    </div>

    <div class="modal-content">
      <div class="close-btn-wrapper">
        <button @click="active = false">Back</button>
      </div>

      <div class="content-wrapper">
        <h2 class="title">{{ $props.title }}</h2>

        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'js-icon', 'icon', 'icon-alt'],
  data() {
    return { active: false };
  },
};
</script>

<style lang="sass">
@import '../../../sass/colors.sass'
@import '../../../sass/helpers.sass'

div.diamond
  width: 200pt
  height: 200pt
  background-color: $yellow-500
  transform: rotate(45deg)
  position: relative
  overflow: hidden
  display: inline-block
  box-shadow: inset 0pt 0pt 10pt $grey-900
  transition: .25s
  + div.diamond
    margin-left: 100pt
    &.active
      margin-left: 0

  &.active
    position: fixed
    left: 0
    top: 0
    margin-left: 0
    transform: rotate(0)
    transition: .25s
    width: 100vw
    height: 100vh
    z-index: 10000

    > div.modal-content
      position: absolute
      left: 0
      top: 0
      z-index: 10001
      opacity: 1
      width: 100vw
      height: 100vh
      pointer-events: visible

  &:hover
    > div.inner-content
      transform: rotate(-45deg) translateX(75%)
      transition: .25s

      > div.description-wrapper
        left: -85%
        transition: .25s

        > span.description
          > span.title
            transform: translateY(0)
            transition: .25s
          > button
            transform: translateX(0)
            transition: .25s

  > div.inner-content
    position: absolute
    right: 0
    bottom: 0
    color: $grey-900
    cursor: default
    transform: rotate(-45deg) translateX(-10%)
    transition: .25s
    width: 100%
    height: 100%
    text-align: right
    &:before
      content: ''
      display: inline-block
      width: 0
      height: 100%
      vertical-align: bottom

    > img
      width: 60%
      // height: 75%
      margin-right: 10%
      margin-bottom: 10%

    > div.description-wrapper
      display: inline-block
      height: 100%
      width: 100%
      position: absolute
      left: -150%
      top: 0
      bottom: 0
      margin: auto 0
      transition: .25s
      @include vertical-align
      > span.description
        border-right: 2pt solid $grey-900
        padding-right: 8pt
        > span.title
          display: block
          font-size: 25pt
          transform: translateY(-10vh)
          transition: .25s
          > span.duration
            color: $grey-900
            opacity: 0.54
            font-size: 12pt
            font-style: italic
            font-weight: 500
        > button
          opacity: .8
          display: inline-block
          background-color: transparent
          color: $yellow-500
          font-size: 15pt
          height: 25pt
          line-height: 25pt
          border: none
          margin-top: 5pt
          background-color: $grey-900
          cursor: pointer
          // font-family: 'Staatliches'
          font-family: 'Roboto'
          transform: translateX(-10vw)
          // transition: .25s
          &:hover
            opacity: 1
            transition: .25s
    > span.js-icon
      display: inline-block
      vertical-align: bottom
      font-size: 125pt
      font-weight: 500

  > div.modal-content
    padding: 40pt
    pointer-events: none
    opacity: 0
    display: inline-block
    background-color: $yellow-500
    text-align: left

    > div.close-btn-wrapper
      > button
        background-color: transparent
        color: $grey-900
        height: 32pt
        line-height: 32pt
        padding: 0 8pt
        font-size: 24pt
        border: none
        cursor: pointer
        // font-family: 'Staatliches'
        font-family: 'Roboto'
        &:before
          content: '<< '
          font-size: 24pt
          margin-right: 4pt
          transition: .25s

        &:hover
          &:before
            margin-right: 12pt
            transition: .25s

    > div.content-wrapper
      margin-top: 16pt
      padding-left: 24pt

      > h2.title
        // font-family: 'Staatliches'
        font-family: 'Roboto'
        font-size: 48pt
        letter-spacing: 1.5pt
        text-decoration: underline
</style>
