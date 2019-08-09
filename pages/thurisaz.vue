<template>
  <main>
    <back-button to="back" :position="['top', 'right']" />
    <h1 v-if="!showcase" class="title">{{ title }}</h1>

    <div class="wrapper">
      <template v-if="showcase">
        <nuxt-child />
      </template>

      <github-projects-gallery />

      <!-- <ul v-else class="list">
        <li class="sub-title">
          <img class="logo" :src="logo.GitHub" />
          <span class="content">GitHub</span>
        </li>

        <li class="custom-section">
          <github-projects-gallery />
        </li>

        <li class="sub-title">
          <img class="logo" :src="logo.CodePen" />
          <span class="content">CodePen Project</span>
        </li>
        <li
          v-for="{ title, link } in codepenLinks" :key="title"
          :data-title="title"
        >
          <a class="link" target="_blank" :href="link">{{ title }}</a>
        </li>

        <li class="sub-title">Miscellaneous</li>
        <li
          data-title="Turing Machine"
          @click="navigateToShowcase('turing-machine')"
        >Turing Machine</li>
        <li
          data-title="Drum Sheet Editor [WIP]"
          @click="navigateToShowcase('drum-sheet-editor')"
        >Drum Sheet Editor [WIP]</li>
      </ul> -->
    </div>
  </main>
</template>

<script>
import GithubProjectsGallery from '@/components/misc/Thurisaz/GithubProjectsGallery';
import BackButton from '@/components/shared/BackButton';
import GitHubLogo from '@/assets/logo/github-main.svg';
import CodePenLogo from '@/assets/logo/codepen-main.svg';
import randomString from '@/utils/randomString';
import codepenLinks from '@/resources/thurisaz/codepen-project-links.json';

export default {
  components: { GithubProjectsGallery, BackButton },
  data() {
    const finalizedTitle = 'Showcase';

    return {
      logo: {
        GitHub: GitHubLogo,
        CodePen: CodePenLogo,
      },
      codepenLinks,
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

  > div.wrapper
    margin-top: 25pt
    padding-bottom: 96pt

    // > ul.list
    //   padding-bottom: 96pt
    //   > li.sub-title
    //     display: block
    //     color: $yellow-500
    //     height: 60pt
    //     font: 48pt/60pt $base-font-family
    //     margin-bottom: 5pt
    //     @include vertical-align
    //     > img.logo
    //       width: 48pt
    //       height: 48pt
    //       margin-right: 8pt
    //     &:not(:first-child)
    //       margin-top: 48pt

    //   > li:not(.sub-title):not(.custom-section)
    //     position: relative
    //     display: inline-block
    //     width: auto
    //     height: 30pt
    //     color: white
    //     border-left: 5pt solid $yellow-500
    //     padding: 0 10pt
    //     font: 16pt/30pt $default-font-family
    //     margin-right: 10pt
    //     margin-top: 8pt
    //     cursor: pointer

    //     > a.link,
    //     > a.link:visited
    //       text-decoration: none
    //       color: white
    //     &:after
    //       content: attr(data-title)
    //       padding-left: 10pt
    //       background-color: transparent
    //       position: absolute
    //       width: 0
    //       height: 30pt
    //       line-height: 30pt
    //       overflow: hidden
    //       left: 0
    //       top: 0
    //       color: #222
    //       transition: .2s ease-out
    //       pointer-events: none

    //     &:hover:after
    //       background-color: $yellow-500
    //       width: 100%
    //       transition: .2s ease-in

@media screen and (max-width: 960px)
  main
    width: 100vw
    padding: 0 25pt

@media screen and (max-width: 768px)
  main
    > h1.title
      font: 108pt/120pt $base-font-family

    // > div.wrapper
    //   > ul.list
    //     > li.sub-title
    //       height: 48pt
    //       font: 36pt/48pt $base-font-family

    //     > li:not(.sub-title)
    //       height: 24pt
    //       border-left-width: 3pt
    //       font: 12pt/24pt $default-font-family
    //       margin-top: 8pt
    //       cursor: pointer
    //       padding: 0 8pt

    //       &:after
    //         padding-left: 8pt
    //         height: 24pt
    //         line-height: 24pt

@media screen and (max-width: 425px)
  main
    > h1.title
      font: 60pt/72pt $base-font-family

    // > div.wrapper
    //   > ul.list
    //     > li.sub-title
    //       height: 36pt
    //       font: 24pt/36pt $base-font-family
    //       color: white

    //       > img.logo
    //         width: 30pt
    //         height: 30pt
    //         margin-right: 4pt

    //     > li:not(.sub-title)
    //       height: auto
    //       font: 10pt/18pt $default-font-family
    //       margin-top: 8pt
    //       padding: 4pt 8pt
    //       color: #222
    //       border-left-width: 0
    //       background-color: $yellow-500
    //       > a.link,
    //       > a.link:visited
    //         background-color: $yellow-500
    //         color: #222

    //       &:after
    //         display: none
</style>
