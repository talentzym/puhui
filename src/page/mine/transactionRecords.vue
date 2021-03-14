<template>
  <div id="transactionRecords-view" class="plus-screen-view">
    <wxheader :title="'交易记录'" :isService="true"></wxheader>
    <nav class="phlc-card-voucher-nav phlc-first-black-color">
      <swiper class="nav" :options="navOption" ref="navSwiper">
        <swiper-slide class="phlc-swiper-active" v-for="(item, index) in data" v-bind:key="item.type" :data-index="index">{{ item.type }}
          {{ item.totals }}
        </swiper-slide>
      </swiper>
    </nav>
    <div class="plus-screen-content">
      <swiper class="content-swiper height100" :options="contentOption" ref="contentSwiper">
        <swiper-slide class="mescroll" :id="'mescroll' + item.index" v-for="item in data" v-bind:key="item.type">
          <div class="plus-screen-scroll " :id="'scroll' + item.index">
            <div v-for="cont in item.dealList" v-bind:key="cont.dealTime" class="total">
              <div>{{ cont.dealTime }}</div>
              <div v-html="viewFor(cont.data)"></div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import MeScroll from 'mescroll.js'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
  data () {
    const _this = this
    return {
      icon: require('../../assets/images/request-deal.png'),
      data: [{
        type: '全部',
        index: 0,
        dealType: 0,
        isDown: true,
        scroll: '',
        noDataText: '暂无交易记录~',
        list: [],
        dealList: []
      }, {
        type: '充值',
        index: 1,
        dealType: 1,
        isDown: true,
        scroll: '',
        noDataText: '暂无充值记录~',
        list: [],
        dealList: []
      }, {
        type: '提现',
        index: 2,
        dealType: 2,
        isDown: true,
        scroll: '',
        noDataText: '暂无提现记录~',
        list: [],
        dealList: []
      }, {
        type: '出借',
        index: 3,
        dealType: 3,
        isDown: true,
        scroll: '',
        noDataText: '暂无出借记录~',
        list: [],
        dealList: []
      }, {
        type: '转让',
        index: 4,
        dealType: 15,
        isDown: true,
        scroll: '',
        noDataText: '暂无转让记录~',
        list: [],
        dealList: []
      }, {
        type: '回款',
        index: 5,
        dealType: 12,
        isDown: true,
        scroll: '',
        noDataText: '暂无回款记录~',
        list: [],
        dealList: []
      }, {
        type: '红包',
        index: 6,
        dealType: 11,
        isDown: true,
        scroll: '',
        noDataText: '暂无红包记录~',
        list: [],
        dealList: []
      }],
      navOption: {
        slidesPerView: 6.1,
        resistanceRatio: 0,
        slidesPerGroup: 1,
        on: {
          click (event) {
            _this.contentSwiper.slideTo(Math.floor($(event.target).attr('data-index')))
          }
        }
      },
      contentOption: {
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionEnd () {
            _this.navSwiper.slideTo(this.activeIndex)
            $('.nav .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            if (!_this.data[this.activeIndex].scroll) {
              _this.data[this.activeIndex].scroll = new MeScroll('mescroll' + this.activeIndex, {
                down: {
                  callback: _this.$_downCallback,
                  auto: false
                },
                up: {
                  callback: _this.$_upCallback,
                  isBounce: false,
                  htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
                  noMoreSize: 1,
                  empty: {
                    warpId: 'scroll' + this.activeIndex,
                    icon: _this.icon,
                    tip: _this.data[this.activeIndex].noDataText,
                    btntext: '',
                    btnClick: null,
                    supportTap: false
                  }
                }
              })
            }
          },
          init () {
            _this.navSwiper.slideTo(this.activeIndex)
            $('.nav .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            if (!_this.data[this.activeIndex].scroll) {
              _this.data[this.activeIndex].scroll = new MeScroll('mescroll' + this.activeIndex, {
                down: {
                  callback: _this.$_downCallback,
                  auto: false
                },
                up: {
                  callback: _this.$_upCallback,
                  isBounce: false,
                  htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
                  noMoreSize: 1,
                  empty: {
                    warpId: 'scroll' + this.activeIndex,
                    icon: _this.icon,
                    tip: _this.data[this.activeIndex].noDataText,
                    btntext: '',
                    btnClick: null,
                    supportTap: false
                  }
                }
              })
            }
          }
        }
      }
    }
  },
  components: {
    wxheader,
    swiper,
    swiperSlide
  },
  computed: {
    navSwiper () {
      return this.$refs.navSwiper.swiper
    },
    contentSwiper () {
      return this.$refs.contentSwiper.swiper
    }
  },
  methods: {
    $_downCallback () {
      let pageData = this.data[this.contentSwiper.activeIndex]
      pageData.isDown = true
      pageData.scroll.resetUpScroll(true)
    },
    $_upCallback (page) {
      let pageData = this.data[this.contentSwiper.activeIndex]
      this.axios({
        url: this.HOST + '/web-server/userDealRecord/v1/myDealList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          dealType: pageData.dealType
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (pageData.isDown) {
            pageData.list = []
            pageData.isDown = false
            pageData.scroll.endSuccess()
          }
          pageData.list = pageData.list.concat(res.data.data.myDealList.list)
          pageData.dealList = this.dealData(pageData.list)
        } else if (res.data.data.code === 1111) {
          this.toLogin('/transactionRecords')
        }
        pageData.scroll.endByPage(pageData.list.length, res.data.data.myDealList.lastPage)
      }).catch((err) => {
        if (err) {
          pageData.scroll.endErr()
        }
      })
    },
    dealData (data) {
      var dataArr = []
      for (var i = 0; i < data.length; i++) {
        if (dataArr.length) {
          var bool = false
          for (var l = 0; l < dataArr.length; l++) {
            if (dataArr[l].dealTime === new Date(data[i].dealTime).getFullYear() + '年' + (new Date(data[i].dealTime).getMonth() + 1) + '月') {
              bool = true
              if (bool) {
                dataArr[l].data.push(data[i])
              }
              break
            }
          }
          if (!bool) {
            dataArr.push({
              dealTime: new Date(data[i].dealTime).getFullYear() + '年' + (new Date(data[i].dealTime).getMonth() + 1) + '月',
              data: [data[i]]
            })
          }
        } else {
          dataArr.push({
            dealTime: new Date(data[i].dealTime).getFullYear() + '年' + (new Date(data[i].dealTime).getMonth() + 1) + '月',
            data: [data[i]]
          })
        }
      }
      return dataArr
    },
    viewFor (data) {
      var str = ''
      for (var x = 0; x < data.length; x++) {
        if (data[x].dealCode === 22) {
          str += '<div class="data-total">' +
            '<div>' + (data[x].dealTypeMsg.length > 16 ? data[x].dealTypeMsg.slice(0, 16) + '...' : data[x].dealTypeMsg) + '' + this.amountClass(data[x].recordStatus, (data[x].amount - data[x].poundage), data[x].dealType) + '</div>' +
            '<div>' + this.formatDateTime(data[x].dealTime) + '&nbsp;&nbsp;' + (data[x].recordStatus === 1 || data[x].recordStatus === 2 ? '成功' : '失败') + '<span>' + data[x].dealType + '</span></div>' +
          '</div>' +
          '<div class="data-total">' +
            '<div>' + (data[x].dealTypeMsg.length > 16 ? data[x].dealTypeMsg.slice(0, 16) + '...' : '提现手续费') + '' + this.amountClass(data[x].recordStatus, data[x].poundage, data[x].dealType) + '</div>' +
            '<div>' + this.formatDateTime(data[x].dealTime) + '&nbsp;&nbsp;' + (data[x].recordStatus === 1 || data[x].recordStatus === 2 ? '成功' : '失败') + '<span>' + data[x].dealType + '</span></div>' +
          '</div>'
        } else {
          str += '<div class="data-total">' +
            '<div>' + (data[x].dealTypeMsg.length > 16 ? data[x].dealTypeMsg.slice(0, 16) + '...' : data[x].dealTypeMsg) + '' + this.amountClass(data[x].recordStatus, data[x].amount, data[x].dealType) + '</div>' +
            '<div>' + this.formatDateTime(data[x].dealTime) + '&nbsp;&nbsp;' + (data[x].recordStatus === 1 || data[x].recordStatus === 2 ? '成功' : '失败') + '<span>' + data[x].dealType + '</span></div>' +
          '</div>'
        }
      }
      return str
    },
    amountClass (status, amount, dealType) {
      if (dealType === '原债权本金' || dealType === '原债权回报' || dealType === '提现' || dealType === '出借' || dealType === '扣回已收回报' || dealType === '转让项目服务费' || dealType === '转让项目折让费') {
        return '<span class="' + (status === 1 || status === 2 ? 'transaction-records-green' : 'transaction-records-black') + ' phlc-yxfont">' + (status === 1 || status === 2 ? '-' : '') + this.fmoney(amount, 2) + '</span>'
      } else if (dealType === '冻结' || dealType === '撤标' || dealType === '解冻' || dealType === '流标' || dealType === '取消投标') {
        return '<span class="transaction-records-black phlc-yxfont">' + this.fmoney(amount, 2) + '</span>'
      } else {
        return '<span class="' + (status === 1 || status === 2 ? 'transaction-records-red' : 'transaction-records-black') + ' phlc-yxfont">' + (status === 1 || status === 2 ? '+' : '') + this.fmoney(amount, 2) + '</span>'
      }
    },
    formatDateTime (inputTime) {
      var date = new Date(inputTime)
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return m + '.' + d + '&nbsp;&nbsp;' + h + ':' + minute + ':' + second
    }
  }
}
</script>

<style lang="less">
#transactionRecords-view{
  .plus-screen-content{
    top: 1.48rem;
    .plus-screen-scroll{
      padding: 0rem;
      >.mescroll-empty img{
        display: inline-block;
      }
      .transaction-records-red{
        color: #E6382C;
      }
      .transaction-records-black{
        color: #222222;
      }
      .transaction-records-green{
        color: #00c63f;
      }
    }
  }
  .total > div:first-child{
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    color: #222;
    font-size: 0.24rem;
    padding: 0 0.4rem;
    font-weight: bold;
    background: #F5F5F5;
    box-sizing: border-box;
  }
  .total > div:last-child{
    padding: 0 0.4rem;
    background: #fff;
    >div{
      width: 100%;
      height: 1.5rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #eeeeee;
      box-sizing: border-box;
      &:last-child{
        border: 1px solid #fff;
      }
      >div:first-child{
        font-size: 0.3rem;
        color: #222222;
        position: relative;
        height: 0.4rem;
        line-height: 0.4rem;
      }
      >div:last-child{
        font-size: 0.26rem;
        color: #999;
        position: relative;
      }
      >div:first-child span, >div:last-child span{
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .phlc-card-voucher-nav {
    position: absolute;
    top: 0.88rem;
    height: 0.6rem;
    width: 100%;
    font-size: 0.28rem;
    margin-top: -1px;
    left: 0;
    text-align: center;
    box-shadow: 0.02rem 0.02rem 0.15rem rgba(204,204,204,0.3);
    z-index: 99;
    background: #fff;
  }
  .nav{
    margin: 0 0.4rem;
    text-align: left;
    .swiper-slide {
      padding: 0 0 0.24rem 0;
    }
  }
  .phlc-swiper-active {
    color: #ef402e;
    font-weight: bold;
    position: relative;
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 0.8rem;
      height: 0.06rem;
      background: transparent;
      bottom: .06rem;
      left: 0.2rem;
    }
  }
}
</style>
