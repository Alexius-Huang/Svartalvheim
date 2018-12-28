<template>
  <section class="career-experience">
    <!-- <pre>
      <code>
        <span class="hl">async function</span> fetchData() {
          <span class="hl">try</span> {
            <span class="hl">const</span> responses = <span class="hl">await</span> Promise.all([
              fetchTopics(),
              fetchContents(),
              fetchLists()
            ]);

            <span class="hl">return</span> responses;
          } <span class="hl">catch</span> (err) {
            console.error(`[Fetch Data Error] ${err}`);
          }
        }

        <span class="hl">const</span> $el = <span class="hl">document</span>.getElementById('element');

        (<span class="hl">async function</span>() {
          <span class="hl">const</span> [
            topics,
            contents,
            lists
          ] = <span class="hl">await</span> fetchData();

          topics
            .concat(contents)
            .concat(lists)
            .forEach((item) => {
              <span class="hl">const</span> node = <span class="hl">document</span>.createElement('p');
              node.innerText(item);

              $el.appendChild(node);
            });
        })();
      </code>
    </pre> -->

    <div class="parallelogram-bg">
      <h2 class="title">Career Experience</h2>

      <div class="content-wrapper">
        <ul class="timeline">
          <li :class="{ active: active.includes('umbo-cv') }" @click="handleToggleEvent('umbo-cv')">
            <h3>Umbo Computer Vision, Inc.</h3>
            <p class="date">Nov. 2017 - Present</p>
            <p class="position">Intern. CV Team Front-End Engineer</p>
            <div class="tags">
              <span class="tag">ReactJS</span>
              <span class="tag">SVG</span>
              <span class="tag">HTML5 Canvas</span>
              <span class="tag">Data Visualization</span>
              <span class="tag">Animation</span>
              <span class="tag">Presentation</span>
              <span class="tag">Go Lang.</span>
              <span class="tag">GraphQL</span>
            </div>
            <article class="content">
              <ul>
                <li>Built a data visualization tool for showing the images' ground-truth and metrices by using Radar charts</li>
                <li>Helped maintain Front-end projects including the data visualization and data labelling platform</li>
                <li>Visualizes the evaluation results of trained model using Line charts with Animation</li>
                <li>Refactor and helped upgrade the model demo site for Sales & Marketing team</li>
                <li>Held internal share about asynchronous programming in JavaScript including the ES6 Promise and ES7 Async-Await feature</li>
                <li>Held internal share about GraphQL 101 and use Go Lang. to demonstrate GraphQL Go</li>
              </ul>
            </article>
          </li>
          <li :class="{ active: active.includes('5xruby-contractor') }" @click="handleToggleEvent('5xruby-contractor')">
            <h3>5xRuby, Inc.</h3>
            <p class="date">Aug. 2017 - Oct. 2017</p>
            <p class="position">Contractor. Fullstack Engineer</p>
            <div class="tags">
              <span class="tag">Ruby</span>
              <span class="tag">Ruby on Rails</span>
            </div>
            <article class="content">
              <ul>
                <li>Use <code>tenant</code> gem to realize multitenancy in Ruby on Rails</li>
                <li>Has experience working remotely</li>
              </ul>
            </article>
          </li>
          <li :class="{ active: active.includes('5xruby') }" @click="handleToggleEvent('5xruby')">
            <h3>5xRuby, Inc.</h3>
            <p class="date">Mar. 2017 - Jul. 2017</p>
            <p class="position">Intern. Ruby on Rails Developer</p>
            <div class="tags">
              <span class="tag">Ruby</span>
              <span class="tag">Ruby on Rails</span>
              <span class="tag">ReactJS</span>
              <span class="tag">HTML5 & CSS3</span>
              <span class="tag">Functional Programming</span>
              <span class="tag">Go Lang.</span>
              <span class="tag">Open Source Project</span>
              <span class="tag">Presentation</span>
            </div>
            <article class="content">
              <ul>
                <li>Learned basics of HTML5, CSS3, JavaScript and Ruby on Rails</li>
                <li>Helped build the internal HR management system with Rails</li>
                <li>Learned the basic concept of functional programming</li>
                <li>Contributed an open source project, Goby Lang, which is another programming language compiled by Go but has a Ruby-like syntax with Go's concurrency feature</li>
                <li>Attended SITCON Hong Kong 2017 as a speaker and talked about contributing open-source projects experience</li>
              </ul>
            </article>
          </li>
          <li :class="{ active: active.includes('potentia') }" @click="handleToggleEvent('potentia')">
            <h3>Potentia Computer, Inc.</h3>
            <p class="date">Jul. 2016 - Aug. 2016</p>
            <p class="position">Intern. Back-End Engineer</p>
            <div class="tags">
              <span class="tag">PHP</span>
              <span class="tag">CodeIgniter 3</span>
              <span class="tag">ReactJS</span>
            </div>
            <article class="content">
              <ul>
                <li>Learned the MVC framework - PHP CodeIgniter 3</li>
                <li>Helped build the system which manages the backend of the company product</li>
                <li>Present ReactJS 101 for colleagues</li>
              </ul>
            </article>
          </li>
        </ul>

        <!-- <div class="timeline-wrapper">
          
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return { active: [] };
  },
  methods: {
    handleToggleEvent(type) {
      if (this.active.includes(type)) {
        const active = [...this.active];
        active.splice(this.active.indexOf(type), 1);
        this.active = active;
      } else {
        this.active = [...this.active, type];
      }
    },
  },
};
</script>

<style scoped lang="sass">
@import '../../sass/colors.sass'
@import '../../sass/helpers.sass'

section.career-experience
  width: 100vw
  height: 100vh
  position: relative
  > pre
    position: absolute
    top: -75vh
    left: 0
    perspective: 5pt
    > code
      font-family: 'Share Tech Mono', 'Roboto Mono', monospace
      color: white
      opacity: 0.8
      font-size: 12pt

      > span.hl
        color: $yellow-500
  > div.parallelogram-bg
    position: absolute
    width: 200vw
    height: 100vh
    transform-origin: left bottom
    transform: rotate(-30deg)
    background: $yellow-500
    left: 0
    top: 50vh
    overflow: hidden
    box-shadow: inset 0pt 0pt 20pt $grey-900;
    > h2.title
      position: absolute
      left: 60vw
      top: 50pt
      width: 300pt

    > div.content-wrapper
      // background-color: blue
      display: inline-block
      width: 50vw
      height: 200vh
      margin-left: 50vw
      margin-top: -100vh
      transform: rotate(30deg)
      transform-origin: left bottom
      position: relative

h2
  font-size: 48pt
  margin-left: -10vw
  color: $grey-900
  letter-spacing: 1pt

ul.timeline
  position: absolute
  right: 0
  top: 0
  height: 200vh
  padding: 75vh 0
  width: 50vw
  overflow-y: auto

  > li
    counter-increment: timeline-items
    list-style-type: none
    text-align: right
    position: relative
    padding-right: 100pt
    color: $grey-900
    cursor: pointer
    &:first-child
      margin-top: 40vh
    &:after
      content: ''
      display: inline-block
      position: absolute
      right: 40pt
      top: 0
      width: 30pt
      height: 30pt
      transform: rotate(45deg)
      background-color: $yellow-500
      border: 6pt double $grey-900
      transition: .25s
    &:before
      content: ''
      display: inline-block
      position: absolute
      right: 54pt
      width: 2pt
      height: calc(100% + 150pt)
      background-color: $grey-900

    &:hover
      &:after
        background-color: $grey-900
        transition: .25s

    &:last-child:before
      height: 0

    + li
      margin-top: 150pt

    > h3
      margin-bottom: 8pt
      text-decoration: underline
    > p
      margin-top: 4pt

      &.date
        margin-top: 16pt
        font-size: 14pt
        font-style: italic
      &.position
        font-size: 14pt
        font-weight: 500

    > div.tags
      line-height: 32pt
      margin-top: 12pt
      > span.tag
        border-radius: 2pt
        display: inline-block
        color: white
        font-size: 12pt
        padding: 0 12pt
        // height: 24pt
        letter-spacing: 1pt
        line-height: 24pt
        font-family: 'Staatliches', 'Roboto', sans-serif
        background-color: $grey-900
        margin-left: 3pt

    > article.content
      display: none
      > ul
        > li
          text-align: left
          list-style-type: none
          font-size: 12pt
          font-weight: 500
          line-height: 1.7
          letter-spacing: .5pt
          padding: 6pt 24pt 6pt 12pt
          border-left: 5pt solid $grey-900
          background-color: white
          position: relative

          &:before
            content: ''
            position: absolute
            border-left: 15pt solid transparent
            border-right: 15pt solid transparent
            border-bottom: 15pt solid $yellow-500
            right: -5pt
            top: 0
            transform-origin: right bottom
            transform: rotate(45deg)
            margin: 0

          + li
            margin-top: 12pt

    &.active
      + li
        margin-top: 50pt
      &:after
        transform: rotate(0)
        transition: .25s
      &:before
        height: calc(100% + 50pt)
      &:last-child:before
        height: 0
      > article.content
        margin-top: 24pt
        display: block
        animation: fadeIn 1s

@keyframes fadeIn
  0%
    transform: translateX(-300pt)
    opacity: 0
  100%
    transform: translateX(0)
    opacity: 1

@media screen and (max-width: 768px)
  section.career-experience
    width: 100%
    height: auto
    > div.parallelogram-bg
      position: relative
      width: 100%
      height: auto
      top: 0
      left: 0
      transform: rotate(0deg)
      transform-origin: left bottom
      > h2.title
        margin-left: 0
        padding: 16pt 20pt
        font-size: 32pt
        position: relative
        width: 100%
        left: 0
        top: 0

      > div.content-wrapper
        transform: rotate(0deg)
        left: 0
        top: 0
        height: auto
        margin-top: 0
        margin-left: 0
        position: relative
        margin-left: 0
        width: 100%
  ul.timeline
    height: auto
    width: 100%
    position: relative
    overflow: visible
    left: 0
    top: 0
    padding: 0
    margin-top: 30pt
    padding-bottom: 96pt

    > li
      padding-left: 20pt
      padding-right: 70pt

      &:first-child
        margin-top: 0
      &:before
        height: calc(100% + 96pt)

      + li
        margin-top: 96pt

      > h3
        font-size: 16pt
        padding-right: 15pt
      > p.date
        margin-top: 20pt
        font-size: 12pt
      > p.position

      > div.tags
        line-height: 26pt
        > span.tag
          font-size: 10pt
          line-height: 20pt
      > article.content
        > ul
          padding: 0
          > li
            font-size: 12pt
            line-height: 1.5
            + li
              margin-top: 8pt

</style>
