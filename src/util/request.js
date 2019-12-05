import axios from 'axios'

import {
  getToken,
  setToken
} from './auth'
import util from './util'
import router from '../router/index'
import wx from "weixin-js-sdk"

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 1000 * 60 * 3 // 3分钟
})
// const _source = 3
// const _userid = 'admin_web'
// request interceptor
service.interceptors.request.use(
  config => {
    // console.log("configconfig", config)
    config.headers = {
      'Content-Type': 'application/json'
    }
    config.headers['Authorization'] = 'JWT ' + getToken()

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // console.log("response123", response)
    const status = response.status
    const res = response.data
    const vm = this

    if (status === 200) {
      if ('status' in res && res.status !== 'success') {
        //alert(JSON.stringify(res) );
        util.showmessage(res.msg, "警告");
        if (["1010", "1014", "401"].indexOf(res.status_code.toString()) > -1) {
        }
      }
    }

    return res
  },
  error => {
    console.log('error', error);
    //console.log(router.push//);
    const vm = this;
    if (error.toString().indexOf('timeout') > -1) {
      util.showmessage("超时提示", '超时');
    }
    if (error.response !== undefined) {
      const status = error.response.status

      if (status === 401) {
        util.showmessage("异常", "错误");
        wx.miniProgram.redirectTo({url:'/pages/login/login'})
      }

      if (status === 500) {
        util.showmessage("异常", "错误");
        return {
          "data": []
        };
      } else {
        util.showmessage(res.msg, "警告");
      }

    }

    return Promise.reject(error)
  }
)

export default service
