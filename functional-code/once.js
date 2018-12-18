// 运行一次的函数
const once = (fn) => {
  let done = false;
  return () => done ? undefined : ((done = true), fn.apply(this, arguments))
}
