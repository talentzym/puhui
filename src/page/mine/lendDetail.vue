<template>
  <div id="lendDetail-view" class="plus-screen-view">
    <wxheader :title="'项目出借详情'" :isService="true" :isToggle="true"></wxheader>
    <div class="lending-record-content plus-screen-content">
      <div class="withdraw-available-cont phlc-record-normal">
        <swiper :options="navOption" ref="navSwiper">
          <swiper-slide class="success-transfer-bg" v-show="$route.query.type === '5'">
            <h3>{{ data.paymentDetail ? fmoney(data.paymentDetail.transferAmount, 2) : '0.00' }}</h3>
            <p>转让总额(元)</p>
            <p class="no-text">{{ data.paymentDetail ? new Date(data.paymentDetail.transferDate).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.') : '' }}已转让</p>
          </swiper-slide>
          <swiper-slide v-for="(item, $index) in data.paymentDetail.paymentList" v-bind:key="item.id" v-bind:class="{'success-bg': item.realPaydate}">
            <h3>{{ fmoney(item.repayRent) }}</h3>
            <p>预期还款总额(元)</p>
            <div v-if="!data.transferInfoMap">
              <div>
                <p>{{ fmoney(item.repayPrincipal) }}</p>
                <p>本金(元)</p>
              </div>
              <div>
                <p>{{ fmoney(item.repayInterest) }}</p>
                <p>预期利息(元)</p>
              </div>
            </div>
            <span v-show="data.paymentDetail.paymentList.length > 1">
              <span>{{ $index }}</span>/{{ data.paymentDetail.paymentList.length }}
            </span>
            <p v-html="timeOver(item)"></p>
          </swiper-slide>
        </swiper>
      </div>
      <div class="lengding-record-detail-content mescroll" v-bind:class="{'margin70': $route.query.type === '5' && data.paymentDetail.paymentList.length === 0 }">
        <div class="wrapper">
          <div v-show="$route.query.type === '5'">
            <section>
              <h3>转让及回报信息</h3>
              <p>公允价值(元)：<span>{{ data.transferInfoMap ? fmoney(data.transferInfoMap.fairValue, 2) : '0.00' }}</span></p>
              <p>转让本金(元)：<span>{{ data.transferInfoMap ? fmoney(data.transferInfoMap.transPrincipal, 2) : '0.00' }}</span></p>
              <p>当前应收利息(元)：<span>{{ data.transferInfoMap ? fmoney(data.transferInfoMap.rateAmount, 2) : '0.00' }}</span></p>
              <p>转让服务费(元)：<span>{{ data.transferInfoMap ? fmoney(data.transferInfoMap.platformFee, 2) : '0.00' }}</span></p>
              <p>到账总额(元)：<span>{{ data.transferInfoMap ? fmoney(data.transferInfoMap.actualReceive, 2) : '0.00' }}</span></p>
              <p class="down">债转协议(预计3MB)：
                <span class="downUrl" v-show="data.transferInfoMap">
                  <a :href="imgHost+data.downLoanUrl" target="_blank" v-show="data.downLoanUrl">立即预览</a>
                  <a href="javascript:void(0);" v-show="!data.downLoanUrl" v-on:click="generateFile(1)">立即生成</a>
                </span>
              </p>
            </section>
            <section>
              <h3>原项目借款信息</h3>
              <p>借款利率(%)：<span>{{ data.schemeInfoOriMap ? data.schemeInfoOriMap.quttReadyRate : 0 }}</span></p>
              <p>借款期限(天)：<span>{{ data.schemeInfoOriMap ? data.schemeInfoOriMap.loanDay : 0 }}</span></p>
              <p>还款方式：<span>{{ data.schemeInfoOriMap ? data.schemeInfoOriMap.calWay : '' }}</span></p>
              <p>第一还款源：<span>{{ data.schemeInfoOriMap ? data.schemeInfoOriMap.repaySource : '' }}</span></p>
            </section>
          </div>
          <div v-show="$route.query.type !== '5' && data.bidType === 1">
            <section>
              <h3>出借及回报信息</h3>
              <p>出借金额(元)：<span>{{ data.loanBidDetail ? fmoney(data.loanBidDetail.bidAmount, 2) : '0.00' }}</span></p>
              <p>出借时间：<span>{{ data.loanBidDetail ? new Date(data.loanBidDetail.bidTime).format('yyyy-MM-dd hh:mm:ss').replaceAll('-', '.') : '' }}</span></p>
              <p>预期回报(元)：<span>{{ data.loanBidDetail ? fmoney(data.loanBidDetail.rateAmount, 2) : '0.00' }}</span></p>
              <p>积分奖励：<span>{{ data.loanBidDetail && data.loanBidDetail.integralReward ? data.loanBidDetail.integralReward : 0 }}</span></p>
              <p>使用卡券：<span>{{ data.loanBidDetail && data.loanBidDetail.voucherName ? voucherName(data.loanBidDetail.voucherType, data.loanBidDetail.nominalValue, 1 ) : '未使用卡券' }}</span></p>
              <p>卡券回报(元)：<span>{{ data.loanBidDetail ? fmoney(data.loanBidDetail.voucherValue, 2) : '0.00' }}</span></p>
              <p class="down" v-if="data.downLoanUrl">出借协议(预计3MB)：
                <span class="downUrl" v-show="data.loanBidDetail">
                  <a :href="imgHost+data.downLoanUrl" target="_blank" v-show="data.downLoanUrl">立即预览</a>
                  <a href="javascript:void(0);" v-show="!data.downLoanUrl" v-on:click="generateFile()">立即生成</a>
                </span>
              </p>
            </section>
            <section>
              <h3>出借项目信息</h3>
              <p>借款总额(元)：<span>{{ data.schemeInfo ? fmoney(data.schemeInfo.quttFinancingValue, 2) : '0.00' }}</span></p>
              <p>借款利率(%)：<span>{{ data.schemeInfo ? data.schemeInfo.quttReadyRate : 0 }}</span></p>
              <p>借款期限(天)：<span>{{ data.schemeInfo ? data.schemeInfo.loanDay : 0 }}</span></p>
              <p>还款方式：<span>{{ data.schemeInfo ? data.schemeInfo.calWay : '' }}</span></p>
              <p>第一还款源：<span>{{ data.schemeInfo ? data.schemeInfo.repaySource : '' }}</span></p>
            </section>
          </div>
          <div v-show="$route.query.type !== '5' && data.bidType === 2">
            <section>
              <h3>购买及回报信息</h3>
              <p>购买金额(元)：<span>{{ data.loanBidDetail ? fmoney(data.loanBidDetail ? data.loanBidDetail.bidAmount : 0, 2) : '0.00' }}</span></p>
              <p>购买时间：<span>{{ data.loanBidDetail ? new Date(data.loanBidDetail.bidTime).format('yyyy-MM-dd hh:mm:ss').replaceAll('-', '.') : '' }}</span></p>
              <p>预期回报(元)：<span>{{ data.loanBidDetail ? fmoney(data.loanBidDetail.rateAmount, 2) : '0.00' }}</span></p>
              <p class="down">转让协议(预计3MB)：
                <span class="downUrl" v-show="data.loanBidDetail">
                  <a :href="imgHost+data.downTranUrl" target="_blank" v-show="data.downTranUrl">立即预览</a>
                  <a href="javascript:void(0);" v-show="!data.downTranUrl" v-on:click="generateFile()">立即生成</a>
                </span>
              </p>
            </section>
            <section>
              <h3>债转项目信息</h3>
              <p>转让金额(元)：<span>{{ data.loanBidTransferMap ? fmoney(data.loanBidTransferMap.transferAmount, 2) : '0.00' }}</span></p>
              <p>转让利率(%)：<span>{{ data.loanBidTransferMap ? data.loanBidTransferMap.transferRate : 0 }}</span></p>
              <p>剩余期限(天)：<span>{{ data.loanBidTransferMap ? data.loanBidTransferMap.remainDate : 0 }}</span></p>
              <p>债权本金(元)：<span>{{ data.loanBidTransferMap ? fmoney(data.loanBidTransferMap.transferPrincipal, 2) : '0.00'  }}</span></p>
              <p>支付转让人回报(元)：<span>{{ data.loanBidTransferMap ? fmoney(data.loanBidTransferMap.receiveInterest, 2) : '0.00' }}</span></p>
              <p>折让率(%)：<span>{{ data.loanBidTransferMap ? data.loanBidTransferMap.discount : 0 }}</span></p>
              <p>额外受让回报(元)：<span>{{ data.loanBidTransferMap ? fmoney(data.loanBidTransferMap.otherAmount, 2) : '0.00' }}</span></p>
              <p>转让人：<span>{{ data.loanBidTransferMap ? data.loanBidTransferMap.transferUser : '***' }}</span></p>
            </section>
            <section>
              <h3>原项目借款信息</h3>
              <p>借款利率(%)：<span>{{ data.schemeInfoOriMap ? data.schemeInfoOriMap.quttReadyRate : 0}} </span></p>
              <p>借款期限(天)：<span>{{ data.schemeInfoOriMap ? data.schemeInfoOriMap.loanDay : 0 }}</span></p>
              <p>还款方式：<span>{{ data.schemeInfoOriMap ? data.schemeInfoOriMap.calWay : '' }}</span></p>
              <p>第一还款源：<span>{{ data.schemeInfoOriMap ? data.schemeInfoOriMap.repaySource : '' }}</span></p>
            </section>
          </div>
          <div class="button-box">
            <router-link tag="div" :to="{ path: '/projectDetail', query:{id: $route.query.proId}}" class="phlc-white-color phlc-red-normal phlc-cursor-pointer detail-last">项目详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'mescroll.js/mescroll.min.css'
import wxheader from '@/components/header'
import { Indicator } from 'mint-ui'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
  data () {
    return {
      data: {
        paymentDetail: {
          paymentList: []
        },
        transferInfoMap: {}
      },
      navOption: {
        slidesPerView: 1.1,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        centeredSlides: true,
        spaceBetween: 20
      }
    }
  },
  components: {
    wxheader,
    swiper,
    swiperSlide
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/account/v1/getLoanDetail',
        method: 'GET',
        params: {
          loanId: this.$route.query.id
        },
        data: {},
        timeout: this.axiosTimeout,
        transformRequest: [function (data, headers) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          return _this.$qs.stringify(data)
        }],
        transformResponse: [function (data, headers) {
          Indicator.close()
          return JSON.parse(data)
        }]
      }).then((res) => {
        if (res.data.data.code === 1) {
          this.data = res.data.data
        }
      })
    },
    timeOver (obj) {
      if (obj.repayStatus === 3) {
        return '<p class="' + (this.daysBetween(new Date(obj.repayPaydate), new Date(obj.realPaydate)) >= 0 ? 'no-text' : 'error-text') + '">' + new Date(obj.repayPaydate).format('yyyy-MM-dd').replaceAll('-', '.') + '&nbsp;还款(' + this.bidTimediff(obj.repayPaydate, obj.realPaydate) + ')</p>'
      } else {
        return '<p class="' + (this.daysBetween(new Date(obj.repayPaydate), new Date()) >= 0 ? 'success-text' : 'error-text') + '">' + new Date(obj.repayPaydate).format('yyyy-MM-dd').replaceAll('-', '.') + '&nbsp;还款(' + this.bidTimediff(obj.repayPaydate, obj.realPaydate) + ')</p>'
      }
    },
    bidTimediff (payDate, realDate) {
      var leadTime = 0
      if (realDate) {
        leadTime = this.daysBetween(new Date(payDate), new Date(realDate))
        if (leadTime > 0) {
          return '提前' + Math.abs(leadTime) + '天还款'
        } else if (leadTime < 0) {
          return '逾期' + Math.abs(leadTime) + '天还款'
        } else {
          return '按时还款'
        }
      } else {
        leadTime = this.daysBetween(new Date(payDate), new Date())
        if (leadTime > 0) {
          return '剩余' + Math.abs(leadTime) + '天'
        } else if (leadTime < 0) {
          return '正在跟进还款，请稍等'
        } else {
          return '24点前到账'
        }
      }
    },
    voucherName (voucherType, nominalValue, type) {
      if (type === 1) {
        return (voucherType === 2 ? nominalValue + '‰' : nominalValue + '元') + this.voucher(voucherType)
      } else {
        return (voucherType === 3 || voucherType === 1 ? '¥' : '') + '<b>' + (voucherType === 2 ? nominalValue + '‰' : nominalValue) + '</b>' + this.voucher(voucherType)
      }
    },
    voucher (code) {
      if (code === 1) {
        return '体验金'
      } else if (code === 2) {
        return '加息券'
      } else if (code === 3) {
        return '返现券'
      } else {
        return ''
      }
    },
    generateFile (flag) {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/account/v1/downloadContract',
        method: 'post',
        transformRequest: [function (data, headers) {
          Indicator.open({
            text: '生成中...',
            spinnerType: 'fading-circle'
          })
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: {
          bidId: this.$route.query.id,
          flag: flag === 1 ? 'lend' : 'buy'
        },
        timeout: this.axiosTimeout,
        transformResponse: [function (data, headers) {
          Indicator.close()
          return JSON.parse(data)
        }]
      }).then((res) => {
        if (res.data.data.code === '1') {
          this.$_init()
          window.open(this.imgHost + res.data.data.downLoanUrl, '_blank')
        } else {
          this.$layer.toast('生成失败,请联系客服!')
        }
      }).catch((err) => {
        if (err) {
          this.$layer.toast('生成失败,请联系客服!')
        }
      })
    }
  }
}
</script>

<style lang="less">
#lendDetail-view{
  header{
    background: linear-gradient(90deg, #e6382c, #f1512b);
  }
  .displayno{
    display: none;
  }
  .lending-record-content {
    flex-grow: 1;
    padding: 0;
    margin-top: -0.01rem;
    display: flex;
    flex-direction: column;
  }
  .withdraw-available-cont {
    height: 2.4rem;
  }
  .lengding-record-detail-content {
    padding: 0 0.4rem;
    margin-top: 1.95rem;
    overflow: auto;
    flex-grow: 1;
    box-sizing: border-box;
  }
  .lengding-record-detail-content section {
    margin-top: 0.8rem;
  }
  .lengding-record-detail-content section h3 {
    font-size: 0.32rem;
    height: 0.3rem;
    padding-left: 0.22rem;
    border-left: 0.07rem solid #E6382C;
  }
  .lengding-record-detail-content section p {
    margin-top: 0.4rem;
    font-size: 0.28rem;
  }
  .lengding-record-detail-content section p:after {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
  }
  .lengding-record-detail-content section p span {
    float: right;
    font-size: 0.3rem;
    color: #444;
  }
  .swiper-container {
    padding:0.3rem 0.1rem;
  }
  .swiper-slide {
    background: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0.08rem 0.29rem 0 rgba( 102, 102, 102, 0.19 );
    padding: 0.4rem;
    position: relative;
    box-sizing: border-box;
  }
  .swiper-slide h3 {
    font-size: 0.64rem;
  }
  .swiper-slide>p:nth-child(2) {
    margin-top: 0.1rem;
    font-size: .2rem;
  }
  .swiper-slide>div {
    display: flex;
    margin-top: 0.4rem;
  }
  .swiper-slide div div:first-child {
    width: 3rem;
  }
  .swiper-slide div div p:first-child {
    font-size: 0.3rem;
    color: #444;
  }
  .swiper-slide div div p:last-child {
    margin-top: 0.05rem;
    font-size: .2rem;
  }
  .swiper-slide>p:last-child {
    font-size: 0.26rem;
    margin-top: 0.4rem;
  }
  .swiper-slide>span {
    position: absolute;
    bottom: 0.3rem;
    right: 0.4rem;
    color: #888;
    font-size: 0.26rem;
  }
  .swiper-slide>span>span {
    font-size: 0.36rem;
    color: #444;
    position: relative;
  }
  .success-text {
    color: #72ba59;
  }
  .error-text {
    color: #ff3325;
  }
  .no-text{
    color: #363636;
  }
  .success-bg {
    background: url(../../assets/images/lending-record-success.png) no-repeat 4rem -.7rem;
    background-color: #fff;
    background-size: 3rem;
  }
  .success-transfer-bg {
    background: url(../../assets/images/lending-record-transfer-success.png) no-repeat 4rem -.7rem;
    background-color: #fff;
    background-size: 3rem;
  }
  .phlc-record-normal{
    background:linear-gradient(90deg,rgba(230,56,44,1),rgba(241,81,43,1));
  }
  .downUrl{
    color: #007aff!important;
  }
  .button-box{
    display: flex;
    margin: 0.6rem 0rem 1rem 0rem;
  }
  .margin70{
    margin-top: 0.7rem;
  }
  .button-box div{
    height: .9rem;
    border-radius: .45rem;
    -webkit-border-radius: .45rem;
    -moz-border-radius: .45rem;
    font-size: .36rem;
    text-align: center;
    line-height: .9rem;
  }
  .button-box .detail-first{
    width: 3rem;
    margin-right: 0.7rem;
  }
  .button-box .detail-last{
    flex-grow: 1;
  }
}
</style>
