MathFn = {
  add(a, b) {
    if(isNaN(a) || isNaN(b)) throw 'parmam should be type number';
    // a^b + (a&b)<<1
    if(a&b) {
      return this.add(a^b, (a&b)<<1);
    }
    return a^b;
  },

  ['+too-'](num) {
    return this.add(~num, 1); // 转符号 取
  },

  substract(a, b) {
    return this.add(a, this['+2-'](b));
  },

  abs(num) {
    return num < 0 ? this.add(~num, 1) : num;
  },

  multiply(a, b) {
    // 将乘数和被乘数都取绝对
    const [$, _] = [this.abs, this.add];
    let [aa, bb] = [$(a), $(b)];
    let result = 0;
    while (bb) {
      if(bb & 0x1 > 0) { // 取出最后一位计算
        result = _(result, aa);
      }
      aa = aa << 1; // 每次运算，被乘数左移一位
      bb = bb >> 1; // 乘数右移一位
    }

    return a^b > 0 ? result : _(~result, 1); // 判断ab符号相同
  }
};
