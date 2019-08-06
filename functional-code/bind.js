// bind 三个功能
// 1. 保存this返回一个函数
// 2. 传入参数
// 3. 可以重新new
// link https://juejin.im/post/5bec4183f265da616b1044d7/
Function.prototype.nBind = function(context, ...args) {
  var self = this; // this是实际的实例函数
  // Array.prototype.slice(arguments, 1)
  // 链接参数 concat
  var fr = function (...argsAfter) {
//   this ==> 指向bind后再new的实例对象
//     this.call(context)
    const a = [...args, ...argsAfter];
//     return self.apply(context, a);
    // 保证的new和非new情况
    var ctx = this instanceof self ? this : context;
    return self.apply(ctx, a); 
  }
  fr.prototype = self.prototype;
  return fr;
}



// test 部分
var foo = {
  value: 1
}

var bar = function(name) {
  this.name = name;
}

var fn = bar.bind(foo, '2222');
// fn();
// new fn();
