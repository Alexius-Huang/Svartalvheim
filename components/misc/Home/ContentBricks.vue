<template>
  <div>
    <ul class="content-bricks">
      <li
        class="brick"
        v-for="{ title, type, icon, scrollTo, collections = [], link } in bricks"
        :key="title"
        @click="handleClick({ title, type, scrollTo, link })"
        :class="{ focused: focused === title }"
      >
        <div class="content">
          <span>{{ title }}</span>
          <img v-if="icon" :src="icons[icon]" class="icon" />
        </div>

        <ul
          v-if="type === 'collection'"
          class="collections"
        >
          <li
            v-for="{ name, icon, link } of collections" :key="name"
            class="sub-brick"
            @click="link ? $router.push(link) : undefined"
          >
            <img v-if="icon" class="icon" :src="icons[icon]" />
            <span>{{ name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import contentBricks from '@/resources/maxwell-alexius/content-bricks.json';
import GitHubLogoDark from '@/assets/svg/logo/github-dark.svg';
import CodePenLogoDark from '@/assets/svg/logo/codepen-dark.svg';
import codeDark from '@/assets/material/code-dark.svg';
import timelineDark from '@/assets/material/timeline-dark.svg';
import barChartDark from '@/assets/material/bar-chart-dark.svg';
import starsDark from '@/assets/material/stars-dark.svg';

export default {
  data() {
    return {
      focused: null,
      icons: {
        github: GitHubLogoDark,
        code: codeDark,
        codepen: CodePenLogoDark,
        timeline: timelineDark,
        star: starsDark,
        barchart: barChartDark,
      },
      bricks: contentBricks,
    };
  },
  methods: {
    handleClick({ title, type, scrollTo, link }) {
      if (type === 'collection')
        this.focused = title;
      else
        this.focused = null;

      if (type === 'scroll')
        this.$emit('scroll-to', scrollTo);

      if (type === 'link')
        this.$router.push(link);
    },
  },
};
</script>

<style scoped lang="sass">
@import '../../../sass/shared.sass'
@import '../../../sass/colors.sass'

$brick-height: 120pt
$brick-icon-size: 120pt
$sub-brick-height: 150pt
$sub-brick-icon-size: 150pt

ul.content-bricks
  width: 80vw
  margin: 0 auto
  margin-top: -5pt
  > li.brick
    background-color: transparentize($yellow-500, .5)
    color: #333
    display: inline-block
    padding-left: 20pt
    padding-right: 5pt
    height: $brick-height
    min-height: $brick-height
    width: auto
    min-width: 150pt
    text-align: right
    box-sizing: border-box
    border-radius: 5pt
    margin-right: 5pt
    margin-top: 5pt
    transition: .5s
    vertical-align: top
    overflow: hidden
    &.focused, &:hover
      background-color: $yellow-500
      transition: .25s

    > div.content
      width: 100%
      height: 100%
      position: relative
      > span
        vertical-align: bottom
        font-size: 24pt
        font-family: $base-font-family
      > img.icon
        opacity: .1
        position: absolute
        width: $brick-icon-size
        height: $brick-icon-size
        left: -50pt
        bottom: -10pt
        transition: .25s

    &:hover > div.content > img.icon
      left: 10pt
      opacity: .8
      transition: .25s

ul.content-bricks > li.brick > ul.collections
  overflow: hidden
  height: 0
  width: 0
  transition: .25s
  margin-top: -5pt
  text-align: left
  font-size: 0
  > li.sub-brick
    border-radius: 5pt
    text-align: right
    padding-left: 20pt
    padding-right: 10pt
    height: $sub-brick-height
    line-height: 50pt
    min-width: $sub-brick-height
    width: auto
    margin-right: 5pt
    margin-top: 5pt
    opacity: 0
    display: inline-block
    background-color: $yellow-500
    transition: .25s
    overflow: hidden
    position: relative
    &:before
      content: ''
      display: inline-block
      width: 0
      height: $sub-brick-height
      vertical-align: bottom
    > img.icon
      opacity: .1
      position: absolute
      width: $sub-brick-icon-size
      height: $sub-brick-icon-size
      left: -50pt
      top: -25pt
      transition: .25s
    &:hover > img.icon
      left: 25pt
      opacity: .8
      transition: .25s
    > span
      vertical-align: bottom
      color: transparentize(#333, .5)
      font-size: 24pt
      font-family: $base-font-family
      transition: .25s
    &:hover > span
      color: #333
      transition: .25s

ul.content-bricks > li.brick.focused
  height: auto
  padding-left: 0
  min-width: 100%
  background-color: #222
  border: 1pt solid $yellow-500
  transition: .5s
  > div.content > span
    color: $yellow-500
  > ul.collections
    padding-bottom: 10pt
    padding-left: 10pt
    height: auto
    width: 100%
    transition: .25s
    > li.sub-brick
      opacity: 1
      translation: .25s

@media screen and (max-width: 768px)
  ul.content-bricks > li.brick
    width: 100%
    height: auto
    background-color: $yellow-500

    + li.brick
      margin-top: 8pt

    > div.content
      height: $brick-height
      > img.icon
        left: 10pt
        opacity: .8

    > ul.collections
      > li.sub-brick
        width: 100%
        height: auto
        + li.sub-brick
          margin-top: 6pt
        > img.icon
          opacity: .6
          left: 15pt
        > span
          color: #333
</style>
