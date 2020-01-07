<template>
  <main>
    <jumbotron class="jumbotron" />
    <introduction class="introduction" />
    <content-bricks
      class="content-bricks"
      @scroll-to="handleScroll"
    />
    <career-experience class="career-experience" ref="career-experience" />
    <skill-set class="skill-set" ref="skill-set" />
    <public-speech class="public-speech" ref="public-speech" />
    <!-- <contact class="contact" /> -->
    <!-- <runic-navigation class="runic-navigation" /> -->
  </main>
</template>

<script>
import Jumbotron from '@/components/misc/Home/Jumbotron';
import Introduction from '@/components/misc/Home/Introduction';
import ContentBricks from '@/components/misc/Home/ContentBricks';
import CareerExperience from '@/components/misc/Home/CareerExperience';
import SkillSet from '@/components/misc/Home/SkillSet';
import PublicSpeech from '@/components/misc/Home/PublicSpeech';
// import Contact from '@/components/misc/Home/Contact';
// import RunicNavigation from '@/components/misc/Home/RunicNavigation';

export default {
  components: {
    Jumbotron,
    Introduction,
    ContentBricks,
    CareerExperience,
    SkillSet,
    PublicSpeech,
    // Contact,
    // RunicNavigation,
  },
  methods: {
    handleScroll(targetSection) {
      const { $el } = this.$refs[targetSection];
      window.scrollTo({
        top: $el.offsetTop,
        behavior: 'smooth',
      });
    },
  }
};
</script>

<style scoped lang="sass">
main
  overflow-x: hidden
  padding-bottom: 50vh

.content-bricks
  margin-top: 50pt
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
