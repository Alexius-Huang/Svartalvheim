<template>
  <main>
    <jumbotron class="jumbotron" />
    <career-experience class="career-experience" />
    <skill-set class="skill-set" />
    <public-speech class="public-speech" />
  </main>
</template>

<script>
import Jumbotron from '@/components/misc/MaxwellAlexius.Jumbotron';
import CareerExperience from '@/components/misc/MaxwellAlexius.CareerExperience';
import SkillSet from '@/components/misc/MaxwellAlexius.SkillSet';
import PublicSpeech from '@/components/misc/MaxwellAlexius.PublicSpeech';

export default {
  components: { Jumbotron, CareerExperience, SkillSet, PublicSpeech },
};
</script>

<style scoped lang="sass">
main
  overflow-x: hidden
  padding-bottom: 50vh

.career-experience
  margin-top: 50vh
.skill-set
  margin-top: 100vh
.public-speech
  margin-top: 50vh
</style>
