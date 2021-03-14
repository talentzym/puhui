<template>
  <div class="plus-screen-view" id="julyActivity">
    <activityBack :src="backIcon"></activityBack>
    <div @click="goaddress" class="addressBox"></div>
    <div class="plus-screen-content mescroll">
      <div class="plus-screen-scroll">
        <div class="box">
          <div class="julyActivityTop">
            <p class="miaoshu">走进生机盎然的七月，踏入七月滚烫的诗行</p>
            <p class="miaoshu">倾听柳荫深处抑扬顿挫的蝉鸣，挟裹着不安分的飞翔</p>
            <p class="miaoshu">阳光淡然，暑气渐消，生活姹紫嫣红，七月好运到爆</p>
            <p class="miaoshu">我们一起转一转，转出属于你的好运气吧~</p>
            <p class="julyActivityTopP1">
              <span class="baiicon"></span>
              <span>活动时间：7.5-7.25</span>
            </p>
          </div>
          <div class="choujiangBox">
            <div class="choujiangBoxli">
              <div class="choujiangDiv">
                <div class="award" v-for="(award,index) in awards" :class="['award'+index,{'active': award.id === current}]" v-bind:key="index">
                  <img :src="award.img" alt="" class="title-icon"/>
                </div>
                <div id="start-btn" @click="start"></div>
              </div>
              <p class="loginStatus" v-show="!isLogin">
                <span>登录查看你的可抽奖次数</span>
                <span  v-on:click="toLogin('/julyActivity')">立即登录</span>
              </p>
              <div style="height: .01rem;"></div>
              <div class="loginStatus" v-show="isLogin">
                <span>累计可抽{{num}}次 剩余<i>{{numLeft}}</i>次</span>
                <span @click="windowOpen('recordWindowFlag')">获奖记录</span>
              </div>
            </div>
          </div>
          <div class="loginstatused" v-show="isLogin">
            <div class="loginedBox">
              <p class="numberTip">出借总额(元)：<span @click="windowOpen('chujietipFlag')"></span></p>
              <p class="number phlc-yxfont">{{fmoney(investAmount)}}</p>
              <p class="numbertip2">剩余可抽{{investNum}}次</p>
            </div>
            <div class="loginedBox">
              <p class="numberTip">活动分享(次)：<span @click="windowOpen('fenxiangtipFlag')"></span></p>
              <p class="number phlc-yxfont">{{shareNum}}</p>
              <p class="numbertip2">剩余可抽{{shareNumByDay}}次 <span v-on:click="share()" class="shareBtn">分享</span></p>
            </div>
            <div class="loginedBox">
              <p class="numberTip">邀请好友(人)：<span @click="windowOpen('yaoqingtipFlag')"></span></p>
              <p class="number phlc-yxfont">{{userCount}}</p>
              <p class="numbertip2">剩余可抽{{userNum}}次</p>
            </div>
            <div class="loginedBox">
              <p class="numberTip">账号积分：<span @click="windowOpen('jifentipFlag')"></span></p>
              <p class="number phlc-yxfont">{{canUseIntegral}}</p>
              <p class="numbertip2">剩余可抽{{integralNum}}次</p>
            </div>
          </div>
          <div class="fengezhong"></div>
          <div class="rechargeList">
            <p class="listTip">
              <span></span>
              <span>净充值榜单</span>
              <span></span>
            </p>
            <div class="listBox">
              <div class="listBoxTip">
                <span>排名</span>
                <span>用户名</span>
                <span>净充值额(元)</span>
              </div>
              <div class="relist" v-show='isLogin'>
                <span>你<i></i></span>
                <span>{{userName}}</span>
                <span>{{fmoney(jingamount, 2)}}</span>
              </div>
              <div class="relist" v-show = 'rechargeRankList.length' v-for="(item, indedx) in rechargeRankList" v-bind:key="indedx">
                <span>{{indedx + 1}}</span>
                <span>{{item.userName}}</span>
                <span>{{fmoney(item.DEALAMOUNT)}}</span>
              </div>
              <p class="nomore" v-show = 'rechargeRankList.length'>到底了，没有更多啦~</p>
              <div class="kongstatusBox" v-show = '!rechargeRankList.length'>
              </div>
              <p class="kongTip" v-show = '!rechargeRankList.length'>暂未上榜普友哦〜</p>
              <div class="rule">
                <div class="fangBox"></div>
                <div class="ruleBox">
                  <p class="listTip2">
                    <span></span>
                    <span>净充值活动规则</span>
                    <span></span>
                  </p>
                  <p class="listTip3">1、净充值概念：净充值=活动期间的充值金额-提现金额；</p>
                  <p class="listTip3">2、充值榜单上榜的用户净充值满10万，可以获得价值500元的ELLE旅行箱一个;</p>
                  <p class="listTip3">3、净充值达100万且排在前3名的用户可获得超级大奖哟:</p>
                  <p class="listTip3">第一名：获得价值4000元的华为 HUAWEI P30 8GB+64GB手机一部</p>
                  <p class="listTip3">第二、三名：获得价值2000元的华为平板 M5 青春版 10.1英寸智能语音平板电脑一部</p>
                  <p class="listTip3">4、如出现相同金额，则取优先满足条件的用户；上榜用户只可获得一个实物奖励，且按照最高奖品发放；</p>
                  <p class="listTip3">5、获得实物奖品的用户，请在活动页面填写邮寄地址，实物奖品将在活动结束后的7个工作日内邮寄；</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <p class="tricky-bot">网贷有风险，出借需谨慎</p>
            <p class="botText1">© 2019 普惠理财(www.puhuilicai.com)</p>
            <p class="botText1">京ICP备14042685号-1</p>
          </div>
        </div>
      </div>
    </div>
    <!--抽奖弹框开始-->
    <!--抽奖弹框-->
    <div class="awardWindow" v-show='awardWindowFlag'>
      <p class="title"><span class="wo">WO</span>是真的，送你</p>
       <img :src="awardWindowSrc" alt="" class="awardImg" v-bind:class="{'awardImg89': prizeType === 2}"/>
       <p class="prizeName">{{awardWindowprizeName}}</p>
       <p class="award-window-title" v-show ='prizeType !== 2'>{{awardWindowprizeNameTip}}</p>
       <div class="awardDiv">
         <router-link tag="p" :to="{path: 'addressList', query:{type: '1'}}"  class="award-window-title clearfix" v-show = 'prizeType === 2'><span class="jiantoutip fl">{{addressStr}}</span><span class="jiantou fl"><i></i></span></router-link>
       </div>
       <div class="awardBtn" v-show="prizeType !== 2" v-on:click="windowClose('awardWindowFlag')">知道了</div>
       <div v-show="prizeType === 2" v-on:click="postAddress()" class="awardBtn">知道了</div>
    </div>
    <!--tishi-->
    <div class="tipBox" v-show='yaoqingtipFlag'>
      <div class="title"><span>邀请好友</span>·抽奖次数规则</div>
      <img :src="tipSrc" class="awardImg">
      <p class="">每邀请好友注册并完成实名绑卡</p>
      <p class="">可获得1次抽奖机会，无上限哦〜</p>
      <div class="konwBtn" @click="windowClose('yaoqingtipFlag')">知道了</div>
    </div>
    <div class="tipBox" v-show='fenxiangtipFlag'>
      <div class="title"><span>分享</span>·抽奖次数规则</div>
      <img :src="tipSrc2" class="awardImg">
      <p class="">每分享一次可获得一次机会</p>
      <p class="">最多可获得7次抽奖机会（每天最多一次）</p>
      <div class="konwBtn" @click="windowClose('fenxiangtipFlag')">知道了</div>
    </div>
    <div class="tipBox" v-show='jifentipFlag'>
      <div class="title"><span>积分</span>·抽奖次数规则</div>
      <img :src="tipSrc3" class="awardImg">
      <p class="">每消费600积分</p>
      <p class="">可获得1次抽奖机会，无上限哦〜</p>
      <div class="konwBtn" @click="windowClose('jifentipFlag')">知道了</div>
    </div>
    <div class="tipBox" v-show='chujietipFlag'>
      <div class="title"><span>出借</span>·抽奖次数规则</div>
      <img :src="tipSrc4" class="awardImg">
      <p class="">每出借10000元</p>
      <p class="">可获得1次抽奖机会，无上限哦~</p>
      <div class="konwBtn" @click="windowClose('chujietipFlag')">知道了</div>
    </div>
    <!--奖励列表-->
    <div class="window recordWindow" v-show="recordWindowFlag">
      <nav>
        <swiper class="nav" :options="navOption" ref="navSwiper">
          <swiper-slide class="phlc-swiper-active">卡券积分({{ recordData[0].totals }})</swiper-slide>
          <swiper-slide>实物列表({{ recordData[1].totals }})</swiper-slide>
        </swiper>
        <a href="javascript:void(0)" class="phlc-cursor-pointer window-close-button" v-on:click="windowClose('recordWindowFlag')">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </nav>
      <div>
        <swiper class="content-swiper height100" :options="contentOption" ref="contentSwiper">
          <swiper-slide class="height100">
            <div class="mescroll" id="mescroll0">
              <div class="content" id="scroll0">
                <dl class="award" v-for="(item, $index) in recordData[0].list" v-bind:key="$index">
                  <dt>
                    <img :src="imgStr(item.AWARDNAME)"/>
                    <span class="dated" v-show="item.USESTATUS === -1"></span>
                    <span class="user" v-show="item.USESTATUS === 3 || item.USESTATUS === 2"></span>
                    <span class="tran" v-show="item.USESTATUS === 5"></span>
                  </dt>
                  <dd class="voucher">
                    <p><span>{{ item.AWARDNAME}}</span><span>{{new Date(item.CREATETIME).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.')}}获得</span></p>
                    <p v-show="item.AWARDNAME.indexOf('返现券') !== -1">{{showtip(item.AWARDNAME)}} {{new Date(item.INVAILDTIME).format('yyyy-MM-dd').replaceAll('-', '.')}}到期</p>
                    <p v-show="item.AWARDNAME.indexOf('加息券') !== -1">{{showtip(item.AWARDNAME)}} {{new Date(item.INVAILDTIME).format('yyyy-MM-dd').replaceAll('-', '.')}}到期</p>
                  </dd>
                </dl>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="height100">
            <div class="mescroll" id="mescroll1">
              <div class="content" id="scroll1">
                <dl class="award" v-for="(item, $index) in recordData[1].list" v-bind:key="$index">
                  <dt class="shiwuImg">
                    <img :src="item.AWARDNAME.indexOf('华为P30手机') !== -1 ? require('./images/award-302.png') : require('./images/award-tizhi2.png')" v-bind:class="{'awardImg30': item.AWARDNAME.indexOf('华为P30手机') !== -1}" class="chengclass"/>
                  </dt>
                  <dd class="voucher">
                    <p><span>{{ item.AWARDNAME}}</span><span>{{new Date(item.CREATETIME).format('yyyy-MM-dd HH:mm:ss').replaceAll('-', '.')}}获得</span></p>
                    <p>{{item.RECEIVER}}  {{item.RECEIVERMOBILE}}</p>
                    <p>{{item.RECEIVERADDRESS}}</p>
                  </dd>
                </dl>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--jifen-->
    <div class="awardWindow2" v-show="awardWindow2Flag">
      <img :src="jifenSrc" class="awardImg2">
      <p class="jifenSrc">确定用<span class=" phlc-yxfont">600</span>积分抽奖？</p>
      <div class="jifenBox">
        <div class="left" @click="windowClose('awardWindow2Flag')">再看看</div>
        <div class="right" @click="qulotry">确定</div>
      </div>
    </div>
    <!--抽奖框结束-->
    <shareWindow></shareWindow>
  </div>
</template>
<script>
import Bus from '../../assets/js/bus.js'
import activityBack from '@/components/activityBack'
import { Indicator } from 'mint-ui'
import $ from 'jquery'
import shareWindow from '@/components/shareWindow'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Vue from 'vue'
export default {
  data () {
    const _this = this
    return {
      awardWindowprizeName: '',
      awardWindowprizeNameTip: '',
      mescrollIcon: require('./images/julyActiveykong.png'),
      backIcon: require('./images/julyActiveyback.png'),
      tipSrc: require('./images/yaoqingicon.png'),
      tipSrc2: require('./images/fenxiangicon.png'),
      tipSrc3: require('./images/jifenicon.png'),
      tipSrc4: require('./images/chujieicon.png'),
      jifenSrc: require('./images/jifenicon.png'),
      yaoqingtipFlag: false,
      fenxiangtipFlag: false,
      jifentipFlag: false,
      chujietipFlag: false,
      awardWindowFlag: false,
      recordWindowFlag: false,
      awardWindow2Flag: false,
      rechargeRankList: [],
      addressUser: '',
      addresstext: '',
      addressphone: '',
      userName: '',
      jingamount: 0,
      current: 0,
      thisRank: {},
      awardWindowSrc: require('./images/award-30.png'),
      awards: [
        {id: 1, name: '华为手机P30', img: require('./images/award-30.png')},
        {id: 2, name: '12%加息券', img: require('./images/award-12.png')},
        {id: 3, name: '188积分', img: require('./images/award-188.png')},
        {id: 8, name: '58元返现券', img: require('./images/award-58.png')},
        {id: 4, name: '118元返现券', img: require('./images/award-118.png')},
        {id: 7, name: '1%加息券', img: require('./images/award-10.png')},
        {id: 6, name: '8元返现券', img: require('./images/award-8.png')},
        {id: 5, name: '体脂秤', img: require('./images/award-tizhi.png')}
      ],
      rawardRecordId: 0,
      speed: 200,
      diff: 15,
      award: {},
      time: 0,
      maskFalg: false,
      isLogin: false,
      amount: 0,
      userCount: 0,
      userNum: 0,
      investAmount: 0,
      investNum: 0,
      num: 0,
      rewardPrizesNum: 0,
      numLeft: 0,
      canUseIntegral: 0,
      integralNum: 0,
      shareNum: 0,
      shareNumByDay: 0,
      isClick: true,
      addressmoren: '',
      address: [],
      addressStr: '',
      prizeType: 0,
      recordData: [{
        typeName: '卡券积分',
        type: 3,
        index: 0,
        list: [],
        isDown: false,
        scroll: null,
        field: 'voucherList',
        totals: 0
      }, {
        typeName: '实物列表',
        type: 2,
        index: 1,
        list: [],
        isDown: false,
        scroll: null,
        field: 'goodsList',
        totals: 0
      }],
      navOption: {
        slidesPerView: 2.4,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          click (event) {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.contentSwiper.slideTo(_this.contentSwiper.activeIndex === 1 ? 0 : 1)
            $('.phlc-close-header span').eq(this.activeIndex).addClass('color-e6382c').siblings().removeClass('color-e6382c')
          }
        }
      },
      contentOption: {
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionStart () {
            _this.navSwiper.slideTo(this.activeIndex === 1 ? 0 : 1)
            $('.nav .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      }
    }
  },
  activated () {
    this.$_muiPlus()
    this.$_init()
    if (this.awardWindowFlag) {
      $('body').append('<div class="mask-plugins" style="height: 667px; width: 375px;" ></div>')
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
  mounted () {
    Bus.$on('status', (data) => {
      if (data === 'award') {
        // console.log(this.awardWindowFlag)
        this.getActivityAddress()
      }
    })
    Bus.$on('status2', (data) => {
      if (data === 'Refresh') {
        this.$_muiPlus()
        this.$_init()
      }
    })
    this.$_muiPlus()
    for (var i in this.recordData) {
      this.recordData[i].scroll = new MeScroll('mescroll' + i, {
        down: {
          callback: this.$_downCallback,
          auto: false
        },
        up: {
          callback: this.$_upCallback,
          auto: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          noMoreSize: 1,
          empty: {
            warpId: 'scroll' + i,
            icon: this.mescrollIcon,
            tip: '咦，暂未获得奖品哦~',
            btntext: '',
            btnClick: null,
            supportTap: false
          }
        }
      })
    }
    this.$_init()
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.fun, false)
    }
  },
  methods: {
    qulotry () {
      this.lotry()
      this.awardWindow2Flag = false
      this.$mask.hide()
    },
    goaddress () {
      if (this.isLogin) {
        this.$router.push({name: 'addressList'})
      } else {
        this.toLogin('/addressList')
      }
    },
    $_muiPlus () {
      /* eslint-disable */
      mui.plusReady(() => {
        console.log('执行22222')
        // $('.plus-screen-scroll').css('padding', (plus.navigator.getStatusbarHeight()/100) +'rem 0 0 0')
        this.plus = plus
        Vue.prototype.plus = plus
        console.log(JSON.stringify(this.plus))
        this.updateSerivces()
        mui.init({
          beforeback: () => {
            console.log('活动物理返回')
            if (Vue.prototype.isMask) {
              if (this.awardWindowFlag) {
                this.postAddress()
                return false
              }
              this.$mask.hide()
              this.yaoqingtipFlag = false
              this.fenxiangtipFlag = false
              this.jifentipFlag = false
              this.chujietipFlag = false
              this.awardWindowFlag = false
              this.awardWindow2Flag = false
              return false
            } else {
              console.log(JSON.stringify(location.href.indexOf('julyActivity')))
              console.log(JSON.stringify(location.href.indexOf('julyActivity')))
              if (location.href.indexOf('julyActivity') !== -1) {
                console.log(JSON.stringify(location.href.indexOf('julyActivity')))
                var view = this.plus.webview.currentWebview().id
                this.plus.webview.close(view)
              } else {
                console.log(5555)
                this.$router.back(-1)
                return false
              }
            }
          }
        })
      })
      /* eslint-disable */
    },
    $_init () {
      this.getUserMsg()
      this.getRankList()
      this.getActivityAddress()
    },
    getActivityAddress () {
      this.axios({
        url: this.HOST + '/activity-server/integral/v1/getActivityAddress',
        method: 'GET',
        params: {},
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
        // console.log(res)
        if (res.data.data.code === 1) {
          if (res.data.data.address.length) {
            this.address = res.data.data.address
            this.addressStr = '收货地址：' + res.data.data.address[0].receiver + res.data.data.address[0].receiverMobile + res.data.data.address[0].receiverProvince
            this.addressUser = res.data.data.address[0].receiver
            this.addressphone = res.data.data.address[0].receiverMobile
            this.addresstext = res.data.data.address[0].receiverProvince + res.data.data.address[0].receiverCity + res.data.data.address[0].receiverArea + res.data.data.address[0].receiverAddress
          } else {
            this.addressStr = '添加收货地址'
          }
        }
      }).catch((err) => {
        if (err) {
          this.$layer.toast('查询地址失败！')
        }
      })
    },
    getUserMsg () {
      var params = {
        activityId: 'julyActivity2019'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/getActivityDetail',
        method: 'GET',
        params: params,
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
        // console.log(res)
        if (res.data.data.data.code === 1) {
          this.isLogin = true
          this.amount = res.data.data.data.amount
          this.userCount   = res.data.data.data.userCount 
          this.userNum = res.data.data.data.userNum
          this.investAmount = res.data.data.data.investAmount
          this.investNum = res.data.data.data.investNum
          this.num = res.data.data.data.num
          this.userName = res.data.data.data.userName
          this.numLeft = res.data.data.data.numLeft
          this.canUseIntegral = res.data.data.data.canUseIntegral
          this.integralNum = res.data.data.data.integralNum
          this.shareNum = res.data.data.data.shareNum
          this.shareNumByDay = res.data.data.data.shareNumByDay
          // console.log(res.data.data.data)
        } else if (res.data.data.data.code === 100002) { /* 不在活动范围内 */
          this.isLogin = true
          this.$layer.toast(res.data.data.data.msg)
        } else { /* 暂未登录 */
          this.isLogin = false
          this.$layer.toast(res.data.data.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    start () {
      // 开始抽奖
      this.drawAward()
      this.time = Date.now()
      this.speed = 200
      this.diff = 15
    },
    drawAward () {
      // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
      if (this.isLogin) {
        if (this.isClick) {
          if (this.investNum < 1 && this.integralNum > 0 && this.shareNumByDay < 1 &&this.userNum < 1) {
            this.windowOpen ('awardWindow2Flag')
            return false
          }
          this.lotry()
        } else {
          // console.log('正在搞')
        }
      } else {
        this.toLogin('/julyActivity')
      }
    },
    lotry () {
      this.isClick = false
      var params = {
        activityId: 'julyActivity2019'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      var _this = this
      // console.log(params)
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/luckDraw',
        method: 'POST',
        params: {},
        data: params,
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
        }],
        timeout: this.axiosTimeout
      }).then((res) => {
        // console.log(res.data.data.data)
        this.$_init()
        if (res.data.data.data.code === 1) {
          // console.log(res.data.data.data)
          this.rawardRecordId = res.data.data.data.prizeId
          this.prizeType = res.data.data.data.prizeType
          if (res.data.data.data.prizeName === '8元返现券') {
            this.award = {
              id: 6,
              name: '8元返现券'
            }
            this.awardWindowprizeName = '8元返现券'
            this.awardWindowprizeNameTip = '出借2000元/期限90天以上可用'
            this.awardWindowSrc = require('./images/award-82.png')
          } else if (res.data.data.data.prizeName === '58元返现券') {
            this.award = {
              id: 8,
              name: '58元返现券'
            }
            this.awardWindowprizeName = '58元返现券'
            this.awardWindowprizeNameTip = '出借15000元/期限90天以上可用'
            this.awardWindowSrc = require('./images/award-582.png')
          } else if (res.data.data.data.prizeName === '118元返现券') {
            this.award = {
              id: 4,
              name: '118元返现券'
            }
            this.awardWindowprizeName = '118元返现券'
            this.awardWindowprizeNameTip = '出借30000元/期限90天以上可用'
            this.awardWindowSrc = require('./images/award-1182.png')
          } else if (res.data.data.data.prizeName === '188积分') {
            this.award = {
              id: 3,
              name: '188积分'
            }
            this.awardWindowprizeName = '188积分'
            this.awardWindowprizeNameTip = ''
            this.awardWindowSrc = require('./images/award-1882.png')
          } else if (res.data.data.data.prizeName === '10‰加息券') {
            this.award = {
              id: 7,
              name: '加息券'
            }
            this.awardWindowprizeName = '10‰加息券'
            this.awardWindowprizeNameTip = '出借0-20万元'
            this.awardWindowSrc = require('./images/award-102.png')
          } else if (res.data.data.data.prizeName === '12‰加息券') {
            this.award = {
              id: 2,
              name: '12‰加息券'
            }
            this.awardWindowprizeName = '12‰加息券'
            this.awardWindowprizeNameTip = '出借0-20万元'
            this.awardWindowSrc = require('./images/award-122.png')
          } else if (res.data.data.data.prizeName === '华为体脂秤') {
            this.award = {
              id: 5,
              name: '华为体脂秤'
            }
            this.awardWindowprizeName = '华为体脂秤'
            this.awardWindowprizeNameTip = ''
            this.awardWindowSrc = require('./images/award-tizhi2.png')
          } else if (res.data.data.data.prizeName === '华为P30手机') {
            this.award = {
              id: 1,
              name: '华为P30手机'
            }
            this.awardWindowprizeName = '华为P30手机'
            this.awardWindowprizeNameTip = ''
            this.awardWindowSrc = require('./images/award-302.png')
          }
          /*setTimeout(() => {
            this.award = {
              id: '4',
              name: '笨驴'
            }
          }, 1000)*/
          this.move()
        } else if (res.data.data.data.code === 100001) {
          this.isLogin = false
          this.toLogin('/julyActivity')
        } else {
          _this.isClick = true
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
      }).catch((err) => {
        _this.isClick = true
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
    },
    $_downCallback (mescroll) {
      if (this.isLogin) {
        let pageData = this.recordData[mescroll.optUp.empty.warpId.split("scroll")[1]]
        pageData.isDown = true
        pageData.scroll.resetUpScroll(true)
      } else {
        this.toLogin('/julyActivity')
      }
    },
    $_upCallback (page, mescroll) {
      if (this.isLogin) {
        let pageData = this.recordData[mescroll.optUp.empty.warpId.split("scroll")[1]]
        var params = {
          activityId: 'julyActivity2019',
          page: page.num,
          rows: page.size,
          prizeType: pageData.type
        }
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/getPrizeList',
          method: 'GET',
          params: params,
          data: {},
          timeout: this.axiosTimeout
        }).then((res) => {
          // console.log(res.data.data.data.prizeList)
          if (res.data.data.data.code === 1) {
            if (pageData.isDown) {
              pageData.list = []
              pageData.isDown = false
              pageData.totals = res.data.data.data.prizeList.total
              pageData.scroll.endSuccess()
              mescroll.scrollTo(0,0)
            }
            pageData.list = pageData.list.concat(res.data.data.data.prizeList.list)
            pageData.scroll.endByPage(pageData.list.length, Math.ceil(pageData.totals / page.size))
          } else if (res.data.data.data.code === 100001) {
            this.isLogin = false
            this.toLogin('/julyActivity')
          } else {
            this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
          }
        }).catch((err) => {
          if (err) {
            console.log(err)
            this.$layer.toast('查询失败，请重新尝试！')
          }
        })
      } else {
        this.toLogin('/julyActivity')
      }
    },
    move () {
      window.timeout = setTimeout(() => {
        this.current++
        if (this.current > 8) {
          this.current = 0
        }
        if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
          this.speed += this.diff
          // console.log(this.awards[this.current].id)
          // console.log(this.award.id)
          // console.log(this.current)
          if ((Date.now() - this.time) / 1000 > 4 && +this.award.id === +this.current) {
            clearTimeout(window.timeout)
            this.isClick = true
            setTimeout(() => {
              this.awardWindowFlag = true
              this.$mask.show()
            }, 0)
            return
          }
        } else {
          this.speed -= this.diff
        }
        // console.log(this.speed)
        this.move()
      }, this.speed)
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    windowOpen (flag) {
      if (flag === 'recordWindowFlag'){
        if (this.isLogin) {
          for(var i in this.recordData) {
            this.recordData[i].scroll.triggerDownScroll()
          }
        } else {
          this.toLogin('/julyActivity')
          return
        }
      }
      this[flag] = true
      this.$mask.show()
    },
    imgStr (name) {
      if (name === '118元返现券') {
        return require('./images/award-1182.png')
      } else if (name === '58元返现券') {
        return require('./images/award-582.png')
      } else if (name === '10‰加息券') {
        return require('./images/award-102.png')
      } else if (name === '8元返现券') {
        return require('./images/award-82.png')
      } else if (name === '12‰加息券') {
        return require('./images/award-122.png')
      } else if (name === '188积分') {
        return require('./images/award-1882.png')
      }
    },
    getRankList () {
      var params = {
          activityId: 'julyActivity2019',
          dealType: 1,
          listLength: 10
        }
        if (this.$route.query.userId && this.$route.query.isLogin) {
          params.userId = Math.floor(this.$route.query.userId)
          params.isLogin = Math.floor(this.$route.query.isLogin)
        }
        var _this = this
        // console.log(params)
        this.axios({
          url: this.HOST + '/activity-server/activityInfo/v1/getRankList',
          method: 'GET',
          params: params,
          data: {},
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
          }],
          timeout: this.axiosTimeout
        }).then((res) => {
          // console.log(res.data.data)
          if (res.data.data.data.code === 1 || res.data.data.data.code === 100001) {
            this.rechargeRankList = res.data.data.data.dealList
            this.thisRank = res.data.data.data.code === 1 ? res.data.data.data.dealInfo : {}
            this.jingamount = this.thisRank.DEALAMOUNT
          } else {
            this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
          }
        }).catch((err) => {
        _this.isClick = true
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
    },
    share () {
      if (this.isLogin) {
        /* eslint-disable */
        if (this.plus) {
        /* eslint-disable */
          this.shareConfig()
          this.appShare(true)
        } else {
          $('#share-window').show()
          this.shareConfig()
        }
      } else {
        this.toLogin('/julyActivity')
      }
    },
    shareConfig () {
      /* eslint-disable */
      if (this.plus) {
      /* eslint-disable */
        this.shareObj = {
          // href: 'http://zuul.puhuilicai.com:7777/phlcweixin/julyActivity',
          href: 'http://weixin.puhuilicai.com/weixin/content/julyActivity',
          title: '来普惠理财，让你的钱包鼓起来',
          content: '运转七月，源源不断-普惠理财！',
          thumbs: ['https://www.puhuilicai.com/commonFiles/focus_image/20181101/20181101163526191.png'],
          type: 'web',
          callback: () => {
            this.shareCallback()
          }
        }
      } else {
        this.wxShare({
          title: '来普惠理财，让你的钱包鼓起来',
          desc: '运转七月，源源不断-普惠理财!',
          // url: 'http://zuul.puhuilicai.com:7777/phlcweixin/julyActivity',
          url: 'http://weixin.puhuilicai.com/weixin/content/julyActivity',
          callback: () => {
            this.shareCallback()
          }
        })
      }
    },
    shareCallback () {
      // console.log(this.isLogin)
      var params = {
        activityId: 'julyActivity2019',
        shareUrl: 'http://weixin.puhuilicai.com/weixin/content/julyActivity'
        // shareUrl: 'http://zuul.puhuilicai.com:7777/phlcweixin/julyActivity'
      }
      if (this.$route.query.userId && this.$route.query.isLogin) {
        params.userId = Math.floor(this.$route.query.userId)
        params.isLogin = Math.floor(this.$route.query.isLogin)
      }
      this.axios({
        url: this.HOST + '/activity-server/activityInfo/v1/addShareInfo',
        method: 'POST',
        params: {},
        data: params,
        transformRequest: [(data, headers) => {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          return this.$qs.stringify(data)
        }],
        transformResponse: [(data, headers) => {
          Indicator.close()
          return JSON.parse(data)
        }],
        timeout: this.axiosTimeout
      }).then((res) => {
        this.$_init()
        // console.log(JSON.stringify(res))
        if (res.data.data.data.code === 1) {
          
        } else {
          this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
        }
      })
    },
    postAddress () {
      // console.log('dizhi')
      this.axios({
        url: this.HOST + '/activity-server/integral/v1/getActivityAddress',
        method: 'GET',
        params: {},
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
        // console.log(res)
        if (res.data.data.code === 1) {
          // console.log(res)
          var data = res.data.data.address
          if (data.length) {
            // console.log('ssssssssss')
            this.axios({
              url: this.HOST + '/activity-server/activityInfo/v1/saveAddrForActivity',
              method: 'POST',
              params: {},
              data: {
                activityId: 'julyActivity2019',
                isLogin: this.isLogin ? 1 : 0,
                receiver: data[0].receiver,
                receiverMobile: data[0].receiverMobile,
                receiverAddress: data[0].receiverCity + data[0].receiverArea + data[0].receiverAddress,
                rawardRecordId: this.rawardRecordId,
                userId: this.$route.query.userId ? Math.floor(this.$route.query.userId) : ''
              },
              transformRequest: [(data, headers) => {
                Indicator.open({
                  text: '加载中...',
                  spinnerType: 'fading-circle'
                })
                return this.$qs.stringify(data)
              }],
              transformResponse: [(data, headers) => {
                Indicator.close()
                return JSON.parse(data)
              }],
              timeout: this.axiosTimeout
            }).then((res) => {
              // console.log(res.data.data.data.code)
              // console.log(typeof res.data.data.data.code)
              if (res.data.data.data.code === 1) {
                this.windowClose('awardWindowFlag')
                $('.mask-plugins').hide()
              } else {
                this.$layer.toast(res.data.data.data.msg ? res.data.data.data.msg : '查询失败，请重新尝试！')
              }
            })
          } else {
            this.$layer.toast('请填写收货地址！')
          }
        } else if (res.data.data.code === 1111) {
          this.toLogin('/julyActivity')
        } else {
          this.$layer.toast('查询失败，')
        }
      }).catch((err) => {
        console.log(err)
        if (err) {
          this.$layer.toast('查询失败，请')
        }
      })
    },
    showtip (name) {
      if (name === '118元返现券') {
        return '出借30000元/期限90天起可用/'
      } else if (name === '58元返现券') {
        return '出借15000元/期限90天起可用/'
      } else if (name === '10‰加息券') {
        return '出借0-20万元/'
      } else if (name === '8元返现券') {
         return '出借2000元/期限90天起可用/'
      } else if (name === '12‰加息券') {
        return '出借0-20万元/'
      } else if (name === '188积分') {
        return ''
      } else {
        return ''
      }
    }
  },
  components: {
    activityBack,
    swiper,
    swiperSlide,
    shareWindow
  }
}
</script>
<style lang="less">
@import url("julyActivity.less");
</style>
