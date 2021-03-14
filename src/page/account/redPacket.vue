<template>
  <div id="redPacket-view" class="plus-screen-view">
    <wxheader :title="'我的红包'" :isService="true"></wxheader>
    <div class="plus-screen-content">
      <div class="mescroll" id="redPacket-mescroll">
        <div class="plus-screen-scroll" id="redPacket-scroll">
          <nav class="phlc-my-red-bag-message">
            <p class="unexchanged-amount phlc-fourth-black-color">未兑换金额</p>
            <p class="unexchanged-amount-val phlc-first-black-color phlc-yxfont">{{ data.notRedAmount ? fmoney(data.notRedAmount, 2) : '0.00'}}</p>
            <p class="phlc-fourth-black-color converted-amount clearfix">
              <span class="">已兑换</span><span class="converted-amount-val phlc-yxfont">{{ data.redAmount ? fmoney(data.redAmount, 2) : '0.00'}}</span>
            </p>
            <router-link to="/conversionRedBag" tag="div" v-show="data.notRedAmount" class="redeem-now phlc-red-normal-color phlc-cursor-pointer">立即兑换</router-link>
          </nav>
          <div v-for='item in data.dealList' v-bind:key="item.createTime">
            <p class="my-red-bag-time phlc-first-black-color clearfix">
              <span class="fl">{{ item.createTime }}</span>
              <span class="fr my-red-bag-income-tip">收入：{{ fmoney(item.account, 2) }}</span>
            </p>
            <div>
              <div class="data-total" v-for='itemIn in item.data' v-bind:key="itemIn.id">
                <div class="my-red-boxlist-box clearfix">
                  <div class="fl my-red-contL">
                  <p class="my-red-contL-tip">{{ itemIn.note }}</p>
                  <p>
                    <span>{{ strToDate(getMyDate(itemIn.createTime)).format('MM-dd HH:mm:ss') }}</span>
                  </p>
                  </div>
                  <div class="fr my-red-contR phlc-yxfont  my-red-bag-income-tip">+{{ fmoney(itemIn.cariAmount, 2) }}</div>
                </div>
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
export default{
  data () {
    return {
      icon: require('../../assets/images/request-convert.png'),
      isDown: false,
      data: {
        amountDateMap: {},
        notRedAmount: null,
        radPackList: [],
        redAmount: null,
        dealList: []
      }
    }
  },
  components: {
    wxheader
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('redPacket-mescroll', {
        down: {
          callback: this.$_downCallback,
          auto: true
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          noMoreSize: 1,
          empty: {
            warpId: 'redPacket-scroll',
            icon: this.icon,
            tip: '暂无红包记录~',
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
    $_downCallback () {
      this.isDown = true
      this.mescroll.resetUpScroll(true)
    },
    $_upCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/redPack/v1/myRedPackList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          appModel: 'no'
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1111) {
          this.$router.push({
            path: '/login'
          })
        } else if (res.data.data.code === 1) {
          if (this.isDown) {
            this.isDown = false
            this.data = {
              amountDateMap: {},
              notRedAmount: res.data.data.notRedAmount,
              radPackList: [],
              redAmount: res.data.data.redAmount,
              dealList: []
            }
          }
          this.data.radPackList = this.data.radPackList.concat(res.data.data.radPackList.list)
          if (JSON.stringify(this.data.amountDateMap).indexOf(JSON.stringify(res.data.data.amountDateMap)) === -1) {
            for (var i in res.data.data.amountDateMap) {
              this.data.amountDateMap[i] = res.data.data.amountDateMap[i]
            }
          }
          this.data.dealList = this.dealType(this.data.radPackList, this.data.amountDateMap)
        }
        this.mescroll.endByPage(this.data.radPackList.length, res.data.data.radPackList.pages)
        this.mescroll.endSuccess()
      }).catch((err) => {
        if (err) {
          this.mescroll.endErr()
        }
      })
    },
    dealType (data, redTimeObj) {
      var dataArr = []
      for (var i = 0; i < data.length; i++) {
        if (dataArr.length) {
          var bool = false
          for (var l = 0; l < dataArr.length; l++) {
            if (dataArr[l].createTime === new Date(data[i].createTime).getFullYear() + '年' + (new Date(data[i].createTime).getMonth() + 1) + '月') {
              bool = true
              if (bool) {
                dataArr[l].data.push(data[i])
              }
              break
            }
          }
          if (!bool) {
            dataArr.push({
              createTime: new Date(data[i].createTime).getFullYear() + '年' + (new Date(data[i].createTime).getMonth() + 1) + '月',
              account: this.dealTime(data[i], redTimeObj),
              data: [data[i]]
            })
          }
        } else {
          dataArr.push({
            createTime: new Date(data[i].createTime).getFullYear() + '年' + (new Date(data[i].createTime).getMonth() + 1) + '月',
            account: this.dealTime(data[i], redTimeObj),
            data: [data[i]]
          })
        }
      }
      return dataArr
    },
    dealTime (idx, redTimeObj) {
      var dataStr = new Date(idx.createTime).getFullYear() + '-' + (new Date(idx.createTime).getMonth() + 1 < 10 ? '0' + (new Date(idx.createTime).getMonth() + 1) : new Date(idx.createTime).getMonth() + 1)
      for (var i in redTimeObj) {
        if (i.indexOf(dataStr) !== -1) {
          return redTimeObj[i]
        }
      }
    },
    getMyDate (str) {
      var oDate = new Date(str)
      var oYear = oDate.getFullYear()
      var oMonth = oDate.getMonth() + 1
      var oDay = oDate.getDate()
      var oHour = oDate.getHours()
      var oMin = oDate.getMinutes()
      var oSen = oDate.getSeconds()
      var oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen)
      return oTime
    },
    getzf (num) {
      if (parseInt(num) < 10) {
        num = '0' + num
      }
      return num
    }
  }
}
</script>

<style lang="less">
@import url("../../assets/style/account/my-red-bag.css");
#redPacket-view{
  .plus-screen-scroll{
    padding: 0.3rem 0 0 0;
    img{
      display: inline-block;
    }
  }
  .phlc-my-red-bag-message {
    width: 6.7rem;
    margin: 0 auto;
    border-radius: .24rem;
    -webkit-border-radius: .24rem;
    -moz-border-radius: .24rem;
    box-shadow:0px 0px .2rem rgba(102,102,102,0.47);
    position: relative;
    padding:.6rem .4rem .4rem .4rem;
    font-size: .24rem;
    margin-bottom: .3rem;
    background:rgba(255,255,255,1);
    box-sizing: border-box;
    .unexchanged-amount-val{
      margin-top: .2rem;
      font-size: .48rem;
    }
    .converted-amount{
      margin-top: .5rem;
      line-height: .4rem;
      font-size: .28rem;
    }
    .redeem-now{
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
    .converted-amount-val{
      margin-left: .2rem;
    }
  }
}
</style>
