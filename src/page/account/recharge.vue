<template>
  <div id="recharge-view" class="plus-screen-view">
    <wxheader :title="'充值'" :isService="true" :isToggle="true"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="width-top">
          <div class="withdraw-available-cont">
            <p class="withdraw-available-tip">可用余额(元)</p>
            <p class="withdraw-available-text phlc-yxfont">{{ data.availableAmount ? fmoney(data.availableAmount, 2) : '0.00'}}</p>
            <p class="withdraw-available-bot"></p>
          </div>
        </div>
        <div class="recharge-content">
          <div>
            <div class="withdraw-contentff">
              <div class="widthdraw-inp-box clearfix mui-input-row">
                <span class="widthdraw-Symbol fl">￥</span>
                <input type="number" placeholder="请输入充值金额" class="widthdraw-inp fl phlc-yxfont" id="top-up-money"
                  required="required"
                  name="amount"
                  v-model="amount"
                  v-on:input="onInput()"
                  v-on:blur="onBlur()"/>
                <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('amount', $event)"></i>
              </div>
              <p class="err"></p>
              <router-link tag="dl" to="/bankCard" class="bank-information" v-if="data">
                <dt>
                  <img :src="data.paymentBank ? imgHost + data.paymentBank.logoPath : ''"/>
                </dt>
                <dd>
                  <div>{{ data.bank ? data.bank.bankName + '(尾号' + data.bank.bankCard.split('').splice(-4, 4).join('') : ''}}</div>
                  <div>{{ topUpStatus() }}</div>
                </dd>
              </router-link>
            </div>
            <div class="submit-button" v-bind:class="{ 'background-color-ff9a9a': !status }" v-on:click="submit()">确认</div>
          </div>
        </div>
        <p class="clearfix phlc-text-align-center font-size-24 bottom-inportant"><img src="../../assets/images/phlc-withdraw-bottom-red.png" class="small-icon">受支付通道限制，移动端部分银行充值受限
          <span class="phlc-text-align-center display-block">建议前往Web端进行操作</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
import { Indicator } from 'mint-ui'
export default{
  data () {
    return {
      amount: '',
      status: null,
      data: {}
    }
  },
  components: {
    wxheader
  },
  methods: {
    onInput () {
      if (!(this.amount[0] - 0)) {
        this.amount = ''
        return
      }
      this.amount = this.amount.replace(/[^\d.]/g, '')
      if (this.amount.indexOf('.') !== -1 && this.amount.split('.')[1].length > 2) {
        var arr = this.amount.split('')
        arr.pop()
        this.amount = arr.join('')
      }
      this.amount = Number(this.amount) > 100000000 ? 100000000 : this.amount
      if (this.amount < 500 || this.amount > this.data.paymentBank.maxLimit || !this.amount || this.amount > this.data.paymentBank.failyLimit || !this.data.paymentBank.monthLimit || !this.data.paymentBank.failyLimit || this.data.bankIsEnable !== 'true') {
        this.status = false
      } else {
        this.status = true
      }
    },
    onBlur () {
      if (this.data.bankIsEnable !== 'true') {
        $('.err').text('发卡行正在维护，目前不能充值，请解绑该卡!')
      } else if (!this.data.paymentBank.maxLimit) {
        if (this.data.paymentBank.monthLimit) {
          $('.err').text('您绑定的银行卡今日充值额度已用完，请更换银行卡!')
        } else {
          $('.err').text('您绑定的银行卡本月充值额度已用完，请更换银行卡!')
        }
      } else if (!this.amount) {
        $('.err').text('请输入充值金额')
      } else if (this.amount < 500) {
        $('.err').text('充值限额最低500元')
      } else if (this.amount > this.data.paymentBank.failyLimit) {
        $('.err').text('今日剩余可充金额不足，请重新输入')
      } else if (this.amount > this.data.paymentBank.maxLimit) {
        $('.err').text('单笔金额超限，请重新输入！')
      }
    },
    topUpStatus () {
      if (this.data.bankIsEnable === 'true') {
        if (this.data.paymentBank.maxLimit) {
          return '单笔限额' + this.fmoney(this.data.paymentBank.eachLimit, 2) + '元；今日可充值' + this.fmoney(this.data.paymentBank.failyLimit, 2) + '元'
        } else {
          $('.top-up-submit').text('去换卡').removeClass('phlc-red-disbled')
          return '您绑定的银行卡今日充值额度已用完，请更换银行卡!'
        }
      } else {
        $('.top-up-submit').text('去换卡').removeClass('phlc-red-disbled')
        return '发卡行正在维护，目前不能充值，请解绑该卡!'
      }
    },
    submit () {
      var _this = this
      if ($('.top-up-submit').text() === '去换卡') {
        this.$router.push({
          path: '/bankCard'
        })
        return
      }
      if (this.status) {
        this.axios({
          url: this.HOST + '/web-server/rechargeRequest/v1/recharge',
          method: 'POST',
          params: {},
          data: {
            amount: this.amount,
            rechargeWay: 'SWIFT',
            appModel: 'app'
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
            return JSON.parse(data)
          }]
        }).then((res) => {
          if (res.data.data.code === 1) {
            this.$router.push({
              path: '/mutual/yeepay',
              query: {
                data: res.data.data,
                title: '充值'
              }
            })
          } else {
            this.$layer.toast(res.data.data.msg)
          }
        })
      }
    }
  },
  mounted () {
    this.axios({
      url: this.HOST + '/web-server/recharge/v1/getRechargeBank',
      method: 'POST',
      timeout: this.ajaxTimeOut,
      params: {},
      data: {}
    }).then((res) => {
      if (res.data.data.code === '1') {
        this.data = res.data.data
      }
    })
  }
}
</script>

<style lang="less">
@import url("../../assets/style/account/recharge&withdraw.less");
#recharge-view{
  header{
    color: #fff;
  }
  .plus-screen-content{
    top: 0;
    .plus-screen-scroll{
      padding: 0;
    }
  }
  .small-icon{
    width: .2rem;
    height: .26rem;
    display: inline-block;
    position: relative;
    top: 0.03rem;
    right: 0.05rem;
  }
  .recharge-content{
    width: 100%;
    position: absolute;
    left: 0;
    top: 2.8rem;
    bottom: 0;
    overflow: auto;
    >div{
      height: 100%;
      position: relative;
    }
  }
  .bottom-inportant{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: .64rem;
    text-align: center;
    font-size: .24rem;
    color: #8f8f94;
  }
  .withdraw-contentff{
    position: relative;
    box-sizing: border-box;
  }
  .bank-information{
    display: flex;
    font-size: 0.24rem;
    margin-top: 0.6rem;
    background: url(../../assets/images/phlc-icon-right.png) no-repeat right 0.24rem;
    background-size: 0.16rem;
    border-bottom: #eee;
    dt{
      width: 0.6rem;
      img{
        width: 100%;
        margin-top: 0.09rem;
      }
    }
    dd{
      flex-grow: 1;
      padding-left: 0.22rem;
      div:first-child{
        color: #222;
        font-size: 0.3rem;
      }
      div:last-child{
        color: #888;
      }
    }
  }
  .err{
    position: absolute;
    top: 1.4rem;
    font-size: 0.24rem;
    left: 0.4rem;
    color: #E6382C;
  }
  .err-border{
    border-bottom: 1px solid #E6382C;
  }
}
</style>
