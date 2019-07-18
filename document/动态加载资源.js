/**
 * 加载脚本资源
 *
 * @param {String} js 脚本资源路径
 */
export function loadScript(js) {
  // 移除之前加载的 js
  // 因为需重新加载 js 才能自动运行
  const scripts = document.getElementsByTagName('script');
  for (let i = 0, len = scripts.length; i < len; i++) {
    const scriptItem = scripts[i];
    if (scriptItem && scriptItem.src === js) {
      // 移除旧的
      const parentEle = scriptItem.parentNode;
      parentEle.removeChild(scriptItem);
    };
  }

  const script = document.createElement('script');
  script.setAttribute('type','text/javascript');
  script.src = js;
  document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * 加载样式资源
 *
 * @param {String} css 样式资源路径
 */
export function loadStyle(css) {
  // 避免重复加载
  const links = document.getElementsByTagName('link');
  for (let i = 0, len = links.length; i < len; i++) {
    const linkItem = links[i];
    if (linkItem && linkItem.href === css) {
      return;
    };
  }

  const link = document.createElement('link');
  link.setAttribute('rel','stylesheet');
  link.href = css;
  document.getElementsByTagName('head')[0].appendChild(link);
}

/**
 * 加载调用样式、脚本资源
 *
 * @param {String} styleList 样式资源路径
 * @param {String} scriptList 脚本资源路径
 * 保证主进程的进行，做异步setTimeout
 */
export function loadResource(styleList, scriptList) {
  /* TODO: 此处有算法优化空间: 可以将styleList、scriptList置于函数内 只做一次循环；可以优化O复杂度 */
  setTimeout(() => {
    styleList.forEach(style => {
      loadStyle(style);
    });

    scriptList.forEach(script => {
      loadScript(script);
    });
  }, 200);
}
