<template>
  <main>
    <div class="title-wrapper">
      <h1 class="title">Lore</h1>
    </div>

    <ul class="topics">
      <li @click="openArticle('css-flex')">CSS Flex</li>
    </ul>

    <div class="topic-wrapper" :class="{ active: !!topic }">
      <nuxt-child />
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    topic() { return this.$route.params.topic; },
  },
  methods: {
    openArticle(topic) {
      this.$router.push({ name: 'ansuz-topic', params: { topic } });
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

main
  width: 960px
  box-sizing: border-box
  padding: 48pt 0
  margin: 0 auto
  @include title-style

  > ul.topics
    margin-top: 24pt
    box-sizing: border-box
    display: block

    > li
      color: white
      font-size: 24pt
      letter-spacing: .7pt
      font-family: $base-font-family
      opacity: .75
      transition: .25s
      cursor: pointer

      &:before
        content: ''
        display: inline-block
        width: 12.5pt
        height: 12.5pt
        vertical-align: middle
        background-color: $yellow-500
        margin-right: 10pt
        transition: .25s
      &:hover
        opacity: 1
        transition: .25s
        &:before
          border-radius: 2.5pt
          transition: .25s

  > div.topic-wrapper
    position: fixed
    left: 0
    top: 0
    width: 100vw
    height: 100vh
    background-color: $grey-900
    opacity: 0
    pointer-events: none
    transition: .25s

    &.active
      opacity: 1
      pointer-events: visible
      transition: .25s
</style>
