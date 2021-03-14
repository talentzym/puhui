<template>
  <div id="inviteList-view" class="plus-screen-view">
    <wxheader></wxheader>
    <nav v-bind:class="{'type2': $route.query.type === '2' }">
      <span v-on:click="mySwiper.slideTo(0)" class="phlc-swiper-active">{{ $route.query.type === '1' ? '卡券' : '未出借好友'}}</span>
      <span v-on:click="mySwiper.slideTo(1)">{{ $route.query.type === '1' ? '红包' : '已出借好友'}}</span>
    </nav>
    <div class="plus-screen-content">
      <swiper class="content-swiper height100" :options="myOption" ref="mySwiper">
        <swiper-slide class="mescroll" id="mescroll0">
          <div class="plus-screen-scroll" id="scroll0"></div>
        </swiper-slide>
        <swiper-slide class="mescroll" id="mescroll1">
          <div class="plus-screen-scroll" id="scroll1"></div>
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
      icon: require('../../assets/images/request-award.png'),
      data: this.$route.query.type === '1' ? [{
        type: '卡券',
        index: 0,
        params: {
          inviteRewardType: 'voucher'
        },
        scroll: '',
        noDataText: '咦，您未获得任何红卡券励哦~',
        field: 'inviteRewardList',
        list: []
      }, {
        type: '红包',
        index: 1,
        params: {
          inviteRewardType: 'redpack'
        },
        scroll: '',
        noDataText: '咦，您未获得任何红包奖励哦~',
        field: 'inviteRewardList',
        list: []
      }] : [{
        type: '未出借好友',
        index: 0,
        params: {
          inviteUserType: 0
        },
        scroll: '',
        noDataText: '咦，暂无找到好友哦~',
        field: 'inviteUserList',
        list: []
      }, {
        type: '已出借好友',
        index: 1,
        params: {
          inviteUserType: 1
        },
        scroll: '',
        noDataText: '咦，暂无好友出借哦~',
        field: 'inviteUserList',
        list: []
      }],
      myOption: {
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionEnd () {
            $('nav span').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
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
    mySwiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      this.data[0].scroll = new MeScroll('mescroll0', {
        down: {
          callback: this.$_downCallback,
          auto: false
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          noMoreSize: 1,
          empty: {
            warpId: 'scroll0',
            icon: this.icon,
            tip: this.data[0].noDataText,
            btntext: '',
            btnClick: null,
            supportTap: false
          }
        }
      })
    },
    $_downCallback () {
      let pageData = this.data[this.mySwiper.activeIndex]
      pageData.isDown = true
      pageData.scroll.resetUpScroll(true)
    },
    $_upCallback (page) {
      let pageData = this.data[this.mySwiper.activeIndex]
      var params = pageData.params
      params.page = page.num
      params.rows = page.size
      this.axios({
        url: this.HOST + (this.$route.query.type === '1' ? '/web-server/userInvite/v1/getUserInviteRewardList' : '/web-server/userInvite/v1/getInviteUserList'),
        method: 'GET',
        params: params,
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (pageData.isDown) {
            pageData.list = []
            pageData.isDown = false
            pageData.scroll.endSuccess()
            $('#scroll' + pageData.index).html('')
          }
          if (this.$route.query.type === '1') {
            pageData.list = pageData.list.concat(res.data.data[pageData.field].list)
            $('#scroll' + pageData.index).html('')
          }
          var obj = this.$route.query.type === '1' ? this.dealData(pageData.list) : res.data.data[pageData.field]
          this.viewFor(pageData, obj)
          pageData.scroll.endByPage($('#scroll' + pageData.index + ' .section-total').length, this.$route.query.type === '1' ? res.data.data[pageData.field].pages : 1)
        } else if (res.data.data.code === 1111) {
          this.$router.replace({
            path: '/login'
          })
        }
      })
    },
    viewFor (pageData, obj) {
      if (obj.length) {
        var str = ''
        if (this.$route.query.type === '1') {
          for (var i = 0; i < obj.length; i++) {
            str += '<section><div class="date">' + obj[i].sendDate + '</div>'
            for (var x = 0; x < obj[i].data.length; x++) {
              str += '<div class="section-total">' +
                '<p>' + obj[i].data[x].name + '</p>' +
                '<p>' + obj[i].data[x].remark + '</p>' +
                '<span>' + new Date(obj[i].data[x].sendDate).format('MM-dd hh:mm:ss').replaceAll('-', '.') + '</span>' +
              '</div>'
            }
            str += '</section>'
          }
        } else {
          for (var y = 0; y < obj.length; y++) {
            str += '<div class="section-total">' +
              '<p>' + obj[y].userName + '</p>' +
              '<p class="' + (pageData.index ? 'desc' : '') + '">' + this.nextFlag(obj[y].nextFlag, obj[y].nowFlag) + '</p>' +
              (pageData.index ? '<p>账户总额：' + this.fmoney(obj[y].totalAmount) + '元</p>' : '') +
              '<span>' + new Date(obj[y].modifyTime).format('yyyy-MM-dd').replaceAll('-', '.') + ' ' + this.nowFlag(obj[y].nowFlag) + '</span>' +
            '</div>'
          }
        }
        $('#scroll' + pageData.index).append(str)
      }
    },
    dealData (data) {
      var viewDataArr = []
      if (data.length) {
        for (var i = 0; i < data.length; i++) {
          if (viewDataArr.length) {
            var bool = false
            for (var l = 0; l < viewDataArr.length; l++) {
              if (viewDataArr[l].sendDate === new Date(data[i].sendDate).getFullYear() + '年' + (new Date(data[i].sendDate).getMonth() + 1) + '月') {
                bool = true
                if (bool) {
                  viewDataArr[l].data.push(data[i])
                }
                break
              }
            }
            if (!bool) {
              viewDataArr.push({
                sendDate: new Date(data[i].sendDate).getFullYear() + '年' + (new Date(data[i].sendDate).getMonth() + 1) + '月',
                data: [data[i]]
              })
            }
          } else {
            viewDataArr.push({
              sendDate: new Date(data[i].sendDate).getFullYear() + '年' + (new Date(data[i].sendDate).getMonth() + 1) + '月',
              data: [data[i]]
            })
          }
        }
      }
      return viewDataArr
    },
    nowFlag (flag) {
      if (flag === 'AUTH_USER_REGISTER') {
        return '注册'
      } else if (flag === 'AUTH_USER_REALNAME') {
        return '实名认证'
      } else if (flag === 'AUTH_BANK_CARD') {
        return '绑卡'
      } else if (flag === 'AUTH_USER_RECHARGE') {
        return '充值'
      } else if (flag === 'AUTH_USER_BID') {
        return '出借'
      } else if (flag === 'AUTH_USER_WITHDRAW') {
        return '提现'
      }
    },
    nextFlag (flag, nowFlag) {
      if (flag === 'AUTH_USER_REALNAME') {
        return 'Ta还未实名认证'
      } else if (flag === 'AUTH_BANK_CARD') {
        return 'Ta还未绑定银行卡'
      } else if (flag === 'AUTH_USER_RECHARGE') {
        return 'Ta还未进行充值'
      } else if (flag === 'AUTH_USER_BID') {
        return 'Ta明明有钱未出借，快去提醒一下！'
      } else if (!flag) {
        if (nowFlag === 'AUTH_USER_WITHDRAW') {
          return 'Ta抛弃你，选择了“诗和远方”'
        }
        return '您一定是Ta的“理财规划师”'
      }
    }
  }
}
</script>

<style lang="less">
#inviteList-view{
  .plus-screen-scroll{
    padding: 0;
    .empty-icon{
      display: inline-block;
    }
  }
  nav{
    display: flex;
    font-size: 0.36rem;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    z-index: 1000;
    text-align: center;
    >span{
      padding: 0 0.2rem;
      box-sizing: border-box;
      line-height: 0.88rem;
      &:first-child{
        text-align: right;
      }
    }
    &.type2{
      width: 4.4rem;
      span{
        width: 2.2rem;
      }
    }
  }
  section {
    background: #fff;
    padding: 0;
  }
  section>.date {
    color: #999;
    font-size: 0.24rem;
    height: 0.7rem;
    line-height: 0.7rem;
    padding: 0 0.4rem;
    background: #f8f8f9;
  }
  .section-total {
    padding: 0.4rem 0;
    margin: 0 0.4rem;
    position: relative;
    border-bottom: 1px solid #eee;
  }
  .section-total:last-child {
    border: none;
  }
  .section-total p:first-child {
    font-size: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    color: #222;
  }
  .section-total p:nth-child(2){
    color: #444;
    font-size: 0.26rem;
    height: 0.26rem;
    line-height: 0.26rem;
    margin-top: 0.15rem;
  }
  .section-total p.desc {
    color: #999;
    font-size: 0.22rem;
    height: 0.22rem;
    line-height: 0.22rem;
    margin-top: 0.15rem;
  }
  .section-total p.desc ~p {
    color: #444;
    font-size: 0.26rem;
    height: 0.26rem;
    line-height: 0.26rem;
    margin-top: 0.35rem;
  }
  .section-total span {
    color: #999;
    font-size: 0.24rem;
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
  }
  .content-swiper {
    height: 100%;
  }
  .swiper-slide {
    overflow: auto;
  }
  .bottom {
    text-align: center;
    line-height: 0.7rem;
    color: #999;
    font-size: 0.24rem;
    background: #f8f8f9;
  }
  .phlc-swiper-active {
    color: #ef402e;
  }
}
</style>
