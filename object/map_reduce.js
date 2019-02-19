/**
 * 将es6数组遍历相关方法，扩展到对象中
 * 使用示例：
 * ({k: 1, d: 3}).map((value, key, obj) => value) // [1, 3]
 */

Object.prototype.map = function(fn) {
  return Object.keys(this).map(k => {
    return fn.call(this, this[k], k, this)
  })
}

// 函数式写法: 最外层的function不能使用箭头函数，否则this => window
Object.prototype.map = function(fn) {
return Object.keys(this).map(
  k => fn.call(this, this[k], k, this)
)
}
// reduce方法
Object.prototype.reduce = function (fn, init) {
  return Object.keys(this).reduce(
    (r, k, i) => fn.call(this, r, this[k], k, this),
    init
  )
}


[
  'forEach',
  'map',
  'filter',
  'some',
  'any',
  'reduce'
].forEach(fn => {
  Object.prototype[fn] = function(cb, init = null) {
    return Object.keys(this)[fn](
      k => cb.call(this, this[k], k, this),
      init
    );
  };
});
