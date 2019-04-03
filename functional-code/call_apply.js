// 模拟实现 call 和 apply
// 改变this指向在新对象下执行该函数
// 思路：将函数变为新对象的方法，执行后删除还原

Function.prototype.mCall = function(context=window, ...args) {
  context.fn = this; // 该函数
  var res = context.fn(...args); // 取出剩余参数并执行
  delete context.fn
  return res;
}

// ut
let a = {
    value: 1
}
function getValue(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
}
getValue.mCall(a, 'yck', '24')
