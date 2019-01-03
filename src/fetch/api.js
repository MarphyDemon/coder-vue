import axios from "axios";
import qs from "qs";

// import * as _ from '../util/tool'
var domain = process.env.NODE_ENV !== "production" ? "/api" : "";
//全局 axios 默认配置
// axios.defaults.timeout = 5000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.baseURL = "";
// 页面刷新时，重新赋值token
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem("token")) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);



//POST传参序列化
axios.interceptors.request.use(
  config => {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export function fetch(url, params, type) {
  switch(type){
    case 'get':
      return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
      });
      break;
    case 'post':
      return new Promise((resolve, reject) => {
        axios
          .post(url, params)
          .then(
            response => {
              resolve(response.data);
            },
            err => {
              reject(err);
            }
          )
          .catch(error => {
            reject(error);
          });
      });
      break;
    case 'delete':
      return new Promise((resolve, reject) => {
        axios
          .delete(url, params)
          .then(
            response => {
              resolve(response.data);
            },
            err => {
              reject(err);
            }
          )
          .catch(error => {
            reject(error);
          });
      });
      break;
    default: 
      break;
    }
}

export default {
  login(params) {
    return fetch(domain + "/api/v1/user/login", params, 'post');
  },
  getUserInfo(params) {
    return fetch(domain + "/api/v1/user/info", params, 'post');
  },
  runCode(params) {
    return fetch(domain + "/api/v1/user/code", params, 'post');
  },
  questionList(params) {
    return fetch(domain + "/api/v1/question/list", params, 'get');
  },
  getCreater(params) {
    return fetch(domain + "/api/v1/user/creater", params, 'post');
  },
  getQuestion(params) {
    return fetch(domain + "/api/v1/question/detail", params, 'post');
  },
  testCode(params) {
    return fetch(domain + "/api/v1/test/code/create", params, 'post')
  }
};
