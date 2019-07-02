function Func(url1, url2) {
    return Promise.all([
        fetch(url1),
        fetch(url2)
    ]);
}
const [user, comment] = await Func(); // 需在async包围下使用
