<template>
  <main>
    <home-button />
    <h1 class="title">{{ title }}</h1>
    <img class="huge-bg-img" :src="logo[currentSource]" />

    <div class="sources-wrapper" :class="{ 'show-in-mobile': scrollDirectionIsDown }">
      <button
        v-for="(source, i) in sources"
        :key="`${source}-${i}`"
        class="source-btn" :class="{ active: currentSource === source }"
        @click="$router.push({ name: 'thurisaz', query: { source } })"
      >
        <img
          class="source-logo"
          :src="(currentSource === source ? logoDark : logo)[source]"
        />
        <span class="source-name">{{ source }}</span>
      </button>
    </div>

    <div class="wrapper">
      <projects-gallery
        :source-data="dataMap[currentSource]"
        img-url="projects-img/"
      />
    </div>
  </main>
</template>

<script>
import ProjectsGallery from '@/components/misc/Thurisaz/ProjectsGallery';
import HomeButton from '@/components/shared/HomeButton';
import GitHubLogo from '@/assets/svg/logo/github-main.svg';
import GitHubLogoDark from '@/assets/svg/logo/github-dark.svg';
import CodePenLogo from '@/assets/svg/logo/codepen-main.svg';
import CodePenLogoDark from '@/assets/svg/logo/codepen-dark.svg';
import code from '@/assets/material/code-main.svg';
import codeDark from '@/assets/material/code-dark.svg';
import timeline from '@/assets/material/timeline-main.svg';
import timelineDark from '@/assets/material/timeline-dark.svg';
import barChart from '@/assets/material/bar-chart-main.svg';
import barChartDark from '@/assets/material/bar-chart-dark.svg';
import stars from '@/assets/material/stars-main.svg';
import starsDark from '@/assets/material/stars-dark.svg';
import randomString from '@/utils/randomString';

/* Data Sources */
import githubProjects from '@/resources/thurisaz/github-project-links.json';
import careerProjects from '@/resources/thurisaz/career-project-links.json';
import codepenProjects from '@/resources/thurisaz/codepen-project-links.json';
import visualizations from '@/resources/thurisaz/visualization-links.json';
import specialProjects from '@/resources/thurisaz/special-project-links.json';

const allProjects = [
  ...githubProjects,
  ...careerProjects,
  ...codepenProjects,
  ...visualizations,
  ...specialProjects,
]
  .sort(({ date: [y1, m1] }, { date: [y2, m2] }) =>
    (y1 === y2 && m1 === m2) ? 0 :
    (y1 > y2) || (y1 === y2 && m1 > m2) ? -1 : 1
  );

export default {
  components: { ProjectsGallery, HomeButton },
  data() {
    const finalizedTitle = 'Portfolio';

    return {
      logo: {
        Projects: code,
        GitHub: GitHubLogo,
        CodePen: CodePenLogo,
        Career: timeline,
        Visualization: barChart,
        Special: stars,
      },
      logoDark: {
        Projects: codeDark,
        GitHub: GitHubLogoDark,
        CodePen: CodePenLogoDark,
        Career: timelineDark,
        Visualization: barChartDark,
        Special: starsDark,
      },
      dataMap: {
        Projects: allProjects,
        GitHub: githubProjects,
        CodePen: codepenProjects,
        Career: careerProjects,
        Visualization: visualizations,
        Special: specialProjects,
      },
      sources: ['Projects', 'GitHub', 'Career', 'CodePen', 'Visualization', 'Special'],

      finalizedTitle,
      title: randomString(finalizedTitle.length),
      titleCharGenReqCycles: 5,
      titleCharGenCycle: 0,
      titleCharFinIndex: 0,
      timeoutFlag: null,

      previousScroll: 0,
      scrollDirectionIsDown: false,
    };
  },
  computed: {
    query() { return this.$route.query; },
    currentSource() { return this.query.source; },
  },
  methods: {
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
    handleScroll() {
      this.scrollDirectionIsDown = this.previousScroll < window.scrollY;
      this.previousScroll = window.scrollY;
    },
  },
  mounted() {
    if (!this.currentSource) {
      this.$router.push({ name: 'thurisaz', query: { source: 'Projects' } });
    }

    this.titleAnimation();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  },
  beforeDestroy() {
    clearTimeout(this.timeoutFlag);
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    currentSource() {
      if (!this.currentSource) {
        this.$router.push({ name: 'thurisaz', query: { source: 'Projects' } });
      }
    },
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

  > div.sources-wrapper
    position: fixed
    width: 100vw
    height: 80pt
    box-sizing: border-box
    padding: 0 60pt 0 20pt
    left: 0
    top: 0
    z-index: 100
    white-space: nowrap
    overflow-x: auto
    overflow-y: visible
    @include vertical-align

    > button.source-btn
      @include btn-reset
      display: inline-block
      position: relative
      width: 60pt
      background-color: transparent
      transition: .25s

      > img.source-logo
        width: 35pt
        height: 35pt
        display: block
        margin: 0 auto
        background-color: #222
        border-radius: 50%
        padding: 5pt
        transition: .25s
      > span.source-name
        font: 10pt/18pt $base-font-family
        background-color: #222
        position: absolute
        display: inline-block
        width: 100%
        height: 18pt
        line-height: 18pt
        bottom: -16pt
        left: 0
        text-align: center
        border: 1pt solid $yellow-500
        border-radius: 1pt
        transition: .25s

      + button
        margin-left: 10pt

      &.active
        > img.source-logo
          background-color: $yellow-500
        > span.source-name
          color: #222
          background-color: $yellow-500

  > div.wrapper
    padding-top: 100pt
    padding-bottom: 96pt

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

@media screen and (max-width: 575px)
  main
    > img.huge-bg-img
      width: 300pt
      height: 300pt
      bottom: -15pt

    > div.sources-wrapper
      top: -80pt
      transition: .25s

      &.show-in-mobile
        top: 0
        transition: .25s

    > div.wrapper
      padding-top: 25pt

@media screen and (max-width: 425px)
  main
    > h1.title
      font: 60pt/72pt $base-font-family
    > img.huge-bg-img
      width: 200pt
      height: 200pt
      bottom: -10pt
</style>
