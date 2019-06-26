<template>
  <div class="app-switch">
    <input
      :id="`app-switch-${serialNumber}`"
      type="checkbox"
      v-model="active"
      @change="$emit('change', active)"
    />
    <label :for="`app-switch-${serialNumber}`">
      <span class="circle" />
    </label>
  </div>
</template>

<script>
export default {
  props: ['serialNumber', 'defaultValue'],
  data() {
    const { defaultValue } = this;
    return { active: !!defaultValue };
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'

.app-switch
  > input[type="checkbox"]
    display: none
    &:checked + label
      background-color: $yellow-500
      transition: .25s

      > span.circle
        margin-left: 27.5pt
        transition: .25s
  > label
    display: inline-block
    border-radius: 12.5pt
    width: 50pt
    height: 25pt
    background-color: $grey-300
    transition: .25s

    > span.circle
      pointer-events: none
      display: inline-block
      width: 20pt
      height: 20pt
      margin-left: 2.5pt
      margin-top: 2.5pt
      background-color: $grey-900
      border-radius: 50%
      transition: .25s
</style>
