<template>
 <div id="dailyCheckIn-view" class="plus-screen-view">
   <div class="mask" v-show="maskFalg"></div>
   <header class="phlc-back-header toggle-header">
    <i href="javascript:void(0)" class="phlc-set-back iconfont icon-fanhui" v-on:click="routerback()"></i>
    <router-link to="/checkInRule" class="phlc-my-red-bag-service phlc-cursor-pointer iconfont">兑换福利</router-link>
   </header>
   <div class="plus-screen-content mescroll">
     <div class="plus-screen-scroll">
       <div class="statistical">
         <p style="font-size:.34rem;">累计连续签到 <span style="font-size:.48rem;">{{ signDays }}</span> 天</p>
         <p style="font-size:.26rem;">继续签到{{ keepOnHavePrize.subDays }}天可获得 {{ keepOnHavePrize.prize }}</p>
         <router-link to="/checkInRule" class="checkInRule">签到规则</router-link>
       </div>
       <div class="signIn-content">
         <span class="change-btn" v-on:click="changeTypeWeek()">{{ typeWeek === 1 ? '收起' : '展开' }} <i class="icon-arrow" :class="typeWeek === 1 ? 'top' : 'bottom'"></i></span>
         <span class="sign-btn" :class="isSign === true ? 'signed-in' : ''" v-on:click="sign()">{{ isSign === true ? '已签到' : '立即签到' }}</span>
         <div class="canlendarPanel">
          <div class="canlendar-header" v-show="!typeWeek">
            <p class="pre">
              <span @click="changeDate('preMonth')">
                <i class="icon left-small-icon" :class="{'opacity':`${this.year}-${this.month > 9 ? this.month : '0' + this.month}` <= startTime}"></i>
              </span>
            </p>
            <p class="currenDate">{{ `${year}年${month}月` }}</p>
            <p class="next">
              <span @click="changeDate('nextMonth')">
                <i class="icon right-small-icon" style="margin-left: -3px;" :class="{'opacity':month >= (new Date().getMonth() + 1)}"></i>
              </span>
            </p>
          </div>
          <div class="canlendar-main">
            <div>
                <ul class="main week" v-if="typeWeek" key="week">
                  <li v-for="item of weekList" :key="item.date">
                    <span class="i-coin" :class="item.status === 2 ? 'signed' : 'unsigned'">
                      <i v-on:click="windowOpen('repairWindowFlag')"
                      class="repair-icon"
                      :class="((item.status === 1 && (new Date(new Date().getTime() - 24 * 60 * 60 * 1000).format('yyyy-MM-dd')) === item.date) && item.date >= startTime)? 'repair-img' : ''"></i>
                    </span>
                    <span :class="{'signed-text':item.status === 2, 'missedSign-text':item.status === 1, 'unsigned-text': item.status === 3}">
                        {{(weekMonth > 9 ? weekMonth : '0' + weekMonth) + '.' + (item.showDate > 9 ? item.showDate : '0' + item.showDate)}}
                    </span>
                  </li>
                </ul>
                <ul class="main month" v-else key="month">
                  <li v-for="inx in weekDay" class="disabled" :key="inx">
                    <span class="i-coin unsigned"></span>
                    {{ (preMonth > 9 ? preMonth : '0' + preMonth) + '.' + (preMonthSize - weekDay + inx) }}
                  </li>
                  <li v-for="item of monthList" :key="item.date">
                    <span class="i-coin" :class="item.status === 2 ? 'signed' : 'unsigned'"><i v-on:click="windowOpen('repairWindowFlag')" class="repair-icon" :class="(item.status === 1 && (new Date(new Date().getTime() - 24 * 60 * 60 * 1000).format('yyyy-MM-dd')) === item.date)? 'repair-img' : ''"></i></span>
                    <span :class="{'signed-text':item.status === 2, 'missedSign-text':item.status === 1, 'unsigned-text':item.status === 3}">
                      {{ (month > 9 ? month : '0' + month) + '.' + (item.showDate > 9 ? item.showDate : '0' + item.showDate) }}</span
                    >
                  </li>
                </ul>
            </div>
          </div>
        </div>
       </div>
     </div>
   </div>
   <!-- 弹窗 连续签到获奖 -->
   <div class="window" v-show="winWindowFlag">
     <img src="../../assets/images/window-img-2.png" alt="" class="winImg"/>
     <p class="text-32 text-color-222" v-show="isContinuousSignIn">您已连续签到 <span class="text-48 text-color-FF5A00">{{ signDays }}</span> 天</p>
     <p class="text-32 text-color-222" v-show="signInSuccess" style="margin-bottom:.31rem;">{{ signInSuccessText }}</p>
     <p class="text-26 text-color-444">奖励
       <span v-for="(item, index) in prize" :key="index">
         {{ prize.length > 1 ? item + '、' : item }}
       </span>
     </p>
     <div class="knowbtn" v-on:click="windowClose('winWindowFlag')">知道了</div>
   </div>
   <!-- 弹窗 补签 -->
   <div class="window tipswindow" v-show="repairWindowFlag">
     <img src="../../assets/images/tips-img.png" alt="" class="tipsImg"/>
     <p class="text-28 text-color-222">补签需花费 <span class="text-40 text-color-FF5A00">50</span> 积分，是否补签？</p>
     <p class="btn-group">
       <i class="cancel" v-on:click="windowClose('repairWindowFlag')">取消</i>
       <i class="repair" v-on:click="repairSign()">立即补签</i>
     </p>
   </div>
 </div>
</template>

<script>
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default {
  data () {
    return {
      maskFalg: false,
      backIcon: require('../../assets/images/phlc-common-fanhui.png'),
      startTime: '2019-07-10',
      isLogin: false,
      winWindowFlag: false,
      repairWindowFlag: false,
      isContinuousSignIn: false, // 是否是连续签到的提示文字
      signInSuccess: false, // 是否是补签成功的提示文字
      signInSuccessText: '',
      year: 0,
      month: 0,
      weekMonth: 0,
      day: 0,
      newDate: new Date(),
      weekList: [],
      monthList: [],
      monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      weekDay: 1,
      lastWeekDay: 1,
      preMonthSize: 0,
      typeWeek: true, // 日历类型 1：月日历； 2：周日历
      preMonth: 0,
      signDays: 0, // 累计签到天数
      keepOnHavePrize: {}, // 继续签到所获奖励
      prize: [],
      daysList: [], // 签到日期列表
      isLeak: false, // 昨天是否漏签
      isSign: false // 今天是否签到
    }
  },
  created () {
    console.log('活动开始时间前一天' + this.startTime)
  },
  mounted () {
    this.$_init()
    // console.log('昨天' + this.getDateStr(-1))
  },
  methods: {
    routerback () {
      this.$router.back(-1)
    },
    $_init () {
      this.getSignDays()
      this.getResult()
      this.getListSignDate()
      this.getCurrentDate()
      this.initDate()
      this.preMonthSize = this.mGetDate(this.year, this.month, 0)
    },
    // 累计出借天数
    getSignDays () {
      let _this = this
      this.axios({
        url: this.HOST + '/activity-server/sign/v1/getSignDays',
        method: 'get',
        params: {},
        data: {},
        timeout: 5000,
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        // console.log(res)
        if (!res.data.data.code) {
          this.signDays = res.data.data.signDays
          this.keepOnHavePrize = res.data.data.prize
          this.isSign = res.data.data.isSign
        }
      })
    },
    // 签到
    sign () {
      let _this = this
      this.axios({
        url: this.HOST + '/activity-server/sign/v1/sign',
        method: 'post',
        params: {},
        data: {},
        timeout: 5000,
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        // console.log(res)
        if (res.data.data.code === 1) {
          this.isLeak = res.data.data.isLeak
          this.prize = res.data.data.prize
          this.windowOpen('winWindowFlag')
          this.signInSuccess = true
          this.signInSuccessText = '您已成功签到！'
        } else if (res.data.data.code === '100001') {
          this.$layer.toast('今日已签到!')
        } else {
          // this.toLogin('/dailyCheckIn')
        }
      })
    },
    // 获取签到日期列表
    getListSignDate () {
      console.log('1111')
      // this.daysList = ['2019-07-11']
      // this.daysList = ['2019-07-08', '2019-07-10', '2019-07-11', '2019-07-12']
      // this.daysList = ['2019-07-07', '2019-07-09', '2019-07-12']
      if (this.typeWeek === 1) { // 月日历
        this.ergodicFun(this.monthList, this.daysList)
      } else {
        this.ergodicFun(this.weekList, this.daysList)
      }
      let _this = this
      this.axios({
        url: this.HOST + '/activity-server/sign/v1/listSignDate',
        method: 'get',
        params: {
          month: `${this.year}-${this.month > 9 ? this.month : '0' + this.month}`
        },
        data: {
          month: `${this.year}-${this.month > 9 ? this.month : '0' + this.month}`
        },
        timeout: 5000,
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
      console.log(res)
        if (res.data.data.daysList) {
          this.isLogin = true
          if (res.data.data.daysList !== []) {
            this.daysList = res.data.data.daysList
            this.daysList = ['2019-07-07', '2019-07-09', '2019-07-12']
            if (this.typeWeek === 1) { // 月日历
              this.ergodicFun(this.monthList, this.daysList)
            } else {
              this.ergodicFun(this.weekList, this.daysList)
            }
          }
        } else {
          this.isLogin = false
          this.$layer.toast(res.data.data.msg)
        }
      })
    },
    ergodicFun (arr1, arr2) {
      console.log(arr1)
      for (var i = 0; i < arr1.length; i++) {
        var o = arr1[i]
        var m = 0
        for (var j = 0; j < arr2.length; j++) {
          var date = new Date().format('yyyy-MM-dd')
          if (o['date'] === arr2[j]) {
            o['status'] = 2 // 已签到
          } else {
            m += 1
          }
          if (m === arr2.length) {
            if (o['date'] < date) {
              o['status'] = 1 // 漏签
            } else {
              o['status'] = 3 // 未签到
            }
          }
        }
      }
    },
    // 补签
    repairSign () {
      let _this = this
      this.axios({
        url: this.HOST + '/activity-server/sign/v1/repairSign',
        method: 'post',
        params: {},
        data: {},
        timeout: 5000,
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        console.log(res)
        if (res.data.data.code === '100002') {
          this.$layer.toast('积分不足，暂时无法补签')
        } else if (res.data.data.code === '1') {
          this.windowClose('repairWindowFlag')
          setTimeout(() => {
            this.windowOpen('winWindowFlag')
            this.signInSuccess = true
            this.prize = res.data.data.prize
          }, 1000)
        } else {
          this.$layer.toast(res.data.data.desc)
        }
      })
    },
    windowOpen (flag) {
      this.windowflag = flag
      $('body').css('overflow', 'hidden')
      if (this.isLogin) {
        this[flag] = true
        this.maskFalg = true
      } else {
        this.toLogin('/dailyCheckIn')
      }
    },
    windowClose (flag) {
      $('body').css('overflow', 'auto')
      this[flag] = false
      this.maskFalg = false
      this.$_init()
    },
    mGetDate (year, month) {
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    // 获得今天的日期， 以下是月日历的方法
    getCurrentDate () {
      const date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.weekMonth = date.getMonth() + 1
      this.day = date.getDate()
    },
    // 根据年月日获得为星期几
    getWeekDay (year, month, day) {
      return new Date(`${year}/${month}/${day}`).getDay() === 0 ? 7 : new Date(`${year}/${month}/${day}`).getDay()
    },
    initDate () {
      if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) {
        this.monthDays[1] = 29
      } else {
        this.monthDays[1] = 28
      }
      // 获得指定年月的1号是星期几
      const firstDay = this.getWeekDay(this.year, this.month, 1)
      // 在1号前面填充多少个上个月的日期
      this.weekDay = firstDay === 1 ? 0 : firstDay - 1
      this.preMonth = this.month
      if (this.month === 1) {
        this.preMonth = 12
      } else {
        this.preMonth -= 1
      }
      console.log('现在的月份' + this.month)
      var temTime = new Date(this.year, this.month - 1, 1)
      console.log('现在的时间' + temTime)
      var arr = []
      for (var i = 0; i < this.monthDays[this.month - 1]; i++) {
        var ymd = temTime.format('yyyy-MM-dd')
        arr.push({
          'date': ymd,
          'tips': 0,
          'status': 0, // 1是未签到，2是已签到，3是漏签
          'showDate': temTime.getDate()
        })
        temTime.setDate(temTime.getDate() + 1)
      }
      this.monthList = arr
      this.getListSignDate()
      // console.log(this.monthList)
    },
    changeDate (type) {
      var newTime = `${this.year}-${this.month > 9 ? this.month : '0' + this.month}`
      switch (type) {
        case 'preMonth':
          // 当前月份为1月， 上一个月分为12月，年份减1
          if (newTime > this.startTime) {
            if (this.month === 1) {
              this.month = 12
              this.year -= 1
            } else {
              this.month -= 1
            }
            this.initDate()
          }
          break
        case 'nextMonth':
          // 当前月份为12月， 下个月分为1月，年份加1
          if (newTime < new Date().format('yyyy-MM')) {
            if (this.month === 12) {
              this.month = 1
              this.year += 1
            } else {
              this.month += 1
            }
            this.initDate()
          }
          break
        default:
          break
      }
    },
    // 以下是周日历的方法
    getMonDate (test) {
      if (test.getDay() === 1) {
        return test
      } else {
        if (test.getDay() === 0) {
          test.setDate(test.getDate() - 6)
        } else {
          test.setDate(test.getDate() - test.getDay() + 1)
        }
        return test
      }
    },
    getResult () {
      var time = new Date()
      var timeobj = this.getMonDate(time) // timeobj是当前星期一的日期对象
      // console.log(timeobj)
      var temTime = new Date(timeobj.getTime()) // 当前星期一对象转换成时间戳
      // console.log(temTime)
      var arr = []
      for (var i = 0; i < 7; i++) {
        var ymd = temTime.format('yyyy-MM-dd')
        arr.push({
          'date': ymd,
          'tips': 0,
          'status': 0, // 1是未签到，2是已签到，3是漏签
          'showDate': temTime.getDate()
        })
        temTime.setDate(temTime.getDate() + 1)
      }
      this.weekList = arr
      // console.log(this.weekList)
    },
    getDateStr (AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1 // 获取当前月份的日期
      var d = dd.getDate()
      return y + '-' + (m > 9 ? m : '0' + m) + '-' + (d > 9 ? d : '0' + d)
    },
    // 展开收起
    changeTypeWeek () {
      if (this.typeWeek === 1) {
        this.typeWeek = 2
      } else {
        this.typeWeek = 1
      }
      this.$_init()
    }
  },
  components: {
  }
}
</script>

<style lang="less">
@import url("../../assets/style/mine/dailyCheckIn.less");
</style>
