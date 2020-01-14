// 对于时间处理，关键是把握三种时间类型： date型， 时间戳（number, 后端一般为s, 前端为ms差1000），还有一个就是前端显示string型

// date型是object => string
Date.prototype.format = function (reg) {
  if(!(this instanceof Date)) return;
  const date = this;
  // 时间映射
  const time = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  };
  
  if (/(y+)/i.test(reg)) {
    reg = reg.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let k in time) {
    if (new RegExp('(' + k + ')').test(reg)) {
      reg = reg.replace(RegExp.$1, RegExp.$1.length === 1 ? time[k] : ('00' + time[k]).substr(('' + time[k]).length));
    }
  }
}

// 时间戳number ==> dates
function timestamp2date(stamp = 0) {
  let date = new Date();
  date.setTime(stamp);
  return date;
  
  // 方法二
  return new Date(stamp);
} 

// date => stamp时间戳
function date2stamp(date) {
   return +date;
  // 方法二
  return ss.getTime()
} 


// 提交某一时间段的时间戳0
// 一个月前 new Date().setMonth(-1)  ==> stamp; 
// 常见的0点计时 new Date().setHours(0,0,0,0)



