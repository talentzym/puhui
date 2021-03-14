<template>
 <div id="bindPhoneNumber-view" class="plus-screen-view">
   <wxheader :title=" this.$route.query.title ? this.$route.query.title : ''"></wxheader>
   <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <form>
          <div class="form-action">
            <input class="mui-input-clear" required="required" type="tel" name="phone" placeholder="请输入您的手机号"
              v-model="phone"
              v-validate="{required:true, regex: regex.phone, length: 11}"
              v-bind:class="{ 'input-err-border': errors.first('phone') }"
              oninput="this.value = this.value.replace(/\D/gi, '');"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('phone', $event)"></i>
            <p>{{ errors.first('phone') }}</p>
          </div>
        </form>
        <form>
          <div class="form-action">
            <input class="mui-input-clear" required="required" type="text" name="code" placeholder="请输入6位验证码"
              v-model="code"
              v-validate="{required:true, length:6}"
              v-bind:class="{ 'input-err-border': errors.first('code') }"
              oninput="this.value = this.value.replace(/\D/gi, '');"/>
            <i class="form-action-clear2 iconfont icon-qingchuneirong" v-on:click="clear('code', $event)"></i>
            <div type="button" class="form-action-code phlc-red-text phlc-cursor-pointer" @click="validateCode(phone, '3')">获取验证码</div>
            <p>{{ errors.first('code') }}</p>
          </div>
        </form>
        <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !( code) }" @click="getVerificationCode()">确认</div>
      </div>
    </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
import { Validator } from 'vee-validate'
const dict = {
  custom: {
    phone: {
      required: '请输入您的手机号！',
      regex: '请输入正确的手机号！',
      length: '请输入正确的手机号！',
      show: true
    },
    code: {
      required: '请输入验证码',
      length: '您输入的验证码格式有误'
    }
  }
}
Validator.localize('en', dict)
export default {
  data () {
    return {
      phone: '',
      code: ''
    }
  },
  methods: {
    getVerificationCode () {
      var _this = this
      this.$validator.validate().then(result => {
        if (result) {
          this.axios({
            url: this.HOST + '/web-server/account/v1/updateMobile',
            method: 'POST',
            params: {},
            data: {
              mobile: this.phone,
              rand: this.code,
              type: '3'
            },
            timeout: this.axiosTimeout,
            transformRequest: [function (data, headers) {
              _this.$layer.loading('加载中...')
              $('.submit-button').text('确认...').addClass('background-color-ff9a9a')
              return _this.$qs.stringify(data)
            }],
            transformResponse: [function (data, headers) {
              _this.$layer.close()
              $('.submit-button').text('确认').removeClass('background-color-ff9a9a')
              return JSON.parse(data)
            }]
          }).then((res) => {
            if (res.data.data.code === '1') {
              this.$router.push({
                path: '/formResult',
                query: {
                  title: '',
                  newPhone: this.phone,
                  type: 'bindPhoneNumber'
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
              this.$layer.toast('修改失败，请再试一次哦~')
            }
          })
        }
      })
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#bindPhoneNumber-view{
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
