const _typeof = (data) => {
  return Object.prototype.toString.call(data).replace(/\[object\s(.+)\]/, "$1").toLowerCase()
}

// Test Case
_typeof("") // 'string'
_typeof({}) // 'object'
_typeof([]) // 'array'
_typeof(() => {}) // 'function'
_typeof(true) // 'boolean'
_typeof(1) // 'number'
