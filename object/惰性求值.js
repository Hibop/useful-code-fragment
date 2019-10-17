/**

## 惰性计算
- 延迟计算 _()
- 数据管道
- 触发时机 value()


 */

// TODO: 待完善
const MAX_ARRAY_LENGTH = 4294967295; // 最大的数组长度
const LAZY_FILTER_FLAG = 1; // filter方法的标记

class LazyWrap {
  constructor(value) {
    this.__wrapped__ = value; // 缓存数据
    this.__iteratees__ = []; // 缓存数据管道中方法
    this.__takeCount__ = MAX_ARRAY_LENGTH; // 记录需要拿的符合要求的数据集个数
  }

  value() {
    const array = this.__wrapped__;
    const takeCount = this.__takeCount__;
    const iteratees = this.__iteratees__;
    let length = array.length;
    let fnLength = iteratees.length;
    let resIndex = 0; // 结果引用
    let index = -1; // 遍历数据
    const result = []; // 结果数组

    outer:
    while(++index < length && resIndex < takeCount) {
      let fnIndex = -1; // 函数
      const value = array[index];

      inter:
      while (++fnIndex < fnLength) {
        const {iteratee, type} = iteratees[fnIndex];

        const computed = iteratee(value);

        if(!computed) {
          if(type === LAZY_FILTER_FLAG) {
            continue outer;
          } else {
            break outer;
          }
        } else {

        }
      }

      result[resIndex++] = value;

    }

    return result;

  }

  filter(fn) {
    this.__iteratees__.push({
      'iteratee': fn,
      'type': LAZY_FILTER_FLAG
    });

    return this; // 链式调用
  }

  take(n) {
    this.__takeCount__ = n;
    return this;
  }
}

function $$lazy(value) {
  return new LazyWrap(value);
}



// test
var testArr = [1, 19, 30, 2, 12, 5, 28, 4];

$$lazy(testArr)
  .filter(x => {
    console.log('check x=' + x);
    return x < 10
  })
  .take(2)
  .value();
