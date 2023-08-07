//1.这是第一种
// import axios from "axios";
// export function request(config,success,failure){
//     //1.创建axios实例
//     const instance = axios.create({
//         baseURL:'http://123.207.32.32:8000',
//         timeout:5000
//     })
//     //2.发送真正的网络求求
//     instanceof(config).then(res =>{
//         success(res)
//     })
//     .catch(err =>{
//         failure(err)
//     })
// }
// 回调函数

//2.这是第二种
// import axios from "axios";
// export function request(config){
//     //1.创建axios实例
//     const instance = axios.create({
//         baseURL:'http://127.207.32.32:8000',
//         timeout:5000
//     })
//     //2.发送真正的网络求求
//     instanceof(config.baseConfig).then(res =>{

//         success(res)
//     })
//     .catch(err =>{

//         failure(err)
//     })
// }


//3.这是第三种
// import axios from "axios";
// export function request(config){
//     //1.创建axios实例
//     const instance = axios.create({
//         baseURL:'http://123.207.32.32:8000',
//         timeout:5000
//     })
//2.发送真正的网络求求
//因为他返回的就是promise  instance自带的
//    return instance(config)
// }

import axios from 'axios';
//创建axios实例
const service = axios.create({
    baseURL: "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    //超时时间
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
        //'Content-Type':'application/x-www-form-urlencoded'
    }
    // params: {
    //     "mode"    : "login",
    //     "account" : "admin",
    //     "password":"123456"
    // }
})
//请求拦截 回调函数config拿到数据 use有token config 是他的两个参数 
//请求过去的数据头部方token他保存在localStorage中，然后每次请求再携带它
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})
//响应拦截 这时的use那到响应的结果200表示成功 返回code状态码   Uncaught (in promise)如果能拿要数据
//控制台打印这个错误检查一下你的code的请求响应，根据实际你用的接口code值，我这里是200
service.interceptors.response.use((res) => {
    const code: number = res.data.data.code
    if (code == 200) {
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    console.log(err);
})
//暴露出去
export default service