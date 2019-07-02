// 1 一次执行
function Func() {
    // TODO sth....
    console.log("x");
    Func = function() {
        console.log("该函数只能执行一次");
    }
}




// 2 惰性载入： 函数内判断分支较多， 且频繁调用时可以大大节约资源
function Func(a, b) {
    if (a === b) {
        console.log("x");
    } else {
        console.log("y");
    }
}
// 换成
function Func(a, b) {
    if (a === b) {
        Func = function() {
            console.log("x");
        }
    } else {
        Func = function() {
            console.log("y");
        }
    }
    return Func();
}
// 原理是： 只执行第一次的复杂分支逻辑判断， 后续再进入该函数，由于被重写， 所以无需再判断逻辑

// e.g. 封装事件函数， 一般执行不同浏览器兼容问题
function addEvent (type, element, fun) {
    if (element.addEventListener) {
        addEvent = function (type, element, fun) {
            element.addEventListener(type, fun, false);
        }
    }
    else if(element.attachEvent){
        addEvent = function (type, element, fun) {
            element.attachEvent('on' + type, fun);
        }
    }
    else{
        addEvent = function (type, element, fun) {
            element['on' + type] = fun;
        }
    }
    return addEvent(type, element, fun);
}
