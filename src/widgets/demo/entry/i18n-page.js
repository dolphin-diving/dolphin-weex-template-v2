import VueI18n from 'vue-i18n'
import App from '@/widgets/demo/views/i18n-page'
import dolphinWeex from '@/js/dolphinweex.js'
import exceptionReport from '@/js/exceptionReport.js'
import i18nJson from '@/widgets/demo/views/i18n-page/i18n.json'

Vue.use(VueI18n)
Vue.use(dolphinWeex)
Vue.use(exceptionReport)

const i18n = new VueI18n({
  locale: 'zh_CN',
  fallbackLocale: 'en_US',
  messages: i18nJson
})
