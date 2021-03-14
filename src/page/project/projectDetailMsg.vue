<template>
  <div id="project-detail-msg-view" class="plus-screen-view">
    <wxheader :title=" data.proName ? data.proName.split('：')[0] : ''" :label="data.proName ? data.proName.split('：')[1] : ''"></wxheader>
    <nav class="swiper-container header-box-shadow" id="detail-nav">
      <swiper :options="navOptions" class="swiper-container" ref="navSwiper" id="detail-nav-swiper">
        <swiper-slide class="swiper-slide phlc-swiper-active" data-index="0">项目详情</swiper-slide>
        <swiper-slide class="swiper-slide" data-index="1">相关文件</swiper-slide>
        <swiper-slide class="swiper-slide" data-index="2">风控信息</swiper-slide>
        <swiper-slide class="swiper-slide" data-index="3">还款计划</swiper-slide>
        <swiper-slide class="swiper-slide" data-index="4">出借记录</swiper-slide>
        <swiper-slide class="swiper-slide" data-index="5">出借奖励</swiper-slide>
      </swiper>
    </nav>
    <div id="detail-content">
      <swiper :options="contentOptions" ref="contentSwiper" class="height100 swiper-container" id="detail-content-swiper">
        <swiper-slide class="mescroll">
          <div class="msg-detail">
            <img src="../../assets/images/request-no-data.png" alt="" class="restrict-img"/>
            <p class="restrict-text">仅限出借该标的用户可见哦~</p>
          </div>
        </swiper-slide>
        <swiper-slide class="mescroll">
          <div class="msg-file" data-pswp-uid="1">
            <img src="../../assets/images/request-no-data.png" alt="" class="restrict-img" v-show="!right"/>
            <p class="restrict-text" v-show="!right">仅限出借该标的用户可见哦~</p>
            <div  v-for="item in fileData" v-bind:key="item.name" v-if="item.items.length">
              <h3 v-show="right">{{ item.name }}</h3>
              <div v-show="right">
                <img :src="cont.src" v-for="cont in item.items" v-bind:key="cont.name" preview="repairDetail" :preview-text="cont.name"/>
                <p>1/{{ item.items.length }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="mescroll">
          <div class="msg-risk">
            <img src="../../assets/images/request-no-data.png" alt="" class="restrict-img"/>
            <p class="restrict-text">仅限出借该标的用户可见哦~</p>
          </div>
        </swiper-slide>
        <swiper-slide class="mescroll">
          <div class="msg-repay">
            <img src="../../assets/images/request-convert.png" alt="" class="restrict-img"/>
            <p class="restrict-text">快去出借哦，</p>
            <p class="restrict-text">满标放款后可查看还款计划</p>
          </div>
        </swiper-slide>
        <swiper-slide class="mescroll">
          <div class="msg-record">
            <img src="../../assets/images/request-project.png" alt="" class="restrict-img"/>
            <p class="restrict-text">据说第一位出借者最惠生活,</p>
            <p class="restrict-text">毕竟爱理财惠生活 !</p>
          </div>
        </swiper-slide>
        <swiper-slide class="mescroll">
          <div class="msg-award">
            <div v-show="!data.addCard && !data.getCard && data.status === 3">
              <img src="../../assets/images/request-award.png" alt="" class="restrict-img"/>
              <p class="restrict-text">据说第一个使用者最会理财,</p>
              <p class="restrict-text">额外收益不宜错过 !</p>
            </div>
            <div v-show="data.status > 3 && data.lastInvestorFlag && data.lastInvestor">
              <img src="../../assets/images/project-detail-record-msg-feng.png" alt="" class="restrict-img restrict-img-two"/>
              <p class="restrict-text">恭喜{{ data.lastInvestor ? data.lastInvestor.slice(0, 3) : '' }}***</p>
              <p class="restrict-text">获得本标的“封标大利”奖</p>
              <p class="restrict-text"><span>10元返现券</span>(满1000元可用)</p>
            </div>
            <div v-show="data.addCard || data.getCard">
              <img src="../../assets/images/project-detail-record-msg.jpg" alt="" class="restrict-img restrict-img-two"/>
              <p class="restrict-text"><span>{{ data.addCard }}</span>位用户使用<span>{{ data.addCardUser }}</span>张加息券</p>
              <p class="restrict-text"><span>{{ data.getCard }}</span>位用户使用<span>{{ data.getCardUser }}</span>张返现券</p>
              <p class="restrict-text">预期累计额外回报<span>{{ fmoney(data.allMoney, 2) }}</span>元</p>
            </div>
            <div v-show="!data.addCard && !data.getCard && data.status !== 3">
              <img src="../../assets/images/request-voucher.png" alt="" class="restrict-img"/>
              <p class="restrict-text">我们出借的共同口号</p>
              <p class="restrict-text">“有钱任性，从不使用卡券”</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import $ from 'jquery'
import { Indicator } from 'mint-ui'
import 'mescroll.js/mescroll.min.css'
export default{
  data () {
    const _this = this
    return {
      navOptions: {
        initialSlide: this.$route.query.index ? this.$route.query.index : 0,
        slidesPerView: 4.5,
        resistanceRatio: 0,
        slidesPerGroup: 1,
        on: {
          click (event) {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.$refs.contentSwiper.swiper.slideTo(Math.floor($(event.target).attr('data-index')))
          }
        }
      },
      contentOptions: {
        slidesPerView: 1,
        initialSlide: this.$route.query.index ? this.$route.query.index : 0,
        resistanceRatio: 0,
        on: {
          transitionStart () {
            _this.$refs.navSwiper.swiper.slideTo(this.activeIndex)
            $('#detail-nav-swiper .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      },
      data: {},
      fileData: [{
        name: '企业资料',
        class: 'firm',
        items: [],
        gallery: ''
      }, {
        name: '交易资料',
        class: 'deal',
        items: [],
        gallery: ''
      }, {
        name: '项目资料',
        class: 'pro',
        items: [],
        gallery: ''
      }],
      right: false
    }
  },
  components: {
    wxheader,
    swiper,
    swiperSlide
  },
  mounted () {
    this.axios({
      url: this.HOST + '/web-server/loanLoanInfo/v1/getLoanDetail',
      method: 'GET',
      params: {
        proId: this.$route.query.id
      },
      data: {},
      transformRequest: [function (data, headers) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
      }],
      transformResponse: [function (data, headers) {
        Indicator.close()
        return JSON.parse(data)
      }],
      timeout: this.axiosTimeout
    }).then((res) => {
      if (res.data.code === 1) {
        this.data = res.data.data
        if (this.data.status > 3) {
          if (this.data.loginStatus === 2) {
            this.loadData()
            this.right = true
          } else {
            this.right = false
          }
        } else {
          this.loadData()
          this.right = true
        }
        /* 还款计划渲染 */
        var repayStr = ''
        if (this.data.status >= 5) {
          for (let i = 0; i < this.data.repays.length; i++) {
            repayStr += '<div class="repay-section">' +
              '<p>第一期&nbsp;&nbsp;' + new Date(this.data.repays[i].repayPaydate).format('yyyy-MM-dd').replaceAll('-', '.') + '还款</p>' +
              '<p>应还本息(元)</p>' +
              '<p>' + this.fmoney(this.data.repays[i].repayRent, 2) + '</p>' +
              '<p>本金&nbsp;' + this.fmoney(this.data.repays[i].repayPrincipal, 2) + '&nbsp;&nbsp;&nbsp;&nbsp;利息&nbsp;' + this.fmoney(this.data.repays[i].repayInterest, 2) + '</p>' +
              '</div>'
          }
          $('.msg-repay').html(repayStr)
        }
        /* 出借记录渲染 */
        if (this.data.bids.length) {
          var recordStr = '<table><tr><td>出借人</td><td>出借金额(元)</td><td>卡券</td><td>出借时间</td></tr>'
          for (var i = 0; i < this.data.bids.length; i++) {
            recordStr += '<tr>' +
              '<td>' + this.data.bids[i].userName.slice(0, 3) + '***</td>' +
              '<td>' + this.fmoney(this.data.bids[i].bidAmount, 2) + '</td>' +
              '<td class="' + (this.data.bids[i].voucherId ? 'phlc-red-normal-color' : '') + '">' + (this.data.bids[i].voucherId ? this.voucherName(this.data.bids[i].voucherType, this.data.bids[i].nominalValue, 1) : '未使用卡券') + '</td>' +
              '<td>' + new Date(this.data.bids[i].bidTime).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.') + '</td></tr>'
          }
          recordStr += '</table>'
          $('.msg-record').html(recordStr)
        }
      } else {
        this.$layer.toast('加载失败，请重试或联系客服！')
      }
    }).catch((err) => {
      if (err) {
        this.$layer.toast('加载失败，请重试或联系客服！')
      }
    })
  },
  methods: {
    loadData () {
      /* 项目详情渲染 */
      var detailStr = ''
      for (let i = 0; i < this.data.pros.length; i++) {
        detailStr += '<h3>0' + (i + 1) + '·' + this.data.pros[i].title + '</h3>' + this.data.pros[i].content + '<div class="solid"></div>'
      }
      $('.msg-detail').html(detailStr.replaceAll('span', 'p'))
      /* 相关文件渲染  */
      setTimeout(() => {
        for (let i = 0; i < this.data.loanFiles.length; i++) {
          for (var x = 0; x < this.fileData.length; x++) {
            if (this.fileData[x].name === this.data.loanFiles[i].flag) {
              this.fileData[x].items.push({
                src: this.imgHost.replace('web-server/', 'web-server') + this.data.loanFiles[i].sourcefilepath + this.data.loanFiles[i].realfilename,
                name: this.data.loanFiles[i].showfilename
              })
            }
          }
        }
      }, 100)
      this.$previewRefresh()
      /* 风控信息渲染 */
      var riskStr = ''
      for (let i = 0; i < this.data.risks.length; i++) {
        riskStr += '<h3>0' + (i + 1) + '·' + this.data.risks[i].title + '</h3>' + this.data.risks[i].content + '<div class="solid"></div>'
      }
      $('.msg-risk').html(riskStr.replaceAll('span', 'p'))
    },
    voucherName (voucherType, nominalValue, type) {
      if (type === 1) {
        return '<b>' + (voucherType === 2 ? nominalValue + '‰' : nominalValue + '元') + '</b>' + this.voucher(voucherType)
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
    }
  }
}
</script>

<style lang="less">
#project-detail-msg-view{
  #detail-nav {
    background: #fff;
    width: 100%;
    padding: 0 0.4rem;
    font-size: 0.3rem;
    position: absolute;
    top: 0.88rem;
    left: 0;
    box-sizing: border-box;
    height: 0.8rem;
  }
  #detail-nav .swiper-slide {
    padding: 0.2rem 0rem;
  }
  .phlc-swiper-active {
    color: #E6382C;
    position: relative;
  }
  .phlc-swiper-active:after {
    content: "";
    display: block;
    width: 0.6rem;
    height: 0.03rem;
    position: absolute;
    left: 0.3rem;
    top: 0.6rem;
  }
  #detail-content {
    width: 100%;
    position: absolute;
    left: 0;
    top: 1.72rem;
    bottom: 0;
    background: #fff;
  }
  #detail-content .restrict-text {
    text-align: center;
    font-size: 0.28rem!important;
    color: #444!important;
  }
  #detail-content .restrict-text span {
    color: #E6382C!important;
  }
  .restrict-img {
    width: 3.2rem!important;
    margin: 1.25rem auto 0.34rem auto;
  }
  .restrict-img-two {
    width: 1.1rem!important;
  }
  .repay-img {
    width: 0.8rem;
  }
  #detail-content .swiper-slide {
    height: 100%;
    overflow: auto;
    padding:0 0.4rem 0.6rem 0.4rem;
    box-sizing: border-box;
  }
  .msg-detail h3,
  .msg-risk h3 {
    margin-top: 0.7rem;
    font-size: 0.3rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .msg-detail p,
  .msg-detail span,
  .msg-risk p,
  .msg-risk span {
    font-size: 0.3rem!important;
    color: #444!important;
    line-height: 0.5rem;
    text-align: justify;
  }
  .solid {
    margin-top: 0.5rem;
    width: 100%;
    height: 1px;
    background: #f8f8f9;
  }
  .solid:last-child {
    margin-top: 0;
    height: 0;
  }
  table {
    width: 100%;
    border: 1px solid #F8F8F9;
    margin-top: 0.8rem;
  }
  table tr {
    border: 1px solid #F8F8F9;
    height: 1rem;
    font-size: 0.28rem;
  }
  table tr:first-child {
    height: 0.8rem;
    background: #f8f8f9!important;
    font-size: 0.24rem;
    color: #666;
  }
  table td {
    padding-left: 0.3rem;
    color: #444;
    box-sizing: border-box;
  }
  table td:first-child {
    padding: 0 0.2rem;
    width: 1.2rem;
  }
  table td:last-child {
    width: 1.7rem;
    color: #999;
    font-size: 0.24rem;
  }
  table tr:first-child td:last-child {
    color: #666;
  }
  table td:nth-child(2) {
    width: 1.8rem;
  }
  .msg-file img {
    width: 100%;
  }
  .msg-file h3 {
    font-size: 0.3rem;
    color: #222;
    margin-top: 1rem;
  }
  .msg-file>div>div {
    margin-top: 0.4rem;
    height: 3rem;
    border-radius: 0.15rem;
    overflow: hidden;
    position: relative;
  }
  .msg-file>div>div>p {
    width: 0.75rem;
    height: 0.5rem;
    line-height: 0.5rem;
    background: rgba(3, 3, 3, 0.5);
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 100;
    text-align: center;
    color: #fff;
    font-size: 0.28rem;
    border-radius: 0.35rem 0 0 0;
  }
  .repay-section {
    padding-left: 0.66rem;
    margin-top: 1rem;
    font-size: 0.3rem;
    background: url(../../assets/images/detail-repay-img.jpg) no-repeat 0.25rem 0.01rem;
    background-size: 0.27rem;
  }
  .repay-section p span {
    color: #E6382C;
  }
  .repay-section p:first-child {
    color: #444;
    font-size: 0.31rem;
  }
  .repay-section p:nth-child(2) {
    color: #999;
    padding-top: 0.2rem;
  }
  .repay-section p:nth-child(3) {
    font-size: 0.36rem;
    color: #222;
    margin-top: 0.05rem;
  }
  .repay-section p:last-child {
    margin-top: 0.15rem;
    color: #999;
  }
  .restrict-img {
    width: 3.2rem;
    margin: 1.25rem auto 0.34rem auto;
  }
  .restrict-text {
    text-align: center;
    font-size: 0.28rem!important;
    color: #444!important;
  }
}
</style>
