<template>
  <hi-hat              v-if="type === 'hi-hat'"         :horizontal-position="horizontalPosition" />
  <snare          v-else-if="type === 'snare'"          :horizontal-position="horizontalPosition" />
  <kick           v-else-if="type === 'kick'"           :horizontal-position="horizontalPosition" />
  <ride           v-else-if="type === 'ride'"           :horizontal-position="horizontalPosition" />
  <crash          v-else-if="type === 'crash'"          :horizontal-position="horizontalPosition" />
  <tom-one        v-else-if="type === 'tom-one'"        :horizontal-position="horizontalPosition" />
  <tom-two        v-else-if="type === 'tom-two'"        :horizontal-position="horizontalPosition" />
  <floor-tom      v-else-if="type === 'floor-tom'"      :horizontal-position="horizontalPosition" />
  <stepped-hi-hat v-else-if="type === 'stepped-hi-hat'" :horizontal-position="horizontalPosition" />
</template>

<script>
import HiHat from './notes/HiHat';
import Snare from './notes/Snare';
import Crash from './notes/Crash';
import Ride from './notes/Ride';
import Kick from './notes/Kick';
import TomOne from './notes/TomOne';
import TomTwo from './notes/TomTwo';
import FloorTom from './notes/FloorTom';
import SteppedHiHat from './notes/SteppedHiHat';

export default {
  props: ['type', 'beatBetweenGap', 'beat'],
  components: {
    Snare,
    Ride,
    Crash,
    Kick,
    HiHat,
    TomOne,
    TomTwo,
    FloorTom,
    SteppedHiHat,
  },
  computed: {
    horizontalPosition() {
      const { beat, beatBetweenGap: bbg } = this;
      return (beat - .5) * bbg;
    },
  },
};
</script>
