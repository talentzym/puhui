import Mask from '@/components/mask'
export default {
  install (Vue, pluginOptions = {}) {
    const VueLoading = Vue.extend(Mask)
    let mask = null
    function show (obj = undefined) {
      return new Promise((resolve) => {
        if (!mask) {
          let ele = document.querySelector('body')
          if (obj) {
            ele = obj
            obj.style.position = 'relative'
          }
          mask = new VueLoading()
          mask.father = obj
          mask.$mount()
          mask.show(obj)
          ele.appendChild(mask.$el)
          resolve()
        }
      })
    }
    function hide () {
      if (mask) {
        mask.hide()
        mask = null
      }
    }
    let $load = {
      show (obj) {
        show(obj)
      },
      hide () {
        hide()
      }
    }
    Object.assign($load, mask)
    Vue.prototype.$mask = $load
  }
}
