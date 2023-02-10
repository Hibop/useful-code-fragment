// 解析 aabbc(cd(ab)<2>(sc)<2>d)<3>ds。数字为前面子串的重复次数
class stack extends Array {
  peek() {
    return this?.[this.length-1]; // 栈为空时没有顶
  }
  empty() {
    return this.length > 0;
  }
}

const getNum = (str, fromIdx) => {
  const start = str.indexOf('<', fromIdx);
  const end = str.indexOf('>', fromIdx);
  return Number(str.slice(start + 1, end));
}

function unzipStr(str = '') {
  const stack = new Stack();
  for(let i = 0; i< str.length;i++) {
    const char = str[i];
    if(/[a-z(]/.test(char)) { // 入栈，出栈条件
      stack.push(char);
    } else { // ) 出栈，同时需解析数字
      if(')' === char) {
        let subStr = [];
        while(stack.peek() !== '(') {
          const c = stack.pop();
          subStr.push(c);
          const n = getNum(str, i);
          const unzipedSub= subStr.reverse().join('').repeat(n);
          stack.pop(); // 剔除掉'('
          stack.push(unzipedSub); // 把解析后的数据入栈，下次继续
        }
      }
    }
  }
  return stack.join('');
}



