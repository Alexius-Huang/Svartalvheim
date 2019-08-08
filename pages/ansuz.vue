<template>
  <main>
    <back-button to="back" />
    <h1 class="title">Maxwell's Blog Posts</h1>

    <ul class="timeline-layout">
      <li v-for="{ created, title, category, id, link = '#' } in posts" :key="id">
        <div class="info">
          <span class="category">
            <button>
              {{ category }}
            </button>
          </span> |
          <span class="date">{{ created.join('.') }}</span>
        </div>
        <h2
          class="title"
          :class="{ smaller: title.length > 30 }"
        >
          <a :href="link" target="_blank">{{ title }}</a>
        </h2>
      </li><!--
   --><li v-if="hasMoreArticles" class="load-more">
        <button @click="nextPage">Load More</button>
      </li>
    </ul>
  </main>
</template>

<script>
import BackButton from '@/components/shared/BackButton';
import posts from '@/resources/ansuz/posts.json';

export default {
  components: { BackButton },
  data() {
    return {
      totalPosts: posts,
      posts: [],
      page: 1,
      pageSize: 9,
    };
  },
  computed: {
    hasMoreArticles() {
      const { page, pageSize, totalPosts } = this;
      return totalPosts.length > (page * pageSize);
    },
  },
  methods: {
    openArticle(topic) {
      this.$router.push({ name: 'ansuz-topic', params: { topic } });
    },
    appendPostAnimation() {
      const { totalPosts, posts, page, pageSize } = this;

      if (posts.length < page * pageSize) {
        const newPost = totalPosts[posts.length];
        if (newPost) {
          const newPosts = Array.from(posts);
          newPosts.push(newPost);
          this.posts = newPosts;

          setTimeout(this.appendPostAnimation, 200);
        }
      }
    },
    nextPage() {
      this.page += 1;
      this.appendPostAnimation();
    },
  },
  mounted() {
    this.appendPostAnimation();
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

main
  width: 960px
  box-sizing: border-box
  margin: 0 auto

  &:before
    content: ''
    position: fixed
    width: 100vw
    height: 30vh
    bottom: 0
    left: 0
    background-image: linear-gradient(to top, #222 25%, transparent 100%)
    pointer-events: none
    z-index: 100

  > h1.title
    color: white
    padding: 25pt 0
    margin: 0
    text-align: center
    font-family: $base-font-family

  > ul.timeline-layout
    position: relative
    padding-bottom: 192pt
    &:before
      position: absolute
      content: ''
      width: 2px
      height: calc(100% + 50px)
      background-color: $yellow-500
      left: 0
      right: 0
      top: -25px
      margin: 0 auto
      border-radius: 1pt

    $time-pivot-size: 10pt
    $gap-from-timeline: 25pt
    > li
      font-size: 12pt
      color: white
      font-family: $default-font-family
      width: 50%
      display: block
      position: relative
      animation: fade-in .25s

      &:before
        position: absolute
        content: ''
        width: $time-pivot-size
        height: $time-pivot-size
        border-radius: 50%
        background-color: $yellow-500
        border: 3px solid #222
        top: 6px

      &:nth-child(even)
        text-align: right
        padding-right: $gap-from-timeline
        &:before
          right: (-$time-pivot-size / 2)
      &:nth-child(odd)
        text-align: left
        padding-left: $gap-from-timeline
        margin-left: 50%
        &:before
          left: (-$time-pivot-size / 2)

      + li
        margin-top: 30pt

    > li > div.info
      position: relative
      height: 20pt
      line-height: 20pt
      &:before
        content: ''
        width: $gap-from-timeline - 10pt
        height: 2px
        position: absolute
        background-color: $yellow-500
        border-radius: 1px
        top: 12px

      > span.date
        font-size: smaller
        opacity: .8
      > span.category
        letter-spacing: .8px
        > button
          @include btn-reset
          font-family: $default-font-family
          font-weight: lighter
          transition: .25s
          &:hover
            color: $yellow-500
            transition: .25s

    > li > h2.title
      font-size: 18pt
      &.smaller
        font-size: 14pt

    > li > h2.title > a
      font-family: $default-font-family
      text-decoration: none
      color: white
      transition: .25s
      &:hover
        color: $yellow-500
        transition: .25s

    > li:nth-child(even) > div.info:before
      right: -30px
    > li:nth-child(odd) > div.info:before
      left: -30px

    > li.load-more
      position: absolute
      width: 100%
      text-align: center
      bottom: 100pt
      padding: 0
      &:nth-child(odd)
        left: -50%
      &:before
        display: none
      > button
        @include btn-reset
        font: 14pt/30pt $base-font-family
        height: 30pt
        color: $yellow-500
        border: 2px solid $yellow-500
        border-radius: 3px
        padding: 0 10pt
        transition: .25s

        &:hover
          background-color: $yellow-500
          color: #222
          transition: .25s

@media screen and (max-width: 960px)
  main
    width: 100vw

  main > ul.timeline-layout > li
    &:nth-child(even)
      padding-left: 25pt
    &:nth-child(odd)
      padding-right: 25pt

@media screen and (max-width: 768px)
  main > h1.title
    font-size: 24pt
  main > ul.timeline-layout
    &:before
      display: none
    &:after
      content: ''
      position: absolute
      content: ''
      width: 2px
      height: calc(100% + 50px)
      background-color: $yellow-500
      left: 20px
      top: -25px
      border-radius: 1pt

  main > ul.timeline-layout > li
    width: 100%
    &:nth-child(even)
      text-align: left
    &:nth-child(odd)
      margin-left: 0
    &:before
      display: none
    &:after
      content: ''
      position: absolute
      width: 10pt
      height: 10pt
      border-radius: 50%
      background-color: $yellow-500
      border: 3px solid #222
      top: 6px
      left: 15px

  main > ul.timeline-layout > li > div.info
    &:before
      display: none

  main > ul.timeline-layout > li > h2.title
    font-size: 14pt
    &.smaller
      font-size: 12pt

  main > ul.timeline-layout > li.load-more
    padding: 0
    text-align: center
    &:after
      display: none
    &:nth-child(odd)
      left: 0

@keyframes fade-in
  0%
    opacity: 0
  100%
    opacity: 1
</style>
