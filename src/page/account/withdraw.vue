<template>
  <div id="withdraw-view" class="plus-screen-view">
    <wxheader :title="'提现'" :isService="true" :isToggle="true"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="width-top">
          <div class="withdraw-available-cont">
            <p class="withdraw-available-tip">可用余额(元)</p>
            <p class="withdraw-available-text phlc-yxfont">{{ data.data && data.data.availableAmount ? fmoney(data.data.availableAmount, 2) : '0.00'}}</p>
            <p class="withdraw-available-bot"></p>
          </div>
        </div>
        <div class="withdraw-contentff">
          <p class="widthdraw-inp-box clearfix mui-input-row">
            <span class="widthdraw-Symbol fl">￥</span>
            <input type="number" placeholder="请输入提现金额" v-model="amount" class="widthdraw-inp fl mui-input-clear phlc-first-black-color" v-on:input="getNumber(amount)" maxlength="10" />
          </p>
          <div class="box-withdraw">
            <p class="withdraw-contentff-cost clearfix">
              <span class="fl withdraw-contentff-cost-tip1 phlc-fourth-black-color">手续费
                <i class="service-charge">0</i>；实际到账金额
                <i class="withdraw-confirmed1">0</i>。
              </span>
              <span class="fl withdraw-contentff-cost-help" v-on:click="windowFlag = true; $mask.show()">
                <img src="../../assets/images/phlc-widthbangzhu.png"/>
              </span>
            </p>
            <p class="withErrortip phlc-red-normal-color" style="display: none;">单笔金额超限，请重新输入！</p>
          </div>
          <div class="submit-button" id="widthdraw-confirm" v-bind:class="{ 'background-color-ff9a9a': !amount }" v-on:click="submit()">确认</div>
          <p class="widthdraw-bottom-time clearfix">
            <span class="widthdraw-bottom-time-img fl">
              <img src="../../assets/images/phlc-withdraw-bottom.png" />
            </span>
            <span class="fl widthdraw-bottom-time-tip">现在发起提现，预计到账时间
              <i class="withdraw-time">下一工作日24点之前</i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="help-window" v-show="windowFlag">
      <div class="help-window-content">
                    为防止利用平台恶意转账，充值未出借的资金在承担平台充值手续费后可提现，
                    提现手续费比例为充值未出借资金的0.5%，手续费不满5元的按5元收取。
      </div>
      <div class="help-window-btn" v-on:click="windowFlag = false; $mask.hide()">知道了</div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
export default{
  data () {
    return {
      data: {},
      amount: '',
      fee: 0,
      windowFlag: false
    }
  },
  components: {
    wxheader
  },
  methods: {
    getNumber (amount) {
      this.amount = amount > this.data.data.availableAmount ? this.data.data.availableAmount : amount
      amount = this.amount
      amount = amount.replace(/[^\d.]/g, '')
      amount = amount.replace(/^\./g, '')
      amount = amount.replace(/\.{2,}/g, '.')
      amount = amount.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      amount = amount.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      if (amount.indexOf('.') < 0 && amount) {
        amount = parseFloat(amount)
      }
      this.amount = amount
      if (!amount) {
        $('.widthdraw-inp-cha').hide()
        $('.withErrortip').hide()
        $('.withdraw-contentff-cost').hide()
        return
      }
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/withdraw/v1/getWithdrawFee',
        method: 'POST',
        timeout: this.ajaxTimeOut,
        params: {},
        data: {
          amount: amount
        },
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        if (res.data.data.code === '1111') {
          this.$router.push({
            path: '/login'
          })
        } else if (res.data.data.code === '100001') {
          $('.withdraw-contentff-cost').hide()
          $('.withErrortip').show()
        } else if (res.data.data.code === '100004') {
          $('.withErrortip').text('每天只能免费提现一次!').show()
        } else if (res.data.data.code === '100005') {
          this.$layer.toast('付费提现超限，请重新输入!')
        } else if (res.data.data.code === '1') {
          this.fee = res.data.data.fee
          if (!this.fee) {
            $('.withdraw-contentff-cost, .withErrortip').hide()
          } else {
            $('.withErrortip').hide()
            $('.withdraw-contentff-cost').show()
            $('.service-charge').text(this.fmoney(this.fee, 2))
            var numConfirm = this.numSub(amount, this.fee)
            $('.withdraw-confirmed1').text(numConfirm < 0 ? 0 : this.fmoney(numConfirm, 2))
          }
        }
      })
    },
    submit () {
      var _this = this
      var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
      if (this.amount) {
        if (reg.test(this.amount)) {
          this.axios({
            url: this.HOST + '/web-server/withdrawRequest/v1/withdrawHandle',
            method: 'POST',
            timeout: this.ajaxTimeOut,
            params: {},
            data: {
              amount: this.amount,
              appModel: 'app'
            },
            transformRequest: [function (data, headers) {
              return _this.$qs.stringify(data)
            }],
            transformResponse: [function (data, headers) {
              return JSON.parse(data)
            }]
          }).then((res) => {
            if (res.data.code === 0) {
              this.$layer.toast('提现异常,请重试!')
            }
            if (res.data.data.code === '1') {
              this.$router.push({
                path: '/mutual/yeepay',
                query: {
                  data: res.data.data,
                  title: '提现'
                }
              })
            } else if (res.data.data.code === '100001') {
              this.$layer.toast('提现金额大于可提现额度!')
            } else if (res.data.data.code === '100002') {
              this.$layer.toast('提现金额需大于100元哦~!')
            } else if (res.data.data.code === '100003') {
              this.$layer.toast('提现金额需要大于服务费!')
            } else if (res.data.data.code === '100004') {
              $('.withErrortip').css('display', 'block')
              $('.withErrortip').text('每天只能免费提现一次!')
            } else if (res.data.data.code === '100005') {
              this.$layer.toast('付费提现超限，请重新输入!')
            } else if (res.data.data.code === '1111') {
              this.$layer.toast('请重新登录!')
            }
          })
        } else {
          this.$layer.toast('请输入正确的提取金额!')
        }
      } else {
        this.$layer.toast('请输入提取金额!')
      }
    }
  },
  mounted () {
    this.axios({
      url: this.HOST + '/web-server/withdraw/v1/getWithdrawInfo',
      method: 'GET',
      timeout: this.ajaxTimeOut,
      params: {},
      data: {}
    }).then((res) => {
      if (res.data.data.code === '1') {
        this.data = res.data.data
        if (this.data.data.availableAmount <= 100) {
          this.amount = this.fmoney(this.data.data.availableAmount, 2)
          $('.widthdraw-inp').attr('disabled', 'disabled')
          this.getNumber(this.amount)
          $('.widthdraw-inp-cha').removeAttr('onclick')
        }
      }
    })
  }
}
</script>

<style lang="less">
@import url("../../assets/style/account/recharge&withdraw.less");
#withdraw-view{
  header{
    color: #fff;
  }
  .plus-screen-content{
    top: 0;
    .plus-screen-scroll{
      padding: 0;
    }
  }
  .help-window{
    width: 6.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.2rem;
    background: #ffffff;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    z-index: 1000;
    .help-window-content{
      padding: 0.6rem 0.42rem;
      line-height: 0.5rem;
      box-sizing: border-box;
      position: relative;
      height: 3.24rem;
      text-align: left;
      font-size: 0.3rem;
    }
    .help-window-btn{
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      color: #E6382C;
      font-size: .36rem;
      border-top: 1px solid #D0D0D0;
    }
  }
}
</style>
