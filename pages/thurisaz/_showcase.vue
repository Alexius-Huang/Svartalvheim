<template>
  <section class="showcase">
    <turing-machine v-if="showcase === 'turing-machine'" />
    <drum-sheet-editor v-else-if="showcase === 'drum-sheet-editor'" />
  </section>
</template>

<script>
import TuringMachine from '@/components/misc/Thurisaz/TuringMachine';
import DrumSheetEditor from '@/components/misc/Thurisaz/DrumSheetEditor';

export default {
  components: { TuringMachine, DrumSheetEditor },
  computed: {
    showcase() { return this.$route.params.showcase; }
  },
};
</script>

<style scoped lang="sass">
section.showcase
</style>
