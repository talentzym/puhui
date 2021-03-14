<template>
 <div id="noviceGiftBag-view" class="plus-screen-view">
   <scrollHeader :scrollHeadText = "noviceGiftBagMsg"></scrollHeader>
   <div class="project-introduce-content plus-screen-content mescroll">
      <div class="headBg"></div>
      <div class="novicebg plus-screen-scroll">
        <div class="content-1">
            <div class="title1"></div>
            <table border="1" cellspacing="" cellpadding="">
              <tr>
                <td>
                  <div class="moneyBox clearfix">
                    <div class="rmb fl">¥</div>
                    <div class="money fl">18</div>
                  </div>
                </td>
                <td>
                  <div class="voucherBox">
                    <span class="voucherName">新人返现券</span>
                    <p class="voucherMsg">出借满2,000元/项目期限0天起</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="moneyBox clearfix">
                    <div class="rmb fl">¥</div>
                    <div class="money fl">38</div>
                  </div>
                </td>
                <td>
                  <div class="voucherBox">
                    <span class="voucherName">新人返现券</span>
                    <p class="voucherMsg">出借满5,000元/项目期限0天起</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="moneyBox clearfix">
                    <div class="rmb fl">¥</div>
                    <div class="money fl">78</div>
                  </div>
                </td>
                <td>
                  <div class="voucherBox">
                    <span class="voucherName">新人返现券</span>
                    <p class="voucherMsg">出借满10,000元/项目期限0天起</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="moneyBox clearfix">
                    <div class="rmb fl">¥</div>
                    <div class="money fl">166</div>
                  </div>
                </td>
                <td>
                  <div class="voucherBox">
                    <span class="voucherName">新人返现券</span>
                    <p class="voucherMsg">出借满50,000元/项目期限0天起</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="moneyBox clearfix">
                    <div class="rmb thr fl">¥</div>
                    <div class="money thousand fl">10000</div>
                  </div>
                </td>
                <td>
                  <div class="voucherBox">
                    <span class="voucherName">新人体验金</span>
                    <p class="voucherMsg">体验3天，预期年化12%</p>
                  </div>
                </td>
              </tr>
            </table>
        </div>
        <div class="content-2">
          <div class="title2"></div>
          <p class="titleMsg">仅限首次出借直投项目</p>
          <div class="voucher-img">
            <div class="voucher-20"></div>
            <div class="voucher-50"></div>
          </div>
        </div>
        <router-link class="novice-btn" to="/novice" tag="div"></router-link>
        <div class="newBagtips">
          <img class="newBagtip" src="../../assets/images/newBagTips.png" alt="" />
          <p class="newp">
            1、出借时使用返现券所得奖励在满标放款后以红包返还，记得     去“我的-我的红包”兑换；
          </p>
          <p>2、普惠理财保留对活动的最终解释权。</p>
        </div>
      </div>
   </div>
   <div class="novice-bag-footer">
      <div id="bag-btn" @click="routeUrl(btnText)">{{btnText}}</div>
    </div>
 </div>
</template>

<script>
import scrollHeader from '@/components/scrollHeader'
import Vue from 'vue'
import 'mescroll.js/mescroll.min.css'
export default {
  data () {
    return {
      noviceGiftBagMsg: '新人礼包',
      btnText: ''
    }
  },
  mounted () {
    this.goToNovice()
    this.$_muiPlus()
  },
  methods: {
    $_muiPlus () {
      /* eslint-disable */
      mui.plusReady(() => {
        Vue.prototype.plus = plus
      })
      /* eslint-disable */
    },
    windowOpen (flag) {
      if (this.isLogin) {
        this[flag] = true
        if (flag !== 'shareFlag') {
          this.$mask.show()
        }
      } else {
        this.toLogin('/invite')
      }
    },
    goToNovice () {
      this.axios({
        url: this.HOST + '/web-server/index/v1/totalAccount',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        console.log(res)
        var code = res.data.data.code
        if (code === 1111) {
          this.btnText = '立即领取'
        } else if (code === 1 || code === 100001) {
          this.btnText = '立即查看'
        }
      })
    },
    routeUrl (msg) {
      if (msg === '立即领取') {
        if (this.plus) {
          /* 跳往app方法 */
          var h = this.plus.webview.getLaunchWebview()
          this.evil('h.evalJS("goRegister()")')
        } else {
          this.$router.push('/register')
        }
      } else if (msg === '立即查看') {
        if (this.plus) {
          var h = this.plus.webview.getLaunchWebview()
          this.evil('h.evalJS("goVoucherList()")')
        } else {
          this.$router.push('/voucherList')
        }
      }
    }
  },
  components: {
    scrollHeader
  }
}
</script>

<style lang='less'>
@import url("../../assets/style/home/noviceGiftBag.less");
</style>
