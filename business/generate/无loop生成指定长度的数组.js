const List = len => [...new Array(len).keys()] // 等价Array.from(new Array(len).keys())
const list = List(10) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


// 有loop方式 new Array
const loopList = len => new Array(len/* 得到[empty X 10]无法遍历 */).fill('').map((v, i) => i+1);


// Array.from(iterater) 类数组
const loopList1 = length => Array.from({length}, (v, i) => i);

// Array.apply(null, {length: 100})  undefined X 100
