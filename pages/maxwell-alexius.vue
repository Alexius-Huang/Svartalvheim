<template>
  <main>
    <jumbotron class="jumbotron" />
    <introduction class="introduction" />
    <career-experience class="career-experience" />
    <skill-set class="skill-set" />
    <public-speech class="public-speech" />
  </main>
</template>

<script>
import Jumbotron from '@/components/misc/MaxwellAlexius.Jumbotron';
import Introduction from '@/components/misc/MaxwellAlexius.Introduction';
import CareerExperience from '@/components/misc/MaxwellAlexius.CareerExperience';
import SkillSet from '@/components/misc/MaxwellAlexius.SkillSet';
import PublicSpeech from '@/components/misc/MaxwellAlexius.PublicSpeech';

export default {
  components: { Jumbotron, Introduction, CareerExperience, SkillSet, PublicSpeech },
};
</script>

<style scoped lang="sass">
main
  overflow-x: hidden
  padding-bottom: 50vh

.career-experience
  margin-top: 100vh
.skill-set
  margin-top: 100vh
.public-speech
  margin-top: 50vh
</style>
