import delay from '@/utils/delay';
import randomBetween from '@/utils/randomBetween';

export const state = () => ({});

export const actions = {
  async ['set-deck-after']({ commit }, payload) {
    const { duration, deck } = payload;
    await delay(duration);
    commit('pertho/set-deck', deck, { root: true });
  },
  async ['showoff-deck']({ rootState, commit, dispatch }) {
    commit('pertho/animate-start', undefined, { root: true });

    const {
      deck: preClonedDeck,
      runes,
      width,
      height,
      runeWidth,
      runeHeight,
    } = rootState.pertho;
    const gapBetweenRunes = 30;

    await delay(1000);

    /* Spread out deck */
    let deck = Array.from(preClonedDeck)
      .map(rune => ({ ...rune })) // Deep clone
      .map((rune, i) => {
        const top = (height / 2);
        const left = ((width - gapBetweenRunes * runes.length) / 2) + (gapBetweenRunes * i);
        return { ...rune, top, left };
      });
    await dispatch('set-deck-after', { duration: 750, deck });

    /* Flip all runes */
    deck = Array.from(deck)
      .map(rune => ({ ...rune, flipped: false })) // Deep clone and set flipped
    await dispatch('set-deck-after', { duration: 750, deck });

    /* Put all the runes back to deck */
    const position = { top: (height / 2), left: (width / 2) };
    deck = Array.from(deck)
      .map(rune => ({ ...rune, ...position }));
    await dispatch('set-deck-after', { duration: 750, deck });

    /* Ramdomly spread out the runes from the deck */
    const boundries = {
      leftMost: Math.ceil(runeWidth),
      rightMost: Math.floor(width - runeWidth),
      topMost: Math.ceil(runeHeight),
      bottomMost: Math.floor(height - runeHeight),
    };
    deck = Array.from(deck)
      .map(rune => ({ ...rune }))
      .map((rune) => {
        const random = {
          left: randomBetween(boundries.leftMost, boundries.rightMost),
          top: randomBetween(boundries.topMost, boundries.bottomMost),
          rotateDegree: randomBetween(0, 359)
        };
        return { ...rune, ...random };
      });
    await dispatch('set-deck-after', { duration: 1500, deck });

    commit('pertho/animate-complete', undefined, { root: true });
  },
};
