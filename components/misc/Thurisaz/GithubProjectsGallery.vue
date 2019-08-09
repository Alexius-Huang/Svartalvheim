<template>
  <section class="github-projects-gallery">
  </section>
</template>

<script>
import data from '@/resources/thurisaz/github-project-links.json';

export default {
  data() {
    return {
      data,
      coverURL: '~/assets/github-projects-img/',
    };
  },
};
</script>

<style scpped lang="sass">

</style>
