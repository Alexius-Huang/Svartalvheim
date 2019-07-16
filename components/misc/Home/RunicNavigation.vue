<template>
  <section class="runic-navigation">
    <div class="content-wrapper">
      <div class="inner-content-wrapper">
        <template v-if="isSymbol(null)">
          <h2 class="title">Explore More</h2>
          <p class="description">Hover or click the runes for more info</p>
        </template>
        <template v-else-if="showWIPInfo">
          <h2 class="title">{{ focusedSymbol }}</h2>
          <article class="wip">Content currently undecided or work in progress...</article>
        </template>
        <template v-else>
          <h2 class="title">{{ focusedSymbol }}</h2>
          <article>{{ symbolDescription[focusedSymbol] }}</article>
          <button class="navigate-btn" @click="navigate(focusedSymbol)">Explore >></button>
        </template>
      </div>
    </div>

    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214.56 214.56">
      <title>runic-symbols</title>
      <path id="runic-valknut" class="main symbol" d="M58.2,148.4H146l-14.17-24.31H119l7.1,12.92H78.35l6.9-12.92H72Zm0-25.84h28.1l6.41-11.3H78.05L102,69.83l7.42,12.34,6.66-11.48L102,46.68Zm22.38-12.8h13L102,95.6l8.41,14.16h13L102,72.92ZM81,135.52H123.6l-6.39-11.43H100.54l8.11-14.33L102,98.52Zm22.12-13H145.6L124.32,85.4l-6.66,11.21,8.19,14.65h-16.4ZM110.35,84l6.43,11.12,7.54-12.58,24,41.6H133.84l6.61,11.43h27.8l-43.93-76Z"/>
      <polygon :class="{ wip: !hasSymbol('ansuz'), focused: isSymbol('ansuz') }" @mouseover="handleFocusSymbol('ansuz')" id="runic-ansuz" class="main symbol" points="110.67 16.02 105.58 13.23 105.58 11.77 110.67 14.55 110.67 12.55 105.58 9.76 105.58 9.88 103.89 9.88 103.89 22.58 105.58 22.58 105.58 15.24 110.67 18.02 110.67 16.02"/>
      <path :class="{ wip: !hasSymbol('berkana'), focused: isSymbol('berkana') }" @mouseover="handleFocusSymbol('berkana')" id="runic-berkana" class="main symbol" d="M133.25,21.9h0l-2.63-2.53,1.68-.48h0l3.75-1-5.4-5.39v.07l-1.8-.49-3.39,12.68,1.81.49v0l7.45-2ZM130,14.4,132.62,17l-3.42.94-.08,0h-.07Zm-2.39,8.92.93-3.47.09,0h.06l2.47,2.51Z"/>
      <polygon :class="{ wip: !hasSymbol('kaunaz'), focused: isSymbol('kaunaz') }" @mouseover="handleFocusSymbol('kaunaz')" id="runic-kaunaz" class="main symbol" points="149.39 26.53 153.23 36.15 154.19 34.49 151.5 27.7 158.73 26.64 159.65 25.05 149.39 26.53"/>
      <path :class="{ wip: !hasSymbol('dagaz'), focused: isSymbol('dagaz') }" @mouseover="handleFocusSymbol('dagaz')" id="runic-dagaz" class="main symbol" d="M172.63,42.37l1-7-1.39,1.39-8,8,7-1-1,7,9.41-9.41Zm-4.67.48,3.78-3.78-.42,3.36ZM172.15,47l.42-3.36,3.36-.42Z"/>
      <polygon :class="{ wip: !hasSymbol('ehwaz'), focused: isSymbol('ehwaz') }" @mouseover="handleFocusSymbol('ehwaz')" id="runic-ehwaz" class="main symbol" points="193.09 61.1 190.26 59.45 190.25 56.19 189.51 54.91 178.14 61.48 178.78 62.58 188.67 56.87 188.73 60.25 191.63 62 181.74 67.71 182.38 68.81 193.75 62.25 193.09 61.1"/>
      <polygon :class="{ wip: !hasSymbol('fehu'), focused: isSymbol('fehu') }" @mouseover="handleFocusSymbol('fehu')" id="runic-fehu" class="main symbol" points="199 86.65 194.82 82.07 196.26 81.68 200.44 86.26 202.41 85.73 198.23 81.16 200.92 80.43 200.48 78.8 187.8 82.2 188.24 83.83 192.85 82.6 197.03 87.17 199 86.65"/>
      <polygon :class="{ wip: !hasSymbol('gebo'), focused: isSymbol('gebo') }" @mouseover="handleFocusSymbol('gebo')" id="runic-gebo" class="main symbol" points="203.79 111.52 204.75 109.97 199.98 107.4 204.75 104.82 203.79 103.28 198.07 106.37 192.35 103.28 191.4 104.82 196.16 107.4 191.4 109.97 192.35 111.52 198.07 108.43 203.79 111.52"/>
      <path :class="{ wip: !hasSymbol('hagalaz'), focused: isSymbol('hagalaz') }" @mouseover="handleFocusSymbol('hagalaz')" id="runic-hagalaz" class="main symbol" d="M201,135.35l-5.27-1.41,3-5.33,3.8,1,.33-1.22L190.22,125l-.33,1.23,5.19,1.39-3,5.33-3.73-1-.32,1.23,12.68,3.4ZM196.63,128l.59.16-3,5.33-.59-.15Z"/>
      <rect :class="{ wip: !hasSymbol('isa'), focused: isSymbol('isa') }" @mouseover="handleFocusSymbol('isa')" id="runic-isa" class="main symbol" x="185.54" y="146.13" width="1.69" height="13.13" transform="translate(-39.49 237.77) rotate(-60)"/>
      <g :class="{ wip: !hasSymbol('jera'), focused: isSymbol('jera') }" @mouseover="handleFocusSymbol('jera')" id="runic-jera" class="main symbol">
        <polygon points="176.13 169.66 168.74 170.54 169.72 171.51 174.93 170.91 174.32 176.12 175.25 177.05"/>
        <polygon points="166.85 173.93 167.63 166.43 168.6 167.41 168 172.62 173.21 172.01 174.35 173.16"/>
      </g>
      <polygon :class="{ wip: !hasSymbol('laguz'), focused: isSymbol('laguz') }" @mouseover="handleFocusSymbol('laguz')" id="runic-laguz" class="main symbol" points="150.59 189.08 157.39 190.88 157.34 190.84 158.91 189.94 152.35 178.57 150.88 179.41 156.24 188.69 149.33 186.89 150.59 189.08"/>
      <path :class="{ wip: !hasSymbol('mannaz'), focused: isSymbol('mannaz') }" @mouseover="handleFocusSymbol('mannaz')" id="runic-mannaz" class="main symbol" d="M129.89,202.17l2.35-2.32,3.18.84,1.6-.43-3.4-12.68L132,188l2.1,7.86L132,198.12l-.1,0h0l.11,0,0,0-3.2-.74-2.1-7.89-1.27.28,3.4,12.68Zm4.67-4.56.39,1.46-1.46-.39Zm-3.9,1.78-1,1-.38-1.42Z"/>
      <polygon :class="{ wip: !hasSymbol('naudiz'), focused: isSymbol('naudiz') }" @mouseover="handleFocusSymbol('naudiz')" id="runic-naudiz" class="main symbol" points="102.88 196.62 106.43 198.59 106.43 204.68 108.13 204.68 108.13 199.62 110.57 201.08 111.51 199.53 108.13 197.56 108.13 191.55 106.43 191.55 106.43 196.53 103.84 195.07 102.88 196.62"/>
      <path :class="{ wip: !hasSymbol('othalaz'), focused: isSymbol('othalaz') }" @mouseover="handleFocusSymbol('othalaz')" id="runic-othalaz" class="main symbol" d="M83.89,193.4h0L79.37,196l3.06,5.49,5.41-3.22-2.62-4.48h0l4.42-2.63.4-1.49-5.24,3.21-2.94-5.4-.4,1.49Zm2.44,4.44-3.52,2-2-3.54,3.52-2Z"/>
      <polygon :class="{ wip: !hasSymbol('pertho'), focused: isSymbol('pertho') }" @mouseover="handleFocusSymbol('pertho')" id="runic-pertho" class="main symbol" points="60.26 187.95 55.74 188.07 54.85 189.63 59.3 189.41 60.96 193 62.25 193.75 68.81 182.38 67.53 181.64 63.58 181.99 61.55 178.01 60.65 179.57 62.8 183.54 66.89 183.17 61.98 191.67 60.26 187.95"/>
      <path :class="{ wip: !hasSymbol('raido'), focused: isSymbol('raido') }" @mouseover="handleFocusSymbol('raido')" id="runic-sowulo" class="main symbol" d="M51.5,169.68h0l-4,4,.88-7.09-1.6-1.6-1,8.19-5.72-1.56L42.14,179l.07-.06,1.29,1.29L52.78,171l-.61-.61Zm-5.26,5.45-2.57,2.56-1-3.56,3.46.91,0,.05Z"/>
      <polygon :class="{ wip: !hasSymbol('sowulo'), focused: isSymbol('sowulo') }" @mouseover="handleFocusSymbol('sowulo')" id="runic-tiwaz" class="main symbol" points="25.95 149.35 29.06 154.75 21.48 151.92 21.47 151.93 21.17 153.19 30.11 156.72 31.28 156.05 31 155.56 31 155.54 30.99 155.54 28.05 150.45 35.59 153.56 35.6 153.55 35.85 152.13 26.89 148.44 27.05 148.71 25.95 149.35"/>
      <polygon :class="{ wip: !hasSymbol('tiwaz'), focused: isSymbol('tiwaz') }" @mouseover="handleFocusSymbol('tiwaz')" id="runic-uruz" class="main symbol" points="17.05 125.61 13.09 132.39 19.92 136.29 19.4 134.35 16.15 132.57 26.1 129.91 25.66 128.27 15.62 130.96 17.56 127.51 17.05 125.61"/>
      <polygon :class="{ wip: !hasSymbol('uruz'), focused: isSymbol('uruz') }" @mouseover="handleFocusSymbol('uruz')" id="runic-wunjo" class="main symbol" points="9.88 109.88 9.88 111.51 23.01 111.51 23.01 110.24 11.54 110.24 14.82 104.31 23.01 104.31 23.01 103.04 13.9 103.04 9.88 109.88"/>
      <path :class="{ wip: !hasSymbol('wunjo'), focused: isSymbol('wunjo') }" @mouseover="handleFocusSymbol('wunjo')" id="runic-raido" class="main symbol" d="M20.49,86.45h0L20,84.27l-.47-2h0l-1-3.74L13,84.4l0,0-.46,1.71,13.09,3.51L26.09,88h0l-5.55-1.51ZM18.37,86,14.88,85l2.65-2.74.89,3.62-.05,0Z"/>
      <path :class="{ wip: !hasSymbol('thurisaz'), focused: isSymbol('thurisaz') }" @mouseover="handleFocusSymbol('thurisaz')" id="runic-thurisaz" class="main symbol" d="M31.08,58.25,24.23,62.5l-2.34-1.35-.64,1.1,11.37,6.56.64-1.1-2.43-1.4.11-2.2.08-2,0,0Zm-2,7L26,63.52l3.16-1.93Z"/>
      <polygon :class="{ wip: !hasSymbol('eiwaz'), focused: isSymbol('eiwaz') }" @mouseover="handleFocusSymbol('eiwaz')" id="runic-eiwaz" class="main symbol" points="48.93 47.58 48.85 47.65 41.24 40.04 43.2 39.47 42.74 37.64 37.75 38.95 45.35 46.55 43.48 47.03 43.94 48.87 48.93 47.58"/>
      <polygon :class="{ wip: !hasSymbol('algiz'), focused: isSymbol('algiz') }" @mouseover="handleFocusSymbol('algiz')" id="runic-algiz" class="main symbol" points="63.78 19.92 61.94 20.99 60.96 24.52 59.68 22.29 57.85 23.35 59.15 25.6 55.39 24.77 53.58 25.82 60.12 27.3 64.41 34.72 66.24 33.66 61.96 26.24 63.78 19.92"/>
      <path :class="{ wip: !hasSymbol('inguz'), focused: isSymbol('inguz') }" @mouseover="handleFocusSymbol('inguz')" id="runic-inguz" class="main symbol" d="M87.31,13.09,87,11.91l-3.4,4.49L78.4,14.21l.32,1.18L83,17.23,80,21h0l4.52,1.78-2.79,3.74L82,27.73l3.4-4.48,5.19,2.18-.31-1.17-4.36-1.82,2.93-3.78h0l-4.45-1.8ZM85,22l-3.49-1.42,2.31-3,3.49,1.42Z"/>
      <path id="inner-ring" class="main ring" d="M107.72,25.47c-44.95,0-81.81,36.86-81.81,81.81s36.86,81.81,81.81,81.81,81.81-36.86,81.81-81.81S152.67,25.47,107.72,25.47Zm0,161.28a79.47,79.47,0,1,1,79.47-79.47A79.18,79.18,0,0,1,107.72,186.75Z"/>
      <path id="outer-ring" class="main ring" d="M107.72,4.52A102.76,102.76,0,1,0,210.48,107.28,102.46,102.46,0,0,0,107.72,4.52Zm0,203.4A100.65,100.65,0,1,1,208.37,107.28,100.64,100.64,0,0,1,107.72,207.92Z"/>
    </svg>
  </section>
</template>

<script>
export default {
  data() {
    return {
      focusedSymbol: null,
      showWIPInfo: false,
      activeRunes: [
        'thurisaz',
        'inguz',
        'pertho',
        'raido',
      ],
      symbolDescription: {
        thurisaz: 'Rune of Resistance - this section contains my own portfolio ranged from side-project, creation and miscellaneous things.',
        inguz: 'Rune of Harmony - this section contains various type of data visualization and chart.',
        pertho: 'Rune of Possibility - this is the divination section which adopt the system of Elder Futhark - Norse runes, you can ask questions or pick daily rune here. (Currently under development)',
        raido: 'Rune of Journey - this section contains my travelling experience and journal. (Currently under development)',
      },
    };
  },
  computed: {
    // focusedSymbolName() {
    //   const [cap, ...rest] = this.focusedSymbol;
    //   console.log(`${cap.toUpperCase()}${rest.join('')}`);
    //   return `${cap.toUpperCase()}${rest.join('')}`;
    // },
  },
  methods: {
    handleFocusSymbol(symbol) {
      this.focusedSymbol = symbol;
      console.log(this.activeRunes.includes(symbol));
      this.showWIPInfo = !this.activeRunes.includes(symbol);
    },
    navigate(symbol) {
      this.$router.push({ name: symbol });
    },
    hasSymbol(symbol) {
      return this.activeRunes.includes(symbol);
    },
    isSymbol(symbol) {
      return this.focusedSymbol === symbol;
    },
  },
};
</script>


<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/helpers.sass'
@import '~/sass/shared.sass'

section.runic-navigation
  margin: 50vh auto 0 auto
  width: 720px
  height: 720px
  position: relative

  > div.content-wrapper
    position: absolute
    width: 450px
    height: 450px
    left: 0
    top: 0
    right: 0
    bottom: 0
    margin: auto
    @include vertical-align
    pointer-events: none

    > div.inner-content-wrapper
      width: 100%
      text-align: center
      > h2.title
        text-align: center
        color: white
        width: 100%
        font: 48pt/72pt $base-font-family

      > p.description
        color: $yellow-500
        font: 18pt/48pt $base-font-family

      > article
        color: $yellow-500
        font: 14pt/20pt $default-font-family

        &.wip
          color: $red-400

      > button.navigate-btn
        pointer-events: visible
        @include btn-reset
        background-color: white
        color: #222
        padding: 0 10pt
        height: 30pt
        line-height: 30pt
        text-align: center
        margin: 0 auto
        margin-top: 18pt
        transition: .25s

        &:hover
          background-color: $yellow-500
          transition: .25s

.main
  // fill: transparentize($yellow-500, .5)

.main.symbol
  fill: transparentize(white, .95)
  stroke: transparentize(white, .8)
  stroke-width: .5px

  // &:hover
  //   fill: transparentize($yellow-500, .5)
  //   stroke: transparentize($yellow-500, .2)
  //   transition: .25s

  &.wip
    fill: transparent
    stroke: transparentize(white, .95)

  &.focused
    fill: transparentize($yellow-500, .5)
    stroke: transparentize($yellow-500, .2)
    transition: .25s
  &.wip.focused
    fill: transparentize($red-500, .5)
    stroke: transparentize($red-500, .2)
    transition: .25s

.main.ring
  fill: transparentize(white, .95)
  stroke: transparentize(white, .8)
  stroke-width: .5px

.main#runic-valknut
  fill: transparentize(white, .98)
  stroke-width: .5px
  stroke: transparentize(white, .9)
</style>
