<template>
 <div id="retrievePassword-view"  class="plus-screen-view">
   <wxheader></wxheader>
   <div id="retrievePassword-content" class="plus-screen-content">
      <div class="plus-screen-scroll">
        <h1>找回密码</h1>
        <form>
          <div class="form-action">
            <input class="mui-input-clear" required="required" type="text" name="account" placeholder="请输入手机号或邮箱"
              v-model="account"
              v-validate="{required:true, regex: regex.$login_account}"
              v-bind:class="{ 'input-err-border': errors.first('account') }"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('account', $event)"></i>
            <p>{{ errors.first('account') }}</p>
          </div>
        </form>
        <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !( account ) }" @click="submit()">下一步</div>
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
      required: '请输入手机号或邮箱！',
      regex: '请输入正确的手机号或邮箱！'
    }
  }
}
Validator.localize('en', dict)
export default {
  data () {
    return {
      account: ''
    }
  },
  methods: {
    submit () {
      this.$validator.validate().then(result => {
        if (result) {
          var _this = this
          this.axios({
            url: this.HOST + '/web-server/user/v1/getMobileCode',
            method: 'POST',
            params: {},
            data: {
              mobile: this.account,
              type: '2'
            },
            timeout: 5000,
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
                path: '/resetPassword',
                query: {
                  account: this.account
                }
              })
            } else if (res.data.data.code !== '1') {
              if (res.data.data.code === '100002' || res.data.data.code === '100003') {
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
              } else if (res.data.data.code === '100005') {
                this.$layer.toast(res.data.data.msg)
              } else {
                var msg = res.data.data.code === '100001' ? '当天ip发送超限' : '请填写绑定的手机号码/邮箱账号'
                this.$layer.dialog({
                  content: msg,
                  time: 2,
                  skin: 'msg'
                })
              }
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
#retrievePassword-content{
  >.plus-screen-scroll{
    padding-top: 0.4rem;
  }
  h1{
    color: #222;
    font-size: 0.48rem;
  }
}
</style>
