export default function indexOfMinimum(arr) {
  if (arr.length === 0) {
    return -1;
  }

  let min = arr[0];
  let minIndex = 0;

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < min) {
      minIndex = i;
      min = arr[i];
    }
  }

  return minIndex;
};
