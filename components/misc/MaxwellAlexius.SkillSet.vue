<template>
  <section class="skill-set">
    <h1 class="title">
      > <span>{{ t1 }}</span>
      <span class="highlight">{{ t2 }}</span>
      <span>{{ t3 }}</span>
      <span class="highlight">{{ t4 }}</span> _
    </h1>

    <div class="row">
      <diamond
        title="JavaScript"
        :js-icon="true"
      />
    </div>
    <div class="row">
      <diamond
        title="HTML5"
        :icon="icons.HTML5Icon"
        icon-alt="HTML5"
      />
      <diamond
        title="CSS3"
        :icon="icons.CSS3Icon"
        icon-alt="CSS3"
      />
    </div>
    <div class="row">
      <diamond
        title="Go Lang."
        :icon="icons.GoLangIcon"
        icon-alt="Go Lang."
      />
    </div>
    <div class="row">
      <diamond
        title="Ruby Lang."
        :icon="icons.RubyLangIcon"
        icon-alt="Ruby Lang."
      />
      <diamond
        title="Python Lang."
        :icon="icons.PythonLangIcon"
        icon-alt="Python Lang."
      />
    </div>
    <div class="row">
      <diamond
        title="Git"
        :icon="icons.GitIcon"
        icon-alt="Git"
      />
    </div>
    <div class="row">
      <diamond
        title="Haskell Lang."
        :icon="icons.HaskellLangIcon"
        icon-alt="Haskell Lang."
      />
      <diamond
        title="SQL"
        :icon="icons.DatabaseIcon"
        icon-alt="SQL"
      />
    </div>
    <div class="row">
      <diamond
        title="About Software Engineering"
        :icon="icons.CodeIcon"
        icon-alt="Software Engineering"
      />
    </div>
  </section>
</template>

<script>
import HTML5Icon from '@/assets/icons/html5-icon.png';
import CSS3Icon from '@/assets/icons/css3-icon.png';
import GoLangIcon from '@/assets/icons/golang-icon.png';
import RubyLangIcon from '@/assets/icons/ruby-lang-icon.png';
import PythonLangIcon from '@/assets/icons/python-lang-icon.png';
import GitIcon from '@/assets/icons/git-icon.png';
import HaskellLangIcon from '@/assets/icons/haskell-lang-icon.png';
import DatabaseIcon from '@/assets/icons/database.png';
import CodeIcon from '@/assets/icons/code.png';

import Diamond from './MaxwellAlexius.SkillSet/Diamond';

export default {
  components: { Diamond },
  data() {
    return {
      skillsTitle: [
        'Skills where you can find from',
        'Maxwell',
        'in',
        'Svartalvheim',
      ],
      t1: '',
      t2: '',
      t3: '',
      t4: '',
      icons: {
        HTML5Icon,
        CSS3Icon,
        GoLangIcon,
        RubyLangIcon,
        PythonLangIcon,
        GitIcon,
        HaskellLangIcon,
        DatabaseIcon,
        CodeIcon,
      },
      textAnimationInterval: null,
      textAnimationTimeout: null,
    };
  },
  mounted() {
    const setTextAnimation = () => {
      return window.setInterval(() => {
        if (this.t1 !== this.skillsTitle[0]) {
          this.t1 += this.skillsTitle[0][this.t1.length];
        } else if (this.t2 !== this.skillsTitle[1]) {
          this.t2 += this.skillsTitle[1][this.t2.length];
        } else if (this.t3 !== this.skillsTitle[2]) {
          this.t3 += this.skillsTitle[2][this.t3.length];
        } else if (this.t4 !== this.skillsTitle[3]) {
          this.t4 += this.skillsTitle[3][this.t4.length];
        } else {
          window.clearInterval(this.textAnimationInterval);
          this.textAnimationTimeout = window.setTimeout(() => {
            this.t1 = '';
            this.t2 = '';
            this.t3 = '';
            this.t4 = '';
            this.textAnimationInterval = setTextAnimation();
          }, 3000);
        }
      }, 100);
    }
    this.textAnimationInterval = setTextAnimation();
  },
  beforeDestroy() {
    window.clearInterval(this.textAnimationInterval);
    window.clearTimeout(this.textAnimationTimeout);
  },
};
</script>

<style scoped lang="sass">
@import '../../sass/colors.sass'
@import '../../sass/helpers.sass'

section.skill-set
  position: relative
  text-align: center
  > h1.title
    text-align: center
    color: white
    font-size: 24pt
    width: 80vw
    margin: 0 auto 144pt auto
    letter-spacing: 1pt

    span.highlight
      color: $yellow-500
      font-family: 'Staatliches'
 
div.row + div.row
  margin-top: -50pt
</style>
