<template>
  <div id="validateCode-view" class="plus-screen-view">
    <wxheader :title='"注册"' ref="header"></wxheader>
    <div id="validateCode-content" class="plus-screen-content">
      <div class="plus-screen-scroll" style="padding-top: 0.3rem;">
        <p class="color-444 font-size-28">验证码已发送到</p>
        <h2 class="font-size-40" style="margin-top: 0.2rem;">{{ $route.query.phone.slice(0,3) +'&nbsp;'+ $route.query.phone.slice(3,7) +'&nbsp;'+ $route.query.phone.slice(7,11)}}</h2>
        <form>
          <div class="form-action">
            <input class="mui-input-clear" required="required" type="tel" name="code"
              v-model="code"
              v-validate="{required:true, length:6}"
              v-bind:class="{ 'input-err-border': errors.first('code') }"
              placeholder="请输入6位验证码"
              oninput="this.value = this.value.replace(/\D/gi, '');"/>
            <i style="right: 2rem;" class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('code', $event)"></i>
            <span class="form-action-code" v-on:click="validateCode($route.query.phone, '1')">发送验证码</span>
            <p>{{ errors.first('code') }}</p>
          </div>
           <div class="form-action form-action-password" id="register-password">
            <input class="mui-input-clear" required="required" type="password" name="password"
              v-model="password"
              v-validate="{required: true, regex: regex.$register_password}"
              v-bind:class="{ 'input-err-border': errors.first('password') }"
              placeholder="请输入8-16位密码(含字母和数字)"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('password', $event)"></i>
            <i class="form-action-eye" v-on:click="togglePassword('#register-password')"></i>
            <p>{{ errors.first('password') }}</p>
          </div>
        </form>
        <p class="font-size-24 color-666">收不到验证码？<span class="color-e6382c" v-on:click="$refs.header.windowOpen('serviceFlag')">联系我们</span></p>
        <div class="submit-button" v-bind:class="{'background-color-ff9a9a': !( code && password && !errors.first('code') && !errors.first('password')) }" v-on:click="submit()">提交</div>
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
    code: {
      required: '请输入验证码！',
      length: '您输入的验证码格式有误！'
    },
    password: {
      required: '请输入密码！',
      regex: '8-16位字母和数字组合哦'
    }
  }
}
Validator.localize('en', dict)
export default {
  name: 'validateCode',
  data () {
    return {
      code: '',
      password: ''
    }
  },
  components: {
    wxheader
  },
  mounted () {
    this.countdownBool = false
    this.iTime = setInterval(() => {
      this.validateCodeSetTime()
    }, 1000)
  },
  methods: {
    submit () {
      var _this = this
      this.$validator.validate().then(result => {
        if (result) {
          this.axios({
            url: this.HOST + '/web-server/user/v1/register',
            method: 'POST',
            params: {},
            data: {
              mobile: this.$route.query.phone,
              password: this.$md5(this.password),
              rand: this.code
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
              this.$store.state.register_phone = ''
              this.$router.replace({
                path: '/home'
              })
            } else {
              this.$layer.toast(res.data.data.msg)
            }
          }).catch((err) => {
            if (err) {
              this.$layer.toast('注册失败，请再试一次哦~')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
#validateCode-view{
  .plus-screen-scroll{
    height: 100%;
  }
}
</style>
