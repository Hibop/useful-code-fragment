/**
 * @param {Object[]} args 对象数组后面相同key值后面会覆盖前面的
 * @example: pureObj({a: 1}, {b: 2, c: 3}, {c: 8})  => {a: 1, b: 2, c: 8}
 */

function pureObj(...args) {
  const obj = Object.create(null);
  const mergeArgs = Object.assign({}, ...args);

  for (const key in mergeArgs) {
    if (mergeArgs.hasOwnProperty(key)) {
      obj[key] = mergeArgs[key];
    }
  }
  return obj;
}

let obj = {}, pure = pureObj({}), n = 10000000;
for (let i = 0; i < n; i++) {
  obj[i] = i;
  pure[i] = i;
}

console.time('obj');
result = obj[123123];
console.timeEnd('obj'); // obj: 0.051025390625ms

console.time('pure');
result = pure[123123];
console.timeEnd('pure'); // pure: 0.0068359375ms
