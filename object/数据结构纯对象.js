export function pureObj(...args) {
  const obj = Object.create(null);
  const mergeArgs = Object.assign({}, ...args);

  for (const key in mergeArgs) {
    if (mergeArgs.hasOwnProperty(key)) {
      obj[key] = mergeArgs[key];
    }
  }

  return obj;
}
