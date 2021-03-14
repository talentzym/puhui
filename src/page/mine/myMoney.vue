<template>
 <div id="myMoney-view" class="plus-screen-view">
   <wxheader :title="'我的资金'"></wxheader>
   <div class="my-money-content plus-screen-content" >
     <div class="mescroll">
       <div class="plus-screen-scroll">
        <div class="account-total">
          <p class="user-name">Hi，user</p>
          <ul>
            <li>
              <p>账户总额</p>
              <div class="phlc-yxfont font-size-50 accountAmount">0.00</div>
            </li>
            <li>
              <p>可用余额</p>
              <div class="phlc-yxfont font-size-50 availableAmount">0.00</div>
            </li>
            <li>
              <p>冻结余额</p>
              <div class="phlc-yxfont freezeAmount">0.00</div>
            </li>
            <li>
              <p>可免费提现</p>
              <div class="phlc-yxfont freeWithdrawAmount">0.00</div>
            </li>
            <li>
              <p>待收本金</p>
              <div class="phlc-yxfont duePrincipalAmount">0.00</div>
            </li>
            <li>
              <p>可付费提现</p>
              <div class="phlc-yxfont notFreeWithDrawAmount">0.00</div>
            </li>
          </ul>
        </div>
        <dl>
          <dt>
            <img src="../../assets/images/received-information.png" alt="" />已收信息
          </dt>
          <dd>
            <p>已收收益</p>
            <div class="phlc-yxfont receiptAmount">0.00</div>
          <dd>
            <p>出借回报</p>
            <div class="phlc-yxfont investAmount">0.00</div>
          </dd>
          <dd>
            <p>已兑换红包</p>
            <div class="phlc-yxfont changeRedAmount">0.00</div>
          </dd>
          <dd>
            <p>卡券回报</p>
            <div class="phlc-yxfont voucherAmount">0.00</div>
          </dd>
        </dl>
        <dl>
          <dt>
            <img src="../../assets/images/information-to-be-collected.png" alt="" />待收信息
          </dt>
          <dd>
            <p>待收收益</p>
            <div class="phlc-yxfont dueAmount">0.00</div>
          <dd>
            <p>出借预期回报</p>
            <div class="phlc-yxfont dueInterestAmount">0.00</div>
          </dd>
          <dd>
            <p>未兑换红包</p>
            <div class="phlc-yxfont noChangeRedAmount">0.00</div>
          </dd>
          <dd>
            <p>卡券预期回报</p>
            <div class="phlc-yxfont dueVoucherAmount">0.00</div>
          </dd>
        </dl>
        <dl>
          <dt>
            <img src="../../assets/images/myMoney-add.png" alt="" />理财是一种态度，感恩陪伴！
          </dt>
          <dd>
            <p>累计陪伴(天)</p>
            <div class="phlc-yxfont joinDays">0</div>
          <dd>
            <p>累计充值</p>
            <div class="phlc-yxfont totalRecharge">0.00</div>
          </dd>
          <dd>
            <p>累计提现</p>
            <div class="phlc-yxfont totalWithDraw">0.00</div>
          </dd>
          <dd>
            <p>累计出借</p>
            <div class="phlc-yxfont totalInvest">0.00</div>
          </dd>
        </dl>
      </div>
     </div>
   </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import 'mescroll.js/mescroll.min.css'
import $ from 'jquery'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.getPageData()
  },
  methods: {
    getPageData () {
      this.axios({
        url: this.HOST + '/web-server/account/v1/getUserMoney',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          var data = res.data.data
          $('.user-name').text('Hi,' + data.userName)
          /* 账号 */
          $('.accountAmount').text(this.fmoney(data.accountAmount, 2))
          $('.availableAmount').text(this.fmoney(data.availableAmount, 2))
          $('.freezeAmount').text(this.fmoney(data.freezeAmount, 2))
          $('.freeWithdrawAmount').text(this.fmoney(data.freeWithdrawAmount, 2))
          $('.duePrincipalAmount').text(this.fmoney(data.duePrincipalAmount, 2))
          $('.notFreeWithDrawAmount').text(this.fmoney(data.notFreeWithDrawAmount, 2))
          /* 已收 */
          $('.receiptAmount').text(this.fmoney(data.receiptAmount, 2))
          $('.investAmount').text(this.fmoney(data.investAmount, 2))
          $('.changeRedAmount').text(this.fmoney(data.changeRedAmount, 2))
          $('.voucherAmount').text(this.fmoney(data.voucherAmount, 2))
          /* 待收 */
          $('.dueAmount').text(this.fmoney(data.dueAmount, 2))
          $('.dueInterestAmount').text(this.fmoney(data.dueInterestAmount, 2))
          $('.noChangeRedAmount').text(this.fmoney(data.noChangeRedAmount, 2))
          $('.dueVoucherAmount').text(this.fmoney(data.dueVoucherAmount, 2))
          /* 累计 */
          $('.joinDays').text(data.joinDays)
          $('.totalRecharge').text(this.fmoney(data.totalRecharge, 2))
          $('.totalWithDraw').text(this.fmoney(data.totalWithDraw, 2))
          $('.totalInvest').text(this.fmoney(data.totalInvest, 2))
          if (data.authRealName) {
            $('.deposit-status').addClass('deposit-status-yes').html('资金已存管<img src="../../img/myMoney-deposit-yes.png"/>')
          } else {
            $('.deposit-status').removeClass('deposit-status-yes').html('资金未存管<img src="../../img/myMoney-deposit-no.png"/>')
          }
        } else {
          this.$layer.toast('数据异常，请联系客服！')
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
.font-size-50{
  font-size: 0.5rem!important;
}
#myMoney-view{
  .phlc-close-header{
    background: linear-gradient(90deg,rgba(247,90,59,1),rgba(244,80,63,1))!important;
    a {
      i{
        color: #fff!important;
      }
    }
    .header-title {
      .title{
        color: #fff!important;
      }
    }
  }
  .my-money-content {
    background: #f8f8f9;
    .plus-screen-scroll{
      padding: 0;
      padding-bottom: 1rem;
      .account-total {
        width: 100%;
        background:linear-gradient(90deg,rgba(247,90,59,1),rgba(244,80,63,1));
        padding-top: 0.2rem;
        position: relative;
        .user-name {
          font-size: 0.36rem;
          color: #fff;
          line-height: 0.6rem;
          padding: 0 0.4rem;
        }
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            width: 39%;
            padding: 0.36rem 0.4rem;
            border-top: 1px solid #f76651;
            p {
              font-size: 0.24rem;
              color: #fff;
              padding: 0;
              margin: 0;
            }
            div {
              font-size: 0.36rem;
              color: #fff;
            }
          }
          li:nth-child(1){
            border-top: none;
            padding: 0.7rem 0.4rem;
          }
          li:nth-child(2) {
            border-top: none;
            padding: 0.7rem 0.4rem;
          }
          li:nth-child(3),li:nth-child(5) {
            border-right: 1px solid #f76651;
          }
        }
      }
    }
  }
  dl {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: #fff;
    margin-top: 0.2rem;
    dt {
      width: 100%;
      padding: 0.45rem 0.4rem 0.45rem 0.86rem;
      color: #444;
      font-size: 0.3rem;
      line-height: 0.4rem;
      position: relative;
      img {
        width: 0.36rem;
        position: absolute;
        left: 0.4rem;
        top: 0.45rem;
      }
    }
    dd {
      width: 39%;
      padding: 0.35rem 0.4rem;
      border-top: 1px solid #eee;
      p {
        font-size: 0.24rem;
        color: #666;
      }
      div {
        font-size: 0.36rem;
        color: #222;
      }
    }
    dd:nth-child(2),
    dd:nth-child(4) {
      border-right: 1px solid #eee;
    }
  }
  .deposit-status,.deposit-status-yes {
    color: #fff;
    background: #fbb85a;
  }
  .deposit-status{
    img {
      display: inline-block;
      width: 0.13rem;
      position: relative;
      top: 0.03rem;
      left: 0.05rem;
    }
  }
}
</style>
