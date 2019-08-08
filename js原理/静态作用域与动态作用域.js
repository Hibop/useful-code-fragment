function foo(){
    console.log(a);
}

function bar(){
    var a = 3;
    foo();
}

var a = 2;
bar(); // 2

//  静态作用域还是动态作用域 ===>  
// 静态作用域： 解析阶段就可以确定的变量对应的值


// with 和 eval将运行时作用域扩大
