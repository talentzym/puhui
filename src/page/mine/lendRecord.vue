<template>
  <div id="lend-view" class="plus-screen-view">
    <wxheader :title="'出借记录'" :isService="true"></wxheader>
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
            <section class="project-list-section" v-for="cont in item.list" v-bind:key="cont.type">
              <p class="phlc-second-black-color project-list-section-tip">
                <span class="bidType" v-bind:class="cont.bidType === 2 ? 'bidType2' : 'bidType1'">{{ cont.bidType === 2 ? '债转' : '直投' }}</span>
                <span class="namel">{{ cont.proName }}</span>
              </p>
              <div class="projects-list-cont clearfix">
                <div class="projects-list-contL fl">
                  <p class="math-rate phlc-red-normal-color clearfix">
                  <span class="fl phlc-yxfont">
                    <i id="home-rate">{{ cont.rate }}</i></span>
                  </p>
                  <p>{{ cont.bidType === 2 ? '转让利率' : '借款利率'}}(%)</p>
                </div>
                <div class="projects-list-contC fl">
                  <p class="date-math phlc-yxfont">{{ fmoney(cont.bidAmount, 2) }}</p>
                  <p>{{ cont.bidType === 2 ? '购买金额' : '出借金额'}}(元)</p>
                </div>
                <div class="projects-list-contR fl">
                  <p class="lend-amount phlc-yxfont" id="project-financeAmount">{{ fmoney(cont.rateAmount, 2) }}</p>
                  <p class="company">到期回报(元)</p>
                </div>
              </div>
              <div class="lend-record-section-footer">
                <p v-html="footerView(cont)"></p>
                <router-link tag="div" :to="{ path: '/projectDetail', query:{id: cont.proId}}" v-if="item.status === 3">继续出借</router-link>
                <router-link tag="div" :to="{ path: '/lendDetail', query:{id: cont.id, proId: cont.proId, type: item.status + ''}}" v-if="(item.status === 5 || item.status === 6 || item.status === 7) && cont.proStatus !== 10 && cont.proStatus !== 11">查看</router-link>
              </div>
            </section>
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
      scrollHeight: [0, 0, 0, 0, 0],
      data: [{
        type: '出借中',
        index: 0,
        status: 3,
        isDown: true,
        scroll: '',
        noDataText: '暂无出借记录~',
        list: [],
        field: 'noUseCountNums'
      }, {
        type: '已满标',
        index: 1,
        status: 4,
        isDown: true,
        scroll: '',
        noDataText: '暂无出借记录~',
        list: [],
        field: 'attornCountNums'
      }, {
        type: '还款中',
        index: 2,
        status: 6,
        isDown: true,
        scroll: '',
        noDataText: '暂无出借记录~',
        list: [],
        field: 'attornedCountNums'
      }, {
        type: '已转让',
        index: 3,
        status: 5,
        isDown: true,
        scroll: '',
        noDataText: '暂无转让记录~',
        list: [],
        field: 'usedCountNums'
      }, {
        type: '已完成',
        index: 4,
        status: 7,
        isDown: true,
        scroll: '',
        noDataText: '暂无出借记录~',
        list: [],
        field: 'invalidCountNums'
      }],
      navOption: {
        slidesPerView: 4.3,
        resistanceRatio: 0,
        slidesPerGroup: 1,
        initialSlide: this.$store.state.lendListIndex,
        on: {
          click (event) {
            _this.contentSwiper.slideTo(Math.floor($(event.target).attr('data-index')))
          }
        }
      },
      contentOption: {
        slidesPerView: 1,
        resistanceRatio: 0,
        initialSlide: this.$store.state.lendListIndex,
        on: {
          transitionEnd () {
            _this.$store.state.lendListIndex = this.activeIndex
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
                  },
                  onScroll: function (mescroll, y, isUp) {
                    _this.scrollHeight[_this.contentSwiper.activeIndex] = y
                    _this.$store.state.lendListScrollHeight = _this.scrollHeight
                  }
                }
              })
            }
          },
          init () {
            _this.navSwiper.slideTo(this.activeIndex)
            $('.nav .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            /* if (!_this.data[this.activeIndex].scroll) {
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
                  },
                  onScroll: function (mescroll, y, isUp) {
                    _this.scrollHeight[_this.contentSwiper.activeIndex] = y
                    _this.$store.state.lendListScrollHeight = _this.scrollHeight
                  }
                }
              })
            } */
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
  activated () {
    this.contentSwiper.slideTo(this.$store.state.lendListIndex, 0)
    this.scrollHeight = this.$store.state.lendListScrollHeight ? this.$store.state.lendListScrollHeight : [0, 0, 0, 0, 0]
    for (let i = 0; i < this.scrollHeight.length; i++) {
      if (this.data[i].scroll) {
        this.data[i].scroll.scrollTo(this.scrollHeight[i], 0)
        if (!this.scrollHeight[i]) {
          this.data[i].scroll.triggerDownScroll()
        }
      }
    }
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
    $_downCallback (mescroll) {
      let pageData = this.data[mescroll.optUp.empty.warpId.split('scroll')[1]]
      pageData.isDown = true
      pageData.scroll.resetUpScroll(true)
    },
    $_upCallback (page, mescroll) {
      let pageData = this.data[mescroll.optUp.empty.warpId.split('scroll')[1]]
      this.axios({
        url: this.HOST + '/web-server/account/v1/getCustUserLoanList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          status: pageData.status
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
          pageData.list = pageData.list.concat(res.data.data.loanList.list)
          pageData.scroll.endByPage(pageData.list.length, res.data.data.loanList.pages)
        } else if (res.data.data.code === 1111) {
          this.toLogin('/lendRecord')
        }
      })
    },
    filterData (code) {
      for (var l in this.data) {
        if (this.data[l].index === code) {
          return this.data[l]
        }
      }
    },
    footerView (obj) {
      var status = this.filterData(this.contentSwiper.activeIndex).status
      if (status === 3) {
        return '该项目正在募集'
      } else if (status === 4) {
        return '已满标待放款计息'
      } else if (status === 5) {
        if (obj.proStatus === 10 || obj.proStatus === 11) {
          return obj.proStatus === 10 ? '该标的已流标，请联系客服！' : '该标的已撤标，请联系客服！'
        } else {
          return new Date(obj.transferDate).format('yyyy-MM-dd').replaceAll('-', '.') + '&nbsp;已转让'
        }
      } else if (status === 6 || status === 7) {
        if (obj.proStatus === 10 || obj.proStatus === 11) {
          return obj.proStatus === 10 ? '该标的已流标，请联系客服！' : '该标的已撤标，请联系客服！'
        } else {
          return new Date(obj.endDate).format('yyyy-MM-dd').replaceAll('-', '.') + '&nbsp;到期(' + this.bidTimediff(obj.payDate, obj.realPayDate) + ')'
        }
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
    }
  }
}
</script>

<style lang="less">
#lend-view{
  .plus-screen-content{
    top: 1.48rem;
    background: transparent;
    .plus-screen-scroll{
      padding: 0.2rem 0 0 0;
      background: #f8f8f9;
      /*min-height: 100%;*/
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
  .project-list-section {
    width: 7.5rem;
    margin: 0 auto;
    height: 3.2rem;
    padding: .3rem .4rem 0;
    background-color: #fff;
    border-bottom: .02rem solid #F8F8F9;
    box-sizing: border-box;
  }
  .project-list-section-tip {
    font-size: .3rem;
    position: relative;
    left: -.15rem;
    width: 6.7rem;
    padding-left: .75rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  .project-list-describe .describe-left {
    display: block;
    width: 1.72rem;
    background-color: #f9f9f9;
    font-size: .2rem;
    height: .38rem;
    line-height: .38rem;
    margin-right: .2rem;
    text-align: center;
  }
  .project-list-describe {
    margin-top: .26rem;
  }
  .project-list-describe .describe-center {
    display: block;
    background-color: #f9f9f9;
    font-size: .2rem;
    height: .38rem;
    line-height: .38rem;
    margin-right: .2rem;
    width: 1.5rem;
    text-align: center;
  }
  .project-list-describe .describe-right {
    display: block;
    width: 1.26rem;
    height: .38rem;
    border-radius: .04rem;
    -webkit-border-radius: .04rem;
    -moz-border-radius: .04rem;
    background-color: #fcebe9;
    text-align: center;
    position: relative;
    left: 3.6rem;
    font-size: .2rem;
    color: #e6382c;
    top: 0;
  }
  .progress {
    position: absolute;
    left: .63rem;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
  .progress-box-span {
    display: block;
    position: absolute;
    height: 100%;
    width: 0;
    color: white;
    overflow: hidden;
    z-index: 10;
    border-radius: .04rem;
    -webkit-border-radius: .04rem;
    -moz-border-radius: .04rem;
    max-width: 1.26rem;
  }
  .projects-list-cont {
    text-align: left;
    margin-top: .3rem;
  }
  .projects-list-contL {
    width: 2.24rem;
    height: .88rem;
    &:first-child{
      position: relative;
      top: -0.16rem;
    }
  }
  .projects-list-cont .projects-list-contL .math-rate {
    /*height: .44rem;*/
    font-size: .48rem;
    color: #E6382C;
    padding: 0;
  }
  .projects-list-cont .projects-list-contC {
    width: 2.24rem;
    height: .88rem;
  }
  .projects-list-cont .projects-list-contC .date-math {
    font-size: .3rem;
    color: #222222;
  }
  .projects-list-cont .projects-list-contR .lend-amount {
    font-size: .3rem;
    color: #222222;
  }
  .projects-list-cont div p:nth-of-type(2) {
    margin-top: .08rem;
    font-size: .24rem;
  }
  .projects-list-cont div:first-child p:nth-of-type(2) {
    margin-top: .025rem;
    font-size: .24rem;
  }
  .lend-record-section-footer {
    color: #444;
    font-size: 0.28rem;
    padding-top: 0.5rem;
    position: relative;
  }
  .lend-record-section-footer div {
    position: absolute;
    top: 0.4rem;
    right: 0rem;
    border: none;
    width: 1.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.3rem;
    background: #E6382C;
    text-align: center;
    color: #fff;
    box-shadow:0px 0px .16rem rgba(230,56,44,0.49);
  }
  .phlc-swiper-active1 {
    color: #ef402e;
    font-weight: bold;
  }
  .bidType1{
    color: rgba(255,255,255,1);
    background:rgba(53,139,245,1);
  }
  .bidType2{
    color: rgba(255,255,255,1);
    background:rgba(248,172,63,1);
  }
  .bidType{
    font-size: .2rem;
    display: inline-block;
    width:.6rem;
    position: absolute;
    top: .04rem;
    left: .1rem;
    border-radius: .02rem;
    -webkit-border-radius: .02rem;
    -moz-border-radius: .02rem;
    text-align: center;
    line-height: .32rem;
  }
}
</style>
