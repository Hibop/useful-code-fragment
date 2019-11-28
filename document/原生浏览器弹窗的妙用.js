// 表单提交到一半，X掉浏览器或者reload浏览器此时是希望可以有阻止步骤
// chrome 不支持修改弹窗里面的文本信息 ie firefox是可以支持的
window.onbeforeunload = function(e) {
  var dialogText = 'Dialog text here';
  e.returnValue = dialogText;
  return dialogText;
}

// 浏览器主动推送信息流 提示 
// Notification
var options = {
  dir: "auto", // 文字方向
  body: "通知：sssssssssssssssssssssss", // 通知主体
  requireInteraction: true, // 不自动关闭通知
};
notifyMe('这是通知的标题', options /* options 配置比较多 可以查看mdn */);
function notifyMe(title, options) {
  // 先检查浏览器是否支持
  if (!window.Notification) {
    console.log('浏览器不支持通知');
  } else {
    // 检查用户曾经是否同意接受通知
    if (Notification.permission === 'granted') {
      var notification = new Notification(title, options); // 显示通知
    } else if (Notification.permission === 'default') {
      // 用户还未选择，可以询问用户是否同意发送通知
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('用户同意授权');
          var notification = new Notification(title, options); // 显示通知
        } else if (permission === 'default') {
          console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
        } else {
          // denied
          console.log('用户拒绝授权 不能显示通知');
        }
      });
    } else {
      // denied 用户拒绝
      console.log('用户曾经拒绝显示通知');
    }
  }
}

