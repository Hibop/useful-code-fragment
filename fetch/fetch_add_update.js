// 对于创建更新类业务一般至少会涉及到三个接口
// 1. fetchAdd()
// 2. fetchInfo()
// 3. fetchUpdate()
// 一般创建页面是一个新页面， 故我们fetch数据最好放在打开新页面时触发，按需拉取数据

export default {
  props: {
    id: Number,
    visible: Boolean
  },
  data() {
    return {
      formData: {
      // ...
      }
    }
  }  
  watch: {
    visible: {
      if() {
        this.initData();
      } else {
      }
    }
  },
    
  methods: {
    
    handleCheck() {},
    handleFecth() {}
    fetchAdd() {},
    fecthInfo() {},
    fetchUpdate() {}
  }
}
