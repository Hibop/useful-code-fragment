// 记忆函数
const memoized = (fn) => {
  const mTable= {}; // 此处最好修改为cache = Object.create(null);
  return (arg) => mTable[arg] || (mTable[arg] = fn(arg));
}

export default {memoized};

// example 记忆函数加快阶乘速度
const factorial = n => n === 0 ? 1 : n * factorial(n-1);

const fastfactorial = memoized(factorial);
