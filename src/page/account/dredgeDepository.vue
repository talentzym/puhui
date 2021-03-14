<template>
  <div id="dredgeDepository-view" class="plus-screen-view">
    <wxheader :title="'实名认证'"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <form>
          <div class="form-action" id="bank-name">
            <input type="text" required="required" name="name" v-model="name" placeholder="请输入您的姓名"
              v-bind:class="{ 'input-err-border': errors.first('name') }"
              v-validate="{required: true, regex: regex.name}">
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('name', $event)"></i>
            <p>{{ errors.first('name') }}</p>
          </div>
          <div class="form-action" id="bank-id-number">
            <input type="text" required="required" v-model="idNumber" name="idNumber" placeholder="请输入您的身份证号"
              v-bind:class="{ 'input-err-border': idNumberStatus === false }"
              v-on:input="onInput"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('idNumber', $event)"></i>
            <p class="idNumber-err"></p>
          </div>
        </form>
        <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': errors.first('name') || !name || !idNumberStatus }" v-on:click="submit()">下一步</div>
        <p class="margin">您提交的信息仅限使用普惠理财产品相关服务</p>
        <p>交易资金全程由新网银行存管</p>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
import { Validator } from 'vee-validate'
import '@/assets/js/validator.js'
import { Indicator } from 'mint-ui'
const dict = {
  custom: {
    name: {
      required: '请输入您的姓名！',
      regex: '请输入正确的姓名！'
    }
  }
}
Validator.localize('en', dict)
export default{
  data () {
    return {
      name: '',
      idNumber: '',
      idNumberStatus: null
    }
  },
  components: {
    wxheader
  },
  methods: {
    onInput () {
      this.idNumberStatus = this.identityCardRegx(this.idNumber)
      if (this.idNumberStatus) {
        $('.idNumber-err').text('')
      } else {
        $('.idNumber-err').text(this.idNumber ? '请输入正确的身份证号！' : '请输入身份证号！')
      }
    },
    submit () {
      var _this = this
      this.$validator.validate().then(result => {
        this.onInput()
        if (result && this.idNumberStatus) {
          this.axios({
            url: this.HOST + '/web-server/registerRequest/v1/register',
            method: 'POST',
            params: {},
            data: {
              realName: this.name,
              cardNo: this.idNumber
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
              Indicator.close(0)
              $('.submit-button').text('提交').removeClass('background-color-ff9a9a')
              console.log(data)
              return JSON.parse(data)
            }]
          }).then((res) => {
            if (res.data.data.code === '1') {
              this.$router.push({
                path: '/mutual/yeepay',
                query: {
                  data: res.data.data,
                  title: '实名认证'
                }
              })
            } else if (res.data.data.code === '100002') {
              this.$layer.toast('该用户已认证！')
            } else if (res.data.data.code === '100006') {
              this.imgUrl = require('../../assets/images/risk-icon.png')
              this.$layer.dialog({
                content: '<div class="phlc-layer">' +
                  '<img src="' + this.imgUrl + '" style="width:1.62rem;margin:0 auto;"/>' +
                  '<div class="phlc-vCode-mask-center" style="line-height:0.8rem;text-align:center;">您暂未完成风险测评</div>' +
                  '</div>',
                contentClass: 'layer-class',
                btn: ['再看看', '立即测评']
              }).then((res) => {
                if (res === 1) {
                  this.$router.push({
                    path: '/riskAssessment'
                  })
                }
              })
            } else {
              this.$layer.toast(res.data.data.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
#dredgeDepository-view{
  .plus-screen-scroll{
    padding-top: 0.4rem;
    >p{
      font-size: 0.24rem;
      color: #8F8F94;
      text-align: center;
      line-height: 0.45rem;
      &.margin{
        margin-top: 0.3rem;
      }
    }
  }
}
.layui-m-layer0 .layui-m-layerchild{
  width: 6rem;
}
.layui-m-layerbtn{
  background: #fff;
}
.layui-m-layerbtn span:last-child{
  color: #E6382C;
}
</style>
