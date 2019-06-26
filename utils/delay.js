export default function delay(milliseconds, resolveValue = true) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resolveValue);
    }, milliseconds);
  });
};
