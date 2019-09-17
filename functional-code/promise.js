class Promise {
    constructor(exector) {
      this.status = 'pending'; // fulfilled, rejected
      this.data = void 0;
      this.error = void 0;

      this.resolve = this.resolve.bind(this);
      this.reject = this.reject.bind(this);
      try {
        exector && exector(this.resolve, this.reject);
      } catch (error) {
        this.reject(error);
      }finally {

      }

    }

    resolve(data) {
      if(this.status === 'pending' && data) {
        this.data = data;
        this.status = 'fulfilled';
      }
    }

    reject(err) {
      if(this.status === 'pending' && err) {
        this.error = err;
        this.status = 'rejected';
      }
    }

    then(sucHandler, errHandler) {
      if(this.status === 'fulfilled') {
        const ret = sucHandler(this.data); // 只是处理常规常数返回的；TODO 返回为promise的情况
        this.data = ret ? ret : this.data;
      }

      if(this.status === 'rejected') {
        const ret = errHandler(this.error);
        this.data = ret ? ret : this.data;
      }
      return this; // 此处不对, 规范中规定是返回一个新promise实例 而非原来实例
    }

    catch(cb) {
      cb(this.error);
      return this;
    }

    finally(cb) {
      cb();
    }

    // instance(data, error) {
    //   return new new.target((resolve, reject) => {
    //     resolve(data);
    //   });
    // }
  }
