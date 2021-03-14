<template>
  <div id="login-view" class="plus-screen-view">
    <wxheader></wxheader>
    <div id="login-content" class="plus-screen-content">
      <div class="plus-screen-scroll">
        <h1>账号登录</h1>
        <form>
          <div class="form-action">
            <input required="required" type="text" name="account" placeholder="请输入手机号、用户名或邮箱"
              v-model="account"
              v-validate="{required:true, regex: regex.$login_account}"
              v-bind:class="{ 'input-err-border': errors.first('account') }"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('account', $event)"></i>
            <p>{{ errors.first('account') }}</p>
          </div>
          <div class="form-action form-action-password" id="login-password">
            <input required="required" type="password" name="password" placeholder="请输入密码"
              v-model="password"
              v-validate="{required:true}"
              autocomplete='password'
              v-bind:class="{ 'input-err-border': errors.first('password') }"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('password', $event)"></i>
            <i class="form-action-eye" v-on:click="togglePassword('#login-password')"></i>
            <p>{{ errors.first('password') }}</p>
          </div>
        </form>
        <router-link to="/retrievePassword" tag="span">
          <p class="font-size-30 color-e6382c" style="display:inline-block;">我忘了密码？</p>
        </router-link>
        <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !( account && password) }" v-on:click="submit()">登录</div>
        <div style="margin: 0.5rem 0;" v-on:click="toRegister()">
          <p class="font-size-36 color-e6382c text-align-center">{{amount}}元新人礼包注册可领取</p>
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
import Bus from '../../assets/js/bus.js'
const dict = {
  custom: {
    account: {
      required: '请输入手机号、用户名或邮箱！',
      regex: () => '请输入正确的手机号、用户名或邮箱！'
    },
    password: {
      required: () => '请输入密码！',
      regex: () => '请输入正确的密码！'
    }
  }
}
Validator.localize('en', dict)
export default {
  name: 'login',
  components: {
    wxheader
  },
  data () {
    return {
      account: '',
      password: '',
      amount: ''
    }
  },
  mounted () {
    this.getAmount().then((res) => {
      this.amount = res
    })
  },
  methods: {
    toRegister () {
      this.$router.replace({
        path: '/register'
      })
    },
    submit () {
      // console.log('1111')
      this.$validator.validate().then(result => {
        if (result) {
          var _this = this
          this.axios({
            url: this.HOST + '/sso-server/userLogin/v1/login',
            method: 'post',
            transformRequest: [function (data, headers) {
              Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              })
              $('.submit-button').text('提交中...').addClass('background-color-ff9a9a')
              return _this.$qs.stringify(data)
            }],
            params: {},
            data: {
              userName: this.account,
              password: this.$md5(this.password)
            },
            timeout: 5000,
            transformResponse: [function (data, headers) {
              Indicator.close()
              $('.submit-button').text('提交').removeClass('background-color-ff9a9a')
              return JSON.parse(data)
            }]
          }).then((res) => {
            // console.log(res)
            if (res.data.data.code === '1') {
              if (this.$route.query.path) {
                if (this.$route.query.path.indexOf('julyActivity')) {
                  Bus.$emit('status2', 'Refresh')
                }
                this.$router.back(-1)
              } else {
                this.$router.push({
                  path: '/home'
                })
              }
            } else {
              if (res.data.code === '0') {
                this.$layer.toast('登录失败！')
              } else if (res.data.data.code === '100001') {
                this.$layer.toast('账号格式错误，请重新填写！')
              } else if (res.data.data.code === '100002') {
                this.$layer.toast('账号不存在，请重新填写！')
              } else if (res.data.data.code === '100003') {
                this.$layer.toast('用户名/密码错误，请重新填写！')
              } else if (res.data.data.code === '100004') {
                this.$layer.toast('移动端不支持企业登录，请前往PC端登录！')
              }
            }
          }).catch((err) => {
            if (err) {
              this.$layer.toast('登录失败，请再试一次哦~')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
#login-content{
  background: transparent;
  >.plus-screen-scroll{
    height: 100%;
    padding-top: 0.4rem;
    background: #fff;
  }
  h1{
    color: #222;
    font-size: 0.48rem;
  }
}
</style>
