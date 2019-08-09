<template>
  <div class="nav-wrapper" :class="{ active: opened, hide: currentPage === 'index' }">    
    <div class="nav-btn-wrapper">
      <button class="nav-btn" @click="opened = !opened">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <nav class="nav-section" @click.prevent="opened = false">
      <ul>
        <li
          v-for="{ to, title, icon, dark } in links" :key="to"
          @click.prevent="navigate(to)"
          :class="{ highlight: currentPage === to }"
        >
          <span class="info">{{ title }}</span><!--
       --><span class="icon-wrapper">
            <img :src="currentPage === to ? dark : icon" />
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import home from '@/assets/icons/material/home-main.svg';
import assessment from '@/assets/icons/material/assessment-main.svg';
import bookmark from '@/assets/icons/material/bookmark-main.svg';
import stars from '@/assets/icons/material/stars-main.svg';
import homeDark from '@/assets/icons/material/home-dark.svg';
import assessmentDark from '@/assets/icons/material/assessment-dark.svg';
import bookmarkDark from '@/assets/icons/material/bookmark-dark.svg';
import starsDark from '@/assets/icons/material/stars-dark.svg';

export default {
  data() {
    return {
      opened: false,
      links: [
        { to: 'maxwell-alexius', title: 'About Me', icon: home, dark: homeDark },
        { to: 'ansuz', title: 'Blog Posts', icon: bookmark, dark: bookmarkDark },
        { to: 'inguz', title: 'Data Visualzation Catalogue', icon: assessment, dark: assessmentDark },
        { to: 'thurisaz', title: 'Showcase', icon: stars, dark: starsDark },
      ],
    };
  },
  computed: {
    currentPage() {
      return this.$route.name;
    },
  },
  methods: {
    navigate(to) {
      this.opened = false;
      this.$router.push({ name: to });
    },
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

div.nav-wrapper
  width: 0
  height: 0
  &.hide
    display: none
  > div.nav-btn-wrapper
    position: fixed
    right: 0
    bottom: 0
    z-index: 9999
    width: 60px
    height: 60px
    border-top-left-radius: 60px
    background-color: #222
    box-shadow: -1pt -1pt 4pt transparentize($yellow-500, .5)
    transform-origin: right bottom
    transform: scale(1.25)

    > button.nav-btn
      @include btn-reset
      background-color: transparent
      width: 100%
      height: 100%
      position: relative
      > span
        display: inline-block
        position: absolute
        right: 10px
        width: 30px
        height: 3px
        border-radius: 1.5px
        background-color: $yellow-500
        transition: .25s

        &:nth-child(1)
          bottom: 30px
        &:nth-child(2)
          bottom: 20px
        &:nth-child(3)
          bottom: 10px

  &.active > div.nav-btn-wrapper
    box-shadow: -1pt -1pt 4pt $yellow-500

  &.active > div.nav-btn-wrapper > button.nav-btn > span
    transition: .25s

    &:nth-child(1)
      width: 15px
      bottom: 31px
      right: 15px
      transform-origin: right center
      transform: rotate(-45deg)
    &:nth-child(2)
      transform-origin: center center
      transform: rotate(45deg)
    &:nth-child(3)
      width: 15px
      bottom: 10px
      right: 21px
      transform-origin: left center
      transform: rotate(-45deg)

div.nav-wrapper > nav.nav-section
  pointer-events: none
  position: fixed
  left: 0
  top: 100vh
  width: 100vw
  height: 100vh
  background-image: linear-gradient(to top, #222 0%, transparent 95%)
  z-index: 9998
  transition: .5s

  > ul
    text-align: right
    display: inline-block
    position: absolute
    max-height: 100vh
    overflow-y: auto
    padding: 75pt 0 75pt 20pt
    bottom: 0pt
    right: 0
    > li
      width: 100%
      height: 40pt
      padding-right: 15pt
      > span
        display: inline-block
        vertical-align: middle
        border: 1px solid transparentize($yellow-500, .75)
      > span.info
        padding: 4pt 7pt
        border-radius: 3pt
        color: $yellow-500
        background-color: #222
        font: 14pt $default-font-family

      > span.icon-wrapper
        margin-left: 10pt
        width: 40pt
        height: 40pt
        border-radius: 50%
        background-color: #222
        text-align: center
        @include vertical-align

        > img
          width: 25pt
          height: 25pt

      + li
        margin-top: 12pt

      &.highlight > span.info
        color: #222
        background-color: $yellow-500
      &.highlight > span.icon-wrapper
        background-color: $yellow-500

div.nav-wrapper.active > nav.nav-section
  top: 0
  pointer-events: visible
  transition: .5s

@media screen and (max-width: 768px)
  div.nav-wrapper > div.nav-btn-wrapper
    transform: scale(1)

  div.nav-wrapper > nav.nav-section
    > ul
      padding: 50pt 0 75pt 20pt
      > li
        height: 30pt
        padding-right: 10pt
        > span.info
          padding: 3pt 5pt
          border-radius: 2pt
          font: 11pt $default-font-family

        > span.icon-wrapper
          margin-left: 5pt
          width: 30pt
          height: 30pt
          > img
            width: 18pt
            height: 18pt

        + li
          margin-top: 10pt
</style>
