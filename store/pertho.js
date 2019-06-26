import runes from '@/resources/pertho/runes.json';

const Stages = {
  VIEWING: 1,
};

const Pages = {
  MAIN: 1,
  UI: 2,
  ATTE: 3,
};

export const state = () => ({
  loading: true,
  runes,
  runeImages: {},
  currentStage: Stages.VIEWING,
  currentPage: Pages.MAIN,
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
  ['fetch-complete'](state) {
    state.loading = false;
  },
  ['set-rune-images'](state, payload) {
    state.runeImages = { ...payload };
  },
};

export const actions = {
  async initialize({ dispatch }) {
    await dispatch('fetch-rune-images');
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
    commit('fetch-complete');
  },
};
