Object.prototype.splice = function(pickArr, initObj={}, deletArr=[]) {
  return pickArr.reduce((r, v) => {
    if(r.hasOwnProperty(v)) {
      r[v] = this[v];
    };
    return r;
  }, initObj)
} 
