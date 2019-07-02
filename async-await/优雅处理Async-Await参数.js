function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}

const [err, res] = await AsyncTo(Func());
