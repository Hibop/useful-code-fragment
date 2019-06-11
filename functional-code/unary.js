// 将接受多参数函数转化为只接受单参数函数
const unary = fn => fn.length <= 1 ? fn : (arg) => fn(arg);
export default unary

// test
const arrInt  = [1,2,3].map(parseInt) // => [1, NaN, NaN];
const arrInt2 = [1,2,3].map(unary(parseInt)); // [1, 2, 3]
