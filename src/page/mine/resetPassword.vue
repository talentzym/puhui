<template>
 <div id="resetPassword-view"  class="plus-screen-view">
   <wxheader :title='"找回密码"' ref="header"></wxheader>
   <div id="resetPassword-content" class="plus-screen-content">
    <div class="plus-screen-scroll">
      <p class="phlc-vCode-infor">验证码已发送至</p>
      <h2 class="phlc-vCode-tel">{{this.$route.query.account}}</h2>
      <form>
        <div class="form-action">
          <input class="mui-input-clear" required="required" type="text" name="verificationCode" placeholder="请输入6位验证码"
            v-model="verificationCode"
            v-validate="{required:true, length:6}"
            v-bind:class="{ 'input-err-border': errors.first('verificationCode') }"
            oninput="this.value = this.value.replace(/\D/gi, '');"/>
          <i class="form-action-clear3 iconfont icon-qingchuneirong" v-on:click="clear('verificationCode', $event)"></i>
          <div type="button" class="form-action-code phlc-red-text phlc-cursor-pointer" @click="validateCode($route.query.account, '2')">获取验证码</div>
          <p>{{ errors.first('verificationCode') }}</p>
        </div>
        <div class="form-action phlc-user-password">
          <input class="mui-input-clear" required="required" type="password" name="resetwPwd" placeholder="输入8-16位密码(含字母和数字)"
            v-model="resetwPwd"
            v-validate="{required: true, regex: regex.$register_password}"
            v-bind:class="{ 'input-err-border': errors.first('resetwPwd') }"/>
          <i class="form-action-clear2 iconfont icon-qingchuneirong" v-on:click="clear('resetwPwd', $event)"></i>
          <img src="../../assets/images/phlc-form-eye-close.png" class="phlc-user-eye phlc-cursor-pointer" @click="eyeClick($event)"/>
          <p>{{ errors.first('resetwPwd') }}</p>
        </div>
      </form>
      <p class="phlc-marginT-40">收不到验证码？<span class="phlc-red-text phlc-cursor-pointer" id="phlc-vCode-relation" v-on:click="$refs.header.windowOpen('serviceFlag')">联系我们</span></p>
      <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !( verificationCode && resetwPwd) }" @click="getVerificationCode()">提交</div>
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
    verificationCode: {
      required: '请输入验证码',
      length: '您输入的验证码格式有误'
    },
    resetwPwd: {
      required: '请输入密码！',
      regex: '8-16位字母和数字组合哦'
    }
  }
}
Validator.localize('en', dict)
export default {
  data () {
    return {
      verificationCode: '',
      resetwPwd: '',
      eyeStatus: false
    }
  },
  mounted () {
    this.countdownBool = false
    this.iTime = setInterval(() => {
      this.validateCodeSetTime()
    }, 1000)
  },
  methods: {
    getVerificationCode () {
      var _this = this
      this.$validator.validate().then(result => {
        if (result) {
          this.axios({
            url: this.HOST + '/web-server/userRestpwd/v1/restpwd',
            method: 'POST',
            params: {},
            data: {
              mobile: this.$route.query.account,
              password: this.$md5(this.resetwPwd),
              rand: this.verificationCode
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
                path: '/changSuccessModule',
                query: {
                  type: '1',
                  account: this.$route.query.account
                }
              })
            } else {
              if (res.data.data.code === '100002' || res.data.data.code === '100003') {
                this.$layer.toast(res.data.data.msg)
              } else {
                this.$layer.toast(res.data.data.msg)
              }
            }
          }).catch((err) => {
            if (err) {
              this.$layer.toast('重置失败，请再试一次哦~')
            }
          })
        }
      })
    },
    eyeClick (event) {
      $('.phlc-user-password input').attr('type', this.eyeStatus ? 'password' : 'text')
      $('.phlc-user-eye').attr('src', this.eyeStatus ? require('../../assets/images/phlc-form-eye-close.png') : require('../../assets/images/phlc-form-eye-open.png'))
      this.eyeStatus = !this.eyeStatus
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#resetPassword-view {
  .phlc-vCode-infor {
    margin-top: 0.3rem;
    color: #222;
    font-size: 0.28rem;
  }
  .form-action-code {
    position: absolute;
    font-size: 0.26rem;
    border: 1px solid #e6382c;
    right: 0rem;
    top: 0.22rem;
    border-radius: 0.36rem;
    box-sizing: content-box;
    margin: 0 2px;
    padding: 0.1rem 0.2rem;
  }
  .phlc-red-text {
    color: #e6382c;
  }
  .phlc-vCode-tel {
    color: #222;
    font-size: 0.4rem;
    margin-top: 0.2rem;
  }
  .phlc-user-eye {
    position: absolute;
    width: 0.38rem;
    right: 0.04rem;
    top: 0.38rem;
  }
  input:focus:valid+.form-action-clear2{
    opacity: 1;
  }
  input~.form-action-clear2{
    opacity: 0;
  }
  .form-action-clear2{
    position: absolute;
    right: 0.8rem;
    top: 0.5rem;
    transform: translateY(-50%);
    color: #999;
  }
  input:focus:valid+.form-action-clear3{
    opacity: 1;
  }
  input~.form-action-clear3{
    opacity: 0;
  }
  .form-action-clear3{
    position: absolute;
    right: 1.8rem;
    top: 0.5rem;
    transform: translateY(-50%);
    color: #999;
  }
  .phlc-marginT-40 {
    margin-top: 0.4rem;
    font-size: 0.24rem;
  }
}
</style>
