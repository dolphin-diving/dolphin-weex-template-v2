const storage = weex.requireModule('storage')

/**
 * 存储localStorage
 * @param key
 * @param value
 * @param duration Storage有效时间，单位：小时
 * @param set_time 是否设置时间
 * @returns {boolean}
 */
const setStorage = (key, value, callback, set_time = false, duration = 0) => {
  if (!key) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  try {
    if (set_time) {
      let date = new Date()
      if (duration > 0) {
        value += '&' + (date.getTime() + duration * 3600 * 1e3)
      } else {
        value += '&0'
      }
      value += '&' + date.getTime()
    }
    storage.setItem(key, value, callback)
  } catch (error) {
    console.error(error)
  }
}
const getStorage = (key, parse = false) => {
  if (!key) return false
  try {
    if (parse) {
      if (typeof storage.getItem(key) === 'string') {
        return JSON.parse(storage.getItem(key))
      }
    }
    return new Promise((resolve, reject) => {
      storage.getItem(key, event => {
        resolve(event.data)
      })
    })
  } catch (error) {
    console.error(error)
  }
}

export default {
  setStorage,
  getStorage
}
