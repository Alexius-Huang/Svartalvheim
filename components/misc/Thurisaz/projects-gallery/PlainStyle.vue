<template>
  <div class="project-info plain-style">
    <under-construction-ribbon class="ribbon-wrapper" :wip="wip" />

    <p class="title" :class="{ smaller: title.length > 20 }">
      <a v-if="link !== null" target="_blank" :href="link">{{ title }}</a>
      <template v-else>{{ title }}</template>
    </p>
    <tags v-bind="{ tags, developing, wip }" theme="light" />
    <p class="description">{{ description }}</p>
    <p class="date">{{ date }}</p>
  </div>
</template>

<script>
import Tags from './Tags';
import UnderConstructionRibbon from './UnderConstructionRibbon';

export default {
  components: { Tags, UnderConstructionRibbon },
  props: ['title', 'description', 'tags', 'date', 'link', 'wip', 'developing'],
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'
@import './_shared.sass'

div.plain-style
  position: relative
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
</style>
