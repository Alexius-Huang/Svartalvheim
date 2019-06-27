import runes from '@/resources/pertho/runes.json';
import _shuffle from '@/utils/shuffle';

const availableMode = new Set(['None', 'Divination', 'Daily Rune']);
const runeWidthHeightRatio = 174.18 / 104.94;
const defaultRuneWidth = 100;

export const state = () => ({
  loading: true,
  runes,
  runeImages: {},

  width: 1440,
  height: 1080,

  runeWidth: defaultRuneWidth,
  runeHeight: defaultRuneWidth * runeWidthHeightRatio,

  animating: false,
  mode: 'None',
  deck: [],
});

export const getters = {
  attes(state) {
    const { runes } = state;
    const attes = { Freyr: [], Heimdallr: [], Tyr: [] };
    runes.forEach(rune => {
      if (rune.atteName !== null) {
        attes[rune.atteName].push(rune);
      }
    });

    return attes;
  },
};

export const mutations = {
  ['load-complete'](state) {
    state.loading = false;
  },
  ['animate-start'](state) {
    state.animating = true;
  },
  ['animate-complete'](state) {
    state.animating = false;
  },
  ['set-width'](state, payload) {
    state.width = payload;
  },
  ['set-height'](state, payload) {
    state.height = payload;
  },
  ['adjust-dimension'](state) {
    let width = 1440;
    let height = 1080;
    if (process.browser) {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    state.width = width;
    state.height = height;
  },
  ['set-rune-images'](state, payload) {
    state.runeImages = { ...payload };
  },
  ['set-mode'](state, payload) {
    if (availableMode.has(payload)) {
      state.mode = payload;
    } else {
      throw new Error(`Mode \`${payload}\` didn't exist`);
    }
  },
  ['set-deck'](state, payload) {
    state.deck = payload;
  },

  ['place-rune-to-top'](state, payload) {
    const { deck: preClonedDeck } = state;
    const deck = Array.from(preClonedDeck).map(rune => ({ ...rune }));
    deck.unshift(deck.splice(payload, 1)[0]);
    state.deck = deck;
  },
  ['move-top-rune-position'](state, payload) {
    const { deck: preClonedDeck } = state;
    const deck = Array.from(preClonedDeck).map(rune => ({ ...rune }));
    deck[0].top = payload.top;
    deck[0].left = payload.left;
    state.deck = deck;
  },
};

export const actions = {
  async initialize({ dispatch, commit }) {
    commit('adjust-dimension');

    await dispatch('fetch-rune-images');
    await dispatch('randomize-deck');
    commit('load-complete');
  },
  async ['fetch-rune-images']({ state, commit }) {
    const { runes } = state;

    const runeImages = await Promise.all(
        runes.map(
         ({ name }) => require(`@/assets/icons/pertho/elder-futhark/${name}.svg`)
        )
      )
      .then(result => 
        result.reduce((acc, url, i) => Object.assign(acc, {
          [runes[i].name]: url
        }), {})
      );

    commit('set-rune-images', runeImages);
  },
  async ['randomize-deck']({ state, commit }) {
    const { runes, width, height } = state;
    const deepClonedRunes = runes.map(rune => ({ ...rune }));

    const shuffledRunes = _shuffle(deepClonedRunes);
    const deck = shuffledRunes.map(
      rune => Object.assign(rune, {
        flipped: true,

        /* Position */
        left: (width / 2),
        top: (height / 2),
        rotateDegree: 0,
      })
    );

    commit('set-deck', deck);
  },
};
