import axios from 'axios';
import Vue from 'vue';
import qs from 'qs';

let baseUrl = PUBLIC.URL_AJAX;

if (process.env.NODE_ENV === 'development') {
  baseUrl = '/ajax/';
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'If-Modified-Since': '0'
  }
});


const post = (url, data, timeout) => {
  data = JSON.stringify(data);

  const config = {
    timeout
  };

  return instance
    .post(url, data, config)
    .catch(handleError);
};


const postApi = (url, data, timeout) => {
  return new Promise((resolve, reject) => {
    post(url, data, timeout)
      .then(response => {
        resolve(response.data);
      }).catch(error => reject(error));
  });
};

function handleError(error) {
  /* eslint-disable no-console */
  const vm = new Vue();
  vm.$message.error({
    message: error || '超时或者网络错误！请稍后重试。'
  });

  return Promise.reject(error);
  console.error(error);
}

export default {
  baseUrl,
  post,
  postApi
};