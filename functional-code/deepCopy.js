// - 支持的复合类型：Date/ Object / Array/ Reg
// - 支持环对象(循环对象)拷贝
// obj = {}; obj.x = obj;
// 可以使用一个WeakMap结构存储已经被拷贝的对象，每一次进行拷贝的时候就先向WeakMap查询该对象是否已经被拷贝，如果已经被拷贝则取出该对象并返回，
function deepCopy(obj, weakmap = new WeakMap()) {
  // demo: obj = {x: {y: 9}}
  if(weakmap.has(obj)) return weakmap.get(obj);
  var type = Object.prototype.toString.call(obj);
  var map = new Map()
    .set('Array',  '[object Array]')
    .set('Object', '[object Object]')
    .set('Date',   '[object Date]');

  var copy;

  if(type === map.get('Object')) {
    copy = {};
  }
  else if(type === map.get('Array')){
    copy = [];
  }
  // else if(type === map.get('Date')) {
  //   return new Date(obj.getTime());
  // }
  else{
    return obj; // string, number....
  }


  weakmap.set(obj, copy);
  copy.__proto__ = null; // 变成纯对象

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], weakmap); // deepCopy({y: 9})
  });

  // for (const key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     copy[key] = deepCopy(obj[key]);
  //   }
  // }

  return copy;
}

var obj = {x: {y: 22}, z: 33, m: [1,2,3], n: null, u: undefined, t: new Date(), r: /xyxyx/g}
var deep = deepCopy(obj);
// var deep = JSON.parse(JSON.stringify(obj));
deep.x.y = 99;
console.log(obj, deep);

var circle = {};circle.x = circle;
var copy = deepCopy(circle);
console.log(circle, copy);
