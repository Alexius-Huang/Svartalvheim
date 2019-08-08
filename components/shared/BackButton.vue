<template>
  <div :style="buttonPosition" class="back-button-wrapper">
    <button @click="handleNavigation">
      <img :src="icons.chevronLeft" />
      <span class="text-wrapper">Back</span>
    </button>
  </div>
</template>

<script>
import chevronLeft from '@/assets/icons/material/chevron-left-main.svg';

export default {
  props: ['position', 'to', 'params', 'query'],
  data() {
    return {
      icons: { chevronLeft },
    };
  },
  computed: {
    buttonPosition() {
      const { position } = this;

      if (
        Array.isArray(position) &&
        ['top', 'bottom'].includes(position[0]) &&
        ['left', 'right'].includes(position[1])
      ) {
        return { [position[0]]: '20pt', [position[1]]: '20pt' };
      }

      return { top: '20pt', left: '20pt' };
    },
  },
  methods: {
    handleNavigation(event) {
      this.$emit('click', event);

      const { to, params, query } = this;
      if (to === -1 || to === 'back') {
        this.$router.go(-1);
      } else if (typeof to === 'string') {
        this.$router.push({ name: to, params, query });
      }
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

div.back-button-wrapper
  position: fixed
  width: auto
  height: 30pt
  z-index: 999

  > button
    @include btn-reset
    width: 30pt
    height: 30pt
    border-radius: 50%
    border: 1pt solid $yellow-500
    > img
      width: 100%
      height: 100%
    > span.text-wrapper
      display: none

</style>
