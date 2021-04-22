// 每次都要走分支检测，其实初始化确定了，便走的分支就确定了，if语句无需每次都执行
function addEvent(type, element, func) {
  if (element.addEventListener) {
    element.addEventListener(type, func, false);
  } else if(element.attachEvent){
    element.attachEvent('on' + type, func);
  } else{
    element['on' + type] = func;
  }
}

// 惰性优化  ==> 本质是覆盖
function addEvent(type, element, func) {
  if (element.addEventListener) {
    addEvent = (type, element, func) => element.addEventListener(type, func, false);
  } else if(element.attachEvent){
    addEvent = (type, element, func) => element.attachEvent('on' + type, func);
  } else{
    addEvent = (type, element, func) => element['on' + type] = func;
  }
  return addEvent(type, element, func);
}
