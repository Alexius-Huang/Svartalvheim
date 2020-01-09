<template>
  <main class="resume">
    <home-button />
    <message-modal
      :hide="copyToClipboardState === null"
      :message="copyToClipboardMessage"
    />

    <section class="header">
      <h1>{{ info.header.name }}</h1>
      <h2>{{ info.header.title }}</h2>
    </section>

    <section class="links">
      <ul>
        <li v-for="{ name, url, type } in info.links" :key="name">
          <a v-if="type === 'link'" :href="url" target="_blank">
            <span class="link-name">{{ name }}</span>
            <span class="link-url">{{ url }}</span>
          </a>

          <a v-else-if="type === 'clipboard'" href="javascript:void(0)" @click="handleCopyClipboard(url)">
            <span class="link-name">{{ name }}</span>
            <span class="link-url">{{ url }}</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="summary">
      <h2>Summary</h2>
      <p v-for="(article, i) in info.summary" :key="i">
        {{ article }}
      </p>
    </section>

    <section class="career-experience">
      <h2>Career Experience</h2>

      <ul>
        <li
          v-for="{ key, position, company, date, content } in careerExp" :key="key"
        >
          <p class="position">{{ position }}</p>
          <p class="company-and-date">
            {{ company }} | {{ date }}
          </p>

          <ul class="job-descriptions">
            <li v-for="(c, i) in content" :key="`${key}-${i}`">{{ c }}</li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="public-speech">
      <h2>Public Speech</h2>

      <ul>
        <li
          v-for="{ title, location, description, slideLink, videoLink } in info.speeches"
          :key="title"
        >
          <p class="title">{{ title }}</p>
          <p class="location">{{ location }}</p>
          <p class="description">{{ description }}</p>
          <div class="links">
            <a :href="slideLink" target="_blank">Slide</a>
            <a :href="videoLink" target="_blank">Video</a>
          </div>
        </li>
      </ul>
    </section>

    <section class="education">
      <h2>Education</h2>

      <p class="degree">{{ info.education.degree }}</p>
      <p class="location-and-date">
        {{ info.education.location }} | {{ info.education.date }}
      </p>
    </section>

    <section class="interest">
      <h2>Interest</h2>

      <ul>
        <li v-for="(interest, i) in info.interests" :key="i">{{ interest }}</li>
      </ul>
    </section>
  </main>
</template>

<script>
import HomeButton from '@/components/shared/HomeButton';
import MessageModal from '@/components/shared/MessageModal';
import SimpleCVInfo from '@/resources/resume/simple-cv-info.json';
import CareerExperience from '@/resources/maxwell-alexius/career-experience.json';

export default {
  components: { HomeButton, MessageModal },
  data() {
    return {
      info: SimpleCVInfo,
      careerExp: CareerExperience,
      copyToClipboardState: null,
      messageModalTimeout: null,
      cacheModalMessage: '',
    };
  },
  computed: {
    copyToClipboardMessage() {
      if (this.copyToClipboardState === 'success')
        return 'Copied to clipboard!';
      else if (this.copyToClipboardState === 'error')
        return 'Some error happened, could not copy to clipboard!';
      return this.cacheModalMessage;
    },
  },
  watch: {
    copyToClipboardState() {
      this.cacheModalMessage = this.copyToClipboardMessage;
    },
  },
  methods: {
    handleCopyClipboard(text) {
      window.clearTimeout(this.messageModalTimeout);

      navigator.clipboard.writeText(text).then(() => {
        this.copyToClipboardState = 'success';
      }, () => {
        this.copyToClipboardState = 'error';
      });

      this.messageModalTimeout = setTimeout(() => {
        this.copyToClipboardState = null;
      }, 1000);
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'

main.resume
  max-width: 960px
  margin: 0 auto
  padding: 0 24pt 96pt 24pt

section + section
  margin-top: 24pt

section > h2:first-child
  font-size: 24pt
  font-family: $base-font-family
  color: $yellow-500
  margin-bottom: 4pt

section.header
  padding-top: 48pt
  font-family: $base-font-family
  color: $yellow-500
  > h1
    font-size: 72pt
  > h2
    font-size: 32pt

section.links
  > ul
    padding: 0
    margin: 0
    margin-top: -5pt

  > ul > li
    display: inline-block
    width: auto
    margin-right: 15pt
    margin-top: 5pt

  > ul > li > a
    text-decoration: none
    > span
      display: block
    > span.link-name
      font-family: $base-font-family
      font-size: 24pt
      color: white
    > span.link-url
      font-size: 12pt
      color: $yellow-500

    &:hover > span.link-url
      text-decoration: underline

section.summary
  > p
    font-size: 14pt
    color: white
    line-height: 18pt
    &:before
      content: ''
      margin-right: 5pt
      display: inline-block
      border-left: 5pt solid $yellow-500
      border-top: 5pt solid transparent
      border-bottom: 5pt solid transparent

    + p
      margin-top: 4pt

@mixin custom-link-decoration
  padding-left: 15pt
  position: relative
  &:before
    content: ''
    display: inline-block
    position: absolute
    width: 5pt
    height: 5pt
    border: 1pt solid $yellow-500
    left: 3pt
    top: 7pt
    transform: rotate(45deg)


section.career-experience
  > ul > li
    padding-left: 30pt
    position: relative
    + li
      margin-top: 12pt
    > p.position
      font-size: 16pt
      font-family: $base-font-family
      color: $yellow-500
    > p.company-and-date
      font-size: 12pt
      color: white
      line-height: 20pt
      font-weight: bold

    > ul.job-descriptions
      > li
        @include custom-link-decoration
        line-height: 20pt
        font-size: 12pt
        color: white

    &:after
      content: ''
      display: inline-block
      position: absolute
      background-color: #222
      left: 4pt
      top: 4pt
      width: 12pt
      height: 12pt
      border: 3pt double $yellow-500
      border-radius: 1pt
      transform: rotate(45deg)

    &:before
      content: ''
      display: inline-block
      height: 100%
      width: 1pt
      background-color: $yellow-500
      position: absolute
      left: 10pt
      top: 15pt
    &:last-child:before
      display: none

section.public-speech
  > ul > li
    border: 1pt solid $yellow-500
    border-radius: 2pt
    padding: 6pt 10pt
    font-size: 0
    + li
      margin-top: 12pt

    > p.title
      margin: -6pt -10pt
      margin-bottom: 6pt
      padding: 6pt 10pt
      font-size: 16pt
      font-weight: bold
      font-family: $base-font-family
      color: #222
      background-color: $yellow-500

    > p.location,
    > p.lang,
    > p.description
      color: white
      font-size: 14pt
      line-height: 20pt
    > p.location
      font-weight: bold
    > div.links
      text-align: right
      margin-top: 12pt
    > div.links > a
      font-size: 12pt
      color: $yellow-500
      margin-right: 5pt
      text-decoration: none
      &:hover
        text-decoration: underline

section.education
  > p
    font-size: 12pt
    color: white
  > p.degree
    font-size: 16pt
    font-family: $base-font-family
    color: $yellow-500
  > p.location-and-date
    line-height: 20pt
    font-weight: bold

section.interest
  > ul > li
    @include custom-link-decoration
    font-size: 12pt
    line-height: 20pt
    color: white

@media screen and (max-width: 768px)
  main.resume
    padding: 0 16pt 96pt 16pt

  section > h2:first-child
    font-size: 18pt

  section.header
    > h1
      font-size: 42pt
    > h2
      font-size: 24pt

  section.links
    > ul > li
      width: 100%
      display: block
    > ul > li > a
      > span.link-name
        font-size: 16pt
      > span.link-url
        font-size: 10pt

  section.summary
    > p
      font-size: 10pt
      &:before
        border-left-width: 4pt
        border-top-width: 4pt
        border-bottom-width: 4pt

  section.career-experience
    > ul > li
      > p.position
        font-size: 14pt
      > p.company-and-date
        font-size: 10pt
      > ul.job-descriptions > li
        font-size: 10pt

  section.public-speech
    > ul > li
      > p.title
        font-size: 14pt
      > p.location
        font-size: 10pt
      > p.description
        font-size: 10pt

  section.education
    > p.degree
      font-size: 14pt
    > p.location-and-date
      font-size: 10pt

  section.interest
    > ul > li
      font-size: 10pt
</style>
