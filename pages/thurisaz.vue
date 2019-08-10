<template>
  <main>
    <back-button to="back" :position="['top', 'right']" />
    <h1 v-if="!showcase" class="title">{{ title }}</h1>
    <img class="huge-bg-img" :src="logo.GitHub" />

    <div class="wrapper">
      <template v-if="showcase">
        <nuxt-child />
      </template>

      <div class="title-wrapper">
        <img class="logo" :src="logo.GitHub" />
        <span class="content">GitHub</span>
      </div>
      <projects-gallery
        :source-data="githubProjectsData"
        img-url="github-projects-img/"
      />
    </div>
  </main>
</template>

<script>
import ProjectsGallery from '@/components/misc/Thurisaz/ProjectsGallery';
import BackButton from '@/components/shared/BackButton';
import GitHubLogo from '@/assets/logo/github-main.svg';
import CodePenLogo from '@/assets/logo/codepen-main.svg';
import randomString from '@/utils/randomString';
import codepenLinks from '@/resources/thurisaz/codepen-project-links.json';
import githubProjectsData from '@/resources/thurisaz/github-project-links.json';

export default {
  components: { ProjectsGallery, BackButton },
  data() {
    const finalizedTitle = 'Showcase';

    return {
      logo: {
        GitHub: GitHubLogo,
        CodePen: CodePenLogo,
      },
      codepenLinks,
      githubProjectsData,
      finalizedTitle,
      title: randomString(finalizedTitle.length),
      titleCharGenReqCycles: 5,
      titleCharGenCycle: 0,
      titleCharFinIndex: 0,
      timeoutFlag: null,
    }
  },
  computed: {
    showcase() { return this.$route.params.showcase; },
  },
  methods: {
    navigateToShowcase(showcase) {
      this.$router.push({ name: 'thurisaz-showcase', params: { showcase } });
    },
    titleAnimation() {
      const {
        titleCharGenReqCycles: reqCycles,
        titleCharGenCycle: genCycles,
        finalizedTitle: FT,
      } = this;

      let { titleCharFinIndex: finIndex } = this;

      if (genCycles === reqCycles) {
        this.titleCharGenCycle = 0;
        finIndex += 1;
        this.titleCharFinIndex = finIndex;
      } else {
        this.titleCharGenCycle += 1;
      }

      const randomStringLength = FT.length - finIndex;
      this.title = FT.slice(0, finIndex) + randomString(randomStringLength);
      if (finIndex !== FT.length) {
        this.timeoutFlag = setTimeout(() => {
          this.titleAnimation();
        }, 66.67);
      } else {
        this.timeoutFlag = setTimeout(() => {
          this.titleCharGenCycle = 0,
          this.titleCharFinIndex = 0;
          this.titleAnimation();
        }, 10000);
      }
    },
  },
  mounted() {
    this.titleAnimation();
  },
  beforeDestroy() {
    clearTimeout(this.timeoutFlag);
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

main
  display: block
  width: 960px
  margin: 0 auto
  @include title-style

  > h1.title
    position: fixed
    left: 10pt
    bottom: 20pt
    font: 144pt/200pt $base-font-family
    color: rgba(255, 255, 255, 0.2)
    pointer-events: none
    z-index: -1

  > img.huge-bg-img
    position: fixed
    z-index: -2
    width: 500pt
    height: 500pt
    bottom: -50pt
    right: -25pt
    opacity: .1

  > div.wrapper
    margin-top: 25pt
    padding-bottom: 96pt

    > div.title-wrapper
      display: block
      color: $yellow-500
      height: 60pt
      font: 48pt/60pt $base-font-family
      margin-bottom: 5pt
      @include vertical-align
      > img.logo
        width: 48pt
        height: 48pt
        margin-right: 8pt
      &:not(:first-child)
        margin-top: 48pt

@media screen and (max-width: 960px)
  main
    width: 100vw
    padding: 0 25pt

@media screen and (max-width: 768px)
  main
    > h1.title
      font: 108pt/120pt $base-font-family
    > img.huge-bg-img
      width: 400pt
      height: 400pt

    > div.wrapper > div.title-wrapper
      height: 48pt
      font: 36pt/48pt $base-font-family

@media screen and (max-width: 575px)
  main
    > img.huge-bg-img
      width: 300pt
      height: 300pt
      bottom: -15pt

@media screen and (max-width: 425px)
  main
    > h1.title
      font: 60pt/72pt $base-font-family
    > img.huge-bg-img
      width: 200pt
      height: 200pt
      bottom: -10pt

    > div.wrapper > div.title-wrapper
      height: 36pt
      font: 24pt/36pt $base-font-family
      color: white
      > img.logo
        width: 36pt
        height: 36pt
</style>
