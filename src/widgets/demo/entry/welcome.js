import VueI18n from 'vue-i18n'
import App from 'src/widgets/demo/views/welcome'
import dolphinweex from 'src/js/dolphinweex.js'
import exceptionReport from '@/js/exceptionReport.js'
import i18nJson from '@/widgets/demo/views/welcome/i18n.json'

Vue.use(VueI18n)
Vue.use(dolphinweex)
Vue.use(exceptionReport)

const i18n = new VueI18n({
  locale: 'zh_CN',
  fallbackLocale: 'en_US',
  messages: i18nJson
})
