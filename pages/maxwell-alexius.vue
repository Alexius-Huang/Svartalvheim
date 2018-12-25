<template>
  <main>
    <jumbotron class="jumbotron" />
    <career-experience class="career-experience" />
    <skill-set class="skill-set" />
  </main>
</template>

<script>
import Jumbotron from '@/components/misc/MaxwellAlexius.Jumbotron';
import CareerExperience from '@/components/misc/MaxwellAlexius.CareerExperience';
import SkillSet from '@/components/misc/MaxwellAlexius.SkillSet';

export default {
  components: { Jumbotron, CareerExperience, SkillSet },
};
</script>

<style scoped lang="sass">
main
  overflow-x: hidden

.career-experience
  margin-top: 50vh
.skill-set
  margin-top: 100vh
</style>
