/* Fisher Yates Algorithm */
export default function shuffle(input) {
  let arr = Array.from(input);
  let currentIndex = arr.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr;
};
