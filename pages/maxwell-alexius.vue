<template>
  <main>
    <jumbotron class="jumbotron" />
    <introduction class="introduction" />
    <career-experience class="career-experience" />
    <skill-set class="skill-set" />
    <public-speech class="public-speech" />
    <contact class="contact" />
  </main>
</template>

<script>
import Jumbotron from '@/components/misc/MaxwellAlexius.Jumbotron';
import Introduction from '@/components/misc/MaxwellAlexius.Introduction';
import CareerExperience from '@/components/misc/MaxwellAlexius.CareerExperience';
import SkillSet from '@/components/misc/MaxwellAlexius.SkillSet';
import PublicSpeech from '@/components/misc/MaxwellAlexius.PublicSpeech';
import Contact from '@/components/misc/MaxwellAlexius.Contact';

export default {
  components: {
    Jumbotron,
    Introduction,
    CareerExperience,
    SkillSet,
    PublicSpeech,
    Contact,
  },
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
.contact
  margin-top: 50vh

@media screen and (max-width: 768px)
  main
    padding-bottom: 96pt
  .career-experience
    margin-top: 96pt
  .skill-set
    margin-top: 96pt
  .public-speech
    margin-top: 188pt
  .contact
    margin-top: 144pt
</style>
