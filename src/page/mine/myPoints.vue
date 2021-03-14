<template>
 <div id="myPoint-view" class="plus-screen-view">
   <wxheader :title="'我的积分'"></wxheader>
   <div id="myPoint-content" class="plus-screen-content">
     <div class="mescroll" id="myPoint-mescroll">
        <div class="mescrollRedDiv">
          <nav class="phlc-my-red-bag-message">
            <p class="unexchanged-amount phlc-fourth-black-color">可用积分</p>
            <p class="unexchanged-amount-val phlc-first-black-color phlc-yxfont">0</p>
            <p class="phlc-fourth-black-color converted-amount clearfix">
              <span class="">获得总积分</span><span class="converted-amount-val  phlc-yxfont">0</span>
            </p>
          </nav>
        </div>
        <div class="phlc-my-red-bag-cont">
          <div class="phlc-my-red-bag">
            <div id="my-red-box" class="my-red-box">
              <div class="red-box-content">

              </div>
            </div>
          </div>
        </div>
    </div>
   </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import MeScroll from 'mescroll.js'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default {
  data () {
    return {
      isDown: false,
      pointsData: [],
      allData: [],
      incomeObj: {},
      outcomeObj: {},
      hasNext: true
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    viewFor (obj) {
      var str = ''
      if (obj.length) {
        for (var i = 0; i < obj.length; i++) {
          str += '<div>' +
          '<p class="my-red-bag-time phlc-first-black-color clearfix">' +
          '<span class="fl">' + obj[i].integralDate + '</span>' +
          '<span class="fr my-red-bag-expenditure">' + Math.abs(obj[i].outcome) + '</span>' +
          '<span class="fr my-red-bag-expenditure-tip">支出：</span><span class="fr my-red-bag-income">' + obj[i].income + '</span>' +
          '<span class="fr my-red-bag-income-tip">收入：</span></p>' +
          '</div>'
          for (var x = 0; x < obj[i].data.length; x++) {
            var rightColor = ''
            var integral = ''
            integral = obj[i].data[x].integral
            if (obj[i].data[x].integral > 0) {
              integral = '+' + integral
              rightColor = 'my-red-bag-income-tip'
            } else {
              rightColor = 'my-red-bag-expenditure-tip'
            }
            var redPackCreateTime = this.getMyDate(obj[i].data[x].integralDate)
            str += '<div class="my-red-boxlist-box clearfix">' +
            '<div class="fl my-red-contL"><p class="my-red-contL-tip">' + obj[i].data[x].integralType + '</p>' +
            '<p><span>' + this.strToDate(redPackCreateTime).format('MM-dd HH:mm:ss') + '</span></p>' +
            '</div><div class="fr my-red-contR phlc-yxfont ' + rightColor + '">' + integral + '</div></div>'
          }
          str += '</div>' + '</div>'
        }
        $('.red-box-content').html(str)
      }
    },
    $_init () {
      this.mescroll = new MeScroll('myPoint-mescroll', {
        down: {
          callback: this.$_downCallback
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          auto: false,
          noMoreSize: 1,
          empty: {
            warpId: 'content',
            icon: '../../assets/images/request-convert.png',
            tip: '暂无兑换记录~',
            btntext: '',
            btnClick: null,
            supportTap: false
          },
          onScroll: function (mescroll, y, isUp) {
            if (y) {
              $('header').addClass('header-shadow')
            } else {
              $('header').removeClass('header-shadow')
            }
          }
        }
      })
    },
    $_downCallback (page) {
      this.isDown = true
      this.mescroll.resetUpScroll(true)
    },
    $_upCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/integral/v1/myIntegralList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (this.isDown) {
          this.isDown = false
          this.pointsData = []
          this.incomeObj = {}
          this.outcomeObj = {}
        }
        if (res.data.code === 1) {
          if (res.data.data.code === 1) {
            $('.unexchanged-amount-val')[0].innerHTML = res.data.data.myIntegralCanUse
            if (res.data.data.redAmount === 0) {
              $('.redeem-now').addClass('ddd')
            } else {
              $('.redeem-now').removeClass('ddd')
            }
            $('.converted-amount-val')[0].innerHTML = res.data.data.myIntegralAllIn
            var timeArr = []
            var timeObj = {}
            if (JSON.stringify(timeArr).indexOf(JSON.stringify(res.data.data.integralMap)) === -1) {
              timeArr.push(res.data.data.integralMap)
            }
            if (timeArr.length > 1) {
              timeObj = $.extend(timeArr[timeArr.length - 2], timeArr[timeArr.length - 1])
              timeArr.push(timeObj)
            } else {
              timeObj = timeArr[0]
            }
            for (var i in timeObj) {
              if (i.indexOf('integralIncome') !== -1) {
                var key1 = i
                var value1 = timeObj[i]
                this.incomeObj[key1] = value1
              } else {
                var key2 = i
                var value2 = timeObj[i]
                this.outcomeObj[key2] = value2
              }
            }
            $('.red-box-content').html('')
            this.hasNext = res.data.data.myIntegralList.hasNextPage
            this.pointsData = this.pointsData.concat(res.data.data.myIntegralList.list)
            this.allData = this.dealData(this.pointsData, this.outcomeObj, this.incomeObj)
            this.viewFor(this.allData)
          } else if (res.data.data.code === 1111) {
            this.toLogin('/myPoints')
          }
        }
        this.mescroll.endBySize($('.my-red-boxlist-box').length, res.data.data.myIntegralList.total)
        this.$nextTick(() => {
          this.mescroll.endSuccess($('.my-red-boxlist-box').length, this.hasNext)
        })
      }).catch((err) => {
        if (err) {
          this.mescroll.endErr()
        }
      })
    },
    dealData (data, outcomeObj, incomeObj) {
      var dataArr = []
      for (var i = 0; i < data.length; i++) {
        if (dataArr.length) {
          var bool = false
          for (var l = 0; l < dataArr.length; l++) {
            if (dataArr[l].integralDate === new Date(data[i].integralDate).getFullYear() + '年' + (new Date(data[i].integralDate).getMonth() + 1) + '月') {
              bool = true
              if (bool) {
                dataArr[l].data.push(data[i])
              }
              break
            }
          }
          if (!bool) {
            dataArr.push({
              integralDate: new Date(data[i].integralDate).getFullYear() + '年' + (new Date(data[i].integralDate).getMonth() + 1) + '月',
              income: this.aaa(data[i], incomeObj),
              outcome: this.bbb(data[i], outcomeObj),
              data: [data[i]]
            })
          }
        } else {
          dataArr.push({
            integralDate: new Date(data[i].integralDate).getFullYear() + '年' + (new Date(data[i].integralDate).getMonth() + 1) + '月',
            income: this.aaa(data[i], incomeObj),
            outcome: this.bbb(data[i], outcomeObj),
            data: [data[i]]
          })
        }
      }
      return dataArr
    },
    aaa (idx, incomeObj) {
      var dataStr = new Date(idx.integralDate).getFullYear() + '-' + (new Date(idx.integralDate).getMonth() + 1 < 10 ? '0' + (new Date(idx.integralDate).getMonth() + 1) : new Date(idx.integralDate).getMonth() + 1)
      for (var i in incomeObj) {
        if (i.indexOf(dataStr) !== -1) {
          return incomeObj[i]
        }
      }
    },
    bbb (idx, outcomeObj) {
      var dataStr = new Date(idx.integralDate).getFullYear() + '-' + (new Date(idx.integralDate).getMonth() + 1 < 10 ? '0' + (new Date(idx.integralDate).getMonth() + 1) : new Date(idx.integralDate).getMonth() + 1)
      for (var i in outcomeObj) {
        if (i.indexOf(dataStr) !== -1) {
          return outcomeObj[i]
        }
      }
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#myPoint-view{
  #myPoint-mescroll{
    width: 7.5rem;
    overflow-x: hidden;
  }
  .plus-screen-content{
    background: #fff;
  }
  .mescrollRedDiv{
    padding: 0 0.4rem;
  }
  .my-red-bag-income-tip{
    color: #E6382C !important;
  }
  .my-red-bag-expenditure-tip{
    color: #3EC328 !important;
  }
  .phlc-my-red-bag-message {
    height: 2.3rem;
    margin: 0 auto;
    border-radius: .24rem;
    -webkit-border-radius: .24rem;
    -moz-border-radius: .24rem;
    box-shadow: 0 0 0.2rem #cec9c9;
    position: relative;
    padding:.6rem .4rem 0 .4rem;
    font-size: .24rem;
    margin: .4rem auto;
    .unexchanged-amount{
      font-size: 0.28rem;
    }
    .unexchanged-amount-val{
      margin-top: .2rem;
      font-size: .48rem;
    }
    .converted-amount{
      margin-top: .5rem;
      line-height: .4rem;
      font-size: .28rem;
      .converted-amount-val {
        margin-left: .2rem;
      }
    }
    .redeem-now {
      width: 1.6rem;
      height: .6rem;
      border-radius: .3rem;
      -webkit-border-radius: .3rem;
      -moz-border-radius: .3rem;
      text-align: center;
      line-height: .56rem;
      border: .02rem solid #E6382C;
      position: absolute;
      right: .4rem;
      top: 1.1rem;
    }
  }
  .phlc-my-red-bag-cont {
    width: 100%;
    margin: 0 auto;
    .phlc-my-red-bag{
      padding-top: .3rem;
      height: 100%;
      .red-box-content{
        background: #FFFFFF;
        .my-red-bag-time{
          height: .7rem;
          line-height: .7rem;
          padding: 0 .4rem;
          margin: 0 auto;
          background-color: #f5f5f5;
          span{
            font-size: 0.24rem;
          }
          .my-red-bag-expenditure{
            color: #3EC328;
            margin-left: .1rem;
          }
          .my-red-bag-income{
            margin-left:.1rem;
            color: #E6382C;
            margin-right: .3rem;
          }
        }
        .my-red-boxlist-box{
          border-bottom: .02rem solid #EEEEEE;
          margin: 0 auto;
          padding: .4rem .4rem .3rem;
          .my-red-contL{
            p{
              height: .4rem;
              line-height: .4rem;
            }
            p:nth-of-type(1){
              color: #222222;
              font-size: .3rem;
            }
            p:nth-of-type(2){
              color: #999999;
              font-size: .24rem
            }
          }
          .my-red-contR{
            font-size: .3rem;
          }
        }
      }
    }
  }
  .ddd{
    background-color: #DDDDDD !important;
    color: #ffffff;
    border: 0;
  }
}
</style>
