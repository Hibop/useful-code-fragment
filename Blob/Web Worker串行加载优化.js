// https://www.chyingp.com/posts/how-to-avoid-web-worker-from-sequential-loading/
// https://cloud.tencent.com/developer/article/1651215

// node-gen脚本
const fs = require('fs');
const workerFilePath = './worker.js';
const mainFilePath = './main.js';
const bundleFilePath = './bundle.js';

const workerFileContent = fs.readFileSync(workerFilePath, 'utf8').toString();
const mainFileContent = fs.readFileSync(mainFilePath, 'utf8').toString();
const bundleFileContent = mainFileContent.replace('./worker.js', workerFileContent);

fs.writeFileSync(bundleFilePath, bundleFileContent);

// main-thread
const workerFileContent = `./worker.js`;
const workerBlob = new Blob([workerFileContent], { type:'text/javascript' });
const workerUrl = URL.createObjectURL(workerBlob);
const worker = new Worker(workerUrl);

worker.addEventListener('message', function(evt) {
    console.log(`[main] result is: ${evt.data.result}.`);
}, false);

worker.postMessage({num1: 20, num2: 10});
console.log('[main] Main is initialized.');


// work-thread
self.addEventListener('message', function (evt) {
    const num1 = evt.data.num1;
    const num2 = evt.data.num2;
    const result = num1 + num2;
    console.log('[worker] num1=' + num1 + ', num2=' + num2);
    self.postMessage({result: result});
}, false);

console.log('[worker] Worker is initialized.');
