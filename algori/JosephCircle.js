  // 数组方式
  // JosephCircle（约瑟夫环问题）: N个人围成一圈，从第一个人开始报数，每次数m个人出列， 最后的一个人的序号
  var JosephCircle = function(N, M) {
    if(isNaN(N) || isNaN(M)) {
      throw 'M, N is not a number!!';
    }
    if(N < 1 || M < 1) return;
    const src = [...new Array(N)].map((v, i) => i + 1);
    let index = 0;
    while(src.length) {
      index = (index + M - 1) % src.length;
      console.log(src[index]);
      src.splice(index, 1);
    }
  }
