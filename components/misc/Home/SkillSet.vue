<template>
  <section class="skill-set">
    <div class="title-wrapper">
      <h1 class="title">
        $> <span>{{ t1 }}</span><span class="highlight">{{ t2 }}</span><span>{{ t3 }}</span><span class="highlight">{{ t4 }}</span>_
      </h1>
    </div>

    <div class="row">
      <diamond
        title="JavaScript"
        :js-icon="true"
      >
        <ul class="list">
          <li>Has 3 years of experience working with Client-side JavaScript</li>
          <li>ReactJS with following tools: Redux / React-Router / Redux-Saga / Reselect</li>
          <li>VueJS with following tools: Vue-Router / Vuex</li>
          <li>Has experience developing desktop applications using Electron</li>
          <li>Has experience giving a presentation about ES6 Generators / Promise & ES7 Async-Await and public speech related to functional programming and RxJS</li>
          <li>Knows the advanced concept of JavaScript such as variable scopes, closure, function binding, IIFE, and the “this” keyword</li>
          <li>Knows how to use JQuery and how to not to use JQuery (Vanilla JavaScript)</li>
          <li>Knows how to send HTTP requests using Axios or Fetch API</li>
          <li>
            Knows the syntax and concepts of ECMAScript:
            <ul class="list">
              <li>ES6 “var” v.s. “let” v.s. “const”, Arrow Functions, Promise, Destructuring, Class … etc.</li>
              <li>ES6 metaprogramming features: Symbols, Proxy & Reflect</li>
              <li>ES7 Async-Await & Rest-Spread Operator</li>
              <li>ES8 Async Iterator & for-await-of Loop</li>
            </ul>
          </li>
          <li>Knows the concept of polyfill and the prototype chain</li>
          <li>Knows the concept of TDD and have experience with writing unit tests using AvaJS or Mocha</li>
          <li>Has a basic understanding of Webpack and its configuration</li>
          <li>Knows how to create and publish NPM / Yarn package</li>
          <li>Knows how to use HTML5 Canvas and SVG using SnapSVG</li>
          <li>Knows how to realize the condition a === 1 && a === 2 && a === 3 in JavaScript</li>
        </ul>
      </diamond>
    </div>
    <div class="row">
      <diamond
        title="HTML5"
        :icon="icons.HTML5Icon"
        icon-alt="HTML5"
      >
        <ul class="list">
          <li>Knows the basics of HTML5 and also have experience using the W3C HTML Validator</li>
          <li>Knows how to use HTML5 Canvas</li>
          <li>Knows how to use SVG elements</li>
        </ul>
      </diamond>
      <diamond
        title="CSS3"
        :icon="icons.CSS3Icon"
        icon-alt="CSS3"
      >
        <ul class="list">
          <li>Knows the basics of CSS3 and also have experience using the W3C CSS Validator</li>
          <li>Knows the basics of RWD and able to layout the webpage from scratch (without using Bootstrap)</li>
          <li>Knows the CSS transform/keyframes features</li>
          <li>Knows how to program CSS using Scss/Sass</li>
        </ul>
      </diamond>
    </div>
    <div class="row">
      <diamond
        title="Go Lang."
        :icon="icons.GoLangIcon"
        icon-alt="Go Lang."
      >
        <ul class="list">
          <li>Knows the basic syntax of using Go Lang.</li>
          <li>Understands the difference between concurrency & parallel</li>
          <li>Has contributed GitHub open source project - Goby Programming Language</li>
          <li>Has given a public speech related to contributing to open source project - Goby</li>
          <li>Has experience working with GraphQL Go</li>
        </ul>
      </diamond>
    </div>
    <div class="row">
      <diamond
        title="Ruby Lang."
        :icon="icons.RubyLangIcon"
        icon-alt="Ruby Lang."
      >
        <ul class="list">
          <li>Has experience working using Ruby on Rails and knows how to use the gems in Rails</li>
          <li>Knows the concept and the MVC framework design from Ruby on Rails</li>
          <li>Knows and enjoys the metaprogramming feature of Ruby</li>
        </ul>
      </diamond>
      <diamond
        title="Python Lang."
        :icon="icons.PythonLangIcon"
        icon-alt="Python Lang."
      >
        <ul class="list">
          <li>Knows the basic syntax of Python Lang.</li>
          <li>Has experience using NumPy / Matplotlib</li>
          <li>Knows some machine algorithm including Linear Regression / (Convolutional) Neural Network</li>
          <li>Has experience developing projects or applications such as Scikit-Learn, and the basics of Tensorflow</li>
        </ul>
      </diamond>
    </div>
    <div class="row">
      <diamond
        title="Git"
        :icon="icons.GitIcon"
        icon-alt="Git"
      >
        <ul class="list">
          <li>Knows how the Git-Flow works</li>
          <li>Knows what I am doing when force pushing the codes and never tries to attempt danger actions on the “master” (or “dev”) branch!</li>
        </ul>
      </diamond>
    </div>
    <div class="row">
      <diamond
        title="Haskell Lang."
        :icon="icons.HaskellLangIcon"
        icon-alt="Haskell Lang."
      >
        <ul class="list">
          <li>Knows the basics of functional programming including pattern matching / immutability  / recursive programming … etc</li>
          <li>Knows some concept of abstract data types such as Folds / Monad / Ord / Setoid / Functor</li>
        </ul>
      </diamond>
      <diamond
        title="SQL"
        :icon="icons.DatabaseIcon"
        icon-alt="SQL"
      >
        <ul class="list">
          <li>Knows the basic SQL syntax</li>
          <li>Has experience working with SQLite, MySQL, MariaDB, and PostgreSQL</li>
        </ul>
      </diamond>
    </div>
    <div class="row">
      <diamond
        title="About Software Engineering"
        :icon="icons.CodeIcon"
        icon-alt="Software Engineering"
      >
        <ul class="list">
          <li>Knows and has experience with some design patterns and implemented in projects such as the factory/observer/iterator pattern etc.</li>
          <li>Knows the common software design conventions such as DRY (Don’t repeat yourself) / CoC (Convention over configuration) / Separation of concerns / Decoupling … etc</li>
          <li>Knows the machine learning algorithm: Linear Regression / basic Neural Network / Convolutional Neural Networks</li>
          <li>Knows the process of code compilation: Lexer (Tokenizer) / Parser / Code Generation</li>
        </ul>
      </diamond>
    </div>
  </section>
</template>

<script>
import HTML5Icon from '@/assets/icons/programming-lang/html5-icon.png';
import CSS3Icon from '@/assets/icons/programming-lang/css3-icon.png';
import GoLangIcon from '@/assets/icons/programming-lang/golang-icon.png';
import RubyLangIcon from '@/assets/icons/programming-lang/ruby-lang-icon.png';
import PythonLangIcon from '@/assets/icons/programming-lang/python-lang-icon.png';
import GitIcon from '@/assets/icons/programming-lang/git-icon.png';
import HaskellLangIcon from '@/assets/icons/programming-lang/haskell-lang-icon.png';
import DatabaseIcon from '@/assets/icons/maxwell-alexius/database.png';
import CodeIcon from '@/assets/icons/maxwell-alexius/code.png';

import Diamond from './SkillSet/Diamond';

export default {
  components: { Diamond },
  data() {
    return {
      skillsTitle: [
        'Skills where you can find from ',
        'Maxwell ',
        'in ',
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
      }, 75);
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
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'

section.skill-set
  position: relative
  text-align: center
  > div.title-wrapper
    height: 96pt
    margin-bottom: 96pt
    > h1.title
      text-align: center
      color: white
      font-size: 32pt
      width: 60vw
      line-height: 1.7
      margin: 0 auto 144pt auto
      letter-spacing: 1pt

      span.highlight
        color: $yellow-500
        font-family: 'Staatliches', 'Roboto'

div.row + div.row
  margin-top: -50pt

ul.list
  margin-top: 16pt
  padding: 0
  height: calc(100vh - 200pt)
  overflow-y: auto
  > li
    list-style-type: none
    position: relative
    padding-left: 32pt
    line-height: 1.7
    > ul.list
      height: auto
      margin-bottom: 48pt
    + li
      margin-top: 12pt

    &:before
      position: absolute
      left: 5pt
      top: 8pt
      content: ''
      display: inline-block
      width: 10pt
      height: 10pt
      box-sizing: border-box
      background-color: $grey-900
      transform: rotate(45deg)

@media screen and (max-width: 768px)
  section.skill-set
    > div.title-wrapper
      height: 96pt
      margin-bottom: 48pt
      > h1.title
        line-height: 1.7
        font-size: 24pt
        width: 80vw
        margin-bottom: 72pt

    > div.row
      + div.row
        margin-top: -25pt

  ul.list
    margin-top: 8pt
    height: calc(100vh - 50pt)
    overflow-y: auto
    padding-bottom: 50vh

    > li
      font-size: 14pt
      > ul.list
        height: auto
        margin-bottom: 24pt
        padding-bottom: 0
      &:before
        top: 4pt

@media screen and (max-width: 425px)
  section.skill-set
    > div.title-wrapper
      height: 124pt
      margin-bottom: 48pt
    > div.row
      + div.row
        margin-top: -20pt
</style>
