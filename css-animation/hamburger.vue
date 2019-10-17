/**
 * 利用css3 before after来绘制图标, 并做过渡动画
 */

<template>
  <div class="hamburger" :class="{'is-folded': propsFolded}">
    <span class="line"><span>
  </div>
</template>

<style lang="scss">
.hamburger {
  box-sizing: border-box;
  width: 216px;
  height: 24px;
  text-align: center;
  line-height: 22px;
  font-size: 18px;
  color: #2386ee;
  background: #deedfd;
  cursor: pointer;
  padding: 5px 0;

  %lineset {
    display: block;
    height: 2px;
    width: 20px;
    margin: 0 auto 4px;
    background-color: #2386ee;
    transition: all 0.3s ease-in-out;
  }

  .line {
    @extend %lineset;
    position: relative;
    top: 5px;

    &::before,
    &::after {
      content: '';
      @extend %lineset;
      position: absolute;
    }
    &::before {
      top: -5px;
    }
    &::after {
      top: 5px;
    }

    // folded状态时
    &.is-folded {
    .line {
      margin-left: 31px;
      transition: all 0.3s ease-in-out;
      transform: translateX(-7px);
      width: 16px;
      height: 2px;

      &::before,
      &::after{
        width: 10px;
        height: 2px;
      }
      &::before {
        transform: translate(8px, 2px) rotate(45deg);
      }
      &::after {
        transform: translate(8px, -2px) rotate(-45deg);
      }
    }
  }
}
</style>