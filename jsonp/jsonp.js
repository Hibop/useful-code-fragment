// 封装 jsonp 跨域请求的方法
function jsonp({ url, params, cb }) {
    return new Promise((resolve, reject) => {
        // 创建一个 script 标签帮助我们发送请求
        let script = document.createElement("script");
        let arr = [];
        params = { ...params, cb };

        // 循环构建键值对形式的参数
        for (let key in params) {
            arr.push(`${key}=${params[key]}`);
        }

        // 创建全局函数
        window[cb] = function(data) {
            resolve(data);
            // 在跨域拿到数据以后将 script 标签销毁
            document.body.removeChild(script);
        };

        // 拼接发送请求的参数并赋值到 src 属性
        script.src = `${url}?${arr.join("&")}`;
        document.body.appendChild(script);
    });
}

// 调用方法跨域请求百度搜索的接口
json({
    url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
    params: {
        wd: "jsonp"
    },
    cb: "show"
}).then(data => {
    // 打印请求回的数据
    console.log(data);
});
