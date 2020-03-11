/**
 * 框架核心方法
 */
const stream = weex.requireModule('stream')
<<<<<<< HEAD
const app = weex.requireModule('bridgeModule') //仅支持在native中使用

import bridgeCore from 'bridgecore'
import util from './util.js'
import i18n from './i18n.js'
import storageModule from './storage'
import { DofMinibar } from 'dolphin-weex-ui'
=======
import { DofMinibar, Core, Utils } from 'dolphin-weex-ui'
>>>>>>> e28482c5dcad1e6492d0679edb7b557216408e6e
import { baseURL, ENV } from './config.js'

let dolphinweex = {
  /**
   * 发送GET请求
   * @method get
   * @param params {object} 请求参数
   * @param params.url {string} 请求的URL
   * @param params.headers {object} 请求头
   * @param params.type {string} 响应类型, json(默认),text
   * @param params.data {object} 请求数据，自动拼接到url后面
   * @param params.timeout {int} 超时时间 默认30s
   * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
   */
  get(params) {
    return new Promise((resolve, reject) => {
      let url = params.url || ''
      let headers = params.headers || {}
      let data = params.data || {}
      let type = params.type || 'json'
      if (url.indexOf('?') < 0) {
        url += '?'
      }
      if (typeof data == 'object') {
        let dLength = Object.keys(data).length
        for (let i = 0; i < dLength; i++) {
          let key = Object.keys(data)[i]
          let value = encodeURIComponent(data[key])
          url += `${key}=${value}`
          if (i != dLength - 1) {
            url += '&'
          }
        }
      }
      stream.fetch(
        {
          method: 'GET',
          type: type,
          url: url,
          headers: headers,
          timeout: params.timeout || 30000
        },
        res => {
          if (res.status >= 200 && res.status <= 299) {
            resolve(res.data, res.status, res.statusText, res)
          } else {
            reject(res.status, res.statusText)
          }
        }
      )
    })
  },
  /**
   * 发送POST请求
   * @method post
   * @param params {object} 请求参数
   * @param params.url {string} 请求的URL
   * @param params.headers {object} 请求头, Content-Type默认值是 application/x-www-form-urlencoded
   * @param params.type {string} 响应类型, json(默认),text
   * @param params.data {object} 请求数据，带到 HTTP body中
   * @param params.timeout {int} 超时时间 默认30s
   * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
   */
  post(params) {
    let url = params.url || ''
    let headers = params.headers || {}
    let data = params.data
    let type = params.type || 'json'
    if (typeof data == 'object') {
      data = JSON.stringify(data)
    }
    // headers["Content-Type"]="application/x-www-form-urlencoded";
    // headers["Content-Type"]="application/json";
    return new Promise((resolve, reject) => {
      stream.fetch(
        {
          method: 'POST',
          type: type,
          url: url,
          headers: headers,
          body: data,
          timeout: params.timeout || 30000
        },
        res => {
          if (res.status >= 200 && res.status <= 299) {
            resolve(res.data, res.status, res.statusText, res)
          } else {
            reject(res.status, res.statusText)
          }
        }
      )
    })
  },
  install(Vue, options) {
    let that = dolphinweex
    Vue.mixin({
      components: {
        'dof-minibar': DofMinibar
      },
      data: () => ({
        locale: 'en_US' //设置默认语言：zh_CN|en_US
      }),
      created() {
        // 通用钩子
      },
      mounted() {
        if (this.i18nData) {
          this.setDeviceLanguage().catch(err => {
            this.locale = 'en_US'
          })
        }
      },
      methods: {
        async setDeviceLanguage() {
          let current_locale = await storageModule.getStorage('locale')
          this.locale = current_locale || 'en_US'
        }
      }
    })
    Vue.prototype.$native = null
    Vue.prototype.$util = Utils

    Vue.prototype.$ENV = ENV

    Vue.prototype.$baseURL = baseURL

    Vue.prototype.$alert = Core.alert

    Vue.prototype.$toast = Core.toast

    Vue.prototype.$reload = Core.reload

    Vue.prototype.$confirm = Core.confirm

    Vue.prototype.$show = Core.show

    Vue.prototype.$showSuccess = Core.showSuccess

    Vue.prototype.$showError = Core.showError

    Vue.prototype.$hide = Core.hide

    Vue.prototype.$getContextPath = Core.getContextPath

    Vue.prototype.$push = Core.push

    Vue.prototype.$pop = Core.pop

    Vue.prototype.$post = that.post

    Vue.prototype.$get = that.get
<<<<<<< HEAD

    Vue.prototype.$formatDate = util.formatDate

    Vue.prototype.$isIPad = util.isIPad

    Vue.prototype.$isIPhoneX = util.isIPhoneX

    Vue.prototype.$isIPhone = util.isIPhone

    Vue.prototype.$isAndroid = util.isAndroid

    Vue.prototype.$fixStyle = util.fixStyle

    Vue.prototype.$showLoading = bridgeCore.showLoading

    Vue.prototype.$hideLoading = bridgeCore.hideLoading

    Vue.prototype.$showSuccess = bridgeCore.showSuccess

    Vue.prototype.$showError = bridgeCore.showError
    Vue.prototype.$t = i18n.t
    Vue.prototype.$storage = storageModule
=======
>>>>>>> e28482c5dcad1e6492d0679edb7b557216408e6e
  }
}

module.exports = dolphinweex
