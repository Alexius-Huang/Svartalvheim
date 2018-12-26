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
          <li>
            <h3>Umbo Computer Vision, Inc.</h3>
            <p class="date">Nov. 2017 - Present</p>
            <p class="position">Intern. CV Team Front-End Engineer</p>
          </li>
          <li>
            <h3>5xRuby, Inc.</h3>
            <p class="date">Aug. 2017 - Oct. 2017</p>
            <p class="position">Contractor. Fullstack Engineer</p>
          </li>
          <li>
            <h3>5xRuby, Inc.</h3>
            <p class="date">Mar. 2017 - Jul. 2017</p>
            <p class="position">Intern. Ruby on Rails Developer</p>
          </li>
          <li>
            <h3>Potentia Computer, Inc.</h3>
            <p class="date">Jul. 2016 - Aug. 2016</p>
            <p class="position">Intern. Back-End Engineer</p>
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
};
</script>

<style scoped lang="sass">
@import '../../sass/colors.sass'

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
  width: 400pt
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
        font-style: italic
      &.position
        font-weight: 500

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
      &:first-child
        margin-top: 0
      &:before
        height: calc(100% + 96pt)

      + li
        margin-top: 96pt

      > h3
        font-size: 16pt
      > p.date
        margin-top: 2pt
        font-size: 12pt
      > p.position
        font-size: 13pt
</style>
