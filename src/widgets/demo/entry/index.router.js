// 入口*.vue文件，对象命名为"App"，在编译文件"webpack.common.conf.js"里引用
import App from 'src/widgets/demo/views/index-router'
import router from './router/router.js'
import dolphinweex from 'src/js/dolphinweex.js'

Vue.use(dolphinweex)
