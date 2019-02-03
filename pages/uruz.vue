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
  width: 100vw
  padding-top: 50pt
  box-sizing: border-box
// .weight-status
//   margin-top: 50pt

@media screen and (max-width: 768px)
  main
    padding: 24pt

</style>
