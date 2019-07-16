import CountriesGeoJSON from '@/resources/raido/countries.json';

let L = {};
if (process.browser) {
  L = window.L;
}

export const state = () => ({
  $map: null, // Map DOM Element
  map: null,  // Map instance
});

export const getters = {};

export const mutations = {
  ['set-map'](state, payload) {
    state.map = payload.map;
    state.$map = payload.$map;
  },
};

export const actions = {
  async initialize({ commit }, payload) {
    console.log(CountriesGeoJSON);
  },
};
