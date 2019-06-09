<template>
  <main>
    <div class="title-wrapper">
      <h1 class="title">Showcase</h1>
    </div>

    <div class="wrapper">
      <turing-machine />
    </div>
  </main>
</template>

<script>
import TuringMachine from '@/components/misc/Thurisaz/TuringMachine';

export default {
  components: { TuringMachine },
};
</script>

<style scoped lang="sass">
@import '../sass/colors.sass'
@import '../sass/shared.sass'
@import '../sass/helpers.sass'

main
  display: block
  width: 960px
  margin: 0 auto
  @include title-style

  > div.title-wrapper
    margin-top: 50pt

  > div.wrapper
    margin-top: 25pt
</style>
