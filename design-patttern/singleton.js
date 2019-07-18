// 实例化型 要new
var Singleton = (function(){
    var instance;
    var CreateSingleton = function (name) {
        this.name = name;

        if(instance) {
            return instance;
        }
        // 打印实例名字
        this.getName();

        // instance = this;
        // return instance;
        return instance = this;
    }
    // 获取实例的名字
    CreateSingleton.prototype.getName = function() {
        console.log(this.name)
    }

    return CreateSingleton;
})();
// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

console.log(a===b);


// 函数型单例
export default function singleton(fn) {
  let instance;
  return function() {
    return instance || (instance = fn.apply(this, arguments))
  }
}

// 创建单例遮罩层
var createMask = function(container = document.body){
    // 创建div元素
    var mask = document.createElement('div');
    // 设置样式
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.right = '0';
    mask.style.bottom = '0';
    mask.style.left = '0';
    mask.style.opacity = 'o.75';
    mask.style.backgroundColor = '#000';
    mask.style.display = 'none';
    mask.style.zIndex = '98';
    container.appendChild(mask);
    // 单击隐藏遮罩层
    mask.onclick = function(){
        this.style.display = 'none';
    }
    return mask;
};

// 创建登陆窗口
var createLogin = function(container = document.body) {
    // 创建div元素
    var login = document.createElement('div');
    // 设置样式
    login.style.position = 'fixed';
    login.style.top = '50%';
    login.style.left = '50%';
    login.style.zIndex = '100';
    login.style.display = 'none';
    login.style.padding = '50px 80px';
    login.style.backgroundColor = '#fff';
    login.style.border = '1px solid #ccc';
    login.style.borderRadius = '6px';

    login.innerHTML = 'login here';

    container.appendChild(login);

    return login;
};

document.getElementById('btn').onclick = function() {
    var oMask = singleton(createMask)();
    oMask.style.display = 'block';
    var oLogin = singleton(createLogin)();
    oLogin.style.display = 'block';
    var w = parseInt(oLogin.clientWidth);
    var h = parseInt(oLogin.clientHeight);
}
