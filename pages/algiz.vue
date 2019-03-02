<template>
  <main>
    <section class="fenrir">
      <div
        class="parallax-wrapper"
        @scroll="handleScroll"
      >
        <div
          class="parallax-layer"
          v-for="i in 115"
          :style="styleData[i - 1]"
          :key="i"
        >
          <span />
        </div>
      </div>

      <div class="main-content" :style="{ opacity: contentOpacity }">
        <h1>Fenrisúlfr</h1>
        <p>Monstrous wolf in Norse Mythology</p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      contentOpacity: 0,
      styleData: Array.from(Array(115)).map(() => this.getRandomStyle()),
    };
  },
  methods: {
    handleScroll(e) {
      const target = ((12500 - window.innerHeight) / 2);
      const delta = Math.abs(e.target.scrollTop - target);
      this.contentOpacity = 1 - (delta / target);
    },
    getRandomStyle() {
      const translateZ = -(Math.random() * 5);
      const scale = 1 - translateZ;

      return { transform: `translateZ(${translateZ}px) scale(${scale})` };
    },
  },
};
</script>

<style scoped lang="sass">
@import '../sass/colors.sass'
@import '../sass/helpers.sass'
@import '../sass/shared.sass'

// main
//   padding-bottom: 50vh

section.fenrir
  width: 100vw
  height: 100vh
  > div.main-content
    position: absolute
    right: 10%
    top: 50%
    font-size: 20pt
    color: $yellow-500
    font-family: $base-font-family
    padding: 10pt 20pt
    background-image: linear-gradient(to top left, $grey-800, transparent)
    pointer-events: none
    text-align: right
    max-width: 300px
    border-right: 5pt solid $yellow-500
    > p
      font-size: 12pt

  > div.parallax-wrapper
    perspective: 1px
    overflow-x: hidden
    overflow-y: auto
    height: 100vh
    -webkit-box-reflect: right calc(-100vw - 10px) linear-gradient(to right, transparent, white);

    > div.parallax-layer
      padding: 5000px 0 7500px 0
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0

      // &.base
      //   transform: translateZ(0)
      // &.back
      //   transform: translateZ(-1px) scale(2)

@import '../sass/algiz/fenrir.sass'
</style>
