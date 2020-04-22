  const getRandom = (digit=4, radix=36, m=1e10) => (
    f = x => x.toString(radix).slice(-digit-1, -1),
    n=~~(Math.random()*m*9)+m,
    t=+new Date,
    f(n)+f(t)
  )

  const getUid = ((h, i, b, o, p=1e10) => (d=4, r=36) => (
    f = x => o.call(b.call(x, r), -d-1, -1),
    f(~~(h()*9*p)+p) + f(+new i)
  ))(Math.random, Date, 0..toString, ''.slice);
