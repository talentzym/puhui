<template>
  <div id="calculator-view" class="plus-screen-view">
    <wxheader :isToggle="true"></wxheader>
    <div class="plus-screen-content mescroll">
      <div class="plus-screen-scroll">
        <header class="phlc-back-header"></header>
        <div class="calculator-content">
          <div class="calculator-box-option" v-on:click="loanWindowOpen()">
            <p class="p-common">选择出借项目</p>
            <div class="select-bid-loan">
              <p>{{ activePro.proName ? activePro.proName : '' }}</p>
              <p class="phlc-red-normal-color" >年化{{(activePro.addRate ? activePro.rate + '%+' + activePro.addRate : activePro.rate) + '%，期限' + activePro.deadLine + '天'}}</p>
            </div>
          </div>
          <div class="calculator-box-option">
            <p class="p-common">出借金额(元)</p>
            <div class="bid-amount-box">
              <input type="text" value="10,000.00" class="bid-amount phlc-yxfont" v-model="amount" v-on:input="inputOnInput()" v-on:blur="inputOnBlur()" v-on:focus="inputOnFocus()"/>
            </div>
          </div>
          <div class="calculator-box-option">
            <p class="p-common">试算回报(元)</p>
            <div class="phlc-yxfont trial-in-return">0.00</div>
          </div>
          <p class="p-common">部分项目会提前还款，这里的计算均仅供参考</p>
          <div v-show="activePro.status !== 3 || !right" class="submit-button loan">去看看</div>
          <router-link  :to="{path: 'projectDetail', query:{id: activePro.id}}" v-show="activePro.status === 3 && right" tag="div" class="submit-button loan">去看看</router-link>
        </div>
      </div>
    </div>
    <div class="loan-window" v-show="loanFlag">
      <div class="loan-window-title">选择出借项目
        <a href="javascript:void(0)" class="loan-window-close" v-on:click="loanWindowClose()">
          <img src="../../assets/images/phlc-login-cha.png"/>
        </a>
      </div>
      <div id="loan-window-content" class="mescroll">
        <div class="content">
          <section v-on:click="activeLoan()" v-for="item in data" v-bind:key="item.id">
            <p>{{ item.proName }}</p>
            <p class="phlc-red-normal-color">年化{{ ( item.addRate ? item.rate + "%+" + item.addRate : item.rate) + '%，期限' + item.deadLine + '天' }}
              <span class="describe-right progress-box" id="home-progress">
                <span class="progress-box-span phlc-red-normal" v-bind:class=" item.parlars " v-bind:style="{width: item.status === 3 ? item.process + '%' : '100%'}">
                  <i class="progress" id="home-progress2">{{ item.loanProgress }}</i>
                </span>
                <i class="progress" id="home-progress2">{{ item.loanProgress }}</i>
              </span>
            </p>
          </section>
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
      isDown: false,
      data: [],
      activePro: {
        proName: '',
        addRate: 0,
        rate: 0,
        deadLine: 0
      },
      amount: this.fmoney(10000, 2),
      right: true,
      loanFlag: false
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
      this.mescroll = new MeScroll('loan-window-content', {
        down: {
          callback: this.$_downCallback
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          noMoreSize: 1,
          auto: false,
          onScroll: function (mescroll, y, isUp) {
            if (y) {
              $('.loan-window-title').addClass('page-header-shadow')
            } else {
              $('.loan-window-title').removeClass('page-header-shadow')
            }
          }
        }
      })
    },
    $_downCallback (page) {
      this.isDown = true
      this.mescroll.resetUpScroll()
    },
    $_upCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/loanLoanInfo/v1/getLoanList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          appModel: 'yes'
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (this.isDown) {
          this.data = []
        }
        for (let i in res.data.data.list) {
          switch (res.data.data.list[i].status) {
            case 3:
              res.data.data.list[i].parlars = ''
              res.data.data.list[i].loanProgress = '进度' + res.data.data.list[i].process + '%'
              break
            case 4:
              res.data.data.list[i].parlars = 'color-orgin'
              res.data.data.list[i].loanProgress = '已满标'
              break
            case 6:
              res.data.data.list[i].parlars = 'color-green'
              res.data.data.list[i].loanProgress = '还款中'
              break
            case 7:
              res.data.data.list[i].parlars = 'color-gray'
              res.data.data.list[i].loanProgress = '已完成'
              break
          }
        }
        this.data = this.data.concat(res.data.data.list)
        if (this.isDown) {
          this.activePro = this.data[0]
          this.calculateReturns(this.activePro.id)
          this.projectStatus(this.activePro.status)
          $('.content section').eq(0).addClass('active')
          this.isDown = false
        }
        this.mescroll.endSuccess()
        this.mescroll.endBySize(this.data.length, res.data.data.total)
      }).catch((err) => {
        if (err) {
          this.mescroll.endErr()
        }
      })
    },
    loanWindowClose () {
      this.$mask.hide()
      this.loanFlag = false
    },
    loanWindowOpen () {
      this.$mask.show()
      this.loanFlag = true
    },
    activeLoan (e) {
      var ev = window.event || e
      var $target = ev.target.nodeName === 'SECTION' ? $(ev.target) : $(ev.target).parents('section')
      var index = $($target).index()
      $('.content section').eq(index).addClass('active').siblings().removeClass('active')
      this.activePro = this.data[index]
      this.projectStatus(this.activePro.status)
      this.calculateReturns(this.activePro.id)
      this.loanWindowClose()
    },
    calculateReturns (id) {
      this.axios({
        url: this.HOST + '/web-server/loanLoanInfo/v1/getLoanInterest',
        method: 'GET',
        params: {
          proId: id,
          amount: this.delcommafy(this.amount)
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1') {
          $('.trial-in-return').text(res.data.data.loanInterest ? this.fmoney(res.data.data.loanInterest, 2) : '0.00')
        }
      })
    },
    projectStatus (status) {
      if (status === 3) {
        $('.submit-button').text('去看看').removeClass('phlc-red-disbled')
      } else {
        $('.submit-button').addClass('phlc-red-disbled')
        if (status === 4) {
          $('.submit-button').html('已满标')
        } else if (status === 6) {
          $('.submit-button').html('还款中')
        } else if (status === 7) {
          $('.submit-button').html('已还清')
        }
      }
    },
    inputOnInput () {
      var thisValue = this.amount > 99999999.99 ? 99999999.99 : this.amount
      this.amount = this.delcommafy(this.fmoney(thisValue, 2)) > 99999999.99 ? 99999999.99 : this.delcommafy(this.fmoney(thisValue, 2))
      this.calculateReturns(this.activePro.id)
      if (!Number(this.amount)) {
        $('.submit-button').addClass('phlc-red-disbled')
        this.right = false
      } else {
        $('.submit-button').removeClass('phlc-red-disbled')
        this.right = true
      }
    },
    inputOnBlur () {
      var value = this.amount
      $('.bid-amount').attr('type', 'text')
      this.amount = value ? this.fmoney(value, 2) : '0.00'
    },
    inputOnFocus () {
      var value = this.amount
      $('.bid-amount').attr('type', 'number')
      this.amount = this.delcommafy(value)
    }
  }
}
</script>

<style lang="less">
#calculator-view{
  .plus-screen-content{
    top: 0;
    .plus-screen-scroll{
      padding: 0;
    }
  }
  .display-none{
    display: none;
    left: 100%!important;
  }
  .describe-right {
    display: inline-block;
    width: 1.26rem;
    height: .38rem;
    border-radius: .04rem;
    -webkit-border-radius: .04rem;
    -moz-border-radius: .04rem;
    background-color: #fcebe9;
    text-align: center;
    position: relative;
    left: 0.2rem;
    font-size: .2rem;
    color: #e6382c;
    top: 0.08rem;
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
  .progress {
    position: absolute;
    left: .63rem;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
  .color-green {
    background: #04C228 !important;
    color: #fff !important;
  }
  .color-orgin {
    background: #FFAF14 !important;
    color: #fff !important;
  }
   .color-gray {
    background-color: #D3D3D3;
    color: #fff;
  }
  .color-red {
    background-color: #e6382c;
    color: #fff;
  }
  .phlc-set-back{
    position: fixed;
  }
  .phlc-back-header {
    height: 3.15rem;
    background: url(../../assets/images/calculator-bg.png) no-repeat;
    background-size: 100%;
    position: relative;
  }
  .phlc-back-header:after {
    content: "";
    display: block;
    width: 100%;
    height: 0.2rem;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .calculator-content {
    padding: 0.6rem 0.45rem 0.6rem 0.45rem;
    text-align: center;
    background: #fff;
  }
  .calculator-box-option {
    padding-bottom: 1rem;
  }
  .bid-amount-box {
    width: 4rem;
    margin: 0 auto;
    position: relative;
    height: 1.1rem;
  }
  .bid-amount {
    width: 100%;
    color: #444;
    text-align: center;
    border: 0px solid #fff!important;
    border-bottom: 1px solid #eee!important;
    outline: none;
    height: 0.8rem;
    margin-bottom: 0.3rem;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.5rem;
  }
  .trial-in-return {
    margin-top: 0.2rem;
    font-size: 0.5rem;
    color: #E6382C;
    font-weight: 6000;
  }
  .select-bid-loan {
    width: 4.4rem;
    margin: 0 auto;
    position: relative;
  }
  .select-bid-loan p,
  section p {
    font-size: 0.3rem;
    color: #444;
    line-height: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .select-bid-loan:after {
    content: "";
    display: block;
    width: 0.15rem;
    height: 0.35rem;
    background: url(../../assets/images/phlc-icon-more.jpg) no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0.06rem;
    right: -0.7rem;
  }
  .loan-window {
    width: 100%;
    height: 8.9rem;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 0.2rem 0.2rem 0 0;
    z-index: 1000;
  }
  .loan-window-title {
    width: 100%;
    height: 1.56rem;
    line-height: 1.56rem;
    position: relative;
    font-size: 0.36rem;
    color: #222;
    padding: 0 0.4rem;
  }
  .loan-window-close {
    width: 0.88rem;
    height: 0.88rem;
    padding: 0.26rem;
    position: absolute;
    top: 0.34rem;
    right: 0.4rem;
  }
  .loan-window-close img {
    width: 0.36rem;
  }
  #loan-window-content {
    position: relative;
    width: 100%;
    height: 7.34rem;
    overflow: auto;
  }
  #loan-window-content section {
    width: 100%;
    height: 1.9rem;
    padding: 0.5rem 1rem 0.5rem 0.4rem;
    position: relative;
    box-sizing: border-box;
  }
  #loan-window-content section:before {
    content: "";
    display: block;
    width: 6.7rem;
    height: 1px;
    background: #eee;
    position: absolute;
    top: 0;
    left: 0.4rem;
  }
  section.active {
    background: url(../../assets/images/phlc-address-active.png) no-repeat 6.74rem 0.8rem;
    background-size: 0.36rem;
    background-color: #f8f8fa;
  }
}
</style>
