function typeOf(obj) {
  const toString = Object.prototype.toString;
  var map = new Map()
    .set('[object Undefined]',    'undefined')
    .set('[object Null]',         'null')
    .set('[object Boolean]',      'boolean')
    .set('[object Number]',       'number')
    .set('[object String]',       'string')
    .set('[object Function]',     'function')
    .set('[object Array]',        'array')
    .set('[object Date]',         'date')
    .set('[object Object]',       'object')
    .set('[object RegExp]',       'regExp')
    .set('[object global]',       'window')
    .set('[object Math]',         'math')
    .set('[object JSON]',         'json')
    .set('[object Set]',          'set')
    .set('[object Map]',          'map')
    .set('[object HTMLDocument]', 'document');

  return map.get(toString.call(obj));
}

// test
typeOf('s')   // 'string'
typeOf({})   // 'object'
typeOf(document)   // 'document'
typeOf(new Set())   // 'set'


// 一行代码
const type = data => Object.prototype.toString.call(data).replace(/^\[object (.+)\]$/, '$1').toLowerCase()
type({}) // object
