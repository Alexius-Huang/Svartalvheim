<template>
  <main>
    <weight-status class="weight-status" />
  </main>
</template>

<script>
import WeightStatus from '@/components/misc/Uruz.WeightStatus';

export default {
  components: { WeightStatus },
};
</script>

<style scoped lang="sass">
main
  padding-top: 50pt
// .weight-status
//   margin-top: 50pt
</style>
