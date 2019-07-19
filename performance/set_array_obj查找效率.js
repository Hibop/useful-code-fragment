let arr = [], set = new Set(), obj = {}, n = 10000000;
for (let i = 0; i < n; i++) {
  arr.push(i);
  set.add(i);
  obj[i] = i;
}

let result;
// Set: 0.005859375ms
console.time('Set');
result = set.has(123123);
console.timeEnd('Set');

// Array: 0.17919921875ms
console.time('Array');
result = arr.indexOf(123123);
console.timeEnd('Array');

// obj: 0.033203125ms
console.time('obj');
result = obj[123123];
console.timeEnd('obj');
