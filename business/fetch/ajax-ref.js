import axios from 'axios';
// import Vue from 'vue';
import qs from 'qs'; // axios 中包含

let baseUrl = '', hostUrl = ''; // baseUrl 是服务器配置的主机

if (process.env.NODE_ENV === 'development') {
  baseUrl = '/ajax/';
  hostUrl = 'http://localhost:8080/';
}

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/ajax/'; // 一般写全
  hostUrl = '';
}




// 封装好ajax
// - 支持增删改查 json/formData/上传下载
// - 请求前做拦截： 提供设置请求头token， 数据处理、按钮权限控制
// - 返回拦截器：错误code处理, 提示, 登出， 超时

// axios.request(config)
// axios['get|delete|head'](url, config)
// axios['post|put|patch'](url, data, config)
// 默认 get/json

class AjaxBase {
  constructor(method='get', url, data) {
    this.url = url;
    this.method = method;
    this.$http = axios.create({
      baseURL: baseUrl,
      timeout: 20000,
      // `withCredentials` 表示跨域请求时是否需要使用凭证
      withCredentials: false,
      headers: {
        // 默认是json格式
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'If-Modified-Since': '0'
      }
    });

    // form：post put
    this.formPostConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      // 此方法只适用于PUT、POST和PATCH方法中, 只会返回string, ArrayBuffer, Stream
      transformRequest: [function (data) {
        return qs.stringify(data);
      }]
    };

    // json：post put
    this.jsonPostConig = {
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [function (data) {
        return Json.stringify(data)
      }]
    };

    // upload
    this.uploadPostConig = {
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8'
      },
      transformRequest: [function (data) {
        const dataDone = new FormData;
        Object.keys(data).forEach(key => {
          // 对于深层deep-json: 需将里面string完，排除二进制文件类
          if (data[key] instanceof Object && !(data[key] instanceof Blob)) {
            dataDone.append(key, JSON.stringify(data[key]));
          } else {
            dataDone.append(key, data[key]);
          }
        });

        return dataDone;
      }]
    };
  }

  beforeRequest(callback) {
    return this.$http.interceptors.request.use(config => {
      callback && callback(config);
      return config;
    }).catch(error => {
      console.log(error);
      return Promise.reject(error)
    });
  }

  beforeResponse(callback) {
    return this.$http.interceptors.response.use(response => {
      callback && callback(response);
      return response;
    }).catch(error => {
      return Promise.reject(error)
    });
  }

  // data: json
  [this.method](data, url = this.url, config) {

    return new Promise((resolve, reject) => {
      this.$http.request({
        ...this.config,
        url,
        method,
        params: data,
        data,
        ...config,
      }).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err);
      })
    })
  }
}

import store from '../store';

const $ajax = new AjaxBase();
$ajax.beforeRequest(config => {
  if (store.getters.token) { // 一般会getToken()后存到store
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
});



















if (process.env.NODE_ENV === 'development') {
  baseUrl = '/ajax/';
  // baseUrl = '/mock/11/';
}

const instance = (isUpload = false) => {
  const contentype = isUpload ?
    'multipart/form-data;charset=utf-8' :
    'application/x-www-form-urlencoded;charset=utf-8';

  return axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false,
    headers: {
      'Content-Type': contentype,
      'Accept': 'application/json',
      'If-Modified-Since': '0'
    }
  });
};

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const $ajax = (url = '', data = {}, config = {}) => {
  return [
    'get', // formget jsonget
    'delete',
    'postForm', // 需要Qs
    'postJson', // 需要string
    'putForm',
    'putJson',
    'download',
    'upload' // post上传
  ].reduce((result, method) => {
    let dataDone, request;

    // get delete
    if (['get', 'delete'].includes(method)) {

      const dataDone = Object.assign({}, config, {
        params: data,
      });
      request = instance.get(url, dataDone)
    }


    // post put formdata
    if (method === 'postFrom') {
      dataDone = qs.stringify(data)
      request = instance.post(url, data, {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        ...config
      })
    }


    // post json
    if (method === 'postJson') {
      dataDone = JSON.stringify(data);
      request = instance.post(url, data, {
        'Content-Type': 'application/json',
        ...config
      })
    }

    // download
    if (method === 'download') {
      const dataDone = qs.stringify(data);
      const win = window.open(`${baseUrl}/${url}?${data}`);
      win.opener = null;
    }


    // upload
    if (method === 'upload') {
      const dataDone = new FormData;
      Object.keys(data).forEach(key => {
        // 对于深层deep-json: 需将里面string完，排除二进制文件类
        if (data[key] instanceof Object && !(data[key] instanceof Blob)) {
          dataDone.append(key, JSON.stringify(data[key]));
        } else {
          dataDone.append(key, data[key]);
        }
      });
      request = instance.post(url, dataDone, config)
    }

    // catch 网络错误
    const okRequest = request.catch(handleError);

    return new Promise((resolve, reject) => {
      // okRequest.then()
    })

    // result[method] = instance[method](url, )


    return result
  }, {});
}


const get = (url, params, config) => {
  const merged = Object.assign({}, config, {
    params: data,
  });
  return instance.get(url, merged)
    .catch(handleError)

};

const post = (url, data, timeout) => {
  data = qs.stringify(data); // 需要重装数据

  const config = {
    timeout
  };

  return instance()
    .post(url, data, config)
    .catch(handleError); // 网络链接错误
};

const getApi = (url, data, timeout) => {
  return new Promise((resolve, reject) => {
    get(url, data, timeout)
      .then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error); // 界面数据处理错误
      });;
  });
};

const postApi = (url, data, timeout) => {
  return new Promise((resolve, reject) => {
    post(url, data, timeout)
      .then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error); // 界面数据处理
      });
  });
};

// 上传文件封装
const postUploadApi = (url, json, timeout) => {
  const formData = new FormData;
  Object.keys(json).forEach(key => {
    // 对于深层deep-json: 需将里面string完，排除二进制文件类
    if (json[key] instanceof Object && !(json[key] instanceof Blob)) {
      formData.append(key, JSON.stringify(json[key]));
    } else {
      formData.append(key, json[key]);
    }
  });

  return instance(true)
    .post(url, formData, {
      timeout
    })
    .then(res => {
      return res.data;
    }).catch(err => {
      return Promise.reject(err);
    });
};

// 文件下载封装
const getDownloadApi = (url, json) => {
  const data = qs.stringify(json);
  const win = window.open(`${baseUrl}`);
  win.opener = null;
};

function handleError(error) {
  /* eslint-disable no-console */
  const vm = new Vue();
  vm.$message.error({
    message: '超时或者网络错误！请稍后重试。'
  });
  console.error(error);
  return Promise.reject(error);
}

export default {
  baseUrl,
  get,
  post,
  getApi,
  postApi,
  postUploadApi,
  getDownloadApi
};
