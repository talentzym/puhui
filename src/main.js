// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import MintUi from 'mint-ui'
import Mui from 'vue-awesome-mui'
import store from './store/store'
import router from './router'
import App from './App'
import VeeValidate from 'vee-validate'
import layer from 'vue-layer-mobile'
import md5 from 'js-md5'
import Mask from '@/assets/js/mask'
import preview from 'vue-photo-preview' /* 图片预览插件 */
import photoSwipe from 'kuan-vue-photoswipe' /* 图片预览插件2 */
import VueClipboard from 'vue-clipboard2' /* 复制插件 */
import qs from 'qs'

/* js */
import '@/assets/js/flexible.js'
import '@/assets/js/form.js'
import '@/assets/js/appShare.js'
import '@/assets/js/dateUtils.js'
import '@/assets/js/common.js'

/* css */
import 'mint-ui/lib/style.css'
import '@/assets/style/common/common.css'
import '@/assets/iconfont/iconfont.css'
import 'vue-layer-mobile/need/layer.css'
import 'swiper/dist/css/swiper.min.css'
import 'vue-photo-preview/dist/skin.css' /* 图片预览插件css */
/* 表单验证组件的基本配置 */
const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'change',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false
}
/* 表单验证各项正则集合 */
var regex = {
  phone: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
  $register_password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
  $login_account: /^([a-zA-Z0-9_]{4,18})|([a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6})|(((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8})$/,
  name: /^[\u4E00-\u9FA5]{2,10}$/,
  vCode: /^[0-9]{6}$/
}
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/* use */
Vue.use(MintUi)
Vue.use(Mui)
Vue.use(VeeValidate, config)
Vue.use(preview) /* 图片预览插件use */
Vue.use(photoSwipe) /* 图片预览插件2use */
Vue.use(VueClipboard) /* 复制插件use */
Vue.use(layer)
Vue.use(Mask)
/* config */
Vue.config.productionTip = false
/* prototype */
Vue.prototype.HOST = '/apis'
Vue.prototype.imgHost = '/apis' + '/web-server/'

Vue.prototype.axiosTimeout = 60000
Vue.prototype.newCardAmount = 0
Vue.prototype.$md5 = md5
Vue.prototype.axios = Axios
Vue.prototype.$qs = qs
Vue.prototype.regex = regex
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
