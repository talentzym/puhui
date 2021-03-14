<template>
 <div id="editLoginPassword-view"  class="plus-screen-view">
  <wxheader></wxheader>
  <div id="editLoginPassword-content" class="plus-screen-content">
    <div class="plus-screen-scroll">
      <form>
        <div class="form-action">
          <input class="mui-input-clear" required="required" type="password" name="oldPassword" placeholder="请输入原密码"
          v-model="oldPassword"
          v-validate="{required:true, regex: regex.$login_password}"
          v-bind:class="{ 'input-err-border': errors.first('oldPassword') }"/>
          <i class="form-action-clear2 iconfont icon-qingchuneirong" v-on:click="clear('oldPassword', $event)"></i>
          <img src="../../assets/images/phlc-form-eye-close.png" class="phlc-user-eye phlc-cursor-pointer" @click="eyeChange($event)"/>
          <p>{{ errors.first('oldPassword') }}</p>
        </div>
        <div class="form-action">
          <input class="mui-input-clear" required="required" type="password" name="newPassword" placeholder="请输入8-16位密码(字母、数字组合)"
          v-model="newPassword"
          v-validate="{required: true, regex: regex.$register_password}"
          v-bind:class="{ 'input-err-border': errors.first('newPassword') }"/>
          <i class="form-action-clear2 iconfont icon-qingchuneirong" v-on:click="clear('newPassword', $event)"></i>
          <img src="../../assets/images/phlc-form-eye-close.png" class="phlc-user-eye phlc-cursor-pointer"  @click="eyeChange($event)"/>
          <p>{{ errors.first('newPassword') }}</p>
        </div>
        <div class="form-action">
          <input class="mui-input-clear" required="required" type="password" name="confirmPassword" placeholder="请重新输入新密码"
          v-model="confirmPassword"
          v-validate="{required: true, regex: regex.$register_password, is: newPassword}"
          v-bind:class="{ 'input-err-border': errors.first('confirmPassword') }"/>
          <i class="form-action-clear2 iconfont icon-qingchuneirong" v-on:click="clear('confirmPassword', $event)"></i>
          <img src="../../assets/images/phlc-form-eye-close.png" class="phlc-user-eye phlc-cursor-pointer"  @click="eyeChange($event)"/>
          <p>{{ errors.first('confirmPassword') }}</p>
        </div>
      </form>
      <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !(oldPassword && newPassword && confirmPassword) }" v-on:click="submit()">确认</div>
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
    oldPassword: {
      required: () => '请输入密码！',
      regex: () => '请输入正确的密码！'
    },
    newPassword: {
      required: '请输入密码！',
      regex: '8-16位字母和数字组合哦'
    },
    confirmPassword: {
      required: '请输入密码！',
      regex: '8-16位字母和数字组合哦',
      is: () => '两次密码不一致'
    }
  }
}
Validator.localize('en', dict)
export default {
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      eyeStatus: false
    }
  },
  methods: {
    submit () {
      this.$validator.validate().then(result => {
        if (result) {
          var _this = this
          this.axios({
            url: this.HOST + '/web-server/userRestpwd/v1/restpwd',
            method: 'POST',
            transformRequest: [function (data, headers) {
              $('.submit-button').text('提交中...').addClass('background-color-ff9a9a')
              return _this.$qs.stringify(data)
            }],
            params: {},
            data: {
              password: this.$md5(this.oldPassword),
              newPassword: this.$md5(this.newPassword),
              twoNewPsaaword: this.$md5(this.confirmPassword)
            },
            timeout: 5000,
            transformResponse: [function (data, headers) {
              $('.submit-button').text('确认').removeClass('background-color-ff9a9a')
              return JSON.parse(data)
            }]
          }).then((res) => {
            if (res.data.data.code === '1') {
              this.$router.push({
                path: '/formResult',
                query: {
                  type: 'editLoginPassword'
                }
              })
            } else {
              this.$layer.toast(res.data.data.msg)
            }
          }).catch((err) => {
            if (err) {
              this.$layer.toast('修改失败，请再试一次哦~')
            }
          })
        }
      })
    },
    eyeChange (ev) {
      var tar = $(ev.target)
      tar.parent().find('input').attr('type', this.eyeStatus ? 'password' : 'text')
      tar.attr('src', this.eyeStatus ? require('../../assets/images/phlc-form-eye-close.png') : require('../../assets/images/phlc-form-eye-open.png'))
      this.eyeStatus = !this.eyeStatus
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less" scoped>
#editLoginPassword-view {
  #editLoginPassword-content{
    >.plus-screen-scroll{
      padding-top: 0.4rem;
    }
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
}
</style>
