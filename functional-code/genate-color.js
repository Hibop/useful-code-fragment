setInterval(()=> [].forEach.call($$("*"), v=>v.style.outline=`2px solid #${(~~(Math.random() * (1<< 24))).toString(16)}`), 200);
