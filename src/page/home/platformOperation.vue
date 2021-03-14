<template>
 <div id="platformOperation-view" class="plus-screen-view">
   <scrollHeader :scrollHeadText = "platformOperation"></scrollHeader>
   <div class="project-introduce-content plus-screen-content mescroll">
     <div class="bigbg">
       <div class="platbg">
        <div class="plus-screen-scroll">
          <!-- 内容一 -->
          <section class="sectionall section1">
            <p><img src="../../assets/images/platformOperationSteady.png" class="steady"/></p>
            <p><img src="../../assets/images/platformOperationlu.png" class="steady2"/></p>
            <p class="platformOperationTip"><img src="../../assets/images/platformOperationTip.png"/></p>
            <p class="platformOperationTip2"><img src="../../assets/images/platformOperationTip2.png"/></p>
          </section>
          <!-- 内容二 -->
          <section class="sectionall section2">
            <div class="swiper-slide2-cont">
              <p class="clearfix slide2-little"><span class="fl">运营概况</span><span class="fr"><i id="date5" class="fl"></i></span></p>
              <p class="platformOperationheng"><img src="../../assets/images/platformOperationheng.png"></p>
              <ul class="platform-ul">
                <li class="clearfix reward-li">
                  <div class="fl"><img src="../../assets/images/platformOperationReward.png"/></div>
                  <div class="fl reward-tip">
                    <p>累计借款总额</p>
                    <p class="phlc-yxfont bidSum">0</p>
                    <p>≈<i class="phlc-yxfont bidSum2">0</i>亿元</p>
                  </div>
                </li>
                <li class="clearfix reward-li">
                  <div class="fl"><img src="../../assets/images/platformOperationfinancing.png"/></div>
                  <div class="fl reward-tip">
                    <p>历史出借回报总额</p>
                    <p class="phlc-yxfont incomeSum">0</p>
                    <p>≈<i class="phlc-yxfont incomeSum2">0</i>千万元</p>
                  </div>
                </li>
                <li class="clearfix reward-li">
                  <div class="fl"><img src="../../assets/images/platformOperationCount.png"/></div>
                  <div class="fl reward-tip">
                    <p>安全运行天数</p>
                    <p class="phlc-yxfont dateCount">0</p>
                    <p>=<i class="phlc-yxfont dateYear">0</i></p>
                  </div>
                </li>
                <li class="clearfix reward-li">
                  <div class="fl"><img src="../../assets/images/platformOperationPeople.png"/></div>
                  <div class="fl reward-tip">
                    <p>出借用户数</p>
                    <p class="phlc-yxfont platpeople">0</p>
                    <p>≈<i class="phlc-yxfont platpeople2">0</i>万人</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <!-- 内容三 -->
          <section class="sectionall section3">
            <div class="swiper-slide2-cont">
              <p class="clearfix slide2-little">
                <span class="fl">交易总额</span>
                <span class="fr clearfix">
                  <i class="fl">
                    <input type="text" class="date"
                    name="date" id="date1" placeholder="选择日期"
                    readonly="readonly" @click="openPicker"
                    :value="date1"/>
                  </i>
                  <i class="platformArrow fl"><img src="../../assets/images/platformOperatjiantou.png"/></i>
                </span>
              </p>
              <p class="platformOperationheng"><img src="../../assets/images/platformOperationheng.png"></p>
              <p class="swiper-slide3-tip phlc-yxfont phlc-first-black-color dealAccount">2,421,945,190.2</p>
              <p class="swiper-slide3-tip2 phlc-second-black-color">本月交易总额比上月<i class="morestatus">多了</i><span><i class="subDealAccount">XXXX</i>元</span></p>
              <p class="swiper-slide3-tip3 phlc-second-black-color">各类项目占比<span></span></p>
              <div class="circle-box">
                <div class="circle">
                  <canvas id="canvas_1" width="372" height="372" style="width:3.72rem;height: 3.72rem;"></canvas>
                  <canvas id="canvas_2" width="372" height="372" style="width:3.72rem;height: 3.72rem;"></canvas>
                  <canvas id="canvas_3" width="278" height="278" style="width:2.78rem;height: 2.78rem;"></canvas>
                  <canvas id="canvas_4" width="278" height="278" style="width:2.78rem;height: 2.78rem;"></canvas>
                  <canvas id="canvas_5" width="182" height="182" style="width:1.82rem;height: 1.82rem;"></canvas>
                  <canvas id="canvas_6" width="182" height="182" style="width:1.82rem;height: 1.82rem;"></canvas>
                  <canvas id="canvas_7" width="92" height="92" style="width:.92rem;height: .92rem;"></canvas>
                  <canvas id="canvas_8" width="92" height="92" style="width:.92rem;height: .92rem;"></canvas>
                </div>
                <ul class="circle-ul">
                  <li class="circle-li clearfix">
                    <span class="circleR fl hexin"></span>
                    <span class="circleTip fl phlc-first-black-color">核心保</span>
                    <span class="circleTxt fl phlc-first-black-color phlc-yxfon hexinbao">40%</span>
                  </li>
                  <li class="circle-li clearfix">
                    <span class="circleR fl ling"></span>
                    <span class="circleTip fl phlc-first-black-color">惠民保</span>
                    <span class="circleTxt fl phlc-first-black-color phlc-yxfon huiminbao">40%</span>
                  </li>
                  <li class="circle-li clearfix">
                    <span class="circleR fl hui"></span>
                    <span class="circleTip fl phlc-first-black-color">零供保</span>
                    <span class="circleTxt fl phlc-first-black-color phlc-yxfon linggongbao">40%</span>
                  </li>
                  <li class="circle-li clearfix">
                    <span class="circleR fl si"></span>
                    <span class="circleTip fl phlc-first-black-color"> 环境保</span>
                    <span class="circleTxt fl phlc-first-black-color phlc-yxfon qitabao">40%</span>
                  </li>
                </ul>
              </div>
              <p class="total-bot phlc-first-black-color">咦，您只贡献了 <span><i class="contribution">0</i>元</span>，加油哦！</p>
            </div>
          </section>
          <!-- 内容四 -->
          <section class="sectionall section4">
            <div class="swiper-slide2-cont">
              <p class="clearfix slide2-little">
                <span class="fl">还款总额</span>
                <span class="fr clearfix">
                  <i class="fl">
                    <input type="text" name="date" placeholder="选择日期"
                    class="date" id="date2" @click="openPicker"
                    readonly="readonly" :value="date1"/>
                  </i>
                  <i class="platformArrow fl"><img src="../../assets/images/platformOperatjiantou.png"/></i>
                </span>
              </p>
              <p class="platformOperationheng"><img src="../../assets/images/platformOperationheng.png"></p>
              <p class="swiper-slide3-tip phlc-yxfont phlc-first-black-color repaymentNumber">2,421,945,190.2</p>
              <p class="swiper-slide3-tip2 phlc-second-black-color">上线至今逾期金额<span><i>0</i>元</span>，逾期项目<span><i>0</i>个</span></p>
              <p class="swiper-slide3-tip3 phlc-second-black-color">项目提前还款占比<span class="span-tip4"></span></p>
              <div class="circle-box">
                <div class="circle">
                  <canvas id="canvas_11" width="372" height="372" style="width:3.72rem;height: 3.72rem;"></canvas>
                  <canvas id="canvas_12" width="372" height="372" style="width:3.72rem;height: 3.72rem;"></canvas>
                  <canvas id="canvas_13" width="278" height="278" style="width:2.78rem;height: 2.78rem;"></canvas>
                  <canvas id="canvas_14" width="278" height="278" style="width:2.78rem;height: 2.78rem;"></canvas>
                  <canvas id="canvas_15" width="182" height="182" style="width:1.82rem;height: 1.82rem;"></canvas>
                  <canvas id="canvas_16" width="182" height="182" style="width:1.82rem;height: 1.82rem;"></canvas>
                  <canvas id="canvas_17" width="92" height="92" style="width:.92rem;height: .92rem;"></canvas>
                  <canvas id="canvas_18" width="92" height="92" style="width:.92rem;height: .92rem;"></canvas>
                </div>
                <ul class="circle-ul">
                  <li class="circle-li clearfix">
                    <span class="circleR fl hexin"></span>
                    <span class="circleTip fl phlc-first-black-color circleTip2">14天以下</span>
                    <span class="circleTxt fl phlc-first-black-color phlc-yxfon shisi">40%</span>
                  </li>
                  <li class="circle-li clearfix">
                    <span class="circleR fl ling"></span>
                    <span class="circleTip fl phlc-first-black-color">15-30天</span>
                    <span class="circleTxt fl phlc-first-black-color phlc-yxfon shiwu">40%</span>
                  </li>
                  <li class="circle-li clearfix">
                    <span class="circleR fl hui"></span>
                    <span class="circleTip fl phlc-first-black-color">31-45天</span>
                    <span class="circleTxt fl phlc-first-black-color phlc-yxfon sanshiyi">40%</span>
                  </li>
                  <li class="circle-li clearfix">
                    <span class="circleR fl si"></span>
                    <span class="circleTip fl phlc-first-black-color circleTip1">46天以上</span>
                    <span class="circleTxt fl phlc-first-black-color phlc-yxfon sishiliu">40%</span>
                  </li>
                </ul>
              </div>
              <p class="total-bot phlc-first-black-color">哇，您入账 <span><i class="admissionVal">0</i>元</span>，不错不错</p>
            </div>
          </section>
          <!-- 内容五 -->
          <section class="sectionall section5">
            <div class="swiper-slide2-cont">
              <p class="clearfix slide2-little">
                <span class="fl">出借回报</span>
                <span class="fr clearfix">
                  <i class="fl">
                    <input type="text" class="date"
                    name="date" id="date3" placeholder="选择日期" @click="openPicker"
                    readonly="readonly" :value="date1"/>
                  </i>
                  <i class="platformArrow fl"><img src="../../assets/images/platformOperatjiantou.png"/></i>
                </span>
              </p>
              <p class="platformOperationheng"><img src="../../assets/images/platformOperationheng.png"></p>
              <p class="swiper-slide3-tip phlc-yxfont phlc-first-black-color incomeNumber">2,421,945,190.2</p>
              <p class="swiper-slide3-tip2 phlc-second-black-color">本月出借回报比上月多了<span><i class="subIncomeNumber">XXXX</i>元</span></p>
              <p class="swiper-slide3-tip3 phlc-second-black-color"> 本月回报小贴士<span class="return"></span></p>
              <ul class="return-ul">
                <li class="return-li clearfix return-li1">
                  <div class="fl"><img src="../../assets/images/platformOperationTipKFC.png"/></div>
                  <div class="fl return-tip phlc-third-black-color">
                    <p class="phlc-third-black-color">对于吃货们，</p>
                    <p class="phlc-third-black-color">可以买到<span><i class="qjtNum">XXX</i>个</span>全家桶；</p>
                  </div>
                </li>
                <li class="return-li clearfix return-li2">
                  <div class="fl"><img src="../../assets/images/platformOperationTipGlobe.png"/></div>
                  <div class="fl return-tip phlc-third-black-color">
                    <p class="phlc-third-black-color">对于驴友们，</p>
                    <p class="phlc-third-black-color">可以买到<span><i class="dqyNum">XXX</i>个</span>最酷的地球仪；</p>
                  </div>
                </li>
                <li class="return-li clearfix return-li2">
                  <div class="fl"><img src="../../assets/images/platformOperationTipBook.png"/></div>
                  <div class="fl return-tip phlc-third-black-color">
                    <p class="phlc-third-black-color">对于学者们，</p>
                    <p class="phlc-third-black-color">可以买到<span><i class="sjNum"></i>个</span>典藏书籍。</p>
                  </div>
                </li>
              </ul>
              <p class="returnBot-tip phlc-third-black-color">“理财是一种态度，需要您坚持再坚持。”</p>
            </div>
          </section>
          <!-- 内容六 -->
          <section class="sectionall section6">
            <div class="swiper-slide2-cont">
              <p class="clearfix slide2-little"><span class="fl">数据同步说明</span><span class="fr"></span></p>
              <p class="platformOperationheng"><img src="../../assets/images/platformOperationheng.png"></p>
              <p class="img-list1 clearfix">
                <img src="../../assets/images/platformOperation-tianyan.png" class="fl tianyan">
                <img src="../../assets/images/platformOperation-jia.png" class="fl jia">
              </p>
              <p class="img-list2 clearfix">
                <img src="../../assets/images/platformOperation-bj.png" class="fl tianyan">
                <img src="../../assets/images/platformOperation-360.png" class="fl jia">
              </p>
              <ul class="slide7-cont">
                <li class="clearfix">
                  <span class="slide7-cont-yuan fl"></span>
                  <p class="slide7-txt phlc-first-black-color fl">
                    按照监管要求，平台已将部分运营数据同步
                    <br>
                    至行业第三方网站，如网贷天眼、网贷之家
                    <br>
                    、融360、北京互联网金融行业协会等平台。
                  </p>
                </li>
                <li class="clearfix">
                  <span class="slide7-cont-yuan fl"></span>
                  <p class="slide7-txt phlc-first-black-color fl">
                    同步的数据不包括用户个人提交的实名认证、
                    <br>
                    绑定银行卡、每次充值、提现、投标信息等。
                  </p>
                </li>
                <li class="clearfix">
                  <span class="slide7-cont-yuan fl"></span>
                  <p class="slide7-txt phlc-first-black-color fl">
                    请各位出借者放心使用，您提供的信息仅限
                    <br>
                    用于普惠理财提供的相关服务，我们特别注
                    <br>
                    重您的隐私。如果疑问请咨询在线客服：
                    <br>400-8989-189（工作日：9:00-19:00）
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
     </div>
     <div class="datePicker">
      <mt-datetime-picker
              type="date"
              ref="picker"
              year-format="{value} 年"
              month-format="{value} 月"
              @confirm="handleConfirm"
              :startDate="startDate"
              :endDate="endDate"
              :date1="date1"
            >
      </mt-datetime-picker>
    </div>
   </div>
 </div>
</template>

<script>
import scrollHeader from '@/components/scrollHeader'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
// import {DatetimePicker} from 'mint-ui'
export default {
  data () {
    return {
      platformOperation: '平台运营如何',
      startDate: new Date('2014-10'),
      endDate: new Date(),
      date1: ''
    }
  },
  components: {
    scrollHeader
  },
  methods: {
    openPicker () {
      $('.picker-slot.picker-slot-center')[2].style.display = 'none'
      this.$refs.picker.open()
    },
    handleConfirm (value) {
      this.date1 = value.format('yyyy年MM月')
      var asd = value.format('yyyy-MM')
      $('#date1').attr('value', this.date1)
      this.getTable(asd)
    },
    isInArray2 (arr, value) { /* 判断是否存在数组中 */
      var index = $.inArray(value, arr)
      if (index >= 0) {
        return true
      }
      return false
    },
    sum (arr) { /* 求数组的总和 */
      var s = 0
      for (var i = arr.length - 1; i >= 0; i--) {
        s += Number(arr[i])
      }
      return s
    },
    canvasInte (percent, id1, id2, color) {
      var canvas1 = document.querySelector(id1)
      var canvas2 = document.querySelector(id2)
      var ctx1 = canvas1.getContext('2d')
      var ctx2 = canvas2.getContext('2d')
      function getPixelRatio (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1
        return (window.devicePixelRatio || 1) / backingStore
      }
      getPixelRatio(ctx1)
      ctx1.lineWidth = 20
      ctx1.strokeStyle = '#ccc'
      ctx1.lineCap = 'round'
      ctx1.beginPath()
      ctx1.arc(canvas1.width / 2, canvas1.height / 2, canvas1.width / 2 - ctx1.lineWidth / 2, 0, Math.PI * 1.5, false)
      ctx1.stroke()
      if (percent < 0 || percent > 100) {
        throw new Error('percent must be between 0 and 100')
      }
      ctx2.lineWidth = 20
      ctx2.strokeStyle = color
      ctx2.lineCap = 'round'
      var angle = 0
      var timer
      (function draw () {
        timer = requestAnimationFrame(draw)
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
        ctx2.beginPath()
        ctx2.arc(canvas2.width / 2, canvas2.height / 2, canvas2.width / 2 - ctx2.lineWidth / 2, 0, 0.75 * angle * Math.PI / 180, false)
        angle++
        /* eslint-disable */
        var percentAge = parseInt((angle / 360) * 100)
        if (angle > (percent / 100 * 360)) {
          percentAge = percent
          window.cancelAnimationFrame(timer)
        }
        ctx2.stroke()
        ctx2.closePath()
        ctx2.save()
        ctx2.beginPath()
        ctx2.rotate(90 * Math.PI / 180)
        ctx2.closePath()
        ctx2.restore()
      })()
    },
    getTable (val) {
      this.axios({
        url: this.HOST + '/web-server/index/v1/getPlatOperation',
        method: 'GET',
        params: {
          date: val
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.isLogin) {
          $('.total-bot').show()
          $('.admissionVal').text(res.data.data.incomeAmountMonth)
          $('.contribution').text(res.data.data.bidAmountMonth)
        } else {
          $('.total-bot').hide()
          $('.admissionVal').text('0')
          $('.contribution').text('0')
        }
        /* 内容一数据 */
        $('.bidSum')[0].innerHTML = this.fmoney(res.data.data.plantFormData.bidSum, 2)
        $('.bidSum2')[0].innerHTML = this.fmoney(res.data.data.plantFormData.bidSum / 100000000, 2)
        $('.incomeSum')[0].innerHTML = this.fmoney(res.data.data.plantFormData.incomeSum, 2)
        $('.incomeSum2')[0].innerHTML = this.fmoney(res.data.data.plantFormData.incomeSum / 10000000, 2)
        $('.dateCount')[0].innerHTML = res.data.data.plantFormData.dateCount
        var yearNumber = Math.floor(res.data.data.plantFormData.dateCount / 365)
        var dateNumber = res.data.data.plantFormData.dateCount % 365
        $('.dateYear').text(yearNumber + '年' + dateNumber + '天')
        $('.platpeople')[0].innerHTML = res.data.data.plantFormData.people
        $('.platpeople2').text(this.fmoney(res.data.data.plantFormData.people / 10000, 2))
        $('.dealAccount').text(this.fmoney(res.data.data.dealAccount, 2))/* 交易总额 */
        if (res.data.data.subDealAccount > 0) {
          $('.morestatus')[0].innerHTML = '多于'
        } else {
          $('.morestatus')[0].innerHTML = '少于'
        }
        if (res.data.data.subIncomeNumber > 0) {
          $('.morestatus')[0].innerHTML = '多于'
        } else {
          $('.morestatus')[0].innerHTML = '少于'
        }
        $('.subDealAccount')[0].innerHTML = this.fmoney(Math.abs(res.data.data.subDealAccount), 2)
        $('.repaymentNumber')[0].innerHTML = this.fmoney(res.data.data.repaymentNumber, 2)
        $('.subIncomeNumber')[0].innerHTML = this.fmoney(Math.abs(res.data.data.subIncomeNumber), 2)
        $('.incomeNumber')[0].innerHTML = this.fmoney(res.data.data.repaymentNumber, 2)
        $('.qjtNum')[0].innerHTML = res.data.data.qjtData.qjtNum
        $('.dqyNum')[0].innerHTML = res.data.data.qjtData.dqyNum
        $('.sjNum')[0].innerHTML = res.data.data.qjtData.sjNum
        var arrayrole1 = []
        var arrayrole2 = []
        var arrayrole3 = []
        res.data.data.dealAccountScale.forEach((item, index) => {
          arrayrole3.push(item.name)
          if (!this.isInArray2(arrayrole3, '核心保')) {
            arrayrole1[0] = this.fmoney(0, 2)
          }
          if (!this.isInArray2(arrayrole3, '惠民保')) {
            arrayrole1[1] = this.fmoney(0, 2)
          }
          if (!this.isInArray2(arrayrole3, '零供保')) {
            arrayrole1[2] = this.fmoney(0, 2)
          }
          if (item.name === '核心保') {
            arrayrole1[0] = this.fmoney(item.scale * 100, 2)
          } else if (item.name === '惠民保') {
            arrayrole1[1] = this.fmoney(item.scale * 100, 2)
          } else if (item.name === '零供保') {
            arrayrole1[2] = this.fmoney(item.scale * 100, 2)
          } else {
            arrayrole2.push(item.scale.toFixed(2))
          }
          arrayrole1[3] = this.fmoney(this.sum(arrayrole2) * 100, 2)
          this.canvasInte(arrayrole1[0], '#canvas_1', '#canvas_2', '#FBCA28')
          this.canvasInte(arrayrole1[1], '#canvas_3', '#canvas_4', '#E84123')
          this.canvasInte(arrayrole1[2], '#canvas_5', '#canvas_6', '#0CBE65')
          this.canvasInte(arrayrole1[3], '#canvas_7', '#canvas_8', '#90898a')
          $('.hexinbao')[0].innerHTML = arrayrole1[0] + '%'
          $('.huiminbao')[0].innerHTML = arrayrole1[1] + '%'
          $('.linggongbao')[0].innerHTML = arrayrole1[2] + '%'
          $('.qitabao')[0].innerHTML = arrayrole1[3] + '%'
          /* 项目期限 */
          this.canvasInte(res.data.data.earlyScale.lessThan14 * 100, '#canvas_11', '#canvas_12', '#ffcd20')
          this.canvasInte(res.data.data.earlyScale.lessThan15GreaterThan30 * 100, '#canvas_13', '#canvas_14', '#f69920')
          this.canvasInte(res.data.data.earlyScale.lessThan31GreaterThan45 * 100, '#canvas_15', '#canvas_16', '#ffcd20')
          this.canvasInte(res.data.data.earlyScale.greaterThan46 * 100, '#canvas_17', '#canvas_18', '#f8ca8e')
          $('.shisi')[0].innerHTML = res.data.data.earlyScale.lessThan14 * 100 + '%'
          $('.shiwu')[0].innerHTML = res.data.data.earlyScale.lessThan15GreaterThan30 * 100 + '%'
          $('.sanshiyi')[0].innerHTML = res.data.data.earlyScale.lessThan31GreaterThan45 * 100 + '%'
          $('.sishiliu')[0].innerHTML = res.data.data.earlyScale.greaterThan46 * 100 + '%'
        })
      })
    },
    getDateVal () {
      var timeVal = this.date1
      if (timeVal === '') {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()
        var day = date.getDate()
        var month1
        month1 = (month < 10 ? 0 + month : month)
        month = (month + 1 < 10 ? 0 + month + 1 : month + 1)
        day = (day < 10 ? 0 + day : day)
        var val = (year.toString() + '-' + month.toString())
        var val1 = ('截至   ' + year.toString() + '.' + month.toString() + '.' + day.toString())
        var val2 = (year.toString() + '年' + month.toString() + '月')
        $('#date1').attr('value', val2)
        $('#date2').attr('value', val2)
        $('#date3').attr('value', val2)
        $('#date4').attr('value', val2)
        $('#date5').text(val1)
        this.getTable(val)
      }
    }
  },
  mounted () {
    this.getDateVal()
  }
}
</script>

<style lang="less">
@import url("../../assets/style/home/platformOperation.less");
</style>
