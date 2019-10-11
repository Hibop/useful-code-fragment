// 对于创建更新类业务一般至少会涉及到三个接口
// 1. fetchAdd()
// 2. fetchInfo()
// 3. fetchUpdate()
// 一般创建页面是一个新页面， 故我们fetch数据最好放在打开新页面时触发，按需拉取数据

import { mapActions } from 'vuex';

export default {
  props: {
    id: Number,
    visible: Boolean
  },
  data() {
    return {
      isAdd: true,
      formData: {
      // ...
      }
    };
  }  
  watch: {
    visible(value){
      if(value) {
        this.initData();
      } else {
        this.destroyData();
      }
    }
  },
    
  methods: {
    ...mapActions('namespace', [
      'postJobAdd',
      'getJobInfo',
      'updateJobEdit'
    ]),
      
    initData() {
      if(this.isAdd) {
        
      } else {
        this.fetchInfo();
      }
      this.formData = Object.assgin({}, {
        name: '',
        pwd: ''
      })
    },
      
    destroyData() {},
      
    handleCheck() {
      const {name} = this.formData;
      if(reg.test(name)) {
         return smg....
      }
       reuturn true;
    },
         
    handleCommit() {
      // 主要完成校验
      if(!this.handleCheck) return;
      this.handleFecth()
    }
    handleFecth() {
      // 主要完成数据组装
      let param = {};
      if(this.isAdd) {
         param = {
            ...parma,
           id,
         }
         this.fetchAdd(param);
      } else {
        this.fetchUpdate(param);
      }
    },
    
    handleFecthDone() {
      // 刷新列表、关闭弹窗等等???或者创建失败错误处理
      
    }
    fetchAdd() {},
    fecthInfo() {},
    fetchUpdate() {}
  }
}
