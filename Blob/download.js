window.URL = window.URL || window.webkitURL;  // Take care of vendor prefixes.

var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'blob';
xhr.send()

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = this.response;

    var img = document.createElement('img');
    var URL = window.URL || window.webkitURL;  //兼容处理
    var objectUrl = URL.createObjectURL(blob);
    img.onload = function(e) {
      window.URL.revokeObjectURL(img.src); // 释放 url.
    };

    img.src = objectUrl;
    document.body.appendChild(img);
    // ...
  }
};

xhr.send();
