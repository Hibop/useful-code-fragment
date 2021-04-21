// https://www.chyingp.com/posts/how-to-avoid-web-worker-from-sequential-loading/
// https://cloud.tencent.com/developer/article/1651215

// 
const fs = require('fs');
const workerFilePath = './worker.js';
const mainFilePath = './main.js';
const bundleFilePath = './bundle.js';

const workerFileContent = fs.readFileSync(workerFilePath, 'utf8').toString();
const mainFileContent = fs.readFileSync(mainFilePath, 'utf8').toString();
const bundleFileContent = mainFileContent.replace('./worker.js', workerFileContent);

fs.writeFileSync(bundleFilePath, bundleFileContent);


