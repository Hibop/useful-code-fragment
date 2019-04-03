/**
 * new 做了哪些事儿？？
 * 1. 创建新对象；
 * 2. 执行原型链接protype
 * 3. 将this指向新对象；
 * 4. 如果函数没有返回对象类型Object (Function, Array, Date, RegExg, Error), 那么返回新对象；否则返回原来函数返回对象
 */

function New(func) {
var  obj = {};
if(func.prototype !== null) {
  obj.__proto__ = func.prototype;
}
var ret = func.apply(obj, Array.prototype.slice.call(arguments, 1));

if(typeof ret === 'object' || typeof ret === 'function' || ret !== null) {
  return ret;
};
return obj;
}

// ut
New(Fn, 1, 2)   // ==> New Fn(1, 2)

// 如果New(Fn)(1)(2)时, 难度增加其实要cury化

var New = (fn) => {
var obj = {};
  if(func.prototype !== null) {
    obj.__proto__ = fn.prototype;
  }
  const ret = (...arg) => {
    return fn.apply(obj, ...arg);
  }
  if(typeof ret === 'object' || typeof ret === 'function' || ret !== null) {
    return ret;
  };
  return obj;
}
