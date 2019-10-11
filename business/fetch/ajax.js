import axios from 'axios';
import Vue from 'vue';
import qs from 'qs';

let baseUrl = PUBLIC.URL_AJAX;

if (process.env.NODE_ENV === 'development') {
  baseUrl = '/ajax/';
  // baseUrl = '/mock/11/';
}

const instance = (isUpload = false) =>  {
  const contentype = isUpload
    ? 'multipart/form-data;charset=utf-8'
    : 'application/x-www-form-urlencoded;charset=utf-8';

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

const $ajax = (url='', data={}, config={}) => {
  return [
    'get',
    'delete',
    'postForm',
    'postJson',
    'put',
    'putJosn',
    'download',
    'upload' // post上传
  ].reduce((result, method) => {
    // get delete
    const merged = Object.assign({}, config, {
      params: data,
    });
    instance.get(url, merged)

    // post put formdata
    data = qs.stringify(data)
    instance.post(url, data, config)

    // post json
    data = JSON.stringify(data);
    instance.post(url, data, config)

    // download
    const data = qs.stringify(json);
    const win = window.open(`${baseUrl}/${url}?${data}`);
    win.opener = null;

    // upload
    const formData = new FormData;
    Object.keys(json).forEach(key => {
      // 对于深层deep-json: 需将里面string完，排除二进制文件类
      if (json[key] instanceof Object && !(json[key] instanceof Blob)) {
        formData.append(key, JSON.stringify(json[key]));
      } else {
        formData.append(key, json[key]);
      }
    });
    post(url, formData, {timeout})

    // result[method] = instance[method](url, )
    return result
  }, {})
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
    if(json[key] instanceof Object && !(json[key] instanceof Blob)) {
      formData.append(key, JSON.stringify(json[key]));
    } else {
      formData.append(key, json[key]);
    }
  });

  return instance(true)
  .post(url, formData, {timeout})
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
