<template>
  <div id="register-view" class="plus-screen-view">
    <wxheader></wxheader>
    <div id="register-content" class="plus-screen-content">
      <div class="plus-screen-scroll">
        <h1>快速注册账号</h1>
        <p class="font-size-28">{{ amount }}元新人礼包注册可领取！</p>
        <form>
          <div class="form-action">
            <input class="mui-input-clear" required="required" type="tel" name="phone" placeholder="请输入您的手机号"
              v-model="phone"
              v-validate="{required:true, regex: regex.phone, length: 11}"
              v-bind:class="{ 'input-err-border': errors.first('phone') }"
              v-on:change="phoneInput()"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('phone', $event)"></i>
            <p>{{ errors.first('phone') }}</p>
          </div>
        </form>
        <p class="font-size-24">注册账号表示您已阅读并同意
          <router-link to="/provision" tag="span" class="color-e6382c">《普惠理财用户隐私条款》</router-link>
        </p>
        <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': errors.first('phone') || !phone }" v-on:click="submit()">下一步</div>
        <div style="margin: 0.5rem 0;" v-on:click="$router.replace({path: '/login'})">
          <p class="font-size-36 color-e6382c text-align-center">已有账号？请登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
import { Validator } from 'vee-validate'
import { Indicator } from 'mint-ui'
const dict = {
  custom: {
    phone: {
      required: '请输入您的手机号！',
      regex: '请输入正确的手机号！',
      length: '请输入正确的手机号！',
      show: true
    }
  }
}
Validator.localize('en', dict)
export default {
  name: 'register',
  data () {
    return {
      phone: '',
      amount: 0
    }
  },
  components: {
    wxheader
  },
  activated () {
    this.phone = this.$store.state.register_phone ? this.$store.state.register_phone : ''
  },
  mounted () {
    this.getAmount().then((res) => {
      this.amount = res
    })
  },
  methods: {
    submit () {
      var _this = this
      this.$validator.validate().then(result => {
        if (result) {
          this.axios({
            url: this.HOST + '/web-server/user/v1/getMobileCode',
            method: 'POST',
            params: {},
            data: {
              mobile: this.phone,
              type: '1'
            },
            timeout: this.axiosTimeout,
            transformRequest: [function (data, headers) {
              Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              })
              $('.submit-button').text('提交中...').addClass('background-color-ff9a9a')
              return _this.$qs.stringify(data)
            }],
            transformResponse: [function (data, headers) {
              Indicator.close()
              $('.submit-button').text('提交').removeClass('background-color-ff9a9a')
              return JSON.parse(data)
            }]
          }).then((res) => {
            if (res.data.data.code === '1') {
              this.$router.push({
                path: '/validateCode',
                query: {
                  phone: this.phone
                }
              })
            } else if (res.data.data.code !== '1') {
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
              } else {
                this.$layer.toast(res.data.data.msg)
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
      })
    },
    phoneInput () {
      this.phone = this.phone.replace(/\D/gi, '')
      this.$store.state.register_phone = this.phone
    }
  }
}
</script>

<style lang="less">
#register-content{
  >.plus-screen-scroll{
    padding-top: 0.4rem;
    height: 100%;
  }
  h1{
    color: #222;
    font-size: 0.48rem;
  }
}
</style>
