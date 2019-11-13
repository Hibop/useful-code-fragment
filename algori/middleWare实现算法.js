var http = require('http');

/**
 * 仿express实现中间件机制
 *
 * @return {app}
 */
function express() {

  var funcs = []; // 待执行的函数数组

  var app = function (req, res) {
    var i = 0;

    function next() {
      var task = funcs[i++]; // 取出函数数组里的下一个函数
      if (!task) { // 如果函数不存在,return
        return;
      }
      task(req, res, next); // 否则,执行下一个函数
    }

    next();
  }

  /**
   * use方法就是把函数添加到函数数组中
   * @param task
   */
  app.use = function (task) {
    funcs.push(task);
  }

  return app; // 返回实例
}

// 下面是测试case

var app = express();
// http.createServer(app).listen('3000', function () {
//   console.log('listening 3000....');
// });

app.use((req, res, next) => {
  console.log('a - 1');
  next();
  console.log('a - 2');
});

app.use((req, res, next) => {
  console.log('b - 1');
  next();
  console.log('b - 2');
});


app.use((req, res, next) => {
  console.log('c - 1');
  // next();
  console.log('c - 2');
});

app();
