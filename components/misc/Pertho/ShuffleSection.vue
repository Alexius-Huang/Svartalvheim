<template>
  <div
    class="shuffle-section"
    :class="{ animating }"
    @mousedown="handleMousedown"
  >
    <rune
      v-for="(rune, index) in deck" :key="rune.name"
      v-bind="{
        flipped: rune.flipped,
        name: rune.name,
        order: index + 1,
      }"
      class="rune" :class="{ holding }"
      :data-deck-index="index"
      :enable-rotate="!animating"
      :style="{
        left: `${rune.left}px`,
        top: `${rune.top}px`,
        transform: runeRotate(rune.rotateDegree),
        transition: holding ? 'none' : 'left .25s, top .25s',
      }"
      ref="runes"

      @rotate-start="handleRotateStart($event, index)"
    />
  </div>
</template>

<script>
import throttle from '@/utils/throttle';
import Rune from '@/components/misc/Pertho/Rune';

export default {
  components: { Rune },
  data() {
    return {
      holding: false,
      rotating: false,

      previousPosition: [],
      focusedRotatePosition: [],
      rotateBtns: [],
    };
  },
  computed: {
    state() { return this.$store.state.pertho; },
    animating() { return this.state.animating; },
    runes() { return this.state.runes; },
    runeWidth() { return this.state.runeWidth; },
    runeHeight() { return this.state.runeHeight; },
    deck() { return this.state.deck; },
  },
  methods: {
    runeRotate(degree) {
      const { runeWidth: rw, runeHeight: rh } = this;
      return `translate(${-rw / 2}px, ${-rh / 2}px) rotate(${degree}deg)`;
    },
    radianToDegree(radian) {
      return (radian / Math.PI) * 180;
    },
    commit(localMutation, payload) {
      this.$store.commit(`pertho/${localMutation}`, payload);
    },
    dispatch(localAction, payload) {
      this.$store.dispatch(`pertho/${localAction}`, payload);
    },
    animate(animateAction, payload) {
      this.$store.dispatch(`pertho/animation/${animateAction}`, payload);
    },

    handleMousedown(event) {
      if (this.animating) return;
      const { target: $el } = event;

      if ($el.classList.contains('rune')) {
        this.holding = true;
        const index = Number.parseInt($el.getAttribute('data-deck-index'), 10);
        const { screenX: x, screenY: y } = event;
        this.previousPosition = [x, y];
        this.commit('place-rune-to-top', index);
      }
    },
    handleMousemove: throttle(function (event) {
      if (this.animating) return;

      if (this.holding) {
        const { deck, previousPosition } = this;
        const { screenX: x, screenY: y } = event;
        const [previousX, previousY] = previousPosition;

        const [deltaX, deltaY] = [x - previousX, y - previousY];
        this.previousPosition = [x, y];
        const { left, top } = deck[0];
        const newPosition = { left: left + deltaX, top: top + deltaY };

        this.commit('move-top-rune-position', newPosition);
      }

      if (this.rotating) {
        /* TODO: Derive rotation mechanism */
        const {
          deck,
          rotateBtns,
          focusedRotatePosition: FRP,
          runeWidth: rw,
          runeHeight: rh,
        } = this;
        const { clientX: x, clientY: y } = event;
        const { rotateDegree, left, top } = deck[0];

        let btnRef1, btnRef2;

        if (FRP[0] === 'left') {
          if (FRP[1] === 'top') {
            [btnRef1, btnRef2] = [rotateBtns[0], rotateBtns[3]];
          } else {
            [btnRef1, btnRef2] = [rotateBtns[1], rotateBtns[2]];
          }
        } else {
          if (FRP[1] ===  'top') {
            [btnRef1, btnRef2] = [rotateBtns[2], rotateBtns[1]];
          } else {
            [btnRef1, btnRef2] = [rotateBtns[3], rotateBtns[0]];
          }
        }

        const { left: l1, top: t1 } = btnRef1.getBoundingClientRect();
        const { left: l2, top: t2 } = btnRef2.getBoundingClientRect();
        const center = { x: ((l1 + l2) / 2), y: ((t1 + t2) / 2) };

        // console.log({ x, y }, center);
        // const deltaX = x - center.x;
        // const deltaY = y - center.y;
        // const newRotationDegree = this.radianToDegree(Math.atan2(y, x));
        // console.log(newRotationDegree);
        // const newRotationDegree = rotateDegree + rotationDelta;

        // const slope = (runeCenter.y - y) / (runeCenter.x - x);
        // const radian = Math.atan(slope);
        // let degree = this.radianToDegree(radian);

        // if (l1 > runeCenter.x && l2 < runeCenter.y) {
        //   degree += 270;
        //   console.log('first quadrant');
        // }

        // const rectifyRadian = Math.atan(174.18 / 104.94);
        // const rectifyDegree = this.radianToDegree(rectifyRadian);

        // if (
        //   (FRP[0] === 'left' && FRP[1] === 'top')     ||
        //   (FRP[0] === 'right' && FRP[1] === 'bottom')
        // ) {
        //   degree = degree - rectifyDegree;
        // } else {
        //   degree = degree + rectifyDegree;
        // }

        // if (FRP[0] === 'left') {
        //   if (FRP[1] === 'top') {
        //     console.log(degree);
        //   } else {
        //   }
        // } else {
        //   if (FRP[1] ===  'top') {
        //   } else {
        //   }
        // }

        // this.commit('rotate-top-rune-angle', degree);
      }
    }, 1000 / 60),
    handleMouseup(event) {
      this.holding = false;
      this.previousPosition = [];
      this.rotating = false;
      this.focusedRotatePosition = [];
      this.rotateBtns;
    },

    handleRotateStart({ event, position, rotateBtns }, index) {
      this.rotating = true;
      this.focusedRotatePosition = position;
      this.rotateBtns = rotateBtns;
      this.commit('place-rune-to-top', index);
    },
  },
  mounted() {
    document.body.addEventListener('mousemove', this.handleMousemove.bind(this));
    document.body.addEventListener('mouseup', this.handleMouseup.bind(this));
  },
  destroyed() {
    document.body.removeEventListener('mousemove', this.handleMousemove);
    document.body.removeEventListener('mouseup', this.handleMouseup);
  },
};
</script>

<style scoped lang="sass">
@import '~/sass/colors.sass'
@import '~/sass/shared.sass'
@import '~/sass/helpers.sass'

// Rune Size
$width-height-ratio: 174.18 / 104.94
$width: 100px
$height: $width * $width-height-ratio

div.shuffle-section
  width: 100vw
  height: 100vh
  position: absolute
  left: 0
  top: 0

  > .rune
    position: absolute
    transform: translate(-$width / 2, -$height / 2)
    pointer-events: visible
</style>
