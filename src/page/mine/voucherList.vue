<template>
  <div id="voucherList-view" class="plus-screen-view">
    <wxheader :title="'我的卡券'" :isService="true"></wxheader>
    <nav class="phlc-card-voucher-nav phlc-first-black-color">
      <swiper class="nav" :options="navOption" ref="navSwiper">
        <swiper-slide class="phlc-swiper-active" v-for="(item, index) in data" v-bind:key="item.type" :data-index="index">{{ item.type }}
          ({{ item.totals > 99 ? '99+' : item.totals }})
        </swiper-slide>
      </swiper>
    </nav>
    <div class="plus-screen-content">
      <swiper class="content-swiper height100" :options="contentOption" ref="contentSwiper">
        <swiper-slide class="mescroll" :id="'mescroll' + item.index" v-for="item in data" v-bind:key="item.type">
          <div class="plus-screen-scroll" :id="'scroll' + item.index">
            <section v-for="cont in item.list" v-bind:key="cont.id" v-bind:class=" sectionType(cont.activeStatus, item.useStatus) ">
              <div class="section-top">
                <p v-html="voucherName(cont)"></p>
                <p>{{ cardMsg(cont) }}</p>
                <div class="use" v-show="cont.activeStatus == 1 && (cont.useStatus === 0 || cont.useStatus === 1)" v-on:click="goUse($event, cont.useStatus, cont.voucherType, cont.id)">{{ newStatus(cont.voucherType, cont.useStatus, cont.modifyTime, cont.id) }}</div>
                <div class="section-exchange-ing-bg">{{ countdown(cont) }}</div>
              </div>
              <div class="section-bottom section-bottom-ul" v-html="voucherDetail(cont)" v-on:click="toggle($event)"></div>
              <div v-html="overdue(cont.useStatus, cont.creatTime, cont.invalidTime)"></div>
              <div class="section-left">{{ cont.voucherOri }}</div>
            </section>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="voucher-new" v-show="windowFlag">
      <div class="voucher-new-close" v-on:click="windowClose()"></div>
      <div class="voucher-new-start" v-on:click="voucherNewStart(1)">立即计息</div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import MeScroll from 'mescroll.js'
import { Indicator } from 'mint-ui'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
  data () {
    const _this = this
    return {
      icon: require('../../assets/images/request-voucher.png'),
      windowFlag: false,
      newCard: {
        id: '',
        time: ''
      },
      data: [{
        type: '未激活',
        index: 0,
        useStatus: -2,
        isDown: true,
        scroll: '',
        noDataText: '暂无未激活卡券~',
        field: 'noActiveNums',
        list: [],
        totals: 0
      }, {
        type: '可使用',
        index: 1,
        useStatus: 0,
        isDown: true,
        scroll: '',
        noDataText: '暂无可使用卡券~',
        field: 'noUseCountNums',
        list: [],
        totals: 0
      }, {
        type: '转让中',
        index: 2,
        useStatus: 4,
        isDown: true,
        scroll: '',
        noDataText: '暂未转让卡券~',
        field: 'attornCountNums',
        list: [],
        totals: 0
      }, {
        type: '已转让',
        index: 3,
        useStatus: 5,
        isDown: true,
        scroll: '',
        noDataText: '暂未转让卡券~',
        field: 'attornedCountNums',
        list: [],
        totals: 0
      }, {
        type: '已使用',
        index: 4,
        useStatus: 2,
        isDown: true,
        scroll: '',
        noDataText: '暂未使用卡券~',
        field: 'usedCountNums',
        list: [],
        totals: 0
      }, {
        type: '已过期',
        index: 5,
        useStatus: -1,
        isDown: true,
        scroll: '',
        noDataText: '暂无过期卡券~',
        field: 'invalidCountNums',
        list: [],
        totals: 0
      }],
      navOption: {
        slidesPerView: 4,
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
  mounted () {},
  methods: {
    $_downCallback () {
      let pageData = this.data[this.contentSwiper.activeIndex]
      pageData.isDown = true
      pageData.scroll.resetUpScroll(true)
    },
    $_upCallback (page) {
      let pageData = this.data[this.contentSwiper.activeIndex]
      this.axios({
        url: this.HOST + '/web-server/voucher/v1/myVoucherList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          useStatus: pageData.useStatus ? pageData.useStatus : 0
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (pageData.isDown) {
            pageData.list = []
            pageData.isDown = false
            for (let i in this.data) {
              this.data[i].totals = res.data.data[this.data[i].field]
            }
            pageData.scroll.endSuccess()
          }
          pageData.list = pageData.list.concat(res.data.data.UserVoucherList.list)
          pageData.scroll.endByPage(pageData.list.length, Math.ceil(pageData.totals / page.size))
        } else if (res.data.data.code === 1111) {
          this.toLogin('/voucherList')
        }
      })
    },
    voucherName (item) {
      var str = '<span class="phlc-yxfont">' + (item.voucherType === 3 || item.voucherType === 1 ? '¥' : '') + '<b>' + (item.voucherType === 2 ? item.nominalValue + '‰' : item.nominalValue) + '</b></span>' + this.voucher(item.voucherType)
      return str
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
    cardMsg (item) {
      var invest
      var deadline
      var minInvest = item.quttMinInvest === -1 ? 0 : Number(item.quttMinInvest)
      var maxInvest = item.quttMaxInvest === -1 ? 0 : Number(item.quttMaxInvest)
      var minDeadline = item.quttProjectDeadline === -1 ? 0 : Number(item.quttProjectDeadline)
      var maxDeadline = item.quttProjectDeadlineMax === -1 ? 0 : Number(item.quttProjectDeadlineMax)
      if (minInvest && !maxInvest) {
        invest = '出借满' + minInvest + '元可用'
      } else if (!minInvest && maxInvest) {
        invest = '出借' + maxInvest + '元内可用'
      } else if (minInvest && maxInvest) {
        invest = '出借' + minInvest + '-' + maxInvest + '元内可用'
      } else {
        invest = '出借满0元可用'
      }
      if (minDeadline && !maxDeadline) {
        deadline = '期限' + minDeadline + '天起'
      } else if (!minDeadline && maxDeadline) {
        deadline = '期限' + maxDeadline + '天内'
      } else if (minDeadline && maxDeadline) {
        deadline = '期限' + minDeadline + '-' + maxDeadline + '天内可用'
      } else {
        deadline = '期限0天起'
      }
      return invest + '/' + deadline
    },
    countdown (item) {
      if (item.useStatus === 4) {
        var time = item.transferStartTime
        var overTime = time + 1000 * 60 * 60 * 24
        var nowTime = new Date().getTime()
        var timePoor = overTime - nowTime
        var h = Math.floor(timePoor / 60 / 60 / 1000)
        var m = Math.floor(timePoor / 60 / 1000) % 60
        var str = (h < 10 & h >= 0 ? '0' + h : h) + ':' + (m < 10 && m >= 0 ? '0' + m : m)
        return h <= 0 && m <= 0 ? '<60s' : '剩余' + str
      } else {
        return ''
      }
    },
    newStatus (type, status, time, id) {
      var newCardText
      if (type === 1) {
        this.newCard.id = id
        if (status === 0) {
          newCardText = '立即计息'
        } else {
          var overDate = new Date((this.getDay(3, time) + ' 00:00:00').replaceAll('-', '/')).getTime()
          this.newCard.time = this.getDay(3, time).replaceAll('-', '.')
          var nowDate = new Date().getTime()
          if (nowDate >= overDate) {
            newCardText = '待领取'
          } else {
            newCardText = '计息中'
          }
        }
      } else {
        newCardText = '去使用'
      }
      return newCardText
    },
    overdue (useStatus, creatTime, invalidTime) {
      var creatDate = new Date(creatTime).getTime() + 1000 * 60 * 60 * 24
      var invalidDate = new Date(this.getDay(-3, invalidTime).replaceAll('-', '/') + ' 00:00:00').getTime()
      var nowDate = new Date().getTime()
      if (nowDate <= creatDate && useStatus === 0) {
        return '<div class="section-right section-right-new">新到 </div>'
      } else if (nowDate >= invalidDate && useStatus === 0) {
        return '<div class="section-right section-right-old">即将到期 </div>'
      } else {
        return ''
      }
    },
    voucherDetail (obj) {
      if (obj.activeStatus === 0) {
        return '<ul>' +
          '<li"> ' + '激活条件：好友' + obj.inviteUserName + '出借满' + obj.inviteUserMinInvest + '元<i class="iconfont icon-fanhui"></i></li>' +
          '<li>' + '到期时间：' + new Date(obj.invalidTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
          '<li>' + '获得时间：' + new Date(obj.creatTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
          '<li>' + '卡券来源：' + (obj.lastSource ? obj.lastSource : '活动卡券') + '</li>' +
        '</ul>'
      } else if (obj.useStatus === 2 || obj.useStatus === 3) {
        if (obj.voucherType === 1) {
          return '<ul>' +
            '<li>' + '到期时间：长期有效<i class="iconfont icon-fanhui"></i></li>' +
            '<li>' + '卡券来源：' + (obj.lastSource ? obj.lastSource : '活动卡券') + '</li>' +
            '<li>' + '获得时间：' + new Date(obj.creatTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
            '<li>' + '领取时间：' + new Date(obj.modifyTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
          '</ul>'
        } else {
          return '<ul>' +
            '<li>' + '到期时间：' + new Date(obj.invalidTime).format('yyyy-MM-dd').replaceAll('-', '.') + '<i class="iconfont icon-fanhui"></i></li>' +
            '<li>' + '卡券来源：' + (obj.lastSource ? obj.lastSource : '活动卡券') + '</li>' +
            '<li>' + '获得时间：' + new Date(obj.creatTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
            '<li>' + '使用项目：' + (obj.useWhere ? obj.useWhere : '未知使用项目') + '</li>' +
            '<li>' + '使用时间：' + new Date(obj.useTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
          '</ul>'
        }
      } else if (obj.useStatus === 5) {
        return '<ul>' +
          '<li>' + '到期时间：' + new Date(obj.invalidTime).format('yyyy-MM-dd').replaceAll('-', '.') + '<i class="iconfont icon-fanhui"></i></li>' +
          '<li>' + '卡券来源：' + (obj.lastSource ? obj.lastSource : '活动卡券') + '</li>' +
          '<li>' + '获得时间：' + new Date(obj.creatTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
          '<li>' + '转让时间：' + new Date(obj.transferEndTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
        '</ul>'
      } else if (obj.useStatus === 1) {
        return '<ul>' +
          '<li>' + '到期时间：长期有效<i class="iconfont icon-fanhui"></i></li>' +
          '<li>' + '卡券来源：' + (obj.lastSource ? obj.lastSource : '活动卡券') + '</li>' +
          '<li>' + '获得时间：' + new Date(obj.creatTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
          '<li>' + '领取时间：' + this.newCard.time + '</li>' +
        '</ul>'
      } else {
        return '<ul>' +
          '<li>' + '到期时间：' + (obj.voucherType === 1 ? '长期有效' : new Date(obj.invalidTime).format('yyyy-MM-dd').replaceAll('-', '.')) + '<i class="iconfont icon-fanhui"></i></li>' +
          '<li>' + '卡券来源：' + (obj.lastSource ? obj.lastSource : '活动卡券') + '</li>' +
          '<li>' + '获得时间：' + new Date(obj.creatTime).format('yyyy-MM-dd').replaceAll('-', '.') + '</li>' +
        '</ul>'
      }
    },
    toggle (event) {
      if ($(event.target).hasClass('section-bottom')) {
        if ($(event.target).hasClass('section-bottom-ul')) {
          $(event.target).removeClass('section-bottom-ul')
        } else {
          $(event.target).addClass('section-bottom-ul')
        }
      } else {
        if ($(event.target).parents('.section-bottom').hasClass('section-bottom-ul')) {
          $(event.target).parents('.section-bottom').removeClass('section-bottom-ul')
        } else {
          $(event.target).parents('.section-bottom').addClass('section-bottom-ul')
        }
      }
    },
    sectionType (activeStatus, useStatus) {
      if (activeStatus === 0) {
        return 'section-active'
      } else if (activeStatus === 4) {
        return 'section-exchange-ing'
      } else if (activeStatus === 5) {
        return 'section-exchange-end'
      } else if (activeStatus === 2) {
        return 'section-used'
      } else if (activeStatus === -1) {
        return 'section-overdue'
      } else {
        return ''
      }
    },
    windowShow () {
      this.$mask.show()
      this.windowFlag = true
    },
    windowClose () {
      this.$mask.hide()
      this.windowFlag = false
    },
    goUse ($event, useStatus, voucherType, id) {
      if (voucherType === 1) {
        if (useStatus === 0) {
          $('.voucher-new-start').text('立即计息')
          this.windowShow()
        } else if (useStatus === 1) {
          if ($($event.target).text() === '待领取') {
            this.voucherNewStart(2)
          } else {
            $('.voucher-new-start').text(this.newCard.time + '可领取奖励')
            this.windowShow()
          }
        }
      } else {
        this.contentSwiper.slideTo(0, 0)
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i].scroll) {
            this.data[i].scroll.scrollTo(0, 0)
            this.data[i].scroll.triggerDownScroll()
          }
        }
        this.$router.push({
          path: '/project'
        })
      }
    },
    voucherNewStart (code) {
      if ($('.voucher-new-start').text() === '立即计息') {
        var _this = this
        this.axios({
          url: this.HOST + '/web-server/voucher/v1/updateVoucherStatus',
          method: 'post',
          transformRequest: [function (data, headers) {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            })
            return _this.$qs.stringify(data)
          }],
          params: {},
          data: {
            id: this.newCard.id,
            useStatus: code
          },
          timeout: 5000,
          transformResponse: [function (data, headers) {
            Indicator.close()
            return JSON.parse(data)
          }]
        }).then((res) => {
          this.windowClose()
          if (res.data.data.code === 1) {
            this.$layer.toast(code === 1 ? '已计息，3天后记得领取奖励！' : '领取成功，前往“我的红包”查看！')
          } else if (res.data.data.code === 1111) {
            this.$router.push({
              path: '/login'
            })
          } else {
            this.$layer.toast(res.data.data.msg)
          }
          this.data[this.contentSwiper.activeIndex].scroll.triggerDownScroll()
        })
      }
    }
  }
}
</script>

<style lang="less">
#voucherList-view{
  .plus-screen-content{
    top: 1.48rem;
    background: transparent;
    .plus-screen-scroll{
      padding-top: 0.01rem;
      background: #f8f8f9;
      >.mescroll-empty img{
        display: inline-block;
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
  .phlc-transaction-records-nav{
    z-index: 50;
    box-shadow: 1px 1px 15px #e1e1e1;
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
  section {
    background-color: #fff;
    margin-top: 0.3rem;
    border-radius: 0.15rem;
    position: relative;
    padding: 0 0.2rem;
    color: #999;
    z-index: 0;
  }
  section:after{
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-size: 1.08rem;
    background-repeat: no-repeat;
    background-position-x: 5.36rem;
    background-position-y:  0.6rem;
    z-index: -1;
  }
  .section-left {
    position: absolute;
    top: -0.01rem;
    left: -0.01rem;
    width: 0.93rem;
    font-size: 0.2rem;
    height: 0.31rem;
    line-height: 0.31rem;
    color: #fff;
    text-align: center;
    border-radius: 0.11rem 0;
    background: #e6382c;
  }
  .section-right {
    position: absolute;
    top: 0;
    right: -0.08rem;
    font-size: 0.2rem;
    height: 0.38rem;
    line-height: 0.32rem;
    color: #fff;
    text-align: center;
  }
  .section-right-new{
    width: 0.88rem;
    background: url(../../assets/images/phlc-card-voucher-new.png) no-repeat;
    background-size: 100%;
  }
  .section-right-old{
    width: 1.15rem;
    background: url(../../assets/images/phlc-card-voucher-old.png) no-repeat;
    background-size: 100%;
  }
  .section-top {
    /*height: 1.8rem;*/
    z-index: 100;
    padding: 0.22rem 0.15rem;
    border-bottom: 1px dashed #e1e1e1;
  }
  .section-top p:first-child {
    font-size: 0.24rem;
    color: #222;
    margin-top: 0.55rem;
    font-weight: bold;
  }
  .section-top p:first-child span {
    color: #E6382C;
    font-size: 0.16rem;
  }
  .section-top p:first-child span b {
    font-size: 0.4rem;
    margin: 0 0.1rem;
  }
  .section-top p:nth-child(2),.section-top p:nth-child(3){
    color: #444;
    font-size: 0.24rem;
  }
  .section-top p:nth-child(2) span {
    padding: 0 0.03rem;
  }
  .section-top:before {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.24rem;
    position: absolute;
    top: 1.67rem;
    left: 0;
    transform: translateX(-0.03rem);
    z-index: 1000;
    border-radius: 50%;
    background: url(../../assets/images/voucher-right.png) no-repeat;
    background-size: 100% 100%;
  }
  .section-top:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.24rem;
    position: absolute;
    top: 1.67rem;
    right: 0;
    transform: translateX(0.03rem);
    z-index: 1000;
    border-radius: 50%;
    background: url(../../assets/images/voucher-left.png) no-repeat;
    background-size: 100% 100%;
  }
  .section-bottom {
    z-index: 100;
    padding: 0.1rem 0.15rem 0 0.15rem;
    font-size: 0.24rem;
    position: relative;
    color: #666;
    transition: height 0.3s;
    box-sizing: border-box;
    line-height: 0.4rem;
  }
  .section-bottom ul{
    padding-bottom: 0.15rem;
  }
  .section-bottom ul li{
    padding: 0.03rem 0;
  }
  .section-bottom-ul{
    height: 0.6rem;
    overflow: hidden;
  }
  .section-bottom .icon-fanhui{
    font-size: 0.2rem;
    transform: rotate(90deg) scale(0.8);
    margin-left: 0.15rem;
    display: inline-block;
  }
  .section-bottom-ul .icon-fanhui{
    transform: rotate(-90deg) scale(0.8);
  }
  .use {
    width: 1.4rem;
    height: 0.6rem;
    border-radius: 0.3rem;
    border: 0;
    background: #E6382C;
    color: #fff;
    font-size: 0.24rem;
    padding: 0;
    position: absolute;
    right: 0.14rem;
    top: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
  }
  .section-active:after{
    background-image: url(../../assets/images/phlc-section-section-active.png);
  }
  .section-exchange-ing:after{
    background-image: url(../../assets/images/phlc-section-exchange-ing.png);
  }
  .section-exchange-end:after{
    background-image: url(../../assets/images/phlc-section-exchange-end.png);
  }
  .section-used:after{
    background-image: url(../../assets/images/phlc-section-used.png);
  }
  .section-overdue:after{
    background-image: url(../../assets/images/phlc-section-overdue.png);
  }
  .voucher-new{
    width: 6rem;
    height: 5.8rem;
    background: url(../../assets/images/phlc-voucher-new.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .voucher-new-close{
    position: absolute;
    top: 0;
    right: 0;
    width: 0.88rem;
    height: 0.88rem;
  }
  .voucher-new-start{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    background: #fff;
    border-radius: 0.1rem;
    text-align: center;
    line-height: 1rem;
    color: #ef402e;
    font-size: 0.32rem;
  }
}
</style>
