import VueI18n from 'vue-i18n'
import App from '@/widgets/demo/views/i18n-log-page'
import i18nJson from '@/widgets/demo/views/i18n-log-page/i18n.json'
import dolphinWeex from '@/js/dolphinweex.js'
import exceptionReport from '@/js/dolphinweex.js'

Vue.use(VueI18n)
Vue.use(dolphinWeex)
Vue.use(exceptionReport)

const i18n = new VueI18n({
  locale: 'zh_CN',
  fallbackLocale: 'en_US',
  messages: i18nJson
})
