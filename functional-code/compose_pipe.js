// 管道，和组合的功能一样，不过是从左到右的顺序。只是个人喜好问题。
const compose = (..fns) => (val) => fns.reverse().reduce((res, fn) => fn(res), val);

const pipe = (...fns) => val => fns.reduce((acc, fn) => fn(acc), val);
