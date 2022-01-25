const superSum = (...arg) => {
    let s = arg.reduce((r, v) => r + v, 0);
    const f = (...argf) => {
        s += argf.reduce((rr, vv) => rr + vv, 0);
        return f;
    }
    f.toString = () => s;
    return f;
}

superSum(1,2,3)(1)()(4)(2,6,7)
