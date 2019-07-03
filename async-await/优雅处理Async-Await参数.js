function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}

// 使用
async function fetchData(url) {
    const [err, data] = await AsyncTo(fetchApi(url));
    return err ? err : data;
}

