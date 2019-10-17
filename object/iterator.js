// object不支持for of遍历以及数组[...]解构
// 主要原因是object对象上没有实现Symbol.iterator方法

Object.prototype[Symbol.iterator] = function() {
  var aKey = Object.keys(this);
  var index = 0;
  var _this = this;

  return {
    next() {
       return index < aKey.length
         ? {value: _this[aKey[index++]], done: false}
         : {value: undefined, done: true}
    }
  }
}

  var obj1 = {a: 'hello', b: 'world'};
  for (var item of obj1) {
    console.log(item);
  }



// generator生成器实现方法
Object.prototype[Symbol.iterator] = function *() {
  var akey = Object.keys(this);
  var index = 0;
  while(index < akey.length) {
    var key = akey[index++];
    yeild {
      key,
      value: this[key]
    };
  }
}
