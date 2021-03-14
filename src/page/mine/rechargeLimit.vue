<template>
 <div id="rechargeLimit-view">
   <wxheader :title="'充值限额'"></wxheader>
   <div class="recharge-content">
      <ul class="recharge-bank-list">
      </ul>
    </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
export default {
  data () {
    return {
      bankList: []
    }
  },
  mounted () {
    this.getPageData()
  },
  methods: {
    concatImg (imgUrl) {
      return this.HOST + '/web-server/' + imgUrl
    },
    getPageData () {
      this.axios({ /* 获取bank列表 */
        url: this.HOST + '/web-server/bank/v1/getBankList',
        method: 'post',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        this.bankList = res.data.data.banks
        var html = ''
        for (var i = 0; i < this.bankList.length; i++) {
          if (this.bankList[i].isRecommend === 1) {
            html += '<li><p class="clearfix recharge-bank-list-top"><span class="fl"><img src="' + this.concatImg(this.bankList[i].logoPath) + '"/></span><span class="fl recharge-bank-name phlc-first-black-color" style="margin-left:.04rem">' + this.bankList[i].bankName + '</span><span class="fl bindings recharge-kuang" style="font-size:.24rem">已绑定</span><span class="fl recommend recharge-kuang" style="font-size:.24rem">推荐</span></p class="recharge-bank-list-bottom"><p style="font-size:.3rem">今日可充值<span  class="phlc-yxfont">' + this.bankList[i].failyLimit + '</span>元；本月限额<span class="phlc-yxfont">' + this.bankList[i].monthLimit + '</span>元</p></li>'
          } else {
            html += '<li><p class="clearfix recharge-bank-list-top"><span class="fl"><img src="' + this.concatImg(this.bankList[i].logoPath) + '"/></span><span class="fl recharge-bank-name phlc-first-black-color">' + this.bankList[i].bankName + '</span><span class="fl bindings recharge-kuang" style="font-size:.24rem">已绑定</span></p class="recharge-bank-list-bottom"><p style="font-size:.3rem">今日可充值<span  class="phlc-yxfont">' + this.bankList[i].failyLimit + '</span>元；本月限额<span  class="phlc-yxfont">' + this.bankList[i].monthLimit + '</span>元</p></li>'
          }
        }
        $('.recharge-bank-list').append(html)
        if (res.data.data.isBind === 'yes' && res.data.data.isUse === 'yes') {
          $('.recharge-bank-list li:first').find('.bindings').css('display', 'block')
        } else {
          $('.bindings').css('display', 'none')
        }
      })
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#rechargeLimit-view{
  .recharge-content{
    width: 7.5rem;
    margin: 0 auto;
    position: absolute;
    top: 0.88rem;
    left: 0;
    bottom: 0;
    .recharge-bank-list{
      padding: 0 .4rem;
      background: #FFFFFF;
      li{
        height: 1.92rem;
        border-bottom: .02rem solid #D6D6D6;
        padding-top: .3rem;
        .recharge-bank-list-top{
          img{
            width: .8rem;
            height: .8rem;
          }
          .recharge-bank-name {
            font-size: .36rem;
            margin-top: .24rem;
            margin-left: .1rem;
          }
          .bindings{
            width: 1.06rem;
            height: .38rem;
            background: url(../../assets/images/recharge-limit-red-k.png) no-repeat;
            background-size: 100% 100%;
            color: #FFFFFF;
            display: none;
          }
          .recharge-kuang{
            margin-left: .2rem;
            margin-top: .28rem;
            text-align: center;
            line-height: .4rem;
            font-size: .24rem;
          }
          .recommend{
            width: .87rem;
            height: .38rem;
            background: url(../../assets/images/recharge-limit-white.png) no-repeat;
            background-size: 100% 100%;
            color: #E6382C;
          }
        }
        .recharge-bank-list-bottom{
          color: #666666;
          font-size: .3rem;
          margin-top: .16rem;
        }
      }
    }
  }
}
</style>
