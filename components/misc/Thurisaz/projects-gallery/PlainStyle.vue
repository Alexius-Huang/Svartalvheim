<template>
  <div class="plain-style">
    <p class="title" :class="{ smaller: title.length > 20 }">
      <a v-if="link !== null" target="_blank" :href="link">{{ title }}</a>
      <template v-else>{{ title }}</template>
    </p>
    <ul class="tags">
      <li v-for="tag in tags" :key="tag">{{ tag }}</li>
    </ul>
    <p class="description">{{ description }}</p>
    <p class="date">{{ date }}</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'tags', 'date', 'link'],
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'
@import './_shared.sass'

div.plain-style
  background-color: $yellow-500
  margin: -6pt -8pt
  padding: 6pt 8pt
  border-radius: 3pt
  > p
    color: #222

    &.title
      font: 24pt/30pt $base-font-family
      &.smaller
        font: 18pt/24pt $base-font-family
      > a
        text-decoration: underline
      > a, > a:visited
        color: #222
      > a:hover
        color: #444

    &.description
      font-weight: bolder
      letter-spacing: default

  > ul.tags > li
    color: #222
    border-color: #222
</style>
