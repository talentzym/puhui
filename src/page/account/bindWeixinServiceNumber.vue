<template>
 <div id="serviceNumber-view" class="plus-screen-view">
   <wxheader :title='"普惠理财"' ref="header"></wxheader>
   <div id="serviceNumber-content" class="plus-screen-content">
      <div class="plus-screen-scroll">
        <h1>亲爱的普友</h1>
        <p class="font-size-28" style="color:#888888;margin-bottom:.3rem;margin-top: .1rem;">您正在绑定普惠理财微信服务号</p>
        <form>
          <div class="form-action">
            <input required="required" type="text" name="account" placeholder="普惠理财绑定的手机号"
              v-model="account"
              v-validate="{required:true, regex: regex.phone}"
              v-bind:class="{ 'input-err-border': errors.first('account') }"
              oninput="this.value = this.value.replace(/\D/gi, '')"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('account', $event)"></i>
            <p>{{ errors.first('account') }}</p>
          </div>
          <div class="form-action form-action-password">
            <input required="required" type="password" name="password" placeholder="普惠理财平台登录密码"
              v-model="password"
              v-validate="{required:true}"
              autocomplete='password'
              v-bind:class="{ 'input-err-border': errors.first('password') }"
              oninput="this.value = this.value.replace(/\s+/g, '')"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('password', $event)"></i>
            <p>{{ errors.first('password') }}</p>
          </div>
          <div class="form-action">
            <input class="mui-input-clear" required="required" type="tel" name="code"
              v-model="code"
              v-validate="{required:true, regex: regex.vCode, length: 6}"
              v-bind:class="{ 'input-err-border': errors.first('code') }"
              placeholder="请输入6位验证码"
              :oninput="codeInput()"/>
            <i style="right: 2rem;" class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('code', $event)"></i>
            <span class="form-action-code" v-on:click="checkPhone()">发送验证码</span>
            <p>{{ errors.first('code') }}</p>
          </div>
        </form>
        <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !( account && password && code) }" v-on:click="submit()">绑定</div>
        <div class="clearfix" style="margin-top:.27rem;">
          <p class="font-size-26 color-486FCA" style="float:left;display:inline-block;" v-on:click="showWindow()">下载客户端</p>
          <p class="font-size-26" style="float:right;display:inline-block;">没有账号，<span class="color-486FCA"  v-on:click="goRoute('/register')">注册账号</span></p>
        </div>
        <div class="caution font-size-26">— 网贷有风险，出借需谨慎 —</div>
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
    account: {
      required: '请输入您的手机号！',
      regex: () => '请输入正确的手机号！'
    },
    password: {
      required: () => '请输入密码！',
      regex: () => '请输入正确的密码！'
    },
    code: {
      required: '请输入验证码！',
      regex: () => '您输入的验证码格式有误！'
    }
  }
}
Validator.localize('en', dict)
export default {
  data () {
    return {
      account: '',
      password: '',
      code: '',
      amount: 0,
      userId: '',
      url: ''
    }
  },
  mounted () {
    this.getAmount().then((res) => {
      this.amount = res
    })
  },
  methods: {
    submit () {
      this.$validator.validate().then(result => {
        console.log(result)
        if (result) {
          var _this = this
          this.axios({
            url: this.HOST + '/web-server/user/v1/validateMobileCode',
            method: 'post',
            params: {},
            data: {
              mobile: this.account,
              rand: this.code,
              type: '2'
            },
            timeout: this.axiosTimeout,
            transformRequest: [function (data, headers) {
              return _this.$qs.stringify(data)
            }],
            transformResponse: [function (data, headers) {
              return JSON.parse(data)
            }]
          }).then((res) => {
            console.log(res)
            if (res.data.data.code === '1') {
              this.goLogin()
            } else {
              this.$layer.toast(res.data.data.msg)
            }
          })
        }
      })
    },
    goLogin () {
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
        console.log(res)
        if (res.data.data.code === '1') {
          this.userId = res.data.data.userId
          this.gobind()
        } else {
          this.$layer.toast(res.data.data.msg)
        }
      })
    },
    gobind () {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/bindWeChat/v2/getBindOauthUrl',
        method: 'post',
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: {
          userId: this.userId
        },
        timeout: 5000,
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        console.log(res)
        if (res.data.data.data.code === 10000) {
          this.url = res.data.data.data.url
          // console.log(this.url)
          window.location.href = this.url
        }
      }).catch((err) => {
        if (err) {
          this.$layer.toast('系统错误，请稍后再试')
        }
      })
    },
    checkPhone () {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/userRestpwd/v2/web/existMobileOrEMail',
        method: 'POST',
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: {
          mobile: this.account
        },
        timeout: 5000,
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        console.log(res)
        if (res.data.data.code === '0') { // 用户不存在
          this.$layer.toast('您尚未注册，请先注册哦！')
        } else {
          this.validateCode(this.account, '2')
        }
      })
    },
    goRoute (pathname) {
      this.$router.push({path: pathname})
    },
    showWindow () {
      window.open('https://www.puhuilicai.com/appdownload', '_blank')
    },
    codeInput () {
      this.code = this.code.substr(0, 6)
      this.code = this.code.replace(/\D/gi, '')
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#serviceNumber-content{
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
  .caution{
    color: #BBBBBB;
    position: absolute;
    bottom:1rem;
    left: 27%;
  }
  #downloadApp{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.1rem;
    background: rgba(0, 0, 0, 0.9);
    z-index: 100;
    .close-btn{
      width: 0.88rem;
      height: 0.88rem;
      background: url(../../assets/images/weclome-cha.png) no-repeat 50% 50%;
      background-size: .3rem;
      margin: 0.11rem 0.01rem;
    }
    .download-btn{
      position: absolute;
      top: .25rem;
      right: .4rem;
      width: 1.3rem;
      height: .6rem;
      line-height: .6rem;
      font-size: .23rem;
      color: #fff;
      text-align: center;
      background: #ed5345;
      background: -webkit-linear-gradient(left, #ef602e , #ef402e);
      background: -o-linear-gradient(right, #ef602e , #ef402e);
      background: -moz-linear-gradient(right, #ef602e , #ef402e);
      background: linear-gradient(to right, #ef602e , #ef402e);
      -webkit-border-radius: .1rem;
      -moz-border-radius: .1rem;
      border-radius: .1rem;
      box-shadow: 0 0 0.1rem rgba(239,96,46,.3);
      >a{
        color: #fff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
    dl{
      display: flex;
      position: absolute;
      left: 0.9rem;
      right: 1.7rem;
      top: 0.15rem;
      dt{
        width: 0.8rem;
        height: 0.8rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      dd {
        flex-grow: 1;
        color: #fff;
        padding-left: .2rem;
        p:first-child{
          font-size: .3rem;
        }
        p:last-child{
          font-size: .24rem;
        }
      }
    }
  }
  .form-action-password .form-action-clear{
    right: 0;
  }
  .submit-button{
    margin: 0.3rem auto 0 auto;
    box-shadow:0px .12rem .16rem 0px rgba(219,0,0,0.24);
  }
}
</style>
