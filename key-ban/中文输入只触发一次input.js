// 输入监听文本输入框的input事件，在拼写汉字（输入法）但汉字并未实际填充到文本框中（选词）时会触发input事件，触发多次事件
// 输入中文（包括语音识别时）会先后触发compositionstart、compositionend事件，类似于keydown和keyup的组合。
// 触发compositionstart时，文本框会填入 “虚拟文本”（待确认文本），同时触发input事件；在触发compositionend时，就是填入实际内容后（已确认文本）。
// 声明一个标记flag，在compositionstart、compositionend两个事件过程之间的时候flag值为false，在input事件中通过flag的值来判断当前输入的状态
// 要注意因为选词结束的时候input会比compositionend先一步触发，此时flag还未调整为true，所以不能触发到console，故用setTimeout将其优先级滞后。

// 一个完整的搜索逻辑
// 1. trim逻辑处理； 2. 是否可以提示  3. 按enter搜索、即时input就搜索、汉字输入时选择完汉字才搜索
<template>
  <div>
    <!-- 密码输入时浏览器默认记住密码， 防止影响到别的输入框 -->
     <input style="opacity: 0; position: absolute"/>
      <v-input
        v-model.trim="searchInput"
        placeholder="请输入搜索名称"
        autocomplete="off"
        :icon="searchInput ? 'android-cancel' : 'android-search'"
        @on-icon-click="searchInput = ''"
        @compositionstart.native="isZHok = false"
        @compositionend.native="isZHok = true"
        @keyup-enter="handleSearch">
      </v-input>
  </div>
</template>

export default {
    data() {
      return {
        searchInput: '' ,
        isZHok: false,
        searchTimeout: 0
      };
     }
      
     watch: {
       searchInput(value) {
        // 其实value='' 时也要触发搜索的
        // if(!isZHok) return; // 在此处有问题input先 compositionend 后， 走不到后面逻辑
        // isZHok要放在异步setTimeout中
         this.handleSearch();
       }
     },
     
     handleSearch(delay = 400) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          if(!this.isZHok) return;
          this.page = 1; // 搜索、筛选操作要重置分页
          this.fetchList(); // 或者前端筛选逻辑
        }, delay);
      },
     
}


