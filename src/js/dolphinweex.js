/**
 * 框架基座核心方法
 */
const stream = weex.requireModule('stream')
import storageModule from './storage'
import { DofMinibar, Core, Utils } from 'dolphin-weex-ui'
import { Bridge } from 'dolphin-native-bridge'
import { baseURL, ENV } from './config.js'
let localeEvent = new BroadcastChannel('localeEvent')

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
        localeEvent.onmessage = event => {
          let {
            data: { locale }
          } = event
          this.$i18n.locale = locale
        }
      },
      mounted() {
        if (this.$i18n) {
          this.setDeviceLanguage().catch(err => {
            this.$i18n.locale = this.locale
          })
        }
      },
      methods: {
        async setDeviceLanguage() {
          let currentLocale = await storageModule.getStorage('locale')
          this.$i18n.locale = currentLocale || 'en_US'
          // this.$toast(this.$i18n.locale)
        },
        emitLocaleChangeHandler(locale = 'en_US') {
          localeEvent.postMessage({
            message: 'language has changed',
            locale
          })
        }
      },
      watch: {
        '$i18n.locale': {
          handler(n, o) {
            this.$storage.setStorage('locale', n)
          }
        }
      }
    })
    Vue.prototype.$native = Bridge
    Vue.prototype.$bridge = Bridge
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

    Vue.prototype.$storage = storageModule
  }
}

module.exports = dolphinweex
