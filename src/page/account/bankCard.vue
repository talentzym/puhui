<template>
  <div class="plus-screen-view" id="bankCard-view">
    <wxheader :title="'绑定银行卡'"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="bind-bank-content-top">
          <p class="bind-bank-content-top-tip clearfix">
            <span class="bindbing-bank-log fl">
              <img src="" style="display: none;"/>
            </span>
            <span class="fl bind-bank-content-top-tip-name phlc-second-black-color" id="bank-name"></span>
          </p>
          <p class="bind-bank-sum clearfix phlc-first-black-color">
            <span class="bind-bank-spot fl"></span>
            <span class="bind-bank-spot fl"></span>
            <span class="bind-bank-spot fl"></span>
            <span class="bank-num fl" id="bank-number"></span>
          </p>
          <p class="bind-bank-bottom"></p>
        </div>
        <ul class="bing-details-list phlc-first-black-color">
          <li class="clearfix">
            <span class="fl">今日可充值</span>
            <span class="fr">
              <i id="today-recharge">0.00</i>元
            </span>
          </li>
          <li class="clearfix">
            <span class="fl">单笔限额</span>
            <span class="fr">
              <i id="eachLimit">0.00</i>元
            </span>
          </li>
        </ul>
        <div class="bind-untie phlc-red-normal" id="go-bank" v-on:click="unBind()">解绑</div>
        <router-link tag="div" to="/rechargeLimit" class="bind-quota phlc-red-normal-color">银行限额?</router-link>
        <p class="bink-bottom-answer clearfix">
          <span class="bink-bottom-answer-img fl">
            <img src="../../assets/images/phlc-binding-bank-answer.png" />
          </span>
          <span class="fl bink-bottom-answer-tip">交易资金全程由新网银行存管</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
export default{
  data () {
    return {
      data: {}
    }
  },
  components: {
    wxheader
  },
  methods: {
    unBind () {
      this.axios({
        url: this.HOST + '/web-server/v1/payment/toUnbindBank',
        method: 'post',
        params: {},
        data: {},
        timeout: 5000
      }).then((res) => {
        if (res.data.data.code === '1') {
          this.data = res.data.data
          this.$layer.dialog({
            content: '<div class="con1">你确定解绑该银行卡？</div>',
            btn: ['确定', '取消']
          }).then((res) => {
            if (res === 0) {
              this.$router.push({
                path: '/mutual/yeepay',
                query: {
                  data: this.data,
                  title: '解绑银行卡'
                }
              })
            }
          })
        } else if (res.data.data.code === '1111') {
          this.$layer.toast('用户未登录!')
        } else if (res.data.data.code === '100003') {
          this.$layer.dialog({
            content: '<div class="con1"><div class="content">\n您的账号有余额解绑请致电客服！</div><div class="content">\n 400-8989-189</div></div>',
            btn: ['拨打', '再看看']
          }).then(function (res) {
            if (res === 0) {
              window.location.href = 'tel:4008989189'
            }
          })
        } else if (res.data.data.code === '100004') {
          this.$layer.toast('用户未绑卡!')
        } else if (res.data.data.code === '100005') {
          this.$layer.dialog({
            content: '<div class="con1"><div class="content">\n您绑定的银行卡暂不支持手动解绑，请联系客服。</div><div class="content">\n 400-8989-189</div></div>',
            btn: ['拨打', '再看看']
          }).then(function (res) {
            if (res === 0) {
              window.location.href = 'tel:4008989189'
            }
          })
        }
      })
    }
  },
  mounted () {
    this.axios({
      url: this.HOST + '/web-server/bank/v1/getBankInfo',
      method: 'post',
      params: {},
      data: {},
      timeout: 5000
    }).then((res) => {
      if (res.data.data.code === '1') {
        $('.bindbing-bank-log img').show()
        $('.bindbing-bank-log img').attr('src', this.imgHost + '/' + res.data.data.logo)
        var bank = JSON.parse(res.data.data.bank)
        $('#bank-name')[0].innerHTML = bank.bankName
        var bankNum = bank.bankCard.slice(-4)
        $('#bank-number')[0].innerHTML = bankNum
        if (res.data.data.bankIsEnable !== 'false') {
          $('#today-recharge')[0].innerHTML = this.fmoney(res.data.data.paymentBank.failyLimit, 2)
          $('#eachLimit')[0].innerHTML = this.fmoney(res.data.data.paymentBank.eachLimit, 2)
          var monthRechargeAmount = res.data.data.paymentBank.monthRechargeAmount
          var monthLimit = res.data.data.paymentBank.monthLimit
          if (res.data.data.paymentBank.failyLimit === 0) {
            $('.bind-bank-bottom').addClass('phlc-red-normal')
            $('.bind-bank-bottom')[0].innerHTML = '该卡今日充值额度已用完，请更换银行卡哦~'
          } else if (monthLimit - monthRechargeAmount <= 0) {
            $('.bind-bank-bottom').addClass('phlc-red-normal')
            $('.bind-bank-bottom')[0].innerHTML = '该卡本月充值额度已用完，请更换银行卡哦~'
          } else {
            $('.bind-bank-bottom').removeClass('phlc-red-normal')
          }
        } else {
          $('.bind-bank-bottom').addClass('phlc-red-normal')
          $('.bind-bank-bottom')[0].innerHTML = '您绑定的银行卡发卡行正在维护，请解绑该卡。'
        }
      } else if (res.data.data.code === '1111') {
        this.$layer.toast('用户未登录!')
      } else if (res.data.data.code === '100002') {
        this.$layer.toast('用户未绑卡!')
      }
    })
  }
}
</script>

<style lang="less">
@import url("../../assets/style/account/bankCard.less");
</style>
