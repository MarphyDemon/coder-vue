import axios from 'axios'
import qs from 'qs'

// import * as _ from '../util/tool'
var domain = process.env.NODE_ENV !== 'production'?'':'';
console.log(process.env.NODE_ENV,domain)
//全局 axios 默认配置
// axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '';


//POST传参序列化
axios.interceptors.request.use((config) => {
    config.headers["X-Requested-With"] = 'XMLHttpRequest'
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});


export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}
// var domain = '/salary'

export default {
    login(params){
        return fetch(domain + '/api/v1/user/login',params)
    },
    runCode(params){
        return fetch(domain + '/api/v1/user/code',params)
    },
}

