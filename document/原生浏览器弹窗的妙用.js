// 表单提交到一半，X掉浏览器或者reload浏览器此时是希望可以有阻止步骤
// chrome 不支持修改弹窗里面的文本信息 ie firefox是可以支持的
window.onbeforeunload = function(e) {
  var dialogText = 'Dialog text here';
  e.returnValue = dialogText;
  return dialogText;
}

// 

