<template>
  <div id="bindBankCard-view" class="plus-screen-view">
    <wxheader :title="'绑定银行卡'"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <form>
          <div class="form-action">
            <input v-bind:disabled="true" required="required" type="text" name="account" placeholder="请输入姓名"
              v-model="name"/>
          </div>
          <div class="form-action">
            <input required="required" type="text" name="bankNo" placeholder="请输入银行卡号"
              v-model="bankNo"
              v-validate="{required: true,length: 19, regex: /^([1-9]{1})(\d{14,18})$/}"
              v-bind:class="{ 'input-err-border': errors.first('bankNo') }"
              v-on:input="bankNo = bankNo.replace(/\D/g,'')"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('bankNo', $event)"></i>
            <p>{{ errors.first('bankNo') }}</p>
          </div>
        </form>
        <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !bankNo }" v-on:click="submit()">下一步</div>
        <router-link to="/rechargeLimit" tag="p" class="unite-quota phlc-red-normal-color">银行限额?</router-link>
        <p class="unite-bottom-answer clearfix">
          <span class="unite-bottom-answer-img fl">
            <img src="../../assets/images/phlc-binding-bank-answer.png"/>
          </span>
          <span class="fl bink-bottom-answer-tip">交易资金全程由新网银行存管</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import { Validator } from 'vee-validate'
import { Indicator } from 'mint-ui'
import $ from 'jquery'
const dict = {
  custom: {
    bankNo: {
      required: () => '请输入银行卡号！',
      length: () => '请输入正确的银行卡号！',
      regex: () => '请输入正确的银行卡号！'
    }
  }
}
Validator.localize('en', dict)
export default{
  data () {
    return {
      name: '',
      bankNo: ''
    }
  },
  components: {
    wxheader
  },
  mounted () {
    this.axios({
      url: this.HOST + '/web-server/account/v1/custUserInfo',
      method: 'GET',
      params: {},
      data: {},
      timeout: 5000
    }).then((res) => {
      if (res.data.data.code === 1) {
        this.name = res.data.data.realNameInfo.realName
      }
    })
  },
  methods: {
    submit () {
      this.$validator.validate().then(result => {
        if (result) {
          var _this = this
          this.axios({
            url: this.HOST + '/web-server/v1/payment/toBindBank',
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
              bankNo: this.bankNo
            },
            timeout: 5000,
            transformResponse: [function (data, headers) {
              Indicator.close()
              $('.submit-button').text('提交').removeClass('background-color-ff9a9a')
              return JSON.parse(data)
            }]
          }).then((res) => {
            if (res.data.data.code === '1') {
              this.$router.push({
                path: '/mutual/yeepay',
                query: {
                  data: res.data.data,
                  title: '绑定银行卡'
                }
              })
            } else if (res.data.data.code === '100002') {
              this.$layer.toast('用户已绑卡！')
            } else if (res.data.data.code === '100001') {
              this.$layer.toast('验证码已失效！')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
#bindBankCard-view{
  .unite-quota{
    text-align: center;
    font-size: .3rem;
    margin-top: .4rem;
  }
  .unite-bottom-answer{
    margin: 0 auto;
    text-align: center;
    width: 3.6rem;
    font-size: .24rem;
    line-height: .2rem;
    position: absolute;
    bottom: 1.1rem;
    left:50%;
    transform: translateX(-50%);
    .unite-bottom-answer-img{
      display: inline-block;
      width: .22rem;
      height: .24rem;
      margin: 0 .12rem 0 0;
      img{
        width: .22rem;
        height: .24rem;
      }
    }
  }
  .bink-bottom-answer-tip{
    margin-top: 0.02rem;
  }
}
</style>
