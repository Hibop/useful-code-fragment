// Navigator.sendBeacon： 用于发送少量数据到服务器的 API，尤其适用于在页面即将卸载时发送数据，如日志记录、用户行为分析等。     ------可靠地发送
// data 参数是将要发送的 ArrayBuffer、ArrayBufferView、Blob、DOMString、FormData 或 URLSearchParams 类型的数据
// 1、 sendBeacon始终使用 HTTP POST 请求；通常为几十 KB



// 创建一个包含字符串的 Uint8Array
const text = 'Hello, world!';
const textEncoder = new TextEncoder();
const textArray = textEncoder.encode(text); // 将字符串编码为 Uint8Array
// 创建一个包含其他二进制数据的 Uint8Array
const binaryData = new Uint8Array([1, 2, 3, 4, 5]);
// 将两部分数据合并到一个大的 Uint8Array
const combinedArray = new Uint8Array(textArray.length + binaryData.length);
combinedArray.set(textArray, 0);
combinedArray.set(binaryData, textArray.length);
// 发送合并后的 Uint8Array
navigator.sendBeacon('xxx/xxx', combinedArray);

// BLob格式
const blob = new Blob(['user=gqk'], { type: 'text/plain' });
navigator.sendBeacon('xxx/xxx', blob);
// FormData 
const formData = new FormData();
formData.append('user', 'gqk');
navigator.sendBeacon('xxx/xxx', formData);


// 不使用 Navigator.sendBeacon 时，可靠地发送 ？
// 1、 发起一个同步 XMLHttpRequest 来发送数据（open() 方法的第三个参数为 false）。
// 2、创建一个 <img> 元素并设置 src，大部分用户代理会延迟卸载（unload）文档以加载图像。
// 3、 创建一个几秒的 no-op 循环。

