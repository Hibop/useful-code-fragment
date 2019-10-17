/**
 * @title: vue技术栈中，一个合格的fetchList(拉取列表数据)的正确写法
 * 其实拉取一个数据列表有5种状态： 1. 初始状态； 2. 获取数据状态loading； 3. 理想拉取状态；4. 无数据状态；5. 数据异常状态
 * 列表场景很多： 下拉列表， table列表， 卡片列表等等 ===> 但是这五种状态信息是场景是相似的
 */
// mock API
function jobListGet() {
  const timeout = 30000;
  const isErr = false;
  return new Promise((resolve, reject) => {
    if(!isErr) reject('error')
    setTimeout(() => {
      const response = {
        errcode: 0,
        message: '',
        data: [{kkk: 222}, {kkk: 555}]
      };
      resolve(response);
    }, timeout);
  })
}

isLoading && <Loading />
isSucess && <Table />
(!isLoading && !isSucess) && <TimeOut />


async function fetch() {
  this.isLoading = true;
  this.isSucess = false;
  this.noDataText = '';
  this.template = [];
  this.jobListGet(params).then(json => {
    this.isLoading = false;
    if(!json.data) {
      // this.isLoading = false;
      this.$message('失败')
      this.isSucess = false;
      this.noDataText = '加载失败, 暂无数据';
      return ;
    }
    this.isSucess = true;
    if(!json.data.lenght) {
      this.noDataText = '无数据';
    }
    this.tableList = json.data;
  }).catch(err => {
      this.$message('失败');
      this.isLoading = false;
      this.isSucess = false;
      this.loadText = '网络连接超时，请求异常!';
  });


fetchList(param) {
  const params = {
    ...param,
    id, // 查表必须字段
    pageSize, page, // 分页相关字段
    startTime, endTime, //时间控件筛选字段
    searchText, // 过滤查找
  }
  // **important** : 筛选时分页要重置到page = 1, 而分页切换时筛选不可清空

  this.loadText = '正在加载...'; // 数据加载界面和表格数组显示 if... else
  this.template = [];
  this.jobListGet(params).then(json => {
    // response数据格式： {errcode, message, data: [...]} errcode === 0 拿到正确数据
    if(!json || json.errcode !== 0 || !json.data) {
      this.$message({
        message: json.message || '获取数据失败！',
        type: error
      })
      this.loadText = '加载失败, 暂无数据';
      return ;
    }
    if(!json.data.length) this.loadText = '无数据';
    this.template = json.data; // 最后有数据的情况;
  }).catch(err => {
    this.loadText = '网络连接超时，请求异常!'; // 此时要重置loading， 不然菊花图一直转圈
  })
}
