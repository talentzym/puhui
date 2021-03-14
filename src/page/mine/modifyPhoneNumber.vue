<template>
 <div id="modifyPhoneNumberView"  class="plus-screen-view">
   <wxheader :title="'修改手机号'"></wxheader>
   <div id="resetPassword-content" class="plus-screen-content">
    <div class="plus-screen-scroll">
      <p class="phlc-vCode-infor">验证码已发送至</p>
      <h2 class="phlc-vCode-tel">{{this.$route.query.mdphone}}</h2>
      <form>
        <div class="form-action">
          <input class="mui-input-clear" required="required" type="text" name="verificationCode" placeholder="请输入6位验证码"
            v-model="verificationCode"
            v-validate="{required:true, length:6}"
            v-bind:class="{ 'input-err-border': errors.first('verificationCode') }"
            oninput="this.value = this.value.replace(/\D/gi, '');"/>
          <i class="form-action-clear2 iconfont icon-qingchuneirong" v-on:click="clear('verificationCode', $event)"></i>
          <div type="button" class="form-action-code phlc-red-text phlc-cursor-pointer" @click="validateCode($route.query.mobile, '3')">获取验证码</div>
          <p>{{ errors.first('verificationCode') }}</p>
        </div>
      </form>
      <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !( verificationCode) }" @click="getVerificationCode()">下一步</div>
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
    }
  }
}
Validator.localize('en', dict)
export default {
  data () {
    return {
      verificationCode: '',
      mobile: this.$route.query.mobile,
      mdphone: this.$route.query.mdphone
    }
  },
  methods: {
    getVerificationCode () {
      var _this = this
      this.$validator.validate().then(result => {
        if (result) {
          this.axios({
            url: this.HOST + '/web-server/user/v1/validateMobileCode',
            method: 'POST',
            params: {},
            data: {
              mobile: this.$route.query.mobile,
              rand: this.verificationCode,
              type: '3'
            },
            timeout: this.axiosTimeout,
            transformRequest: [function (data, headers) {
              Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              })
              $('.submit-button').text('下一步...').addClass('background-color-ff9a9a')
              return _this.$qs.stringify(data)
            }],
            transformResponse: [function (data, headers) {
              Indicator.close()
              $('.submit-button').text('下一步').removeClass('background-color-ff9a9a')
              return JSON.parse(data)
            }]
          }).then((res) => {
            if (res.data.data.code === '1') {
              this.$router.push({
                path: '/bindPhoneNumber',
                query: {
                  type: '3',
                  title: '修改手机号'
                }
              })
              this.countdown = 0
            } else {
              if (res.data.data.code === '100002' || res.data.data.code === '100003') {
                this.$layer.toast(res.data.data.msg)
              } else {
                this.$layer.toast(res.data.data.msg)
              }
            }
          }).catch((err) => {
            if (err) {
              this.$layer.toast('获取失败，请再试一次哦~')
            }
          })
        }
      })
    }
  },
  beforeDestroy () {
    this.countdown = 0
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#modifyPhoneNumberView {
  >.plus-screen-scroll{
    padding-top: 0.4rem;
  }
  .phlc-vCode-infor {
    padding-top: 0.3rem;
    color: #222;
    font-size: 0.28rem;
  }
  .phlc-vCode-tel {
    color: #222;
    font-size: 0.4rem;
    margin-top: 0.2rem;
  }
  input:focus:valid+.form-action-clear2{
    opacity: 1;
  }
  input~.form-action-clear2{
    opacity: 0;
  }
  .form-action-clear2{
    position: absolute;
    right: 2rem;
    top: 0.5rem;
    transform: translateY(-50%);
    color: #999;
  }
}
</style>
