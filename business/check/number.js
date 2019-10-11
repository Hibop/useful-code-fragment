/**
 * 有符号float数字判断方法
 * @param {String} 待验证字符串
 * 验证规定：含0-9数字 .+-至多一个； +-如果有的话要在首位
 */
export function numberCheck(str, isSigned = false, isFloat = false) {
  const signed = /[+-]/g, float = '.';
  const numReg = /^[\d]+$/, signedFist = /^[+-]{1}[\d]+$/;

  const oneChart = (str, chart) => str.split(chart).length === 2;

  if (isFloat && !oneChart(str, float)) return false;

  if (isSigned && !oneChart(str, signed)) return false;
  if (isSigned && !signedFist.test(str)) return false;

  isFloat && (str = str.replace(/./g, ''));

  isSigned && (str = str.replace(/[+-]/g, ''));

  return numReg.test(str);
}
