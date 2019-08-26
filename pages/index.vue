<template>
  <section class="container">
    <p>Redirecting to Svartalvheim ...</p>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';

export default {
  components: {
    AppLogo
  },
  mounted() {
    window.setImmediate(() => {
      this.$router.push({ name: 'maxwell-alexius' });
    });
  },
}
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'

section.container
  height: 100vh
  @include vertical-align
  text-align: center
  > p
    font-family: 'Staatliches'
    font-size: 24pt
    color: $yellow-500

</style>

