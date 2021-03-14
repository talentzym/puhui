import Vue from 'vue'
import $ from 'jquery'
/* 表单清除功能 */
Vue.prototype.clear = function (model, event) {
  this[model] = ''
  $(event.target).prev().focus()
}
/* 密码框小眼睛 */
Vue.prototype.togglePassword = function (id) {
  if ($(id).find('.form-action-eye').hasClass('visual')) {
    $(id).find('input').attr('type', 'password')
    $(id).find('.form-action-eye').removeClass('visual')
  } else {
    $(id).find('input').attr('type', 'type')
    $(id).find('.form-action-eye').addClass('visual')
  }
}
/* 发送验证码相关 */
Vue.prototype.countdown = 59
Vue.prototype.countdownBool = true
Vue.prototype.iTime = null
Vue.prototype.validateCodeSetTime = function () {
  if (this.countdown === 0) {
    clearInterval(this.iTime)
    $('.form-action-code').attr('disabled', false).css({
      'border': '1px solid #e6382c',
      'color': '#e6382c'
    }).text('获取验证码')
    this.countdown = 59
    this.countdownBool = true
    return false
  } else {
    $('.form-action-code').attr('disabled', true).css({
      'border': '1px solid #999',
      'color': '#999'
    }).text('剩余' + this.countdown + 's')
    this.countdown--
  }
}

Vue.prototype.validateCode = function (tel, type, url, emailIsNew) {
  if (this.countdownBool) {
    this.countdownBool = false
    $('.form-action-code').attr('disabled', true).css({
      'border': '1px solid #999',
      'color': '#999'
    }).text('剩余60s')
    this.iTime = setInterval(() => {
      this.validateCodeSetTime()
    }, 1000)
    let params = {}
    if (type === '4') {
      params = {
        email: tel
      }
    } else {
      params = {
        mobile: tel,
        type: type
      }
    }
    if (emailIsNew) {
      params.emailFlag = 'new'
    }
    this.axios({
      url: this.HOST + (url !== null && url !== undefined ? url : '/web-server/user/v1/getMobileCode'),
      method: 'POST',
      params: {},
      data: params,
      timeout: this.axiosTimeout,
      transformRequest: [(data, headers) => {
        return this.$qs.stringify(data)
      }],
      transformResponse: [function (data, headers) {
        return JSON.parse(data)
      }]
    }).then((res) => {
      if (res.data.data.code !== '1') {
        if (res.data.data.code === '100001' || res.data.data.code === '100002' || res.data.data.code === '100003') {
          this.$layer.dialog({
            content: '<div class="phlc-layer">' +
              '<div class="phlc-vCode-mask-center">' + res.data.data.msg + '</div>' +
              '</div>',
            btn: ['呼叫客服', '知道了'],
            shadeClose: false
          }).then((res) => {
            if (res === 0) {
              window.location.href = 'tel:4008989189'
            }
          })
          this.countdown = 0
        } else {
          if (tel !== '') {
            this.$layer.toast(res.data.data.msg)
          } else {
            this.$layer.toast('手机号不能为空')
          }
          clearInterval(this.iTime)
          $('.form-action-code').attr('disabled', false).css({
            'border': '1px solid #e6382c',
            'color': '#e6382c'
          }).text('获取验证码')
          this.countdown = 59
          this.countdownBool = true
        }
      }
    }).catch((err) => {
      if (err) {
        clearInterval(this.iTime)
        $('.form-action-code').attr('disabled', false).css({
          'border': '1px solid #e6382c',
          'color': '#e6382c'
        }).text('获取验证码')
        this.countdown = 59
        this.countdownBool = true
      }
    })
  }
}
