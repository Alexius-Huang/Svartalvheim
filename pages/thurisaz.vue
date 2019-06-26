<template>
  <main>
    <div class="title-wrapper">
      <h1 class="title">Showcase</h1>
    </div>

    <div class="wrapper">
      <template v-if="showcase">
        <nuxt-child />
      </template>

      <ul v-else class="list">
        <li
          data-title="Turing Machine"
          @click="navigateToShowcase('turing-machine')"
        >Turing Machine</li>
        <li
          data-title="Drum Sheet Editor"
          @click="navigateToShowcase('drum-sheet-editor')"
        >Drum Sheet Editor</li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    showcase() { return this.$route.params.showcase; },
  },
  methods: {
    navigateToShowcase(showcase) {
      this.$router.push({ name: 'thurisaz-showcase', params: { showcase } });
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

main
  display: block
  width: 960px
  margin: 0 auto
  @include title-style

  > div.title-wrapper
    margin-top: 50pt

  > div.wrapper
    margin-top: 25pt

    > ul.list
      > li
        position: relative
        display: inline-block
        width: auto
        height: 30pt
        line-height: 30pt
        color: white
        border-left: 5pt solid $yellow-500
        padding: 0 10pt
        font-size: 16pt
        font-family: $base-font-family
        margin-right: 10pt
        &:after
          content: attr(data-title)
          padding-left: 10pt
          background-color: transparent
          position: absolute
          width: 0
          height: 30pt
          line-height: 30pt
          overflow: hidden
          left: 0
          top: 0
          color: #222
          transition: .2s ease-out

        &:hover:after
          background-color: $yellow-500
          width: 100%
          transition: .2s ease-in
</style>
