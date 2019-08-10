export const state = () => ({
  data: [],
  /*
   *  {
   *    title: String!,
   *    url: String!,
   *    content: String
   *  }
   */
});

export const getters = {};

export const mutations = {
  setData(state, payload) {
    if (Array.isArray(payload)) {
      state.data = Array.from(payload);
    }
  },
  clear(state) {
    state.data = [];
  },
};

export const actions = {};
