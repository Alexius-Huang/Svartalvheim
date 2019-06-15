<template>
  <image
    :xlink:href="icons.quaver"
    v-bind="quaverSize"
    :x="horizontalPosition"
    y="-25"
    :transform="anchorTranslation"
  />
</template>

<script>
import quaver from '@/assets/icons/music/quaver-white.svg';

export default {
  props: ['horizontalPosition'],
  data() {
    return {
      icons: { quaver },
      quaverSize: { width: 10, height: 35 },
    };
  },
  computed: {
    anchorTranslation() {
      const { width: w } = this.quaverSize;
      return `translate(${[-w / 2, 0]})`;
    },
  },
};
</script>
